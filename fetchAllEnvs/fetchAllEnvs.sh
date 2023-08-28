envs=""
qa=""
prod=""


if [[ -z "$2" ]]; then
  echo >&2 "Fetch All Envs as filter was not provided"
  for env in $(gh api -H "Accept: application/vnd.github+json" /repos/$1/environments | jq -r '.environments[] | .name'); do
      lower_env=$(echo "$env" | tr '[:upper:]' '[:lower:]')
      
      if [[ "$lower_env" == "qa" ]]; then
        qa="qa,"
      elif [[ "$lower_env" == "prod" || "$lower_env" == "production" ]]; then
        prod="prod"
      else
        envs+="$lower_env,"
      fi
    done
else

    filter_type=$(echo "$2" | cut -d':' -f1 | tr '[:lower:]' '[:upper:]')
    filter_value=$(echo "$2" | cut -d':' -f2 | tr '[:upper:]' '[:lower:]')

    for env in $(gh api -H "Accept: application/vnd.github+json" /repos/$1/environments | jq -r '.environments[] | .name'); do
    type_value=$(gh api -H "Accept: application/vnd.github+json" /repos/$1/environments/$env/variables | jq -r --arg filter "$filter_type" '.variables[] | select(.name==$filter) | .value')
    type_value=$(echo "$type_value" | tr '[:upper:]' '[:lower:]')
    
    if [[ "$type_value" == "$filter_value" || -z "$2" ]]; then

        lower_case_env=$(echo "$env" | tr '[:upper:]' '[:lower:]')
        if [[ "$lower_case_env" == "qa" ]]; then
            qa="qa,"
          elif [[ "$lower_case_env" == "prod" || "$lower_case_env" == "production"  ]]; then
            prod="prod"
          else
            envs+="$lower_case_env,"
          fi
    fi
    done

 
fi

envs="${qa}${envs}${prod}"
envs=$(echo "$envs" | sed 's/,$//')  # Remove trailing comma
echo >&2 "Environments: $envs"

echo "$envs"