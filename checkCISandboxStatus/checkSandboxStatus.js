const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");
import * as github from "@actions/github";
import { octokitRetry } from "@octokit/plugin-retry";
import dedent from "dedent-js";

const [
  SCRIPT_PATH,
  TOKEN,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME,
  DEVHUB_USERNAME,
  PATH_TO_POOL_CONFIG,
] = process.argv.slice(2);

const GITHUB_REPO = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;

// Function to run shell commands synchronously
const runCommand = (command, ignoreError) => {
  try {
    return execSync(command).toString();
  } catch (err) {
    if (!ignoreError) throw Error(err.stderr.toString());
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
    console.log(`Processing Sandbox ${sandboxName}`);
    let sandboxStatus = "InProgress";

    try {
      sandboxStatus = runCommand(
        `sf org sandbox resume -n ${sandboxName} -o ${DEVHUB_USERNAME} --json -w 1`
      );
    } catch (error) {
      console.log(
        `Check the status of this sandbox ${sandboxName} in DevHub,Probably its still in progress`
      );
      sandboxStatus = null;
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
      console.log(
        `Sandbox ${sandboxName} is  marked as available at ${variableName}`
      );
      try {
        runCommand(
          `sfp metrics:report -m "sandbox.created" -t counter -g '{\"type\":\"dev\"}'`
        );
      } catch (error) {
        console.log(
          `Skipping posting metric.. Check whether datadog env variable is properly configued`
        );
      }
    }
  } catch (err) {
    console.error(`Error processing sandbox ${sandboxName}:`, err);
  }
};

const processDevSandbox = async (variableName, sandbox) => {
  try {
    console.log(`Processing Developer Sandbox ${sandbox.name}`);
    let sandboxStatus;

    try {
      sandboxStatus = runCommand(
        `sf org sandbox resume -n ${sandbox.name} -o ${DEVHUB_USERNAME} --json`
      );
    } catch (error) {
      console.log(
        `Check the status of this sandbox ${sandbox.name} in DevHub,Probably its still in progress`
      );
      return;
    }

    const parsedStatus = JSON.parse(sandboxStatus).result.Status;

    console.log(`${sandbox.name}:${parsedStatus}`);
    if (parsedStatus === "Completed") {
      runCommand(
        `sf alias set ${sandbox.name}=${DEVHUB_USERNAME}.${sandbox.name}`
      );

      let count = 0;
      const maxAttempts = 1;
      let isUserNameCreationSuccessful = false;
      let userName = `${DEVHUB_USERNAME}.${sandbox.name}`;
      while (true) {
        if (count == maxAttempts) {
          console.log(`Failed to create user after ${maxAttempts}`);
          isUserNameCreationSuccessful = false;
          break;
        }

        try {
          userName = execSync(
            `node ${path.join(
              SCRIPT_PATH,
              "dist/create-user/index.js"
            )} "System Administrator" ${sandbox.email} ${DEVHUB_USERNAME}.${
              sandbox.name
            }`
          );
          isUserNameCreationSuccessful = true;
          break;
        } catch (error) {
          console.log(`Unable to create user due to ${error.message}`);
          count++;
        }
      }

      // Create an octokit client with the retry plugin
      const octokit = github.getOctokit(TOKEN, {
        additionalPlugins: [octokitRetry],
      });

      //Set default expiry
      const expiry = sandbox.expiry ? sandbox.expiry : 15;

      let message = "";
      if (isUserNameCreationSuccessful) {
        message = dedent(
          `Hello @${sandbox.requester} :wave:     
      Your sandbox has been created successfully. 
      
      Please find the details below

      - Sandbox Name: ${sandbox.name}
      - UserName: ${userName}
      - Expiry In: ${expiry}  days

      Please check your email for details, on how to reset your password and get access to this org.
      Please note this sandbox would get automatically deleted when the number of days mentioned above expires.

      __Please note closing this issue will delete the sandbox__

      If you are asked for a password hint for any reason type in __San Francisco__
                      
      This issue was processed by [sfops 🤖]`
        );
      } else {
        message = dedent(
          `Hello @${sandbox.requester} :wave:      
        Your sandbox has been created successfully. However, sfops was not able to provision a user
        sucessfully. So you would need to reach your admin to get your acess sorted out

        Please provide the below details to the administrator

        - Sandbox Name: ${sandbox.name}
        - UserName: ${userName}
        - Expiry In: ${expiry} days

        __Please note closing this issue will delete the sandbox__

        If you are asked for a password hint for any reason type in __San Francisco__
                          
        This issue was processed by [sfops 🤖]`
        );
      }

      await octokit.rest.issues.createComment({
        owner: GITHUB_REPO_OWNER,
        repo: GITHUB_REPO_NAME,
        issue_number: sandbox.issueNumber,
        body: message,
      });

      const value = JSON.stringify({
        ...sandbox,
        status: "Assigned",
      });

      runCommand(
        `gh variable set ${variableName} -b '${value}' --repo ${GITHUB_REPO}`
      );
      console.log(
        `Sandbox ${sandbox.name} is  marked as assgined at ${variableName}`
      );

      //Add source tracking reset
      runCommand(
        `sf project reset tracking --target-org ${sandbox.name}`,
        true
      );

      console.log(
        `Sandbox ${sandbox.name} is  marked as available at ${variableName}`
      );
      try {
        runCommand(
          `sfp metrics:report -m "sandbox.created" -t counter -g '{\"type\":\"dev\"}'`
        );
      } catch (error) {
        console.log(
          `Skipping posting metric.. Check whether datadog env variable is properly configued`
        );
      }
    }
  } catch (err) {
    console.error(`Error processing sandbox ${sandbox.name}:`, err);
  }
};

