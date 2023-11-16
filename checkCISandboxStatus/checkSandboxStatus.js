const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');


const [SCRIPT_PATH, GITHUB_REPO, DEVHUB_USERNAME, PATH_TO_POOL_CONFIG] = process.argv.slice(1);

// Function to run shell commands synchronously
const runCommand = (command) => {
    try {
        return execSync(command).toString();
    } catch (err) {
        console.error(`Error executing command: ${command}`, err.toString());
        throw err;
    }
};

// Function to find matching pool configuration
const findPoolConfig = (variableName, configJson) => {
    return configJson.find(config => {
        const poolBranchPattern = `${config.pool.toString().toUpperCase()}_${config.branch.toString().toUpperCase()}`;
        return variableName.includes(poolBranchPattern);
    });
};

// Main function to process each sandbox
const processSandbox = async (variableName,sandboxName, poolConfig) => {
    try {
        console.log(`Processing Sandbox`);
        const sandboxStatus = runCommand(`sf org sandbox resume -n ${sandboxName} -o ${DEVHUB_USERNAME} --json`);
        console.log(sandboxStatus.toString());
        if (!sandboxStatus) return;

        const parsedStatus = JSON.parse(sandboxStatus).result.Status;

        console.log(`${sandboxName}:${parsedStatus}`);
        if (parsedStatus === "Completed") {
            runCommand(`sf alias set ${sandboxName}=${DEVHUB_USERNAME}.${sandboxName}`);

            const usersToBeActivated = poolConfig?.usersToBeActivated;
            if (usersToBeActivated) {
                const usersArray = usersToBeActivated.split(',').map(user => `${user}@${sandboxName}`);
                const usersString = usersArray.join(',');

                execSync(`node ${path.join(SCRIPT_PATH, 'dist/deactivate-all-users/index.js')} ${usersString} ${sandboxName}`);
            }

            const value = JSON.stringify({ name: sandboxName, status: "Available", isActive: "true" });
            runCommand(`gh variable set ${variableName} -b '${value}' --repo ${GITHUB_REPO}`);
            try
            {
             runCommand('sfp metrics:report -m "sfpowerscripts.sandbox.created" -t counter -g {\"type\":\"ci\"}');
            }
            catch(error)
            {
             console.log(`Skipping posting metric`)
            }
        }
    } catch (err) {
        console.error(`Error processing sandbox ${sandboxName}:`, err);
    }
};

// Main execution
(async () => {
    const configJson = JSON.parse(fs.readFileSync(PATH_TO_POOL_CONFIG, 'utf8'));

    const sandboxesList = execSync(`gh api "/repos/${GITHUB_REPO}/actions/variables?per_page=100" --jq ".variables[] | select(.name | test(\\\"_SBX\\\"))"`);
    if (!sandboxesList) return;

   
    const githubSandboxVariableValues = sandboxesList.toString().split('\n').filter(Boolean);


    for (const variableValue of githubSandboxVariableValues) {
        
        const sandboxName = JSON.parse(variableValue).name;
        console.log(`Sand`,sandboxName);
        console.log(`Processing ${sandboxName}`)
        const poolConfig = findPoolConfig(sandboxName, configJson);
        if (poolConfig) {
            const sandboxJson = JSON.parse(execSync(`gh api "/repos/${GITHUB_REPO}/actions/variables/${sandboxName}?per_page=100" --jq ".value | fromjson"`));
            if (sandboxJson.status === "Available") {
                await processSandbox(sandboxName,sandboxJson.name, poolConfig);
            }
        }
    }
})();
