const fs = require('fs');
fs.readFile('report.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading report.json:", err);
  } else {
    console.log("Contents of report.json:", data);  // Kolla om rapporten har genererats
  }
});