const db = require('quick.db');

db.createWebview(process.env.DBpass, process.env.PORT); // process.env.PORT creates the webview on the default port