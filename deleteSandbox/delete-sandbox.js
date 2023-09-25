const { execSync } = require('child_process');



function deleteSandbox(devHubUserName, sandboxName) {

    console.log(`Attempting to logout of the sandbox if its already authenticated... `)
    try {
        // Do a logout of this sandbox for resume to work
        let stdOut = execSync(`sf org logout -o ${devHubUserName}.${sandboxName} -p 2>/dev/null`).toString();
        console.log(stdOut);
    } catch (err) {
        console.log(`Sandbox not available for logout: ${sandboxName}`);
    }

    // Force sandbox to be resumed due to https://github.com/forcedotcom/cli/issues/1718
    console.log(`Attempting to authenticate to the sandbox`)
    try{
            orgResumeJSONString = execSync(`sf org resume sandbox -n ${sandboxName} -o ${devHubUserName} --json`).toString();
            orgResumeResult = JSON.parse(orgResumeJSONString);

            if(orgResumeResult.status == 1)
            {
            if(orgResumeResult.name == 'SingleRecordQuery_NoRecords')
            {
                console.log(`The provided sandbox with name ${sandboxName} is no longer available in the org, Did you delete this directly?`);
                return;
            }
          }
    } catch(error)
    {
        console.log(`Error authenticating to sandbox: ${sandboxName} due to ${error}`);
        if(error.message.includes(`No authorization information found`))
        {
            console.log(`The provided sandbox with name ${sandboxName} is no longer available in the org, Did you delete this directly?`);
            return;

        }
    }


    // Force sandbox to be deleted
    stdOut = execSync(`sf org delete sandbox -o ${devHubUserName}.${sandboxName} -p`).toString();
    console.log(stdOut);

    console.log(`Successfully deleted sandbox: ${sandboxName}`);

}


let devHubUserName = process.argv[2];
let sandboxName = process.argv[3];

sandboxName = sandboxName.trim();
sandboxName = sandboxName.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "")

deleteSandbox(devHubUserName, sandboxName);