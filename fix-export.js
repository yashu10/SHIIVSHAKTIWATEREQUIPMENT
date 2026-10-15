const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const oldNext = path.join(outDir, '_next');
const newNext = path.join(outDir, 'next_assets');

// Rename the _next directory to next_assets to bypass Hostinger hidden folder rules
if (fs.existsSync(oldNext)) {
    fs.renameSync(oldNext, newNext);
    console.log('Successfully renamed _next to next_assets');
} else {
    console.log('_next directory not found. Assuming already renamed.');
}

// Replace all /_next/ references with /next_assets/ in HTML, JS, and CSS files
function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            replaceInDir(filePath);
        } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('/_next/')) {
                content = content.split('/_next/').join('/next_assets/');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated paths in: ${filePath}`);
            }
        }
    }
}

console.log('Replacing paths in the out directory...');
replaceInDir(outDir);
console.log('Build export fixed perfectly for Hostinger!');
