#!/bin/bash

SCRIPT_PATH=$1
GITHUB_REPO=$2
DEVHUB_USERNAME=$3
PATH_TO_POOL_CONFIG=$4

pattern='[A-Za-z0-9]+_[0-9]+_SBX'
tempfile=$(mktemp)
declare -a sandboxesInProgress
declare -A variableNamesForSandboxes


# Read the pool config
config_json=$(<"$PATH_TO_POOL_CONFIG")

# Get matching sandboxes and check their status
gh api "/repos/$GITHUB_REPO/actions/variables?per_page=100" --jq ".variables[] | select(.name | test(\"$pattern\")).name" > "$tempfile"

while read variable_name; do
  sandbox_json=$(gh api "/repos/$GITHUB_REPO/actions/variables/$variable_name?per_page=100" --jq ".value | fromjson")
  status=$(echo $sandbox_json | jq -r '.status')
  isActive=$(echo $sandbox_json | jq -r '.isActive')
  sandbox_name=$(echo $sandbox_json | jq -r '.name')

  if [ "$status" = "InProgress" ] && [ "$isActive" = "true" ]; then
    sandboxesInProgress+=("$sandbox_name")
    variableNamesForSandboxes["$sandbox_name"]="$variable_name"
  fi
done < "$tempfile"

echo "${sandboxesInProgress[@]}" | jq -R 'split(" ")' > sandboxes.json

cat sandboxes.json

# Read the sandboxes.json file
sandboxes=$(<sandboxes.json)


# Function to extract the pool name using regex
extract_pool_name() {
  local variable=$1
  local pattern='^([A-Za-z0-9_]+)_[0-9]+_SBX$'
  if [[ $variable =~ $pattern ]]; then
    echo "${BASH_REMATCH[1]}"
  else
    echo "No match found"
  fi
}


# Function to get usersToBeActivated from the config
get_users_to_be_activated() {
  local variable_name=$1
  local pool_name=$(extract_pool_name "$variable_name")
  local users=$(echo "$config_json" | jq -r --arg POOL_NAME "$pool_name" '.[] | select(.pool == $POOL_NAME) | .usersToBeActivated')

  # If users is "null" or empty, return an empty string or a default value
  if [[ $users = "null" ]] || [[ -z $users ]]; then
    echo ""
  else
    echo "$users"
  fi
}

# .



process_sandbox() {
  sandbox_name=$1
  sandbox_status=$(sf org sandbox resume -n $sandbox_name -o $DEVHUB_USERNAME --json)
  parsed_status=$(echo $sandbox_status | jq -r '.result.Status')


  gh_variable_name=${variableNamesForSandboxes[$sandbox_name]}
  USERS_TO_BE_ACTIVATED=$(get_users_to_be_activated "$gh_variable_name")

  echo $sandbox_name:$parsed_status
  if [ "$parsed_status" = "Completed" ]; then
    sf alias set $sandbox_name=$DEVHUB_USERNAME.$sandbox_name

    if [[ -n $USERS_TO_BE_ACTIVATED ]]; then
        # If USERS_TO_BE_ACTIVATED is not empty, process it
        IFS=',' read -r -a usersToBeActivated <<< "$USERS_TO_BE_ACTIVATED"
        for index in "${!usersToBeActivated[@]}"; do
          usersToBeActivated[index]="${usersToBeActivated[index]}@$sandbox_name"
        done
        usersToBeActivated=$(IFS=, ; echo "${usersToBeActivated[*]}")

        node "$SCRIPT_PATH/dist/deactivate-all-users/index.js" "$usersToBeActivated" "$sandbox_name"
    fi
    
    value="{\"name\":\"$sandbox_name\",\"status\":\"Available\",\"isActive\":\"true\"}"

    variable_name=${variableNamesForSandboxes["$sandbox_name"]}

    echo $variable_name
    gh variable set "$variable_name" -b "$value" --repo $GITHUB_REPO

    sfp metrics:report -m "sfpowerscripts.sandbox.created" -t counter -g {\"type\":\"ci\"}

  fi
}

# Start parallel jobs
for sandbox_name in $(echo $sandboxes | jq -r '.[]'); do
  process_sandbox $sandbox_name &
done

# Wait for all parallel jobs to finish
wait
