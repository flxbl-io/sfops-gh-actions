#!/bin/bash
SCRIPT_PATH=$1
GITHUB_REPO=$2
entry=$3

echo "SCRIPT_PATH: $SCRIPT_PATH"
echo "GITHUB_REPO: $GITHUB_REPO"
echo "entry: $entry"

POOL=$(echo "$entry" | jq -r '.pool' | tr 'a-z' 'A-Z')
COUNT=$(echo "$entry" | jq -r '.count')
APEXCLASSID=$(echo "$entry" | jq -r '.apexClassId')
SOURCESB=$(echo "$entry" | jq -r '.sourceSB')
USERSTOBEACTIVATED=$(echo "$entry" | jq -r '.usersToBeActivated')
BRANCH=$(echo "$entry" | jq -r '.branch')


echo "POOL: $POOL"
echo "COUNT: $COUNT"



node $SCRIPT_PATH/dist/create-sandbox/index.js \
$POOL \
$COUNT \
$SOURCESB \
devhub \
$APEXCLASSID 



sandboxes=$(<$POOL.json)
for sandbox_name in $(echo $sandboxes | jq -r '.[]')
do
  # Construct the JSON value
  value="{\"name\":\"$sandbox_name\",\"status\":\"InProgress\",\"isActive\":\"true\"}"

  # Set the GitHub Action variable
  gh variable set "${POOL}_${BRANCH}_${sandbox_name}_SBX" -b "$value" --repo $GITHUB_REPO
done
