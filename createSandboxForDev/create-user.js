const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const util = require('util');
const pipeline = util.promisify(require('stream').pipeline);
const exec = util.promisify(require('child_process').exec);
const { faker } = require('@faker-js/faker');
const path = require('path');



const profileName = process.argv[2];
const email = process.argv[3];
const targetOrg = process.argv[4];

async function generateCsvFiles() {
  const queries = [
    `sfdx data query -r csv  -q "Select Id,UserLicenseId,Name From Profile" -w 300 -o ${targetOrg} > Profile.csv`,
  ];

  for (const query of queries) {
    console.log(`Executing query: ${query}`);
    await exec(query);
  }
}

async function readCsv(file) {
  const results = [];
  await pipeline(
    fs.createReadStream(file),
    csv(),
    new require('stream').Writable({
      objectMode: true,
      write: (data, _, done) => {
        results.push(data);
        done();
      }
    })
  );
  return results;
}


async function createUser(profileId,email) {
  const firstName = faker.person.firstName().replace(/\s/g, '_');;
  const lastName = faker.hacker.noun().replace(/\s/g, '_');
  const alias = faker.hacker.noun().replace(/\s/g, '_').slice(0,8);
  const userName = faker.internet.exampleEmail({ firstName: firstName, lastName:lastName }) +'.'+ targetOrg;
  const values = `Alias="${alias}" FirstName="${firstName}" UserName="${userName}" LastName="${lastName}" Email=${email} LocaleSidKey="en_AU" LanguageLocaleKey="en_US" EmailEncodingKey="ISO-8859-1" TimeZoneSidKey="Australia/Melbourne" ProfileId="${profileId}" IsActive="true"`;

  const cmd = `sfdx data:record:create --json -s User  -v "${values}" -o ${targetOrg}`;

  try {
    const result = await exec(cmd);
    console.log(`Created User record ${userName} successfully `);
    
    const outputFilePath = path.resolve('username.output');
    fs.writeFileSync(outputFilePath, userName);

    return JSON.parse(result.stdout).result.id;
  } catch (err) {
    console.log(`Failed to create User record ${userName} due to error: ${err}`);
    throw err;
  }
}


async function main() {
  await generateCsvFiles();


  let profiles = await readCsv('Profile.csv');
  const profile = profiles.find(profile => profile.Name === profileName);
  if (!profile) {
    throw new Error(`Profile not found: ${profileName}`);
  }
  let profileId = profile.Id;

  // specify the count of users to be created
  let userId = await createUser(profileId, email); 
  console.log(`Created User record ${userId} successfully `);


  let anoymousApex = `
        // get the user
        User u = [SELECT Id, Username, Email FROM User WHERE Id = '${userId}' LIMIT 1];

        // reset password
        System.resetPassword(u.Id, true);
  `

  fs.writeFileSync('resetPassword.apex', anoymousApex);
  const cmd = ` sfdx apex run -f resetPassword.apex  -o ${targetOrg}`;
  const result = await exec(cmd);
  console.log(`Reset password for User record ${userId} successfully `);



}

main().catch(err => {
  console.error(err);
  process.exit(1);
});