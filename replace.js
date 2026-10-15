const fs = require('fs');
const path = require('path');

const srcDir = path.join('H:', 'Website Shiv shakti', 'src');
const searchString = 'SHIV SHAKTI WATER EQUIPMENT PVT. LTD.';
const replaceString = 'SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.';

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkAndReplace(filePath);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(searchString)) {
                content = content.split(searchString).join(replaceString);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    }
}

walkAndReplace(srcDir);
console.log('Replacement complete.');
