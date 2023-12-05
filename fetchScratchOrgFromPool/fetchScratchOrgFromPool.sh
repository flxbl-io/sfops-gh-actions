#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 5 ]; then
    echo "Usage: $0 <repo> <tag> <devhub> <email> <issue-number>"  >&2
    exit 1
fi

# Assign arguments to variables
REPO=$1
TAG=$2
DEVHUB=$3
EMAIL=$4
ISSUE_NUMBER=$5

# Fetch scratch org info
scratchOrgInfo=$(sfp pool:fetch -t "$TAG" -v "$DEVHUB" --json) || true

echo 'Details of the scratch org fetched from the pool:'  >&2
echo $scratchOrgInfo  >&2

# Check if the 'error' key exists and is not empty
if [ "$(echo $scratchOrgInfo | jq -r '.error | select(.!=null)')" ]; then
    echo "Error encountered: Empty pool or unable to fetch"  >&2
    exit 1
else
    ORG_ID=$(echo $scratchOrgInfo | jq -r '.orgId')
    ID=$(echo $scratchOrgInfo | jq -r '.Id')

    if [ -z "$ORG_ID" ] || [ -z "$ID" ]; then
        echo "Error: Required fields not found in response."  >&2
        exit 1
    fi

    augmentedJson=$(jq -n \
                        --arg orgId "$ORG_ID" \
                        --arg email "$EMAIL" \
                        --arg issueNumber "$ISSUE_NUMBER" \
                        '{orgId: $orgId, email: $email, issueNumber: $issueNumber}' | jq -c .)

    echo "Augmented JSON:"  >&2
    echo "$augmentedJson"   >&2

    # Store the augmented JSON in a GitHub variable
    GITHUB_VAR_SET=$(gh variable set "SO_${ISSUE_NUMBER}" -r $REPO --body "$augmentedJson")
    
    SO_USERNAME=$(echo $scratchOrgInfo | jq -r '.username')
    echo $SO_USERNAME
fi
