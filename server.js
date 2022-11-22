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
const session = require('express-session');
const JsonStore = require('express-session-json')(session);
const passport = require('passport');
const { Strategy } = require('passport-local')
const zip = require('express-zip');

var flash = require('express-flash');

const texts = require('./routes/texts.js')
/*
//start of webpack middle ware
let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");

let webpackConfig = require("./webpack.config");
let webpackCompiler = webpack(webpackConfig);
let webpackDevMiddlewareOptions = {
  publicPath: webpackConfig.output.publicPath
};

app.use(webpackDevMiddleware(webpackCompiler, webpackDevMiddlewareOptions));
//end of webpack middleware
*/

app.enable('trust proxy');

passport.use(new Strategy({ passwordField: 'password' }, (username, password, done) => {
	if (password != "testing")
		done(null, false)
	else
		done(null, true)
}))



app.set('views', ['./pugs', './ejs']);
app.set('view engine', 'pug');
app.set('view engine', 'ejs');

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})) */
//app.use(multer)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'app/uploads')
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
})

var upload = multer({ storage: storage })

var utest = multer({ storage: storage }).array('file')

setInterval(() => {
	http.get(`http://uploader.rkrao.repl.co/`);
}, 180000);

app.use(express.static('public'));

app.use(function(req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
	//req.session.cookie.expires = false;
});

app.use('/texts', texts);

app.use(session({
	secret: "test",
	saveUninitialized: false,
	resave: false,
	rolling:true,
	store: new JsonStore(),
	cookie: { maxAge: 30000 }
}));

app.get('/set', (req, res) => {
	req.session.login = 1;
	res.send("set")
})

app.get('/test', (req, res) => {
	res.send(JSON.stringify(req.session))
})

app.use(passport.initialize());
app.use(passport.session());

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});*/

app.get("/loginx", (req, res) => {
	res.render('login.ejs')
})

app.post('/api/login', (req, res) => {
	console.log(req.body)
	passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
		function(req, res) {
			res.redirect('/texts');
		}
})

app.get('/outputer', (req, res) => {
	res.render("outputer/main.pug")
})

app.get('/edit', (req, res) => {
	res.render("editor.pug")
})

app.get('/utest', function(req, res) {
	res.sendFile(__dirname + '/app/upload.html');
});

app.get('/getlist', function(req, res) {
  /*res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
	const folder = path.join(__dirname, '/app/uploads/');
	var files = fs.readdir(folder, (err, files) => {
		var result = JSON.stringify(files);
		res.send(result);
	});
});

app.get('/downloadall', (req, res) => {
	const folder = path.join(__dirname, '/app/uploads/');
	fs.readdir(folder, (err, files) => {
		var result = JSON.stringify(files);
		files = files.map(file => {
			return {
				path: path.join(folder, file),
				name: file
			}
		})
		res.zip(files)
		console.log(files)
	});
})

app.post('/api/login', (req, res) => {
	console.log(req.body)
	passport.authenticate('local', { failureRedirect: '/loginx', failureMessage: true }),
		function(req, res) {
			res.redirect('/texts');
		}
})

app.post('/api/rename', function(req, res) {
	var { oldfilename, newfilename } = req.body;
	fs.renameSync(path.join(__dirname, '/app/uploads/' + oldfilename), path.join(__dirname, '/app/uploads/' + newfilename));
	res.sendStatus(200);
});

app.post('/api/docadd', function(req, res) {
	var { filename, content } = req.body;
	if (!filename.includes('.'))
		filename += ".txt"
	fs.open("app/uploads/" + filename, "a", (err, fd) => {
		if (err) {
			console.log(err.message);
		} else {
			fs.write(fd, content, (err, bytes) => {
				if (err) {
					console.log(err.message);
				} else {
					console.log(bytes + ' bytes written');
					res.sendStatus(200);
				}
			})
		}
	})
})

app.get('/download/:filename', function(req, res) {
	var { filename } = req.params;
	const file = path.join(__dirname, '/app/uploads/' + filename);
	var mimetype = mime.lookup(file);
	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('Content-type', mimetype);

	res.download(file, filename);
});

app.get('/delete/:filename', function(req, res) {
	var { filename } = req.params;
	const file = path.join(__dirname, '/app/uploads/' + filename);

	try {
		fs.unlinkSync(file)
		//file removed
	} catch (err) {
		console.error(err)
	}
	//res.end();
	res.redirect("/refresh");
	//res.sendFile(__dirname + '/app/index.html');
});

app.get('/show/:filename', function(req, res) {
	var { filename } = req.params;
	const file = path.join(__dirname, '/app/uploads/' + filename);
	res.sendFile(file);
});


app.get('/refresh', function(req, res) {
	res.redirect("/");
});



app.post('/uploads', upload.array('myFile', 12), function(req, res, next) {
	//upload.single('myFile') //single file upload 
	res.redirect("/");
});

app.post('/utest', function(req, res, next) {
	utest(req, res, function(err) {
		if (err)
			console.log(err);
		return res.sendStatus(200);
	})
});

app.get('/checkpass', function(request, response) {
	request.session.SID = 'secret';
	var { pass } = request.query;//works on --> https://rajeev.com/api?pass=data
	var users = JSON.parse(fs.readFileSync('./pass.json', 'utf8'));
	var result = 0;
	if (users.pass === process.env.PASS)
		result = 1;
	result = JSON.stringify(result);
	response.json(result);
});

app.get('*', (req, res) => {
	console.log(req.session.SID);
	console.log(req.session.cookie.expires)
	res.sendFile(path.join(__dirname + '/app/index.html'));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
