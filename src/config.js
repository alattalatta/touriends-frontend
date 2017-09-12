export default app => {
    app
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
                template: require('./template/login.html')
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
                url: '/home',
                name: 'home',
                parent: 'authful',
                template: require('./template/home.html')
            });

            $urlRouterProvider.otherwise('/login');
        }])
        .config(['$httpProvider', ($httpProvider) => {
            $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
        }]);
}