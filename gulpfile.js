'use strict';

// Node.js
const fs = require('fs');
const path = require('path');

// SSH auth
const auth = JSON.parse(fs.readFileSync('./ssh.config.json', 'utf-8'));

// Webpack
const webpackCompiler = require('webpack');
const webpack = require('webpack-stream');
const LessAutoprefixPlugin = require('less-plugin-autoprefix');
const LessCleanCSSPlugin = require('less-plugin-clean-css');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Gulp
const gulp = require('gulp');
const sftp = require('gulp-ssh');

gulp.task('default', ['build', 'watch']);
gulp.task('build', () => {
	return gulp.src('src/app.js')
		.pipe(webpack({
			output: {
				path: path.resolve(__dirname, 'app'),
				filename: 'bundle.js',
				publicPath: '/public/'
			},
			watch: true,
			devtool: 'eval-source-map',
			externals: {
				jquery: 'jQuery',
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
				new UglifyJSPlugin({sourceMap: true})
			]
		}, webpackCompiler))
		.pipe(gulp.dest('app/'));
});

let config = {
	host: 'www.enn-devl.ga',
	port: 22,
	username: auth.username,
	password: auth.password
};
let ssh = new sftp({
	ignoreErrors: false,
	sshConfig: config
});
gulp.task('watch', () => {
	gulp.watch('app/**/*', ['push']);
	gulp.watch(['style.css', '*.php'], ['index'])
});
gulp.task('index', () => {
	return gulp.src(['style.css', '*.php'])
		.pipe(ssh.dest(auth.to));
});
gulp.task('push', () => {
	return gulp.src('app/**/*')
		.pipe(ssh.dest(auth.to + 'app/'));
});