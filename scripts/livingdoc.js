const report = require('multiple-cucumber-html-reporter');

(async () => {
    const originalString = process.env.BITBUCKET_REPO_FULL_NAME
    console.log(originalString, 'repo full name')
    const modifiedString = originalString.split('/')[1]
    console.log(modifiedString, 'modified string')
    const b = modifiedString.split('-')

    // Capitalize the first letter of each word
    const capitalizedWords = b.map(word => word.charAt(0).toUpperCase() + word.slice(1))

    // Join the capitalized words back into a single string
    const repoName = capitalizedWords.join(' ')

    console.log(repoName)
    // Read the contents of the execution_times.txt file

    report.generate({
        jsonDir: 'reports/',
        reportPath: 'living-documentation/',
        pageTitle: repoName,
        pageFooter: `<div class="created-by"><p>${repoName.split(' ')[0]} Documentation</p></div>`,
        reportName: repoName,
        metadata: {
            browser: {
                name: 'chrome',
                version: '60'
            },
            device: 'Local test machine',
            platform: {
                name: 'ubuntu',
                version: '16.04'
            }
        },
        customData: {
            title: 'Run info',
            data: [
                { label: 'Project', value: repoName }
            ]
        }
    })
})()
