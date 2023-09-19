# Argument 1: GitHub Repository
# Argument 2: Domain
# Argument 3: Timeout in minutes
# Argument 4: (Optional) --exit-on-timeout


GITHUB_REPO=$1
DOMAIN=$2
TIMEOUT_MINUTES=$3
EXIT_ON_TIMEOUT=$4

DOMAIN=$(echo $DOMAIN | tr 'a-z' 'A-Z')
end=$(expr $(date +%s) + $((TIMEOUT_MINUTES * 60)))

while true; do
  tempfile=$(mktemp)
  gh api /repos/$GITHUB_REPO/actions/variables?per_page=100 --jq ".variables[] | select(.name | test(\"^${DOMAIN}_.*_SBX\$\")).name" > "$tempfile"

  firstInUseSandbox=""

  while read sandbox_name; do
    sandbox_json=$(gh api /repos/$GITHUB_REPO/actions/variables/$sandbox_name --jq ".value | fromjson")
    >&2 echo $sandbox_json
    status=$(echo $sandbox_json | jq -r '.status')
    isActive=$(echo $sandbox_json | jq -r '.isActive')

    if [ -z "$firstInUseSandbox" ] && [ "$status" = "InUse" ]; then
      firstInUseSandbox=$(echo $sandbox_json | jq -r '.name')
    fi


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
     if [ "$EXIT_ON_TIMEOUT" = "--exit-on-timeout" ]; then
        >&2 echo "No available sandboxes found within $TIMEOUT_MINUTES minutes. Exiting."
        exit 1
      else
        >&2 echo "Returning first InUse sandbox: $firstInUseSandbox"
        echo $firstInUseSandbox
        exit 0
      fi
    fi

    >&2 echo "No available sandboxes. Waiting for 30 seconds before checking again..."
    sleep 30
  fi
done
