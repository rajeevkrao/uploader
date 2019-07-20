const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '../uploads/');

module.exports= () => {
  var result;
fs.readdir(folder, (err, files) => {
  result=files;
  /*files.forEach(file => {
    console.log(file);
  });*/
});
  
return result;
};