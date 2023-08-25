const fs = require('fs-extra');
const path = require('path');



const orgs = process.argv[2].split(','); // Comma-separated organization names

// Compute file names based on the organization names
const jsonFiles = orgs.map(orgName => `releasechangelog-${orgName}.json`);
const jsonDatas = jsonFiles.map(jsonFile => fs.readJsonSync(jsonFile));


const domain = process.argv[3];


//Function to generate HTML
function generateHTML(orgs, reconciledChangelog) {
  let html = '<html><head><title>Work Items</title>';
  html += '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.css">';
  html += '<script type="text/javascript" charset="utf8" src="https://code.jquery.com/jquery-3.5.1.js"></script>';
  html += '<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.js"></script>';
  html += '<style>body { display: flex; flex-direction: column; font-family: Arial, sans-serif; background-color: #f3f3f3; }';
  html += '.commitTable { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }';
  html += '.commitTable th { border-bottom: 2px solid #ddd; padding: 8px; text-align: left; background-color: #4CAF50; color: white; }';
  html += '.commitTable td { border-bottom: 1px solid #ddd; padding: 8px; }</style></head><body>';
  html += '<table class="commitTable"><thead><tr><th>Release Names</th><th>Contributing Packages</th><th>Work Items</th>';
  orgs.forEach(orgName => { html += '<th>' + orgName + '</th>'; });
  html += '</tr></thead><tbody>';

  reconciledChangelog.forEach(releaseItem => {
    html += '<tr><td>' + releaseItem.releaseNames + '</td><td>';
    for (const [artifactName, artifactVersion] of Object.entries(releaseItem.artifacts)) {
      html += artifactName + ': ' + artifactVersion + '<br>';
    }
    html += '</td><td>';
    for (const [workItemKey, _] of Object.entries(releaseItem.workItems)) {
      html += workItemKey + '<br>';
    }
    orgs.forEach(orgName => {
      if (releaseItem.orgs.includes(orgName)) {
        html += '<td>&#10003;</td>'; // Tick mark
      } else {
        html += '<td></td>'; // Blank column
      }
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  html += '<script>$(document).ready(function () { $(".commitTable").DataTable({ "order": [[0, "desc"]] }); });</script>';
  html += '</body></html>';

  return html;
}

function aggregateChangelogForOrg(orgName, jsonData) {
  const org = jsonData.orgs.find(o => o.name === orgName);
  if (!org) throw new Error(`Organization ${orgName} not found`);

  const deployedBuildNumbers = org.releases.map(r => r.buildNumber).sort((a, b) => a - b);
  const allReleases = jsonData.releases.sort((a, b) => a.buildNumber - b.buildNumber);

  let aggregatedData = [];
  let previouslyDeployedArtifacts = {}; // Keep track of previously deployed artifacts

  deployedBuildNumbers.forEach((buildNumber, index) => {
    let aggregatedEntry = {
      releaseNames: '',
      workItems: {},
      artifacts: {},
      orgs: [orgName]
    };

    // Aggregate work items and artifacts from skipped releases
    for (let i = (index > 0 ? deployedBuildNumbers[index - 1] + 1 : 0); i < buildNumber; i++) {
      const skippedRelease = allReleases.find(r => r.buildNumber === i);
      if (skippedRelease) {
        for (const [key, value] of Object.entries(skippedRelease.workItems || {})) {
          aggregatedEntry.workItems[key] = (aggregatedEntry.workItems[key] || []).concat(value);
        }
        for (const artifact of skippedRelease.artifacts) {
          // Include only if the artifact has not been deployed previously
          // if (previouslyDeployedArtifacts[artifact.name] !== artifact.version) {
          //   aggregatedEntry.artifacts[artifact.name] = artifact.version;
          // }
        }
      }
    }

    const release = allReleases.find(r => r.buildNumber === buildNumber);
    aggregatedEntry.releaseNames = release.names.join(', ');
    for (const [key, value] of Object.entries(release.workItems || {})) {
      aggregatedEntry.workItems[key] = (aggregatedEntry.workItems[key] || []).concat(value);
    }
    for (const artifact of release.artifacts) {
      // Include only if the artifact has not been deployed previously
      if (previouslyDeployedArtifacts[artifact.name] !== artifact.version) {
        aggregatedEntry.artifacts[artifact.name] = artifact.version;
        previouslyDeployedArtifacts[artifact.name] = artifact.version; // Mark the artifact as deployed
      }
    }

    aggregatedData.push(aggregatedEntry);
  });

  return aggregatedData;
}

function mergeChangelogs(leadingOrgData, subsequentOrgsData) {
  let mergedData = [...leadingOrgData];
  let modCounters = {};

  subsequentOrgsData.forEach(subsequentOrgData => {
    subsequentOrgData.forEach(entry => {
      const matchingEntry = mergedData.find(
        e => e.releaseNames === entry.releaseNames && JSON.stringify(e.artifacts) === JSON.stringify(entry.artifacts)
      );

      if (matchingEntry) {
        // If matching entry found, update org mapping
        matchingEntry.orgs.push(...entry.orgs);
      } else {
        const leadingOrgEntry = mergedData.find(e => e.releaseNames === entry.releaseNames);
        if (leadingOrgEntry) {
          const changedArtifacts = Object.fromEntries(
            Object.entries(entry.artifacts).filter(
              ([key, value]) => leadingOrgEntry.artifacts[key] !== value
            )
          );

          entry.artifacts = changedArtifacts;
          // Increment the counter for the matching release name
          modCounters[entry.releaseNames] = (modCounters[entry.releaseNames] || 0) + 1;
          entry.releaseNames += `_mod_${modCounters[entry.releaseNames]}`;
        }

        mergedData.push(entry);
      }
    });
  });

  return mergedData;
}


function reconcileChangelog(mergedChangelog, orgs) {
  // Create a deep copy of the merged changelog to avoid modifying the original data
  const reconciledChangelog = JSON.parse(JSON.stringify(mergedChangelog));

  // Get all subsequent organizations excluding the leading org
  const subsequentOrgs = orgs.slice(1);

  // Iterate through all subsequent organizations
  subsequentOrgs.forEach(targetOrg => {
    let fillGap = false;

    // Iterate through the reconciled changelog
    for (let i = 0; i < reconciledChangelog.length; i++) {
      const currentEntry = reconciledChangelog[i];

      // Check if the current entry is deployed to the target org
      if (currentEntry.orgs.includes(targetOrg)) {
        // If fillGap is true, mark all intervening entries as deployed to the target org
        if (fillGap) {
          for (let j = i - 1; j >= 0 && !reconciledChangelog[j].orgs.includes(targetOrg); j--) {
            reconciledChangelog[j].orgs.push(targetOrg);
          }
          fillGap = false;
        }
      } else if (currentEntry.orgs.includes(orgs[0])) {
        // If the current entry is deployed to the leading org but not the target org, set fillGap to true
        fillGap = true;
      }
    }
  });

  return reconciledChangelog;
}



const leadingOrgAggregatedChangelog = aggregateChangelogForOrg('staging', jsonDatas[0]);


console.log(leadingOrgAggregatedChangelog);


// Get the aggregated changelogs for the subsequent organizations
const subsequentOrgsData = orgs.slice(1).map((orgName, index) => aggregateChangelogForOrg(orgName, jsonDatas[index + 1]));
const mergedChangelog = mergeChangelogs(leadingOrgAggregatedChangelog, subsequentOrgsData);

let reconciledChangelog = reconcileChangelog(mergedChangelog, orgs);
const htmlContent = generateHTML(orgs, reconciledChangelog);

// Write to HTML file
fs.writeFileSync(`release-pipeline-${domain}.html`, htmlContent);
console.log(`HTML file generated at release-pipeline-${domain}.html`);
