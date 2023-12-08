const { execSync } = require("child_process");

function extendSandbox(githubRepo, issueNumber) {

  // Function to extend TTL of sandbox
  function updateSandboxStatus(sandboxVariableName, sandboxData) {
    const updatedSandboxData = {
      ...sandboxData,
      isActive: true,
      status: "Available",
      isExtended: true,
    };

    execSync(
      `gh variable set "${sandboxVariableName}" -b '${JSON.stringify(
        updatedSandboxData
      )}' --repo ${githubRepo}`
    );
    console.error(`Marked sandbox ${sandboxData.name} for last extension.`);
    console.log(sandboxName);
  }

  // Fetch all variables
  let variables;
  try {
    const output = execSync(
      `gh api /repos/${githubRepo}/actions/variables --paginate`
    ).toString();
    variables = JSON.parse(output).variables;
  } catch (e) {
    console.error(`Error fetching variables: ${e.message}`);
    return;
  }

  // Filter for sandboxes assigned to the specified issue
  const sandboxPattern = new RegExp(`_SBX$`);
  for (const variable of variables) {
    if (sandboxPattern.test(variable.name)) {
      console.log(`Checking Sandbox`,JSON.parse(variable.value))
      const sandboxData = JSON.parse(variable.value);
      if (sandboxData.issue === issueNumber && (sandboxData.status!='Expired')) {
        // Mark the sandbox as expired
        updateSandboxStatus(variable.name, sandboxData);
      }
    }
  }

  console.error(`No sandbox currently assigned to issue ${issueNumber}.`);
}

const [githubRepo, issueNumber] = process.argv.slice(2);

extendSandbox(githubRepo,issueNumber);
