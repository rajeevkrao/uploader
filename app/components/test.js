var fs = require('fs');
var path = require('path');

const folder = path.join(__dirname, '../uploads/');

fs.readdir(folder, (err, files) => {
  console.log(files);
  /*files.forEach(file => {
    console.log(file);
  });*/
});
  