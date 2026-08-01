const https = require('https');
https.get('https://shivshaktiwaterequipment.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const cssMatches = data.match(/href="([^"]+\.css)"/g);
    console.log("CSS files found:", cssMatches);
  });
});
