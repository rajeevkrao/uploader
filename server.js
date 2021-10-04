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
var http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
//app.use(multer)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/uploads')
  },
  filename: function (req, file, cb) {
    cb( null, file.originalname );
  }
})

var upload = multer({ storage: storage })

var utest = multer({ storage: storage }).array('file')

setInterval(() => {
  http.get(`http://b-hit.glitch.me/`);
}, 240000);

app.use(express.static('public'));

app.enable('trust proxy');
app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});*/

app.get('/utest', function (req, res){
    res.sendFile(__dirname + '/app/upload.html');
});

app.get('/getlist', function (req, res){
  /*res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
  const folder = path.join(__dirname, '/app/uploads/');
  var files = fs.readdir(folder, (err, files) => {
    var result = JSON.stringify(files);
    res.send(result);
  });
});

app.post('/api/rename', function (req, res){
  var { oldfilename, newfilename } = req.body;
  fs.renameSync(path.join(__dirname, '/app/uploads/' + oldfilename),path.join(__dirname, '/app/uploads/' + newfilename));
  res.sendStatus(200);
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

app.get('/show/:filename', function (req, res){
    var { filename } = req.params;
    const file = path.join(__dirname, '/app/uploads/' + filename);
    res.sendFile(file);
});


app.get('/refresh', function (req, res){
    res.redirect("https://ramer.glitch.me");
});



app.post('/uploads',upload.array('myFile', 12), function (req, res, next){
    //upload.single('myFile') //single file upload 
    res.redirect("https://ramer.glitch.me");
});

app.post('/utest', function (req, res, next){
    utest(req, res, function (err) {
      if(err)
      console.log(err);
      return res.sendStatus(200);
    })
});

app.get('/checkpass',function(request, response){ //works on --> https://rajeev.com/api?id={data}&code={data}
	var { pass } = request.query;
  var users = JSON.parse(fs.readFileSync('./pass.json', 'utf8')); 
  var result = 0;
  if(users.pass===pass)
    result=1;
  result=JSON.stringify(result);
  response.json(result);
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/app/index.html')); 
});


  
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);  
});
