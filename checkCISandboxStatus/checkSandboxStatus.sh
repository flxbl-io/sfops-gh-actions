#!/bin/bash

SCRIPT_PATH=$1
GITHUB_REPO=$2
DEVHUB_USERNAME=$3
USERS_TO_BE_ACTIVATED=$4

pattern='[A-Za-z0-9]+_[0-9]+_SBX'
tempfile=$(mktemp)
declare -a sandboxesInProgress
declare -A variableNamesForSandboxes

# Get matching sandboxes and check their status
gh api "/repos/$GITHUB_REPO/actions/variables" -F per_page=100  --paginate --jq ".variables[] | select(.name | test(\"$pattern\")).name" > "$tempfile"

while read variable_name; do
  sandbox_json=$(gh api "/repos/$GITHUB_REPO/actions/variables/$variable_name" --paginate --jq ".value | fromjson")
  status=$(echo $sandbox_json | jq -r '.status')
  isActive=$(echo $sandbox_json | jq -r '.isActive')
  sandbox_name=$(echo $sandbox_json | jq -r '.name')

  if [ "$status" = "InProgress" ] && [ "$isActive" = "true" ]; then
    sandboxesInProgress+=("$sandbox_name")
    variableNamesForSandboxes["$sandbox_name"]="$variable_name"
  fi
done < "$tempfile"

echo "${sandboxesInProgress[@]}" | jq -R 'split(" ")' > sandboxes.json

# Read the sandboxes.json file
sandboxes=$(<sandboxes.json)

process_sandbox() {
  sandbox_name=$1
  sandbox_status=$(sf org sandbox resume -n $sandbox_name -o $DEVHUB_USERNAME --json)
  parsed_status=$(echo $sandbox_status | jq -r '.result.Status')

  echo $sandbox_name:$parsed_status
  if [ "$parsed_status" = "Completed" ]; then
    sf alias set $sandbox_name=$DEVHUB_USERNAME.$sandbox_name

    IFS=',' read -r -a usersToBeActivated <<< "$USERS_TO_BE_ACTIVATED"
    for index in "${!usersToBeActivated[@]}"; do
      usersToBeActivated[index]="${usersToBeActivated[index]}${sandbox_name}"
    done
    usersToBeActivated=$(IFS=, ; echo "${usersToBeActivated[*]}")

    node $SCRIPT_PATH/dist/deactivate-all-users/index.js $usersToBeActivated $sandbox_name

    value="{\"name\":\"$sandbox_name\",\"status\":\"Available\",\"isActive\":\"true\"}"

    variable_name=${variableNamesForSandboxes["$sandbox_name"]}

    echo $variable_name
    gh variable set "$variable_name" -b "$value" --repo $GITHUB_REPO
  fi
}

# Start parallel jobs
for sandbox_name in $(echo $sandboxes | jq -r '.[]'); do
  process_sandbox $sandbox_name &
done

# Wait for all parallel jobs to finish
wait
