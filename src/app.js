require('./style/index.less');

import ngLoadingBar from 'angular-loading-bar';
require('angular-loading-bar/build/loading-bar.min.css');
require('angular-sanitize');
import 'angular-ui-router';
import 'babel-polyfill';
import 'oclazyload';

import directiveModule from './directive/index';
import serviceModule from './service/index';
import srcToBackground from './filters/srcToBackground';

let app = angular
	.module('touriends', [
		'ngSanitize', 'ngAnimate', 'ui.router', 'oc.lazyLoad', ngLoadingBar,
		directiveModule, serviceModule
	])
	.filter('srcToBackground', srcToBackground);

(require('./config').default)(app);
