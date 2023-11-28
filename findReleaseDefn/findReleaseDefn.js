const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const yargs = require('yargs');

const argv = yargs
  .option('releaseDefn', {
    alias: 'r',
    description: 'The release definition file name',
    type: 'string',
  })
  .option('domain', {
    alias: 'd',
    description: 'The domain name',
    type: 'string',
  })
  .option('branchname', {
    alias: 'b',
    description: 'The branch name',
    type: 'string',
  })
  .demandOption(['releaseDefn', 'domain', 'branchname'])
  .help()
  .alias('help', 'h')
  .argv;

const getFileNameWithoutExtension = (fileName) => {
  let reversedFileName = fileName.split('').reverse().join('');
  if (reversedFileName.includes('.lmy.')) {
    return reversedFileName.split('.lmy.')[1].split('').reverse().join('');
  } else if (reversedFileName.includes('.lmay.')) {
    return reversedFileName.split('.lmay.')[1].split('').reverse().join('');
  }
  return fileName;
};

const searchDomainDirectories = (dir, domain, fileName, results = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name === domain) {
        // If the directory matches the domain, search for the file
        console.log(`Located ${domain} in ${dirent.path}`);
        console.log(`Searching for ${fileName} in ${dirent.path}` )
        const foundFiles = fs.readdirSync(fullPath, { withFileTypes: true })
          .filter(file => file.isFile() && file.name.startsWith(fileName))
          .map(file => path.join(fullPath, file.name));
        results.push(...foundFiles);
      } else {
        // Continue searching in subdirectories
        searchDomainDirectories(fullPath, domain, fileName, results);
      }
    }
  });
  return results;
};

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'git-'));

execSync(`git worktree add --detach ${tempDir} origin/${argv.branchname}`);

const fileNameWithoutExtension = getFileNameWithoutExtension(argv.releaseDefn);

console.log(`Searching in ${tempDir} for directories named ${argv.domain} containing files named ${fileNameWithoutExtension}`);

const foundFiles = searchDomainDirectories(tempDir, argv.domain, fileNameWithoutExtension);

if (foundFiles.length === 0) {
  console.log(`Release definition file not found in any '${argv.domain}' directories.`);
  process.exit(1);
} else {
 
    console.log(`Found ReleaseDefn: ${foundFiles[0]}`);
    fs.copyFileSync(foundFiles[0], path.join(process.cwd(), `${argv.releaseDefn}.yml`));
    console.log(`Copied to ${path.join(process.cwd(), argv.releaseDefn)}`);
}

execSync(`git worktree remove ${tempDir}`);
