#!/bin/bash

# Argument 1: GitHub Repository
# Argument 2: Domain
# Argument 3: Sandbox Name

GITHUB_REPO=$1
DOMAIN=$2
SANDBOX_NAME=$3


# Check if SANDBOX_NAME is empty, exit if true
if [ -z "$SANDBOX_NAME" ]; then
  echo "SANDBOX_NAME is empty. Exiting without failing."
  exit 0
fi
# Check if SANDBOX_NAME is empty, exit if true
if [ -z "$DOMAIN" ]; then
  echo "DOMAIN is empty. Exiting without failing."
  exit 0
fi


# Convert DOMAIN to uppercase
DOMAIN=$(echo $DOMAIN | tr 'a-z' 'A-Z')

# Fetch current sandbox details
sandboxDetails=$(gh api /repos/$GITHUB_REPO/actions/variables/${DOMAIN}_${SANDBOX_NAME}_SBX?per_page=100  --jq ".value")

# Update sandbox status to "Available"
updatedSandboxDetails=$(echo $sandboxDetails | jq '.status = "Available"')

# Update the variable in GitHub repository
gh variable set "${DOMAIN}_${SANDBOX_NAME}_SBX" -b "$updatedSandboxDetails" --repo $GITHUB_REPO

# Print a success message
echo "Sandbox $SANDBOX_NAME has been set to Available in the repository $GITHUB_REPO for domain $DOMAIN."
