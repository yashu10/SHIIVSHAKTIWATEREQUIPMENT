const fs = require('fs');
const path = 'h:/Website Shiv shakti/src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const filtered = data.filter(p => p.title !== 'Micro-Biology Lab Setup');
fs.writeFileSync(path, JSON.stringify(filtered, null, 4));
console.log('Removed Micro-Biology Lab Setup');
