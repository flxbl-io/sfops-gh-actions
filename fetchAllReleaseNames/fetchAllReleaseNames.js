#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');





function getAllReleaseDefns(configDir) {
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

  const output = {
    include: allReleaseNames,
  };

  const outputPath = path.join(process.cwd(), 'all-releases.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.error(`Identified release defns written to ${outputPath}`);
  return output.include;
}

function main() {
  if (process.argv.length < 2) {
    console.error('Usage: fetchAllReleaseNames.js <config_directory>');
    process.exit(1);
  }

  const configDir = process.argv[2];

  let output = getAllReleaseDefns(configDir);
  console.error(`Found ${output.length} releases.`);
  console.log(output);
}

main();
