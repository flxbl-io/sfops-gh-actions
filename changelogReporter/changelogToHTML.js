const fs = require('fs');
const path = require('path');

function validateInput() {
    if (process.argv.length < 5) {
        console.log("Please provide the path to the JSON file, workItemBaseURL and gitHubRepoURL as command line arguments.");
        process.exit(1);
    }
}

function readChangelogData(pathToJSON) {
    const data = fs.readFileSync(pathToJSON, 'utf8');
    return JSON.parse(data);
}

function groupReleases(changelogData) {
    changelogData.releases.reverse();
    changelogData.releases =  changelogData.releases.slice(0, 30);


    let groupedReleases = {};
    let lastReleaseCommits = null;
    changelogData.releases.forEach((release, index) => {
        const commonName = release.names[0].split('-').slice(0, 4).join('-');
        if (!groupedReleases[commonName]) {
            groupedReleases[commonName] = [];
        }

        let releaseCommits = {};
        release.artifacts.forEach(artifact => {
            artifact.commits.forEach(commit => {
                releaseCommits[commit.commitId] = commit;
            });
        });

        if (Object.keys(releaseCommits).length === 0 && lastReleaseCommits) {
            release.artifacts.forEach(artifact => {
                artifact.commits = lastReleaseCommits;
            });
        } else {
            lastReleaseCommits = Object.values(releaseCommits);
        }

        const existingReleaseIndex = groupedReleases[commonName].findIndex((groupedRelease) =>
            groupedRelease.release.names[0] === release.names[0]
        );

        if (existingReleaseIndex !== -1) {
            groupedReleases[commonName][existingReleaseIndex].buildNumbers.push(release.buildNumber);
        } else {
            groupedReleases[commonName].push({ release, index, buildNumbers: [release.buildNumber] });
        }
    });

    return groupedReleases;
}

function formatReleaseName(releaseName) {
    return releaseName.replace(/[^a-z0-9-_]/g, '-');
}


function getLatestReleases(changelogData) {
    let latestReleases = {};
    changelogData.orgs.forEach((org, index) => {
        latestReleases[org.name] = { latestRelease: org.latestRelease, index };
    });
    return latestReleases;
}

function buildLatestReleaseContent(latestReleases) {
    let html = `
    <div id="latestReleases">
        <h2>Latest Release Info:</h2>
        ${Object.entries(latestReleases).map(([orgName, { latestRelease }]) => `
            <div class="releaseCard">
                <i class="fab fa-salesforce" style="font-size:30px;color:#4CAF50;margin-right:10px;"></i> <!-- Salesforce icon -->
                <h3 class="releaseCardTitle">${orgName}</h3>
                <p class="releaseCardLink">
                    <a href="#${formatReleaseName(latestRelease.names[0])}" onclick="showDetails('${formatReleaseName(latestRelease.names[0])}')">${latestRelease.names[0]}</a>
                    <br/>
                    <a href="#" onclick="showChanges('${orgName}')">View Incoming Changes</a>
                </p>
            </div>
        `).join('')}
    </div>`;
    return html;
}

