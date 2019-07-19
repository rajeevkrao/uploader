// server.js

// init project
var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require("fs");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

app.get('/uploads', function (req, res){
    res.sendFile(__dirname + '/app/upload.html');
});

app.post('/uploads', function (req, res){
    var form = new formidable.IncomingForm();

    //form.parse(req);
  
    form.parse(req, function(error, fields, files) {
    console.log("parsing done");
    

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
        console.log("reaching");
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/app/index.html');
    });
});
  
  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);  
});
