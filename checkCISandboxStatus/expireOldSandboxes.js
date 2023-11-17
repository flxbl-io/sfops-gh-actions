const { execSync } = require("child_process");
const fs = require("fs");

const GITHUB_REPO = process.argv[2];
const CONFIG_FILE = process.argv[3];

// Fetch the variables
const VARIABLES = JSON.parse(
  execSync(
    `gh api "/repos/${GITHUB_REPO}/actions/variables?per_page=100"`,
  ).toString(),
);

// Read the domains and counts from the config file
const POOLS_AND_COUNTS = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));

for (const { pool: POOL_NAME, count: COUNT, branch:BRANCH } of POOLS_AND_COUNTS) {
  const pattern = new RegExp(`${POOL_NAME.toUpperCase()}_${BRANCH.toUpperCase()}_[0-9]+_SBX`);
  const MATCHING_VARIABLES = VARIABLES.variables
    .filter((v) => pattern.test(v.name))
    .filter((v) => {
      const valueObj = JSON.parse(v.value);
      return valueObj.status !== "InProgress";
    });

  const CURRENT_COUNT = MATCHING_VARIABLES.length;

  console.log(`Pool: ${POOL_NAME}`);
  console.log(`Branch: ${BRANCH.toUpperCase()}`);
  console.log(`Desired available count: ${COUNT}`);
  console.log(`Current count of available sandboxes: ${CURRENT_COUNT}`);

  // Sort by creation date and take all but the newest COUNT
  const TO_EXPIRE = MATCHING_VARIABLES.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  )
    .slice(0, -COUNT)
    .map((v) => v.name);

  // Loop through the variables to expire
  for (const variable_name of TO_EXPIRE) {
    const variable = VARIABLES.variables.find((v) => v.name === variable_name);
    const sandbox_name = JSON.parse(variable.value).name;
    const sandbox_status = JSON.parse(variable.value).status;
    const issue = JSON.parse(variable.value).issue;
    console.log(sandbox_name, sandbox_status);
    const value = JSON.stringify({
      name: sandbox_name,
      status: "Expired",
      isActive: "false",
      issue: issue
    });

    console.log(`Expiring ${variable_name}`);
    // Set the GitHub Action variable with updated status
    execSync(
      `gh variable set "${variable_name}" -b '${value}' --repo ${GITHUB_REPO}`,
    );
  }
}