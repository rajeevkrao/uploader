const db = require('quick.db');

db.createWebview(process.env.DBPASS, process.env.PORT); // process.env.PORT creates the webview on the default port