function buildReleaseContent(release, workItemBaseURL, gitHubRepoURL) {
    let html = `
    <div class="release">
        <h2>${release.names.join(', ')} 
        <button class="copy-button" onclick="copyToClipboard('${release.names.join(', ')}')">
        <i class="fas fa-copy"></i>
        </button> 
        </h2>
        <h3>Work Items:</h3>
        <ul>
            ${Object.keys(release.workItems).map(workItem => 
                `<li><a href="${workItemBaseURL}/${workItem}" target="_blank">${workItem}</a></li>`
            ).join('')}
        </ul>
        <h3>Artifacts:</h3>
        ${release.artifacts.map(artifact => {
            if (artifact.commits.length === 0) {
                return `<div>
                    <button class="collapsible-content" onclick="toggleCollapsible(event)">
                    <span class="plus">+</span> ${artifact.name} (Version: ${artifact.version})
                    </button>
                    <div class="content-detail">
                        <h4>No diff/commit id's to display. The package build was triggered manually or some other process created a new version of the package, such as a change in sfdx-project.json or a runbook.</h4>
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                </div>`;
            } else {
                return `<div>
                    <button class="collapsible-content" onclick="toggleCollapsible(event)">
                    <span class="plus">+</span> ${artifact.name} (Version: ${artifact.version})
                    </button>
                    <div class="content-detail">
                        <h4>Commits:</h4>
                        <table class="commitTable">
                            <thead>
                            <tr>
                                <th>Commit Id</th>
                                <th>Date</th>
                                <th>Author</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            ${artifact.commits.map(commit =>
                            `<tr>
                                <td><a href="${gitHubRepoURL}/commit/${commit.commitId}" target="_blank">${commit.commitId}</a></td>
                                <td>${commit.date}</td>
                                <td>${commit.author}</td>
                                <td>${commit.message}</td>
                            </tr>`
                        ).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>`;
            }
        }).join('')}
    </div>`;
    return html;
}


function buildOrgReleaseChanges(orgName, latestRelease, changelogData, workItemBaseURL, gitHubRepoURL) {
    let html = `
    <div id="changes-${orgName}" class="modal hidden">
        <div class="modal-content">
            <span class="close-button" onclick="closeModal('${orgName}')">&times;</span>
            <h2>Incoming changes to ${orgName}:</h2>
    `;
    
    const currentDeployedIndex = changelogData.releases.findIndex(release => release.names[0] === latestRelease.names[0]);

    let totalIncomingCommits = 0;
    let totalIncomingWorkItems = new Set();

    if (currentDeployedIndex == 0) {
        html += `<p>No changes.</p>`;
    }
    else {

        for (let i = 0; i < currentDeployedIndex; i++) {
            const release = changelogData.releases[i];
            release.artifacts.forEach(artifact => {
                totalIncomingCommits += artifact.commits.length;
            });
            totalIncomingWorkItems = new Set([...totalIncomingWorkItems, ...Object.keys(release.workItems)]);
        }

        html += `<p>Number of  incoming commits to be deployed: ${totalIncomingCommits}</p>`;
        html += `<p>Number of incoming workitems to be deployed: ${totalIncomingWorkItems.size}</p>`;


        for (let i = 0; i < currentDeployedIndex; i++) {
            const release = changelogData.releases[i];
            html += buildReleaseContent(release, workItemBaseURL, gitHubRepoURL);
        }

      
    }
    html += `
        </div>
    </div>`;
    return html;
}

function buildReleaseChangesContent(latestReleases, changelogData, workItemBaseURL, gitHubRepoURL) {
    let html = `<div id="releaseChanges" class="hidden">`;
    Object.entries(latestReleases).forEach(([orgName, { latestRelease, index }]) => {
        html += buildOrgReleaseChanges(orgName, latestRelease, changelogData, workItemBaseURL, gitHubRepoURL);
    });
    html += `</div>`;
    return html;
}


function buildNavigation(groupedReleases) {
    let html = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <div id="navigation">
      <h1>Releases</h1>
      <input type="text" id="searchInput" onkeyup="filterReleases()" placeholder="Search for releases..">
      <ul id="releaseList">
    `;

    Object.entries(groupedReleases).forEach(([groupName, releases]) => {
        html += `
        <li>
            <button class="collapsible" onclick="toggleCollapsible(event)">${groupName}</button>
            <div class="content-detail">
                ${releases.map(({ release }) =>
                `<button class="release-button" onclick="showDetails('${formatReleaseName(release.names[0])}')">
                <div class="navigationLink">
                    <a href="#${formatReleaseName(release.names[0])}">${release.names.join(', ')}</a>
                </div>
                </button>`
            ).join('')}
            </div>
        </li>`;
    });

    html += `    
      </ul>
    </div>
    `;

    return html;
}

function createReleaseOrgMap(changelogData) {
    let releaseOrgMap = {};
    for (let org of changelogData.orgs) {
        for (let release of org.releases) {
            for (let name of release.names) {
                if (!releaseOrgMap[name]) {
                    releaseOrgMap[name] = [];
                }
                if (!releaseOrgMap[name].includes(org.name)) {
                    releaseOrgMap[name].push(org.name);
                }
            }
        }
    }
    return releaseOrgMap;
}

function generateLabelsForRelease(orgReleaseMap, releaseName, className) {
    let orgs = orgReleaseMap[releaseName];
    let divs = '';
    if (orgs) {
        for(let org of orgs) {
            divs += `<div class="${className}">${org}</div>`;
        }
    }
    return divs;
}



function generateAdhocGithubIssueUrl(releaseName, domain) {
    const baseURL = `${gitHubRepoURL}/issues/new?assignees=&labels=ops%2Cops-release-request-non-pipeline-env&projects=&template=request-a-release.yml&title=Ops+-+Request+a+release+into+org+${encodeURIComponent(domain)}+${encodeURIComponent(releaseName)}&releasedefn=`;
    return baseURL + encodeURIComponent(releaseName) + "&domain=" + encodeURIComponent(domain)+"&envprofile=ci";
}



function generateGithubIssueUrl(releaseName, domain) {
    const baseURL = `${gitHubRepoURL}/issues/new?assignees=&labels=ops%2Cops-release-request&projects=&template=request-a-release-staging-prod.yml&title=Ops+-+Release+a+domain+into+staging%2Fprod+${encodeURIComponent(domain)}+${encodeURIComponent(releaseName)}&releasedefn=`;
    return baseURL + encodeURIComponent(releaseName) + "&domain=" + encodeURIComponent(domain);
}

function buildContent(latestReleases,changelogData, workItemBaseURL, gitHubRepoURL) {
    let html = `<div id="content" class="content">`;
    changelogData.releases.forEach((release) => {
        const id = formatReleaseName(release.names[0]);
    
        let releaseOrgMap = createReleaseOrgMap(changelogData);
        
        let isDeployedOnlyToProd = releaseOrgMap && releaseOrgMap[release.names[0]] && (releaseOrgMap[release.names[0]].includes('prod'));
        let isDeployedOnlyToStaging = (releaseOrgMap && releaseOrgMap[release.names[0]] && (releaseOrgMap[release.names[0]].includes('staging')));

        let dynamicUrlElement="";
        //Do rollback only if its deployed to Prod
        if(isDeployedOnlyToStaging && !isDeployedOnlyToProd)
        {
            dynamicUrlElement=`<div class="rounded-label">Act on GitHub</div>`
        }else if(isDeployedOnlyToProd)
         {
            dynamicUrlElement = `<a href="${generateGithubIssueUrl(release.names[0], domain)}"class="roll-back" target="_blank">Rollback to this release</a>`;
         }
         else
         {
             dynamicUrlElement= `<a href="${generateGithubIssueUrl(release.names[0], domain)}" class="github-issue-url" target="_blank">Promote this release</a>`;
         }
        

        html += `
        <div id="${id}" class="${id === 0 ? '' : 'hidden'} release-content">
            <h2>${release.names[0]}
            ${generateLabelsForRelease(releaseOrgMap, release.names[0], 'rounded-label')}  
            ${dynamicUrlElement}    
            <a href="${generateAdhocGithubIssueUrl(release.names[0], domain)}" class="get-on-my-sbx" target="_blank">Get It on my Sandbox</a>
            <button class="copy-button" onclick="copyToClipboard('${release.names.join(', ')}')">
            <i class="fas fa-copy"></i>
            </button> 
            </h2>
            <h3>Work Items:</h3>
            <ul>
                ${Object.keys(release.workItems).map(workItem => 
                    `<li><a href="${workItemBaseURL}/${workItem}" target="_blank">${workItem}</a></li>`
                ).join('')}
            </ul>
            <h3>Artifacts:</h3>
            ${release.artifacts.map(artifact => {
                if (artifact.commits.length === 0) {
                    return `<div>
                        <button class="collapsible-content" onclick="toggleCollapsible(event)">
                        <span class="plus">+</span> ${artifact.name} (Version: ${artifact.version})
                        </button>
                        <div class="content-detail">
                            <h4>No diff/commit id's to display. The package build was triggered manually or some other process created a new version of the package, such as a change in sfdx-project.json or a runbook.</h4>
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                    </div>`;
                } else {
                    return `<div>
                        <button class="collapsible-content" onclick="toggleCollapsible(event)">
                        <span class="plus">+</span> ${artifact.name} (Version: ${artifact.version})
                        </button>
                        <div class="content-detail">
                            <h4>Commits:</h4>
                            <table class="commitTable">
                                <thead>
                                <tr>
                                    <th>Commit Id</th>
                                    <th>Date</th>
                                    <th>Author</th>
                                    <th>Message</th>
                                </tr>
                                </thead>
                                <tbody>
                                ${artifact.commits.map(commit =>
                                `<tr>
                                    <td><a href="${gitHubRepoURL}/commit/${commit.commitId}" target="_blank">${commit.commitId}</a></td>
                                    <td>${commit.date}</td>
                                    <td>${commit.author}</td>
                                    <td>${commit.message}</td>
                                </tr>`
                            ).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>`;
                }
            }).join('')}
        </div>`;
    });

    html += `</div>`;

    return html;
}


function writeHTMLToFile(html) {
    fs.writeFileSync(`changelog-${domain.toLocaleLowerCase()}.html`, html);
    console.log('The file has been saved!');
}

function readFromFile(pathToFile) {
  return fs.readFileSync(pathToFile, 'utf8');
}


async function generateHTML() {
    try {
        validateInput();

     
        const changelogData = readChangelogData(pathToJSON);
        const groupedReleases = groupReleases(changelogData);
        const latestReleases = getLatestReleases(changelogData);
   

        
        let styles = fs.readFileSync(path.join(__dirname,'styles.css'));
        let scripts = fs.readFileSync(path.join(__dirname,'scripts.js'));

        // ${buildLatestReleaseContent(latestReleases)}
        // ${buildReleaseChangesContent(latestReleases, changelogData, workItemBaseURL, gitHubRepoURL)}

        let html = `
        <html>
          <head>
            <title>Release Changelog</title>
            <style>${styles}</style>
            <script>${scripts}</script>
          </head>
          <body>
            ${buildNavigation(groupedReleases)}
            ${buildContent(latestReleases,changelogData, workItemBaseURL, gitHubRepoURL)}         
          </body>
        </html>`;

        writeHTMLToFile(html);
    } catch (err) {
        console.error(err);
    }
}


const pathToJSON = process.argv[2];
const workItemBaseURL = process.argv[3];
const gitHubRepoURL = process.argv[4];
const domain = process.argv[5];


generateHTML();
