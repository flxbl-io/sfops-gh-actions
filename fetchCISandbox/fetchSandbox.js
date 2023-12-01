const { execSync } = require("child_process");

async function findAvailableSandbox(
  githubRepo,
  domain,
  branch,
  issueNumber,
  timeoutMinutes,
  exitOnTimeout
) {
  domain = domain.toUpperCase();
  branch = branch.toUpperCase();
  const end = Date.now() + timeoutMinutes * 60000;

  console.error(`----------------------------------------------------`);
  console.error(`Action: fetchCISandbox`);  
  console.error(`Pool: ${domain}`);
  console.error(`Branch: ${branch}`);
  


  while (true) {
    const output = execSync(
      `gh api /repos/${githubRepo}/actions/variables?per_page=100 --jq ".variables[] | select(.name | test(\\"^${domain}_${branch}_[^_]*_SBX$\\")).name"`
    ).toString();
    const sandboxes = output.trim().split("\n");

    if (sandboxes.length === 0 || sandboxes[0] === "") {
      console.error(`No Sandbox pools found for domain: ${domain}...Exiting`);
      process.exit(1);
    }


    let firstInUseSandbox = "";
    let firstExpiredSandbox;
    let availableSandbox;
    let isIssueAssigned = false;
    let assignedSandboxInfo;

    // Figure out earlier used sandboxes
    for (const sandboxName of sandboxes) {
      if (sandboxName.trim() === "") continue;

      const sandbox = JSON.parse(
        execSync(
          `gh api /repos/${githubRepo}/actions/variables/${sandboxName.trim()} --jq ".value"`
        ).toString()
      );
      const { status, isActive, name, issue } = sandbox;
      console.error(`Processing Sandbox   name:${name} status:${status} isActive:${isActive} issue:${issue?issue:'N/A'}.`);

      // Check if the sandbox is associated with the issue
      if (issue === issueNumber) {
        if (status === "InUse" && isActive) {
          isIssueAssigned = true;
          console.error(
            `Sandbox ${name} is in use for issue ${issueNumber}, waiting...`
          );
          firstInUseSandbox = name;
          break;
        } else if (status === "Available" && isActive) {
          isIssueAssigned = true;
          console.error(
            `Found available sandbox assigned to issue ${issueNumber}: ${name}`
          );
          assignedSandboxInfo = sandbox
          availableSandbox = name;
          break;
        }else if (status == 'Expired')
        {
          if(!firstExpiredSandbox)
              firstExpiredSandbox = name;
        }
      }
    }

    //Issue is not assigned to any sandbox
    //Get first available one
    if(!isIssueAssigned)
    {
      for (const sandboxName of sandboxes) {
        if (sandboxName.trim() === "") continue;
  
        const sandbox = JSON.parse(
          execSync(
            `gh api /repos/${githubRepo}/actions/variables/${sandboxName.trim()} --jq ".value"`
          ).toString()
        );
        const { status, isActive, name, issue } = sandbox;
        console.error(`Processing Sandbox   name:${name} status:${status} isActive:${isActive} issue:${issue?issue:'N/A'}.`);
        if (status === "Available" && isActive) {
          console.error(
            `Found an available sandbox at ${sandbox.name} `
          );
          assignedSandboxInfo = sandbox
          availableSandbox = name;
          break;
        }

      }
    }


    if (availableSandbox) {
      // Update the sandbox status to 'InUse' and assign the issue number
      const updatedSandboxDetails = JSON.stringify({
        name:assignedSandboxInfo.name,
        isActive:assignedSandboxInfo.isActive,
        status: "InUse",
        issue: issueNumber,
      });
      execSync(
        `gh variable set "${domain}_${branch}_${availableSandbox}_SBX" -b  ${JSON.stringify(
          updatedSandboxDetails
        )} --repo ${githubRepo}`
      );
      console.error(
        `Assigned sandbox ${availableSandbox} to issue ${issueNumber} and marked as InUse.`
      );
      console.log(availableSandbox);
      process.exit(0);
    } else {
      const current = Date.now();
      if (current >= end) {
        if (exitOnTimeout === "--exit-on-timeout") {
          console.error(
            `No available sandboxes found within ${timeoutMinutes} minutes. Exiting.`
          );
          process.exit(1);
        } else {
          if(firstExpiredSandbox)
          {
            console.error(`We ran out of time and no sandbox was found, So returning you an expire done temporarily : ${firstExpiredSandbox}`);
            console.log(firstExpiredSandbox);
          }
          else
          {
            console.error(`No sandboxes available, nothing to be provided to you!!`);
            process.exit(1);
          }
          process.exit(0);
        }
      }

      console.error(
        "No available sandboxes. Waiting for 30 seconds before checking again..."
      );
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  }
}

const [
  githubRepo,
  domain,
  branch,
  issueNumber,
  timeoutMinutesStr,
  exitOnTimeout,
] = process.argv.slice(2);
const timeoutMinutes = parseInt(timeoutMinutesStr, 10);

findAvailableSandbox(
  githubRepo,
  domain,
  branch,
  issueNumber,
  timeoutMinutes,
  exitOnTimeout
);
