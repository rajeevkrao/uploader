let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");

let webpackConfig = require("./webpack.config");
let webpackCompiler = webpack(webpackConfig);
let webpackDevMiddlewareOptions = {
	publicPath: webpackConfig.output.publicPath
};

webpackDevMiddleware(webpackCompiler, webpackDevMiddlewareOptions)