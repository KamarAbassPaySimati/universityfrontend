const { Console } = require('console');
const fs = require('fs');
const report = require('multiple-cucumber-html-reporter');
(async () => {
    const originalString = 'Paymaart Admin Web Application';
    console.log(originalString, 'repo full name');
    // Read the contents of the execution_times.txt file
    report.generate({
        jsonDir: 'reports/',
        reportPath: 'living-documentation/',
        pageTitle: 'Paymaart Admin Web Application',
        pageFooter: '<div class="created-by"><p>Paymaart Admin Web Application Documentation</p></div>',
        reportName: 'Paymaart Admin Web Application',
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
                { label: 'Project', value: 'Paymaart Admin Web Application' }
            ]
        }
    });
})();
