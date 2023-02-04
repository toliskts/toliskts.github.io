const fs = require('fs');

// Read the file asynchronously
fs.readFile('currentValues.txt', 'utf8', (err, data) => {
  if (err) throw err;

  // The file's contents are stored in the variable "data"
  console.log(data);
});
