const fs = require('fs');
const yaml = require('js-yaml');

const yamlPath = process.argv[2];
const packagesToComment = process.argv[3] ? process.argv[3].split(',').map(pkg => pkg.trim()) : [];

if (!fs.existsSync(yamlPath)) {
  console.error('YAML file does not exist.');
  process.exit(1);
}

const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const parsedYaml = yaml.load(yamlContent);

packagesToComment.forEach((packageName) => {
  if (parsedYaml.artifacts[packageName] !== undefined) {
    parsedYaml.artifacts[`# ${packageName}`] = parsedYaml.artifacts[packageName];
    delete parsedYaml.artifacts[packageName];
    console.log(`Package ${packageName} commented out in the YAML.`);
  } else {
    console.log(`Package ${packageName} not found in the YAML.`);
  }
});

const newYamlContent = yaml.dump(parsedYaml, {
  noCompatMode: true,
  noRefs: true
});
fs.writeFileSync(yamlPath, newYamlContent);
