require('./style/index.less');

import ngLoadingBar from 'angular-loading-bar';
require('angular-loading-bar/build/loading-bar.min.css');
import 'angular-ui-router';
import 'babel-polyfill';
import 'oclazyload';

import directiveModule from './directive/index';
import serviceModule from './service/index';

let app = angular
	.module('touriends', [
		'ngAnimate', 'ui.router', 'oc.lazyLoad', ngLoadingBar,
		directiveModule, serviceModule
	]);

(require('./config').default)(app);