const { execSync } = require("child_process");
const fs = require("fs");

const GITHUB_REPO = process.argv[2];
const CONFIG_FILE = process.argv[3];

// Fetch the variables
const VARIABLES = JSON.parse(
  execSync(
    `gh api "/repos/${GITHUB_REPO}/actions/variables" --paginate`,
  ).toString(),
);

// Read the domains and counts from the config file
const POOLS_AND_COUNTS = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));

for (const { pool: POOL_NAME, count: COUNT, branch:BRANCH } of POOLS_AND_COUNTS) {
  const pattern = new RegExp(`${POOL_NAME.toUpperCase()}_${BRANCH.toUpperCase()}_[0-9]+_SBX`);
  const MATCHING_VARIABLES = VARIABLES.variables
    .filter((v) => pattern.test(v.name))
    .filter((v) => {
      console.log(`\nChecking ${v.name}`);
      const valueOfVar = JSON.parse(v.value);
      if(valueOfVar.status === "InProgress" || valueOfVar.status === 'Expired') 
      {
        console.log(`Status: ${valueOfVar.status}`);
        console.log(`Proceeding to Expiration`,false);
        return false;
      }

      console.log(`Status: ${valueOfVar.status}`);
      const creationDate = new Date(v.created_at);
      const hoursSinceCreation = (Date.now() - creationDate) / (1000 * 60 * 60);
      let isExpirationEligible = true;
      if(valueOfVar.isExtended)
      {
        const hoursSinceExtension = (Date.now() - creationDate) / (1000 * 60 * 60);
        console.log(`Hours since extension: ${hoursSinceExtension}`);
        if(hoursSinceExtension < 48)
        {
          isExpirationEligible = false;
        }
        else
        {
          isExpirationEligible = false;
        }
      }

     
      console.log(`Hours since creation: ${hoursSinceCreation}`);
      console.log(`isExpirationEligible : ${isExpirationEligible}`);
      console.log(`Proceeding to Expiration`,valueOfVar.status !== 'Expired' &&  valueOfVar.status !== "InProgress" && hoursSinceCreation >= 24 && isExpirationEligible);
;
     
      return  valueOfVar.status !== 'Expired' &&  valueOfVar.status !== "InProgress" && hoursSinceCreation >= 24 && isExpirationEligible;
    });

  const CURRENT_COUNT = MATCHING_VARIABLES.length;

  console.log(`\nFinalized Details:`);
  console.log(`Pool: ${POOL_NAME}`);
  console.log(`Branch: ${BRANCH.toUpperCase()}`);
  console.log(`Desired available count: ${COUNT}`);
  console.log(`Sandboxes to Expire: ${CURRENT_COUNT}`);

  // Loop through the variables to expire
  for (const variable of MATCHING_VARIABLES) {

    let valueOfVar =  JSON.parse(variable.value);
    console.log(`Expiring ${variable.name} due to policy: ${valueOfVar.isExtended ? "48-hour expiry with extension" : "24-hour minimum age"}`);
    const value = JSON.stringify({
      ...valueOfVar,
      status: "Expired",
      isActive: "false",
    });

    console.log(`Expiring ${variable.name}`);
    // Set the GitHub Action variable with updated status
    execSync(
      `gh variable set "${variable.name}" -b '${value}' --repo ${GITHUB_REPO}`,
    );
  }
}