# Argument 1: GitHub Repository
# Argument 2: Domain
# Argument 3: Timeout in minutes

GITHUB_REPO=$1
DOMAIN=$2
TIMEOUT_MINUTES=$3

DOMAIN=$(echo $DOMAIN | tr 'a-z' 'A-Z')
end=$(date +%s)
end=$(expr $(date +%s) + $((TIMEOUT_MINUTES * 60)))

while true; do
  tempfile=$(mktemp)
  gh api /repos/$GITHUB_REPO/actions/variables?per_page=100 --jq ".variables[] | select(.name | test(\"^${DOMAIN}_.*_SBX\$\")).name" > "$tempfile"


  while read sandbox_name; do
    sandbox_json=$(gh api /repos/$GITHUB_REPO/actions/variables/$sandbox_name  --paginate --jq ".value | fromjson")
    >&2 echo $sandbox_json
    status=$(echo $sandbox_json | jq -r '.status')
    isActive=$(echo $sandbox_json | jq -r '.isActive')
    if [ "$status" = "Available" ] && [ "$isActive" = "true" ]; then
      availableSandbox=$(echo $sandbox_json | jq -r '.name')
      break
    fi
  done < "$tempfile"


  if [ -n "$availableSandbox" ]; then
    >&2 echo "Found available sandbox: $availableSandbox"
    sandboxDetails=$(gh api /repos/$GITHUB_REPO/actions/variables/${DOMAIN}_${availableSandbox}_SBX --jq ".value" )
    updatedSandboxDetails=$(echo $sandboxDetails | jq '.status = "InUse"')
    >&2 echo "Fetched SBX: $updatedSandboxDetails"
    >&2 gh variable set "${DOMAIN}_${availableSandbox}_sbx" -b "$updatedSandboxDetails" --repo $GITHUB_REPO
    >&2 echo "Fetched SBX: $availableSandbox"
    echo $availableSandbox
    exit 0
  else
    current=$(date +%s)
    if [ $current -ge $end ]; then
      >&2 echo "No available sandboxes found within $TIMEOUT_MINUTES minutes. Exiting."
      exit 1
    fi

    >&2 echo "No available sandboxes. Waiting for 30 seconds before checking again..."
    sleep 30
  fi
done
