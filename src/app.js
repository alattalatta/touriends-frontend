import 'angular-ui-router';
import HomeCtrl from './controller/Home';
import LoginCtrl from './controller/Login';
import LoginSvc from './service/Login';

angular
	.module('touriends', ['ui.router'])
	.controller('HomeCtrl', HomeCtrl)
	.controller('LoginCtrl', LoginCtrl)
	.service('LoginSvc', LoginSvc)
	.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
		$stateProvider.state({
			abstract: true,
			name: 'authful',
			resolve: {
				auth: ['$q', '$state', '$timeout', 'LoginSvc', ($q, $state, $timeout, LoginSvc) => {
					if (LoginSvc.logged) {
						return $q.when();
					}
					else {
						$timeout(() => {
							$state.go('login');
						});

						return $q.reject();
					}
				}]
			}
		}).state({
			url: '/login',
			name: 'login',
			template: require('./template/login.html'),
			resolve: {
				auth: ['$q', '$state', '$timeout', 'LoginSvc', ($q, $state, $timeout, LoginSvc) => {
					if (! LoginSvc.logged) {
						return $q.when();
					}
					else {
						$timeout(() => {
							$state.go('home');
						});

						return $q.reject();
					}
				}]
			}
		}).state({
			url: '/home',
			name: 'home',
			parent: 'authful',
			template: require('./template/home.html')
		});

		$urlRouterProvider.otherwise('/login');
	}])
	.config(['$httpProvider', ($httpProvider) => {
		$httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
	}]);