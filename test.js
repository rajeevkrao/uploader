const folder="/apps/uploads/";
const fs = require('fs');

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});