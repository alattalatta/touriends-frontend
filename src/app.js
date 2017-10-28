require('./style/index.less');

import ngLoadingBar from 'angular-loading-bar';
import gettext from 'angular-gettext';

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
		'ngSanitize', 'ngAnimate', 'ui.router', 'oc.lazyLoad',
		ngLoadingBar, gettext,
		directiveModule, serviceModule
	])
	.filter('srcToBackground', srcToBackground)
	.run(['gettextCatalog', (gettextCatalog) => {
		gettextCatalog.debug = true;
		gettextCatalog.loadRemote(`${locale_url}/ko.json`);
		console.log(gettextCatalog);
	}]);

(require('./config').default)(app);
