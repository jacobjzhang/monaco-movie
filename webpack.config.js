const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

Error.stackTraceLimit = Infinity;

module.exports = {
	entry: {
		"app": './src/index.js',
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js'
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  optimization: {
    minimize: true,
    namedModules: true,
    concatenateModules: true,
  },
  plugins: [
    new MonacoWebpackPlugin(
      {
        languages: ['javascript'],
        features: ['links']
      }
    ),
    new HtmlWebpackPlugin({
      title: 'Monaco Movie',
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};
