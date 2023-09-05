const { execSync } = require('child_process');



function deleteSandbox(devHubUserName, sandboxName) {
    try {
        // Do a logout of this sandbox for resume to work
        let stdOut = execSync(`sf org logout -o ${devHubUserName}.${sandboxName} -p 2>/dev/null`).toString();
        console.log(stdOut);
    } catch (err) {
        console.log(`Sandbox not available for logout: ${sandboxName}`);
    }

    // Force sandbox to be resumed due to https://github.com/forcedotcom/cli/issues/1718
    stdOut = execSync(`sf org resume sandbox -n ${sandboxName} -o ${devHubUserName}`).toString();
    console.log(stdOut);

    // Force sandbox to be deleted
    stdOut = execSync(`sf org delete sandbox -o ${devHubUserName}.${sandboxName} -p`).toString();
    console.log(stdOut);

    console.log(`Successfully deleted sandbox: ${sandboxName}`);

}

function deleteMatchingGitHubVariables(sandboxName, repository) {
    try {
        const pattern = `[A-Za-z0-9]+_${sandboxName}_SBX`;
        const variablesCommand = `gh api "/repos/${repository}/actions/variables" --paginate --jq ".variables[] | select(.name | test(\\\"${pattern}\\\" )).name"`;
        const variablesToDelete = execSync(variablesCommand).toString().trim().split('\n');

        for (const variable of variablesToDelete) {
            execSync(`gh variable delete ${variable} -R ${repository}`);
            console.log(`Successfully deleted GitHub variable: ${variable}`);
        }
    } catch (err) {
        console.log(`Error deleting GitHub variables for sandbox: ${sandboxName}`);
    }
}



function extractCompletedNumericSandboxNames(jsonData) {
    const sandboxes = jsonData.result.records;
    const completedNumericSandboxNames = [];

    for (const sandbox of sandboxes) {
        if (sandbox.Status === "Completed" && /^[0-9]+$/.test(sandbox.SandboxName)) {
            completedNumericSandboxNames.push(sandbox.SandboxName);
        }
    }

    return completedNumericSandboxNames;
}



let repository = process.argv[2];
let devHubUserName = process.argv[3];

let stdOut = execSync(`sf data query -q "SELECT Id, Status, SandboxName, SandboxInfoId, LicenseType, CreatedDate, CopyProgress, SandboxOrganization, SourceId, Description, EndDate FROM SandboxProcess WHERE Status!='D' AND WHERE Description LIKE 'CI Sandboxes Auto Provisioned%'" -o ${devHubUserName} -t --json  2>/dev/null`, { maxBuffer: Infinity }).toString();
let jsonData = JSON.parse(stdOut);
const completedNumericSandboxNames = extractCompletedNumericSandboxNames(jsonData);
console.log(`Found ${completedNumericSandboxNames.length} completed sandboxes that matches spec`);
for (const sandboxName of completedNumericSandboxNames) {
    try {
        console.log(`Deleting Sandbox ${sandboxName}`)
        deleteSandbox(devHubUserName, sandboxName);
        deleteMatchingGitHubVariables(sandboxName, repository);
    } catch (err) {
        console.log(`Error deleting sandbox ${sandboxName},skipping`)
    }
}