#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { execSync } = require("child_process");

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
  const sfdxProjectJsonPath = "sfdx-project.json";
  const baseContent = JSON.parse(
    getFileContentAtCommit(baseSha, sfdxProjectJsonPath) || "{}",
  );
  const headContent = JSON.parse(
    getFileContentAtCommit(headSha, sfdxProjectJsonPath) || "{}",
  );

  const impactedPackages = new Set();

  headContent.packageDirectories.forEach((headPackage, index) => {
    let basePackage = null;
    if (baseContent?.packageDirectories)
      basePackage = baseContent?.packageDirectories[index];
    if (
      !basePackage ||
      JSON.stringify(headPackage) !== JSON.stringify(basePackage)
    ) {
      console.error(`Change detected in package: ${headPackage.package}`);
      impactedPackages.add(headPackage.package);
    }
  });

  return Array.from(impactedPackages);
}

function getImpactedPackages(gitDiffOutput) {
  console.error("Determining impacted packages...");
  const sfdxProjectJson = JSON.parse(
    fs.readFileSync("sfdx-project.json", "utf8"),
  );
  const changedPaths = gitDiffOutput
    .split("\n")
    .filter((line) => line.trim() !== "");
  const impactedPackages = [];

  sfdxProjectJson.packageDirectories.forEach((dir) => {
    changedPaths.forEach((changedPath) => {
      if (changedPath.startsWith(dir.path)) {
        impactedPackages.push(dir.package);
      }
    });
  });
  return impactedPackages;
}

function findImpactedReleaseDefs(impactedPackages, configDir, filterBy) {
  const impactedReleaseDefs = [];
  const allReleaseNames = [];

  // First, collect all release names
  fs.readdirSync(configDir).forEach((file) => {
    if (file.startsWith("release-config")) {
      const filePath = path.join(configDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const releaseConfig = yaml.load(fileContent);
      allReleaseNames.push(releaseConfig.releaseName); // adding every releaseName
    }
  });

  if (filterBy) console.error(`Filter By?: ${filterBy}`);

  fs.readdirSync(configDir).forEach((file) => {
    if (file.startsWith("release-config")) {
      const filePath = path.join(configDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const releaseConfig = yaml.load(fileContent);

      const releaseImpactedPackages = releaseConfig.includeOnlyArtifacts.filter(
        (artifact) => impactedPackages.includes(artifact),
      );

      if (releaseImpactedPackages.length > 0) {
        console.error(`Found impacted release definition in file: ${filePath}`);

        if (filterBy) {
          if (releaseConfig.releaseName.includes(filterBy)) {
            impactedReleaseDefs.push({
              releaseName: releaseConfig.releaseName,
              pool: releaseConfig.pool
                ? releaseConfig.pool
                : releaseConfig.releaseName,
              filePath: filePath,
              impactedPackages: releaseImpactedPackages, // Including the impacted packages
              allReleaseNames: allReleaseNames,
            });
          }
        } else {
          impactedReleaseDefs.push({
            releaseName: releaseConfig.releaseName,
            pool: releaseConfig.pool
              ? releaseConfig.pool
              : releaseConfig.releaseName,
            filePath: filePath,
            impactedPackages: releaseImpactedPackages, // Including the impacted packages
            allReleaseNames: allReleaseNames,
          });
        }
      }
    }
  });

  const sortedImpactedReleaseDefs = impactedReleaseDefs.sort((a, b) => {
    if (!a.impactedPackages.length && !b.impactedPackages.length) return 0;
    if (!a.impactedPackages.length) return 1; // Move releases with no impacted packages to the end
    if (!b.impactedPackages.length) return -1; // Same as above

    const indexA = impactedPackages.indexOf(a.impactedPackages[0]);
    const indexB = impactedPackages.indexOf(b.impactedPackages[0]);

    if (indexA === -1 && indexB === -1) return 0; // Neither package is in impactedPackages
    if (indexA === -1) return 1; // Move releases with unknown impacted packages to the end
    if (indexB === -1) return -1; // Same as above

    return indexA - indexB; // Sort based on index in impactedPackages
  });

  const output = {
    include: sortedImpactedReleaseDefs,
  };

  const outputPath = path.join(process.cwd(), "impacted-releases.json");
  if (impactedReleaseDefs && impactedReleaseDefs.length > 0)
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  else fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  if (!filterBy)
    console.error(
      `Impacted release definitions written to ${outputPath} , impacted release length: ${impactedReleaseDefs.length}`,
    );
  else
    console.error(
      `Impacted release definitions written to ${outputPath},${
        impactedReleaseDefs[0]?.releaseName
          ? `filtered  impacted release found for ${impactedReleaseDefs[0]?.releaseName}`
          : `no impacted release found for ${filterBy}`
      }`,
    );
}

function main() {
  const configDir = process.argv[2];
  const baseSha = process.argv[3];
  const headSha = process.argv[4];
  const filterBy = process.argv[5];
  const gitDiffOutput = getGitDiffOutput(baseSha, headSha);
  const impactedPackagesFromSfdx = getImpactedPackagesFromSfdxProjectJson(
    baseSha,
    headSha,
  );
  const impactedPackagesFromGitDiff = getImpactedPackages(gitDiffOutput);
  const impactedPackages = [
    ...new Set([...impactedPackagesFromSfdx, ...impactedPackagesFromGitDiff]),
  ];

  console.log(`Found ${impactedPackages.length} impacted packages.`);
  findImpactedReleaseDefs(impactedPackages, configDir, filterBy);
}

main();
