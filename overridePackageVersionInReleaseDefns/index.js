const fs = require("fs");
const yaml = require("js-yaml");

const releaseDefnPath = process.argv[2];
const packagesToUpdate = process.argv[3];

// Splits coma seperated values
//Parses package version provided as x.y.z.buildno to x.y.z-buildnumber (for npm)
function parsePackages(packagesString) {
  return packagesString
    .split(",")
    .map((item) => {
      const [packageName, versionNumber] = item.trim().split(/\s*:\s*/);
      // Check for the correct format
      if (!/^(\d+\.\d+\.\d+\.\d+|\d+\.\d+\.\d+-\d+)$/.test(versionNumber)) {
        console.log(
          `Ignoring ${packageName}: version format ${versionNumber} is invalid`,
        );
        return null;
      }
      const formattedVersionNumber = versionNumber.replace(
        /(\d+\.\d+\.\d+)\.(\d+)/,
        "$1-$2",
      );
      return [packageName, formattedVersionNumber];
    })
    .reduce((acc, item) => {
      if (item) {
        const [packageName, versionNumber] = item;
        acc[packageName] = versionNumber;
      }
      return acc;
    }, {});
}

if (!releaseDefnPath) {
  console.error("Please provide the path to the YAML file");
  process.exit(1);
}

if (packagesToUpdate) {
  const packages = parsePackages(packagesToUpdate);

  fs.readFile(releaseDefnPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the YAML file:", err);
      return;
    }

    const releaseDefn = yaml.load(data);

    for (const [packageName, versionNumber] of Object.entries(packages)) {
      if (releaseDefn.artifacts[packageName]) {
        releaseDefn.artifacts[packageName] = versionNumber;
        console.log(`Updated ${packageName} to version ${versionNumber}`);
      } else {
        console.log(`Package ${packageName} not found in YAML`);
      }
    }

    const updatedYaml = yaml.dump(releaseDefn);
    fs.writeFile(releaseDefnPath, updatedYaml, (err) => {
      if (err) {
        console.error("Error writing updated YAML:", err);
        return;
      }
      console.log("YAML file updated successfully");
    });
  });
} else {
  console.log("No packages provided for update, So ignoring!");
}
