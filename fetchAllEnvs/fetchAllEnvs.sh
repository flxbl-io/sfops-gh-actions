if [[ -z "$2" ]]; then
  echo >&2 "Fetch All Envs as filter was not provided"
  envs=$(gh api -H "Accept: application/vnd.github+json" /repos/$1/environments | jq -r '.environments[] | .name' | tr '[:upper:]' '[:lower:]' | paste -sd ",")
  echo >&2 "Fetch All Envs without filter $2 $envs"
else

    filter_type=$(echo "$2" | cut -d':' -f1 | tr '[:lower:]' '[:upper:]')
    filter_value=$(echo "$2" | cut -d':' -f2 | tr '[:upper:]' '[:lower:]')

    for env in $(gh api -H "Accept: application/vnd.github+json" /repos/$1/environments | jq -r '.environments[] | .name'); do
    type_value=$(gh api -H "Accept: application/vnd.github+json" /repos/$1/environments/$env/variables | jq -r --arg filter "$filter_type" '.variables[] | select(.name==$filter) | .value')
    type_value=$(echo "$type_value" | tr '[:upper:]' '[:lower:]')
    if [[ "$type_value" == "$filter_value" || -z "$2" ]]; then
        envs+=$(echo "$env" | tr '[:upper:]' '[:lower:]')
        envs+=","
    fi
    done


    envs=$(echo "$envs" | sed 's/,$//')  # Remove trailing comma

    echo >&2 "Fetch All Envs that match $2 $envs"
 
fi

echo "$envs"