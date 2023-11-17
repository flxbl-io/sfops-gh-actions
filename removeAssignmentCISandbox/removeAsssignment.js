const { execSync } = require("child_process");

function markSandboxAsExpired(githubRepo, domain, branch, issueNumber) {
  domain = domain.toUpperCase();
  branch = branch.toUpperCase();

  // Function to update sandbox status to 'Expired'
  function updateSandboxStatus(sandboxVariableName, sandboxName) {
    const expiredSandboxData = {
      name: sandboxName,
      isActive: true,
      status: "Expired",
      issue: issueNumber,
    };

    execSync(
      `gh variable set "${sandboxVariableName}" -b '${JSON.stringify(
        expiredSandboxData
      )}' --repo ${githubRepo}`
    );
    console.error(`Marked sandbox ${sandboxName} as expired.`);
    console.log(sandboxName);
  }

  // Fetch all variables
  let variables;
  try {
    const output = execSync(
      `gh api /repos/${githubRepo}/actions/variables?per_page=100`
    ).toString();
    variables = JSON.parse(output).variables;
  } catch (e) {
    console.error(`Error fetching variables: ${e.message}`);
    return;
  }

  // Filter for sandboxes assigned to the specified issue
  const sandboxPattern = new RegExp(`^${domain}_${branch}_[^_]*_SBX$`);
  for (const variable of variables) {
    if (sandboxPattern.test(variable.name)) {
      const sandboxData = JSON.parse(variable.value);
      if (sandboxData.issue === issueNumber && (sandboxData.status!='Expired')) {
        // Mark the sandbox as expired
        updateSandboxStatus(variable.name, sandboxData.name);
        return;
      }
    }
  }

  console.error(`No sandbox currently assigned to issue ${issueNumber}.`);
}

const [githubRepo, domain, branch, issueNumber] = process.argv.slice(2);

markSandboxAsExpired(githubRepo, domain, branch, issueNumber);
