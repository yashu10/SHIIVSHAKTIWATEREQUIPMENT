const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));

data.forEach(p => {
    // Construct a direct answer paragraph
    let answer = `A ${p.title.toLowerCase()} is an industrial automated system used to process and package products for commercial plants. `;
    answer += `It is engineered for high throughput and efficiency. `;
    
    // Find capacity spec if available
    const capacitySpec = p.specs.find(s => s.k.toLowerCase().includes('capacity') || s.k.toLowerCase().includes('output') || s.k.toLowerCase().includes('speed'));
    if (capacitySpec) {
        answer += `Typical production capacities range from ${capacitySpec.v.replace(' (BPM)', '').replace(' (BPH)', '')}. `;
    }
    
    // Find supported sizes if available
    const sizeSpec = p.specs.find(s => s.k.toLowerCase().includes('size') || s.k.toLowerCase().includes('volume'));
    if (sizeSpec) {
        answer += `It supports pack sizes ranging from ${sizeSpec.v}.`;
    }

    p.aeoAnswer = answer.trim();
});

fs.writeFileSync('src/data/products.json', JSON.stringify(data, null, 4));
console.log('Added aeoAnswer to products.json');
