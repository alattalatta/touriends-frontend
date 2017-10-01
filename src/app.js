require('./style/index.less');

import 'angular-ui-router';
import 'babel-polyfill';
import 'oclazyload';

import directiveModule from './directive/index';
import serviceModule from './service/index';

// 기본 포함 페이지 모듈
import {homeModule, loginModule} from './pages/index';

let app = angular
	.module('touriends', [
		'ui.router', 'oc.lazyLoad',
		directiveModule, serviceModule,
		homeModule, loginModule
	]);

(require('./config').default)(app);