// Main execution
(async () => {
  //Handle Dev Sandboxes
  console.log(`Checking status of  Developer Sandboxes.. `);
  const devSandboxesList = execSync(
    `gh api "/repos/${GITHUB_REPO}/actions/variables" --paginate --jq ".variables[] | select(.name | test(\\\"_DEVSBX\\\"))"`
  );
  if (!devSandboxesList) return;

  const githubDevSandboxVariableValues = devSandboxesList
    .toString()
    .split("\n")
    .filter(Boolean);

  for (const variableValue of githubDevSandboxVariableValues) {
    const variableName = JSON.parse(variableValue).name;
    const sandboxJson = JSON.parse(
      execSync(
        `gh api "/repos/${GITHUB_REPO}/actions/variables/${variableName}" --jq ".value | fromjson"`
      )
    );
    if (sandboxJson.status === "InProgress") {
      console.log(`Processing variable ${variableName}`);
      await processDevSandbox(variableName, sandboxJson);
    }
  }

  //Handle CI Sandboxes
  console.log(`Processing CI Sandboxes.. `);
  const configJson = JSON.parse(fs.readFileSync(PATH_TO_POOL_CONFIG, "utf8"));
  const sandboxesList = execSync(
    `gh api "/repos/${GITHUB_REPO}/actions/variables" --paginate --jq ".variables[] | select(.name | test(\\\"_SBX\\\"))"`
  );
  if (!sandboxesList) return;

  const githubSandboxVariableValues = sandboxesList
    .toString()
    .split("\n")
    .filter(Boolean);
  for (const variableValue of githubSandboxVariableValues) {
    try {
       const variableName = JSON.parse(variableValue).name;
       const poolConfig = findPoolConfig(variableName, configJson);
        if (poolConfig) {
          const sandboxJson = JSON.parse(
            execSync(
              `gh api "/repos/${GITHUB_REPO}/actions/variables/${variableName}" --jq ".value | fromjson"`
            )
          );
          if (sandboxJson.status === "InProgress") {
            console.log(`Processing variable ${variableName}`);
            await processSandbox(variableName, sandboxJson.name, poolConfig);
          }
        }
    }catch(error){
      console.log(`Error processing variable ${variableValue}`,error);
    }
  }
})();
