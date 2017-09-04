import 'angular-ui-router';

angular
	.module('touriends', ['ui.router'])
	.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
		$stateProvider.state({
			url: '/',
			name: 'main',
			template: require('./template/main.html')
		}).state({
			url: '/home',
			name: 'home',
			template: require('./template/home.html')
		}).state({
			url: '/group',
			name: 'group',
			template: require('./template/group.html')
		});

		$locationProvider.html5Mode(true);
	}]);