require('./style/index.less');

import ngLoadingBar from 'angular-loading-bar';
require('angular-loading-bar/build/loading-bar.min.css');
import 'angular-ui-router';
import 'babel-polyfill';
import 'oclazyload';

import directiveModule from './directive/index';
import serviceModule from './service/index';

// 기본 포함 페이지 모듈
import {homeModule, loginModule} from './pages/index';

let app = angular
	.module('touriends', [
		'ngAnimate', 'ui.router', 'oc.lazyLoad', ngLoadingBar,
		directiveModule, serviceModule,
		homeModule, loginModule
	]);

(require('./config').default)(app);