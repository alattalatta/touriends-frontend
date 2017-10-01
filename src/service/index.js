import LoginSvc from './Login';
import CacheSvc from './Cache';

export default angular.module('touriends.service', [])
    .service('LoginSvc', LoginSvc)
	.service('CacheSvc', CacheSvc)
    .name;