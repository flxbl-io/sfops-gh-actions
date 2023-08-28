#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

function getGitDiffOutput(baseSha, headSha) {
    console.error(`Fetching git diff between ${baseSha} and ${headSha}...`);
    return execSync(`git diff ${baseSha} ${headSha} --name-only`).toString();
}

function getFileContentAtCommit(sha, filePath) {
  try {
    return execSync(`git show ${sha}:${filePath}`).toString();
  } catch (e) {
    return null; // File doesn't exist in this commit
  }
}

function getImpactedPackagesFromSfdxProjectJson(baseSha, headSha) {
    const sfdxProjectJsonPath = 'sfdx-project.json';
    const baseContent = JSON.parse(getFileContentAtCommit(baseSha, sfdxProjectJsonPath) || '{}');
    const headContent = JSON.parse(getFileContentAtCommit(headSha, sfdxProjectJsonPath) || '{}');

    const impactedPackages = new Set();

    headContent.packageDirectories.forEach((headPackage, index) => {
        const basePackage = baseContent?.packageDirectories[index];
        if (!basePackage || JSON.stringify(headPackage) !== JSON.stringify(basePackage)) {
            console.error(`Change detected in package: ${headPackage.package}`);
            impactedPackages.add(headPackage.package);
        }
    });

    return Array.from(impactedPackages);
}


function getImpactedPackages(gitDiffOutput) {
    console.error('Determining impacted packages...');
    const sfdxProjectJson =JSON.parse((fs.readFileSync('sfdx-project.json', 'utf8')))
    const changedPaths = gitDiffOutput.split('\n').filter(line => line.trim() !== '');
    const impactedPackages = [];

    sfdxProjectJson.packageDirectories.forEach(dir => {
        changedPaths.forEach(changedPath => {
            if (changedPath.startsWith(dir.path)) {
                impactedPackages.push(dir.package);
            }
        });
    });
    return impactedPackages;
}

function findImpactedReleaseDefs(impactedPackages, configDir) {
    const impactedReleaseDefs = [];
    const allReleaseNames = []; 
  
    // First, collect all release names
    fs.readdirSync(configDir).forEach(file => {
      if (file.startsWith('release-config')) {
        const filePath = path.join(configDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const releaseConfig = yaml.load(fileContent);
        allReleaseNames.push(releaseConfig.releaseName); // adding every releaseName
      }
    });


    fs.readdirSync(configDir).forEach(file => {
      if (file.startsWith('release-config')) {
        const filePath = path.join(configDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const releaseConfig = yaml.load(fileContent);
  
        const releaseImpactedPackages = releaseConfig.includeOnlyArtifacts.filter(artifact =>
          impactedPackages.includes(artifact)
        );
  
        if (releaseImpactedPackages.length > 0) {
          console.error(`Found impacted release definition in file: ${filePath}`);
          impactedReleaseDefs.push({
            releaseName: releaseConfig.releaseName,
            domainNameUsedForPools: releaseConfig.domainNameUsedForPools? releaseConfig.domainNameUsedForPools : releaseConfig.releaseName,
            filePath: filePath,
            impactedPackages: releaseImpactedPackages, // Including the impacted packages
            allReleaseNames: allReleaseNames
          });
        }
      }
    });
  
    const output = {
      include: impactedReleaseDefs,
    };
  
    const outputPath = path.join(process.cwd(), 'impacted-releases.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.error(`Impacted release definitions written to ${outputPath}`);
  }

function main() {
    if (process.argv.length < 5) {
        console.error('Usage: find-impacted-releases.js <config_directory> <base_sha> <head_sha>');
        process.exit(1);
    }

    const configDir = process.argv[2];
    const baseSha = process.argv[3];
    const headSha = process.argv[4];
    const gitDiffOutput = getGitDiffOutput(baseSha, headSha);
    const impactedPackagesFromSfdx = getImpactedPackagesFromSfdxProjectJson(baseSha, headSha);
    const impactedPackagesFromGitDiff = getImpactedPackages(gitDiffOutput);
    const impactedPackages = [...new Set([...impactedPackagesFromSfdx, ...impactedPackagesFromGitDiff])];

    console.log(`Found ${impactedPackages.length} impacted packages.`);
    findImpactedReleaseDefs(impactedPackages, configDir);
}

main();