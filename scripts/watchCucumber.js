/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
const chokidar = require('chokidar')
const { exec } = require('child_process')
const pathsToWatch = ['./tests', './src']

// Initialize the watcher with specific paths
const watcher = chokidar.watch(pathsToWatch, {
    ignored: /[\/\\]\./, // ignore dotfiles
    persistent: true
})

const args = process.argv
let featureValue
// Find the index of the '--feature' argument
const featureIndex = args.indexOf('--feature')

if (featureIndex !== -1 && featureIndex + 1 < args.length) {
    // Access the value following '--feature'
    featureValue = args[featureIndex + 1]
    console.log(`Feature file(s) to execute: ${featureValue}`)
} else {
    console.log('No --feature argument found or value missing.')
    process.exit(-1)
}

watcher.on('change', (changedFile) => {
    if (featureValue) {
    // Run cucumber tests or trigger any command as needed for changed files
        exec(`./node_modules/@cucumber/cucumber/bin/cucumber.js ${featureValue} --import test/step-definations/*js --import test/step-definations/**/*js --world-parameters '{"login": true}'`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`)
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`)
            }
            console.log(`Cucumber tests executed successfully:\n${stdout}`)
        })
    }
})
