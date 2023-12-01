const { execSync } = require("child_process");
const fs = require("fs");

async function getSandboxStatus(githubRepo) {
    console.error(`Fetching sandbox statuses from ${githubRepo}...`);

    const output = execSync(
        `gh api /repos/${githubRepo}/actions/variables?per_page=100 --jq ".variables[].name"`
    ).toString();
    const sandboxNames = output.trim().split("\n");

    if (sandboxNames.length === 0 || sandboxNames[0] === "") {
        console.error("No Sandbox variables found...Exiting");
        process.exit(1);
    }

    let devSandboxes = [];
    let ciSandboxes = [];

    for (const sandboxName of sandboxNames) {
        if (sandboxName.trim() === "") continue;

        // Determine type and extract domain
        let type = sandboxName.endsWith('_DEVSBX') ? 'Developer' : sandboxName.endsWith('_SBX') ? 'CI' : null;
        if (!type) continue;
        let domain = sandboxName.split('_').slice(0,-3).join('_');


        const sandbox = JSON.parse(
            execSync(
                `gh api /repos/${githubRepo}/actions/variables/${sandboxName.trim()} --jq ".value"`
            ).toString()
        );

        // Add domain and type to the sandbox object
        sandbox.domain = domain;
        sandbox.type = type;

        if (type === 'Developer') {
            devSandboxes.push(sandbox);
        } else {
            ciSandboxes.push(sandbox);
        }
    }

    return { devSandboxes, ciSandboxes };
}

function writeSandboxDetailsToFile(sandboxes, filename) {
    fs.writeFileSync(filename, JSON.stringify(sandboxes, null, 2));
    console.log(`Sandbox details written to ${filename}`);
}

const [githubRepo] = process.argv.slice(2);

getSandboxStatus(githubRepo)
    .then(({ devSandboxes, ciSandboxes }) => {
        writeSandboxDetailsToFile(devSandboxes, 'developer_sandboxes.json');
        writeSandboxDetailsToFile(ciSandboxes, 'ci_sandboxes.json');
    })
    .catch(err => console.error("Error fetching sandbox status:", err));
