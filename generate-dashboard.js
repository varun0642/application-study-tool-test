const fs = require('fs');
const path = require('path');

function generateDashboard() {
    const results = {
        anchore: JSON.parse(fs.readFileSync('anchore-results.json', 'utf8')),
        trivy: JSON.parse(fs.readFileSync('trivy-results.json', 'utf8')),
        grype: JSON.parse(fs.readFileSync('grype-results.json', 'utf8')),
        snyk: JSON.parse(fs.readFileSync('snyk-results.json', 'utf8')),
        osv: JSON.parse(fs.readFileSync('osv-results.json', 'utf8')),
        sysdig: JSON.parse(fs.readFileSync('sysdig-results.json', 'utf8'))
    };

    const html = generateHTML(results);
    
    if (!fs.existsSync('dashboard')) {
        fs.mkdirSync('dashboard');
    }
    
    fs.writeFileSync('dashboard/index.html', html);
}

function generateHTML(results) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Security Scan Dashboard</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .scanner-section { margin-bottom: 30px; }
            .vulnerability { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
            .high { border-left: 5px solid red; }
            .medium { border-left: 5px solid orange; }
            .low { border-left: 5px solid yellow; }
        </style>
    </head>
    <body>
        <h1>Security Scan Results</h1>
        ${Object.entries(results).map(([scanner, data]) => generateScannerSection(scanner, data)).join('\n')}
    </body>
    </html>
    `;
}

function generateScannerSection(scanner, data) {
    // Implementation would depend on the specific format of each scanner's output
    // This is a simplified version
    return `
        <div class="scanner-section">
            <h2>${scanner} Results</h2>
            <div class="vulnerabilities">
                ${formatVulnerabilities(data)}
            </div>
        </div>
    `;
}

function formatVulnerabilities(data) {
    // Implementation would depend on the specific format of each scanner's output
    return JSON.stringify(data, null, 2);
}

generateDashboard();
