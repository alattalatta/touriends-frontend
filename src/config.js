export default app => {
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
                                $state.go('home');
                            });

                            return $q.reject();
                        }
                    }]
                }
            }).state({
                url: '/login',
                name: 'login',
                parent: 'authless',
                template: require('./pages/login/template.html'),
                resolve: {
                    lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
                        return import('./pages/login/index').then(() => {
                            $ocLazyLoad.load({
                                name: 'touriends.page.login'
                            });
                        })
                    }]
                }
            }).state({
                url: '/register',
                name: 'register',
                parent: 'authless',
                templateProvider: () => {
                    return import('./pages/register/template.html')
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
                    return import('./pages/introduce/template.html')
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
                templateProvider: () => {
                    return import('./pages/main/template.html')
                },
                resolve: {
                    lazyload: ['$ocLazyLoad', ($ocLazyLoad) => {
                        return import('./pages/main/index').then(() => {
                            $ocLazyLoad.load({
                                name: 'touriends.page.main'
                            });
                        });
                    }]
                }
            }).state({
                url: '/home',
                name: 'home',
                parent: 'authful',
                templateProvider: () => {
                    return import('./pages/home/template.html')
                },
                resolve: {
                    lazyload: ['$ocLazyLoad', $ocLazyLoad => {
                        return import('./pages/home/index').then(() => {
                            $ocLazyLoad.load({
                                name: 'touriends.page.home'
                            });
                        })
                    }]
                }
            });

            $urlRouterProvider.otherwise('/login');
        }])
        .config(['$httpProvider', ($httpProvider) => {
            $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
        }]);
}
