/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-child-process */

const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function getFolders (directoryPath) {
    try {
        const files = await readdir(directoryPath);

        const folders = [];
        const excludedFolders = ['step-definations', 'support', 'bdd_api', 'bdd_getbearertoken', 'bdd_payload', 'bdd_modules', 'unit-testing'];
        for (const file of files) {
            const filePath = `${directoryPath}/${file}`;
            const fileStat = await stat(filePath);
            if (fileStat.isDirectory() && !excludedFolders.includes(file)) {
                folders.push(file);
            }
        }

        return folders;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

async function runBddByFolder (directoryPaths, flow) {
    try {
        const startTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }); // Record the overall execution start time at the beginning

        const processes = [];
        // Function to execute Cucumber command for each feature
        const runCucumber = (feature, i) => {
            const command = `./node_modules/@cucumber/cucumber/bin/cucumber.js  --force-exit -f json:./reports/test-report-${flow}-${i}.json --config ./test/integration-testing/${feature}/cucumber.js`;

            const childProcess = exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Cucumber for ${feature}:`, error);
                    const endTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }); // Record the overall execution end time after all Cucumber tests have completed
                    // Write start and end times to a text file
                    fs.writeFileSync('execution_times.txt', `Execution Start Time: ${startTime}\nExecution End Time: ${endTime}\n\n`);
                    process.exit(1);
                }

                console.log(stdout);
                console.error(stderr);
            });

            processes.push(childProcess);
        };

        for (let i = 0; i < directoryPaths.length; i++) {
            runCucumber(directoryPaths[i], i);
        }

        await Promise.all(processes.map((p) => new Promise((resolve) => p.on('exit', resolve))));
        console.log('All Cucumber runs completed.');
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

(async () => {
    try {
        const directoryPath = 'test/integration-testing'; // Replace with the actual directory path

        const folders = await getFolders(directoryPath);
        folders.sort();
        console.log(folders); // Display the folder names
        const splittedFolder = {};
        for (let i = 0; i < folders.length; i++) {
            const flow = folders[i].split('_')[0];
            if (splittedFolder[flow] === undefined) {
                splittedFolder[flow] = [folders[i]];
            } else {
                splittedFolder[flow].push(folders[i]);
            }
        }

        await runBddByFolder(splittedFolder.Flow1, 'Flow1');

        console.log('All executions completed sequentially.');
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
