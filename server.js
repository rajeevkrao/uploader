// server.js

// init project
var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var json = require('json');
var mime = require('mime-types');
const multer = require('multer');
app.use(bodyParser.urlencoded({extended: true}))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


var upload = multer({ storage: storage })

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

app.get('/download/:filename', function (req, res){
  var { filename } = req.params;
  const file = path.join(__dirname, '/app/uploads/' + filename);
  var mimetype = mime.lookup(file);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  
  res.download(file, filename);
});

app.get('/delete/:filename', function (req, res){
    var { filename } = req.params;
    const file = path.join(__dirname, '/app/uploads/' + filename);
    
    try {
      fs.unlinkSync(file)
      //file removed
    } catch(err) {
    console.error(err)
    }
    //res.end();
    res.redirect("https://ramer.glitch.me/refresh");
    //res.sendFile(__dirname + '/app/index.html');
});

app.get('/refresh', function (req, res){
    res.redirect("https://ramer.glitch.me");
});

app.get('/uploads', function (req, res){
    res.sendFile(__dirname + '/app/upload.html');
});

app.post('/uploads',upload.single('myFile'), function (req, res, next){
  /*
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(req, function(error, fields, files) {
    console.log("parsing done");
    
    fs.rename(files.upload.path, "/tmp/test.png", function(error) {
      if (error) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
  });
*/
  /*
    var form = new formidable.IncomingForm();
  
    form.multiples = true;
  
    form.uploadDir = path.join(__dirname, './app/uploads/');
    /*
    form.parse(req, function(error, fields, files) {
      console.log("parsing done");
      fs.rename(files.upload.path, "/tmp/test.png", function(error) {
      if (error) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });

    });
    */
  /*
    form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));

  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('Upload End');

  });
  form.parse(req);
*/
    /*  
  

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/app/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    */
  
  
  
    res.redirect("https://ramer.glitch.me");
});
  
  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);  
});
