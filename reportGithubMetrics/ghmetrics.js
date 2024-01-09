const { execSync } = require('child_process');

const date = process.argv[2];  // get the date from the command line

function  computeElapsedTime(date) {
    console.log(`Computing Elapsed Time`);
    const command = `gh pr list -L 100 -s merged -S closed:${date} --json createdAt,mergedAt,changedFiles`;
    console.log(`Executing command: ${command}`)
    try {
        const stdout = execSync(command).toString();
        console.log(`Ouput of executing gh command`,stdout);
        const prs = JSON.parse(stdout);
        if(prs.length==0)
        {
            console.log(`No PRs merged on ${date}`);
            return;
        }
        prs.forEach((pr, index) => {
            const createdAt = new Date(pr.createdAt);
            const mergedAt = new Date(pr.mergedAt);
            const elapsedTime = mergedAt - createdAt;

            console.log(`Elapsed time: ${elapsedTime / 1000 / 60} minutes`);  // convert milliseconds to minutes
            console.log(`Changed files: ${pr.changedFiles}`);
          

            let sfpCommand = `sfp metrics:report -m 'pr.elapsed.time' -t 'timer' -v '${elapsedTime}'`;
            let output = execSync(sfpCommand, { encoding: 'utf8' });
            console.log(output);

            sfpCommand = `sfp metrics:report -m 'pr.files.impacted' -t 'gauge' -v '${pr.changedFiles}'`;
            output = execSync(sfpCommand, { encoding: 'utf8' });
            console.log(output);


        });

        
    } catch (err) {
        console.error(err);
    }
}

function  computeOpenPRs(date) {
    const command = `gh pr list -L 100 -s all -S created:${date}   --json createdAt`;
    console.log(`Executing command: ${command}`)
    try {
        const stdout = execSync(command).toString();
        console.log(`Ouput of executing gh command`,stdout);
        const prs = JSON.parse(stdout);
        console.log(`PRs  created on ${date}: ${prs.length}`)
        let exeCommand = `sfp metrics:report -m 'pr.open' -t 'gauge' -v '${prs.length}'`;
        let output = execSync(exeCommand, { encoding: 'utf8' });
        console.log(output);

        
    } catch (err) {
        console.error(err);
    }
}

if (!date) {
    console.log('Please provide a date');
} else {
    computeElapsedTime(date);
    computeOpenPRs(date);
}