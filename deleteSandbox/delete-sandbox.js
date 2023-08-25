const { execSync } = require('child_process');



function deleteSandbox(devHubUserName, sandboxName) {
    try {
        // Do a logout of this sandbox for resume to work
        let stdOut = execSync(`sfdx org logout -o ${devHubUserName}.${sandboxName} -p 2>/dev/null`).toString();
        console.log(stdOut);
    } catch (err) {
        console.log(`Sandbox not available for logout: ${sandboxName}`);
    }

    // Force sandbox to be resumed due to https://github.com/forcedotcom/cli/issues/1718
    stdOut = execSync(`sfdx org resume sandbox -n ${sandboxName} -o ${devHubUserName}`).toString();
    console.log(stdOut);

    // Force sandbox to be deleted
    stdOut = execSync(`sfdx org delete sandbox -o ${devHubUserName}.${sandboxName} -p`).toString();
    console.log(stdOut);

    console.log(`Successfully deleted sandbox: ${sandboxName}`);

}


let devHubUserName = process.argv[2];
let sandboxName = process.argv[3];

sandboxName = sandboxName.trim();
sandboxName = sandboxName.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "")

deleteSandbox(devHubUserName, sandboxName);