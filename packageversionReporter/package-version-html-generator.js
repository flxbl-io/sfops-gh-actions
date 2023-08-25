const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const axios = require('axios');

// Define the path to the packages directory
const packagesDir = process.argv[2];



// Define the environments in the order you want them to appear
const environments = process.argv[3].split(',');

// Initialize an empty object to hold the package data
let packagesData = {};

// Iterate through each environment
environments.forEach((env) => {
  // Build the path to the JSON file for this environment
  let filePath = path.join(packagesDir, `${env}.json`);

  console.log(`Reading ${filePath}`);

  if (fs.existsSync(filePath)) {
    // Read the JSON file
    let fileData = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON file
    let jsonData = JSON.parse(fileData);

    // Iterate through each result in the JSON data
    jsonData.forEach((pkg) => {
      // If this package isn't in the packagesData object yet, add it
      if (!packagesData[pkg.name]) {
        packagesData[pkg.name] = {};
      }

      // Add this version to the package's data
      packagesData[pkg.name][env] = { version: pkg.version, type: pkg.type, subscriberVersion: pkg.subscriberVersion };
    });
  }
  else {
    console.log(`File ${filePath} does not exist`);
  }

});

// Sort the packagesData keys (package names) alphabetically
let sortedPackages = Object.keys(packagesData).sort().reduce((obj, key) => {
  obj[key] = packagesData[key];
  return obj;
}, {});

async function generateHtml() {
  // Fetch DataTables CSS and JS from a CDN
  const [datatablesCss, datatablesJs, buttonsCss, buttonsJs,buttonsColVisJs, jszip, pdfmake, vfs_fonts] = await Promise.all([
    axios.get('https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css').then((res) => res.data),
    axios.get('https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js').then((res) => res.data),
    axios.get('https://cdn.datatables.net/buttons/2.0.1/css/buttons.dataTables.min.css').then((res) => res.data),
    axios.get('https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js').then((res) => res.data),
    axios.get('https://cdn.datatables.net/buttons/2.0.1/js/buttons.colVis.min.js').then((res) => res.data),
    axios.get('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js').then((res) => res.data),
    axios.get('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js').then((res) => res.data),
    axios.get('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js').then((res) => res.data)
  ]);



  // Create the EJS template string
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'packages.ejs'), 'utf8');

  // Render the EJS template string to HTML
  const html = ejs.render(template, {
    environments,
    sortedPackages,
    datatablesCss,
    datatablesJs,
    buttonsCss,
    buttonsJs,
    buttonsColVisJs,
    jszip,
    pdfmake,
    vfs_fonts
  });

  // Write the HTML to a file
  
  fs.writeFileSync(path.join(packagesDir,'packageVersionReport.html'), html, 'utf8');
}

generateHtml();
