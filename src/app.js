require('./style/index.less');

import 'angular-ui-router';
import 'oclazyload';

import HomeCtrl from './controller/Home';
import LoginCtrl from './controller/Login';

import directiveModule from './directive/index';
import serviceModule from './service/index';

let app = angular
    .module('touriends', ['ui.router', 'oc.lazyLoad', directiveModule, serviceModule])
    .controller('HomeCtrl', HomeCtrl)
    .controller('LoginCtrl', LoginCtrl);

(require('./config').default)(app);