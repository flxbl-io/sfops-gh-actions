const { execSync } = require("child_process");
const fs = require("fs");

// Function to run shell commands synchronously
const runCommand = (command, ignoreError) => {
  try {
    return execSync(command).toString();
  } catch (err) {
    console.error(err.stderr.toString());
    if (!ignoreError) throw Error(err.stderr.toString());
  }
};

function deleteSandbox(devHubUserName, sandboxName) {
  console.log(`Attempting to logout of the sandbox if already authenticated: ${sandboxName}`);
  try {
    runCommand(`sf org logout -o ${devHubUserName}.${sandboxName} -p 2>/dev/null`, true);
  } catch (err) {
    console.log(`Sandbox not available for logout: ${sandboxName}`);
  }

  console.log(`Attempting to authenticate to the sandbox: ${sandboxName}`);
  try {
    execSync(`sf org resume sandbox -n ${sandboxName} -o ${devHubUserName}`).toString();
  } catch (error) {
    if (error.message.includes(`No record found`)) {
      console.log(`Sandbox ${sandboxName} no longer available in the org.`);
      return true;
    } else {
      console.error(`Error resuming sandbox: ${sandboxName}`, error.message);
      return false;
    }
  }

  console.log(`Deleting sandbox: ${sandboxName}`);
  try {
    runCommand(`sf org delete sandbox -o ${devHubUserName}.${sandboxName} -p`);
    console.log(`Successfully deleted sandbox: ${sandboxName}`);
    return true;
  } catch (error) {
    console.error(`Error deleting sandbox: ${sandboxName}`, error.message);
    return false;
  }
}

const GITHUB_REPO = process.argv[2]; // GitHub Repository
const devHubUserName = process.argv[3]; // DevHub Username


function getGithubVariables(githubRepo) {
    try {
        const command = `gh api /repos/${GITHUB_REPO}/actions/variables --paginate |  gh merge-json |  gh merge-json | jq '.variables[] | select(.name |  test("_SBX")) | {name: .name, value: .value}'`
        const output = execSync(command).toString();
        return JSON.parse(`[${output.trim().split("\n").join(",")}]`);
    } catch (error) {
        console.error('Error getting GitHub variables:', error);
        return [];
    }
}

console.log('\nInitiating Sandbox deletion process for expired Orgs...');

// Filter variables marked for expiry
const variablesForDeletion = getGithubVariables().filter(variable => {
  const value = JSON.parse(variable.value);
  return value.status === 'Expired';

});

variablesForDeletion.forEach(variable => {
  const sandboxName = JSON.parse(variable.value).name;
  const variableName = variable.name;
  console.log(`\n\n Deleting...`,sandboxName);
  if (deleteSandbox(devHubUserName, sandboxName)) {
    console.log(`Deleting GitHub variable: ${variableName}`);
    try {
      runCommand(`gh variable delete ${variableName} --repo ${GITHUB_REPO}`);
      console.log(`Successfully deleted GitHub variable: ${variableName}`);
    } catch (error) {
      console.error(`Error deleting GitHub variable: ${variableName}`, error.message);
    }
  }
});

console.log('Sandbox deletion process completed.');
