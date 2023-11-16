const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const [SCRIPT_PATH, GITHUB_REPO, DEVHUB_USERNAME, PATH_TO_POOL_CONFIG] =
  process.argv.slice(2);

// Function to run shell commands synchronously
const runCommand = (command) => {
  try {
    return execSync(command).toString();
  } catch (err) {
    throw Error(err.stderr.toString());
  }
};

// Function to find matching pool configuration
const findPoolConfig = (variableName, configJson) => {
  return configJson.find((config) => {
    const poolBranchPattern = `${config.pool
      .toString()
      .toUpperCase()}_${config.branch.toString().toUpperCase()}`;
    return variableName.includes(poolBranchPattern);
  });
};

// Main function to process each sandbox
const processSandbox = async (variableName, sandboxName, poolConfig) => {
  try {
    console.log(`Processing Sandbox`);
    let sandboxStatus = "InProgress";

    try {
      sandboxStatus = runCommand(
        `sf org sandbox resume -n ${sandboxName} -o ${DEVHUB_USERNAME} --json`
      );
    } catch (error) {
      console.log(`Check the status of this sandbox ${sandboxName} in DevHub,Probably its still in progress`);
      sandboxStatus=null;
    }

    if (!sandboxStatus) return;

    const parsedStatus = JSON.parse(sandboxStatus).result.Status;

    console.log(`${sandboxName}:${parsedStatus}`);
    if (parsedStatus === "Completed") {
      runCommand(
        `sf alias set ${sandboxName}=${DEVHUB_USERNAME}.${sandboxName}`
      );

      const usersToBeActivated = poolConfig?.usersToBeActivated;
      if (usersToBeActivated) {
        const usersArray = usersToBeActivated
          .split(",")
          .map((user) => `${user}@${sandboxName}`);
        const usersString = usersArray.join(",");

        execSync(
          `node ${path.join(
            SCRIPT_PATH,
            "dist/deactivate-all-users/index.js"
          )} ${usersString} ${sandboxName}`
        );
      }

      const value = JSON.stringify({
        name: sandboxName,
        status: "Available",
        isActive: "true",
      });
      runCommand(
        `gh variable set ${variableName} -b '${value}' --repo ${GITHUB_REPO}`
      );
      console.log(`Sandbox ${sandboxName} is  marked as available at ${variableName}`)
      try {
        runCommand(
          'sfp metrics:report -m "sfpowerscripts.sandbox.created" -t counter -g {\"type\":\"ci\"}'
        );
      } catch (error) {
        console.log(`Skipping posting metric.. Check whether datadog env variable is properly configued`);
      }
    }
  } catch (err) {
    console.error(`Error processing sandbox ${sandboxName}:`, err);
  }
};

// Main execution
(async () => {
  const configJson = JSON.parse(fs.readFileSync(PATH_TO_POOL_CONFIG, "utf8"));

  const sandboxesList = execSync(
    `gh api "/repos/${GITHUB_REPO}/actions/variables?per_page=100" --jq ".variables[] | select(.name | test(\\\"_SBX\\\"))"`
  );
  if (!sandboxesList) return;

  const githubSandboxVariableValues = sandboxesList
    .toString()
    .split("\n")
    .filter(Boolean);

  for (const variableValue of githubSandboxVariableValues) {
    const sandboxName = JSON.parse(variableValue).name;
    const poolConfig = findPoolConfig(sandboxName, configJson);
    if (poolConfig) {
      const sandboxJson = JSON.parse(
        execSync(
          `gh api "/repos/${GITHUB_REPO}/actions/variables/${sandboxName}?per_page=100" --jq ".value | fromjson"`
        )
      );
      if (sandboxJson.status === "InProgress") {
        await processSandbox(sandboxName, sandboxJson.name, poolConfig);
      }
    }
  }
})();
