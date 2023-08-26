#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 81:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

const { spawn } = __nccwpck_require__(81);
const fs = __nccwpck_require__(147);
const crypto = __nccwpck_require__(113);


function generateName() {
    let randomBytes = crypto.randomBytes(4);
    let randomInt = randomBytes.readUInt32BE(0);
    let random9DigitNumber = (randomInt % 900000000) + 100000000;
    return random9DigitNumber;
}

async function createSandbox(name, domain, sourceForSandbox, devhubUserName, apexClassId) {
    return new Promise((resolve, reject) => {
        // Create Sandbox Definition File
        let sandboxDefinition = {
            "sandboxName": name,
            "autoActivate": true,
            "description": `CI Sandboxes Auto Provisioned for ${domain}`,
        };

        if (sourceForSandbox == 'production') {
            sandboxDefinition['licenseType'] = 'DEVELOPER';
        } else {
            sandboxDefinition['SourceSandboxName'] = sourceForSandbox;
        }

        if (apexClassId) {
            sandboxDefinition['apexClassId'] = apexClassId;
        }

        fs.writeFileSync(`${name}.json`, JSON.stringify(sandboxDefinition));

        console.log('Sandbox Definition File Created...');
        console.log(JSON.stringify(sandboxDefinition));

        let sfdxCommand;

        // Hack to get around the issue with sfdx org create sandbox command
        if (!sandboxDefinition.SourceSandboxName)
            sfdxCommand = spawn('sfdx', ['org', 'create', 'sandbox','--async', '-f', `${name}.json`, '-a', name, '-o', `${devhubUserName}`, '--no-prompt', '--json']);
        else
            sfdxCommand = spawn('sfdx', ['org', 'create', 'sandbox', '--async', '-f', `${name}.json`, '-a', name, '-o', `${devhubUserName}`, '-c', `${sourceForSandbox}`, '--no-prompt', '--json']);

        console.log(`Sandbox Command triggered`);

        sfdxCommand.stdout.on('data', (data) => {
            console.error(`${data}`);
        });

        sfdxCommand.stderr.on('data', (data) => {
            if(data.messsage?.includes(`Lock file is already being held`))
            {
                console.log("Sandbox created successfully.");
                fs.unlinkSync(`${name}.json`);
                resolve(name);
            }
        });

        sfdxCommand.on('close', (code) => {
            if(code==68)
            {
                console.log("Sandbox requested submitted successfully.");
                fs.unlinkSync(`${name}.json`);
                resolve(name);
            }
            else if (code == 0) {
                console.log("Sandbox created successfully.");
                fs.unlinkSync(`${name}.json`);
                resolve(name);
            } else {

                console.log(`sfdx command exited with code ${code}`);
                reject(`Failed to create sandbox: ${name}`);
            }
        });
    });
}


async function main() {

    let domain = process.argv[2];
    let count = process.argv[3];
    if (!process.argv[4]) {
        throw new Error('No Source Sandbox provided');
    }
    let sourceForSandbox = process.argv[4];
    let devHubUserName = process.argv[5];
    let apexClassId = process.argv[6];

    let sandboxPromises = [];

    for (let i = 0; i < count; i++) {
        let name = generateName();
        sandboxPromises.push(createSandbox(name, domain, sourceForSandbox, devHubUserName, apexClassId));
    }

    let results = await Promise.allSettled(sandboxPromises);

    let successfullSandboxes = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    fs.writeFileSync(`${domain}.json`, JSON.stringify(successfullSandboxes));
}

main().catch(error => console.error('An error occurred:', error));









})();

module.exports = __webpack_exports__;
/******/ })()
;