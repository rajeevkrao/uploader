const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  //context: path.join(__dirname, '/app'),
  entry: {"app":path.join(__dirname, '/app','/app.jsx'),
					"test":'/test.jsx'
					},
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['transform-class-properties', 
                       ["@babel/plugin-transform-runtime",
                          {
                            "regenerator": true
                          }
                      ]
                     ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
};