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
    let availableSandbox;
    let isIssueAssigned = false;
    let assignedSandboxInfo;

    for (const sandboxName of sandboxes) {
      if (sandboxName.trim() === "") continue;

      const sandbox = JSON.parse(
        execSync(
          `gh api /repos/${githubRepo}/actions/variables/${sandboxName.trim()} --jq ".value"`
        ).toString()
      );
      const { status, isActive, name, issue } = sandbox;
      console.error(`Checking Name:${name}..Status:${status}...IsActive:${isActive}...Issue:${issue?issue:'N/A'}.`);

      // Check if the sandbox is associated with the issue
      if (issue === issueNumber) {
        isIssueAssigned = true;
        if (status === "InUse") {
          console.error(
            `Sandbox ${name} is in use for issue ${issueNumber}, waiting...`
          );
          firstInUseSandbox = name;
          break;
        } else if (status === "Available" && isActive) {
          console.error(
            `Found available sandbox assigned to issue ${issueNumber}: ${name}`
          );
          assignedSandboxInfo = sandbox
          availableSandbox = name;
          break;
        }
      }

      if (!firstInUseSandbox && status === 'InUse') {
        firstInUseSandbox = name;
        assignedSandboxInfo = sandbox
      } else if (!isIssueAssigned && status === 'Available' && isActive) {
        // If no sandbox is yet assigned to the issue, use the first available one
        availableSandbox = name;
        isIssueAssigned = true;
        assignedSandboxInfo = sandbox
        console.error(`No sandbox assigned to issue ${issueNumber}. Assigning sandbox: ${name}`);
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
          console.error(`Returning first InUse sandbox: ${firstInUseSandbox}`);
          console.log(firstInUseSandbox);
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
