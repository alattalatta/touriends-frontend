'use strict';

// Node.js
const fs = require('fs');
const del = require('del');
const path = require('path');

// SSH auth
const auth = JSON.parse(fs.readFileSync('./ssh.config.json', 'utf-8'));
const sshTarget = `/var/www/html/${auth.username}/wp-content/themes/touriends/`;
const sshBase = auth.base;

// Webpack
const webpackCompiler = require('webpack');
const webpack = require('webpack-stream');
const LessAutoprefixPlugin = require('less-plugin-autoprefix');
const LessCleanCSSPlugin = require('less-plugin-clean-css');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Gettext = require('angular-gettext-plugin');

// Gulp
const gulp = require('gulp');
const cache = require('gulp-cached');
const sftp = require('gulp-ssh');

gulp.task('default', ['build']);
gulp.task('clean', () => {
	return del([
		'app/**/*'
	]);
});
gulp.task('build', () => {
	return gulp.src('src/app.js')
		.pipe(webpack({
			output: {
				path: path.resolve(__dirname, 'app'),
				filename: 'bundle.js',
				publicPath: sshBase
			},
			watch: true,
			// devtool: 'eval-source-map',
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
							presets: [
								['env', {
									targets: {
										browsers: ['last 2 versions', 'iOS 7']
									}
								}]
							],
							plugins: ['syntax-dynamic-import']
						}
					}
				}, {
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						use: [{loader: 'css-loader'}]
					})
				}, {
					test: /\.less$/,
					use: ExtractTextPlugin.extract({
						use: [{
							loader: 'css-loader',
							options: {
								// sourceMap: true
							}
						}, {
							loader: 'less-loader',
							options: {
								// sourceMap: true,
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
				}, {
					test: /\.(png|jpg|gif)$/,
					use: {
						loader: 'file-loader'
					}
				}, {
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: {
						loader: 'file-loader'
					}
				}]
			},
			plugins: [
				new ExtractTextPlugin('style.css'),
				new Gettext({
					compileTranslations: {
						input: 'po/*.po',
						outputFolder: 'l10n',
						format: 'json'
					},
					extractStrings: {
						input: 'src/**/*.html',
						destination: 'po/template.pot'
					}
				})
				// new UglifyJSPlugin({sourceMap: true})
			]
		}, webpackCompiler))
		.pipe(gulp.dest('app/'));
});

let config = {
	host: 'www.enn-devl.com',
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
	gulp.watch(['style.css', '*.php', 'screenshot.png'], ['index']);
});
gulp.task('index', () => {
	return gulp.src(['style.css', '*.php', 'screenshot.png'])
		.pipe(ssh.dest(sshTarget));
});
gulp.task('push', () => {
	return gulp.src('app/**/*')
		.pipe(cache('ssh'))
		.pipe(ssh.dest(sshTarget + 'app/'));
});