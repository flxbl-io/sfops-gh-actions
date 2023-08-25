#!/bin/bash
SCRIPT_PATH=$1
GITHUB_REPO=$2
entry=$3

echo "SCRIPT_PATH: $SCRIPT_PATH"
echo "GITHUB_REPO: $GITHUB_REPO"
echo "entry: $entry"

DOMAIN=$(echo "$entry" | jq -r '.domain' | tr 'a-z' 'A-Z')
COUNT=$(echo "$entry" | jq -r '.count')
APEXCLASSID=$(echo "$entry" | jq -r '.apexClassId')
SOURCESB=$(echo "$entry" | jq -r '.sourceSB')
USERSTOBEACTIVATED=$(echo "$entry" | jq -r '.usersToBeActivated')


echo "DOMAIN: $DOMAIN"
echo "COUNT: $COUNT"



node $SCRIPT_PATH/dist/create-sandbox/index.js \
$DOMAIN \
$COUNT \
$SOURCESB \
devhub \
$APEXCLASSID 



sandboxes=$(<$DOMAIN.json)
for sandbox_name in $(echo $sandboxes | jq -r '.[]')
do
  # Construct the JSON value
  value="{\"name\":\"$sandbox_name\",\"status\":\"InProgress\",\"isActive\":\"true\"}"

  # Set the GitHub Action variable
  gh variable set "${DOMAIN}_${sandbox_name}_SBX" -b "$value" --repo $GITHUB_REPO
done
