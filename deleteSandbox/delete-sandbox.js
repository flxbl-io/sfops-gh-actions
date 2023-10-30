const { execSync } = require("child_process");

function deleteSandbox(devHubUserName, sandboxName) {
  console.log(
    `Attempting to logout of the sandbox if its already authenticated... `,
  );
  try {
    // Do a logout of this sandbox for resume to work
    let stdOut = execSync(
      `sf org logout -o ${devHubUserName}.${sandboxName} -p 2>/dev/null`,
    ).toString();
    console.log(stdOut);
  } catch (err) {
    console.log(`Sandbox not available for logout: ${sandboxName}`);
  }

  // Force sandbox to be resumed due to https://github.com/forcedotcom/cli/issues/1718
  console.log(`Attempting to authenticate to the sandbox`);
  try {
    orgResumeJSONString = execSync(
      `sf org resume sandbox -n ${sandboxName} -o ${devHubUserName}`,
    ).toString();
  } catch (error) {
    if (error.message.includes(`No record found`)) {
      console.log(
        `The provided sandbox with name ${sandboxName} is no longer available in the org, Did you delete this directly?`,
      );
      return 0;
    } else throw error;
  }

  // Force sandbox to be deleted
  stdOut = execSync(
    `sf org delete sandbox -o ${devHubUserName}.${sandboxName} -p`,
  ).toString();
  console.log(stdOut);

  console.log(`Successfully deleted sandbox: ${sandboxName}`);
}

let devHubUserName = process.argv[2];
let sandboxName = process.argv[3];

sandboxName = sandboxName.trim();
sandboxName = sandboxName.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "");

deleteSandbox(devHubUserName, sandboxName);
