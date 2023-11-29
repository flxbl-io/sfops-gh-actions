#!/usr/bin/env node

const { spawn } = require("child_process");
const { execSync } = require("child_process");
const fs = require("fs");

if (process.argv.length < 4) {
  console.error("No sbx name and ORG_NAME provided");
  process.exit(1);
}

let name = process.argv[2];

// Run sfdx org create sandbox command
console.error(`Creating sandbox...${name}`);

//Create Sandbox Definition File
let sandboxDefinition = {
  sandboxName: name,
  autoActivate: true,
  description: "Developer Sandbox Auto Provisioned",
};

let sfdxCommand;

if (!process.argv[4]) {
  throw new Error("No Source Sandbox  provided");
} else if (
  process.argv[4].toLocaleLowerCase() == "production" ||
  process.argv[4].toLocaleLowerCase() == "prod"
) {
  sandboxDefinition["licenseType"] = "DEVELOPER";
} else {
  sandboxDefinition["SourceSandboxName"] = process.argv[4];
}

if (process.argv[5]) {
  apexClassId = process.argv[5];
  sandboxDefinition["apexClassId"] = apexClassId;
}

fs.writeFileSync("sandboxDefinition.json", JSON.stringify(sandboxDefinition));

console.error("Sandbox Definition File Created...");
console.error(JSON.stringify(sandboxDefinition));
//Hack to get around the issue with sfdx org create sandbox command
if (!sandboxDefinition.SourceSandboxName)
  sfdxCommand = spawn("sf", [
    "org",
    "create",
    "sandbox",
    "-f",
    "sandboxDefinition.json",
    "-a",
    name,
    "-o",
    process.argv[3],
    "--no-prompt",
    "--json",
  ]);
else
  sfdxCommand = spawn("sfdx", [
    "org",
    "create",
    "sandbox",
    "-f",
    "sandboxDefinition.json",
    "-a",
    name,
    "-o",
    process.argv[3],
    "-c",
    process.argv[4],
    "--no-prompt",
    "--json",
  ]);

sfdxCommand.stdout.on("data", (data) => {
  console.error(`${data}`);
});

sfdxCommand.stderr.on("data", (data) => {
  console.error(`${data}`);
});

sfdxCommand.on("close", (code) => {
  if (code !== 0) {
    console.error(`sfdx command exited with code ${code}`);
    process.exit(1);
  }

  console.error("Sandbox created successfully.");
  fs.unlinkSync("sandboxDefinition.json");
});
