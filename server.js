// server.js

// init project
var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var json = require('json');


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

app.get('/getlist', function (req, res){
  const folder = path.join(__dirname, '/app/uploads/');
  
  var files = fs.readdir(folder, (err, files) => {
    var result = JSON.stringify(files);
    res.send(result);
  });

});

app.get('/download/:', function (req, res){
    res.sendFile(__dirname + '/app/upload.html');
});


app.get('/uploads', function (req, res){
    res.sendFile(__dirname + '/app/upload.html');
});

app.post('/uploads', function (req, res){
    var form = new formidable.IncomingForm();

    //form.parse(req);
  
    form.parse(req, function(error, fields, files) {
    console.log("parsing done");
    });

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/app/uploads/' + file.name;
        console.log("reaching");
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/app/index.html');
});
  
  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);  
});
