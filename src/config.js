import LoginModule from './pages/login';
import MainModule from './pages/main';

export default app => {
	// 무조건 들어가는 페이지는 lazy load 않고 바로 불러옴
	app.requires.push(LoginModule);
	app.requires.push(MainModule);

	app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
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
			abstract: true,
			name: 'authless',
			resolve: {
				auth: ['$q', '$state', '$timeout', 'LoginSvc', ($q, $state, $timeout, LoginSvc) => {
					if (!LoginSvc.logged) {
						return $q.when();
					}
					else {
						$timeout(() => {
							$state.go('main');
						});

						return $q.reject();
					}
				}]
			}
		}).state({
			url: '/login',
			name: 'login',
			parent: 'authless',
			template: require('./pages/login/template.html')
		}).state({
			url: '/register',
			name: 'register',
			parent: 'authless',
			templateProvider: () => {
				return import('./pages/register/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/register/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.register'
						});
					});
				}]
			}
		}).state({
			url: '/introduce',
			name: 'introduce',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/introduce/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/introduce/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.introduce'
						});
					});
				}]
			}
		}).state({
			url: '/main',
			name: 'main',
			parent: 'authful',
			template: require('./pages/main/template.html')
		}).state({
			url: '/when',
			name: 'when',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/when/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/when/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.when'
						});
					});
				}]
			}
		}).state({
			url: '/where',
			name: 'where',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/where/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/where/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.where'
						});
					});
				}]
			}
		}).state({
			url: '/language',
			name: 'language',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/language/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/language/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.language'
						});
					});
				}]
			}
		}).state({
			url: '/theme',
			name: 'theme',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/theme/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/theme/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.theme'
						});
					});
				}]
			}
		}).state({
			url: '/long-comment',
			name: 'long-comment',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/long-comment/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/long-comment/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.long-comment'
						});
					});
				}]
			}
		}).state({
			url: '/matching-main',
			name: 'matching-main',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/matching-main/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/matching-main/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.matching-main'
						});
					});
				}]
			}
		}).state({
			url: '/matching-success',
			name: 'matching-success',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/matching-success/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/matching-success/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.matching-success'
						});
					});
				}]
			}
		}).state({
			url: '/my',
			name: 'my',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/my/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/my/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.my'
						});
					});
				}]
			}
		}).state({
			url: '/community-list',
			name: 'community-list',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/community-list/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/community-list/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.community-list'
						});
					});
				}]
			}
		}).state({
			url: '/test',
			name: 'test',
			templateProvider: () => {
				return import('./pages/test/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', $ocLazyLoad => {
					return import('./pages/test/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.test'
						});
					})
				}]
			}
		}).state({
			url: '/message-box',
			name: 'message-box',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/message-box/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/message-box/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.message-box'
						});
					});
				}]
			}
		}).state({
			url: '/message/:id',
			name: 'message',
			params: {id : null},
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/message/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/message/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.message'
						});
					});
				}]
			}
		}).state({
			url: '/attraction',
			name: 'attraction',
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/attraction/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/attraction/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.attraction'
						});
					});
				}]
			}
		}).state({
			url: '/attraction-detail/:id/:type',
			name: 'attraction-detail',
			params: {id : null, type: null},
			parent: 'authful',
			templateProvider: () => {
				return import('./pages/attraction-detail/template.html');
			},
			resolve: {
				lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
					return import('./pages/attraction-detail/index').then(() => {
						$ocLazyLoad.load({
							name: 'touriends.page.attraction-detail'
						});
					});
				}]
			}
		});

		$urlRouterProvider.otherwise('/main');
	}])
		.config(['$httpProvider', ($httpProvider) => {
			$httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
			$httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
		}]);
}
