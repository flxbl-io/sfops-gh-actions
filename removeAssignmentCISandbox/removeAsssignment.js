const { execSync } = require("child_process");

function markSandboxAsExpired(githubRepo, issueNumber) {

  // Function to update sandbox status to 'Expired'
  function updateSandboxStatus(sandboxVariableName, sandboxData) {
    const expiredSandboxData = {
      ...sandboxData,
      isActive: false,
      status: "Expired",
    };

    execSync(
      `gh variable set "${sandboxVariableName}" -b '${JSON.stringify(
        expiredSandboxData
      )}' --repo ${githubRepo}`
    );
    console.error(`Marked sandbox ${sandboxData.name} as expired.`);
    console.log(sandboxData.name);
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
      console.error(`Checking Sandbox`,JSON.parse(variable.value))
      const sandboxData = JSON.parse(variable.value);
      if (sandboxData.issue === issueNumber && (sandboxData.status!='Expired')) {
        // Mark the sandbox as expired
        isSandboxFound=true;
        updateSandboxStatus(variable.name, sandboxData);
      }
      else if(sandboxData.issue === issueNumber && sandboxData.status==='Expired')
      {
        isSandboxFound=true;
        console.error(`Sandbox ${sandboxData.name} is already expired.`);
        updateSandboxStatus(variable.name, sandboxData);
      }
    }
  }
}


let isSandboxFound=false;
const [githubRepo, issueNumber] = process.argv.slice(2);

markSandboxAsExpired(githubRepo,issueNumber);

if(!isSandboxFound)
{
 throw new Error(`No Sandbox found to extend for issue ${issueNumber}`)
}

