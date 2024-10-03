const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

// API to check if the CSV file exists
app.get('/api/check-file', (req, res) => {
  const filePath = 'F:/Final Year Project/Send/output/shot_analysis.csv';
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ exists: false });
    }
    res.json({ exists: true });
  });
});

// API to fetch and parse the CSV file
app.get('/api/fetch-csv', (req, res) => {
  const filePath = 'F:/Final Year Project/Send/output/shot_analysis.csv';
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});