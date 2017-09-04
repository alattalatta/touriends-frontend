const fs = require('fs');
const path = require('path');

const LessAutoprefixPlugin = require('less-plugin-autoprefix');
const LessCleanCSSPlugin = require('less-plugin-clean-css');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SSHPlugin = require('ssh-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'bundle.js',
		publicPath: '/public/'
	},
	// watch: true,
	devtool: 'eval-source-map',
	externals: {
		// jquery: 'jQuery',
		angular: 'angular'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'less-loader',
					options: {
						sourceMap: true,
						plugins: [
							new LessAutoprefixPlugin(),
							new LessCleanCSSPlugin
						]
					}
				}],
			})
		}, {
			test: /\.html$/,
			use: {
				loader: 'html-loader'
			}
		}]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new SSHPlugin({
			host: 'enn-devl.ga',
			username: 'enn',
			privateKey: fs.readFileSync('./ssh.pem'),
			from: './app',
			to: '/var/www/html/tour/front/app/'
		})
	]
};