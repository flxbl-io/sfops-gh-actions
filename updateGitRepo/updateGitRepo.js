const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Command line arguments
const [github_repo_url, dir_to_copy, target_dir, commit_message,isToUpdateReleaseNames,allReleaseJSONPath] = process.argv.slice(2);
const retries = 3;

async function cloneAndPrepareRepository(githubRepoUrl, dirToCopy, targetDir) {
    try {
        // Create a temporary directory
        const tempDir = fs.mkdtempSync(`ci-${new Date().toISOString().slice(0,10)}-`);

        // Clone the repository
        execSync(`gh repo clone ${githubRepoUrl} ${tempDir}`);

        // Copy the provided directory to the cloned repository
        const destDir = path.join(tempDir, targetDir);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.cpSync(dirToCopy, destDir, { recursive: true });

        return tempDir;
    } catch (error) {
        console.error(`Error in cloneAndPrepareRepository: ${error}`);
        process.exit(1);
    }
}

async function updateDomains(tempDir, allReleasesJSONPath) {
    try {
        // Read and update domains.json
        const domainsJsonPath = path.join(tempDir, '_data', 'domains.json');
        let domains = JSON.parse(fs.readFileSync(domainsJsonPath, 'utf8'));
        const newDomainsArray = JSON.parse(fs.readFileSync(allReleasesJSONPath, 'utf8')).include;

        newDomainsArray.forEach(domain => {
            if (!domains.includes(domain)) {
                domains.push(domain);
            }
        });

        fs.writeFileSync(domainsJsonPath, JSON.stringify(domains, null, 2));
    } catch (error) {
        console.error(`Error in updateDomains: ${error}`);
        process.exit(1);
    }
}

async function gitOperations(tempDir, commitMessage) {
    try {
        process.chdir(tempDir);
        execSync(`git config --global user.email sfopsbot@flxbl.io`);
        execSync(`git config --global user.name sfopsbot`);
        execSync(`git add . && git commit -m "${commitMessage}"`);
    } catch (error) {
        console.error(`Error in gitOperations: ${error}`);
        process.exit(1);
    }
}



async function pushChanges(tempDir, maxRetries) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            execSync(`git pull --rebase origin main && git push origin main`);
            console.log("Successfully pushed the changes.");
            return;
        } catch (error) {
            console.error(`Error occurred during push attempt ${attempt + 1}: ${error}`);
            attempt++;
            await new Promise(resolve => setTimeout(resolve, 15000)); // Retry after 15 seconds
        }
    }
    console.error("Exceeded maximum retry attempts.");
    process.exit(1);
}

async function main() {
    const tempDir = await cloneAndPrepareRepository(github_repo_url, dir_to_copy, target_dir);
    //We provide an option to update release names whenver there is a git operation
    //This is to reduce build costs
    if(isToUpdateReleaseNames=='true')
       await updateDomains(tempDir, allReleaseJSONPath);
    await gitOperations(tempDir, commit_message);
    await pushChanges(tempDir, retries);

    // Cleanup
    process.chdir('..'); // Move out of tempDir
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log("Cleanup completed.");
}

main().catch(error => {
    console.error(`An error occurred: ${error}`);
    process.exit(1);
});
