import LoginSvc from './Login';
import CacheSvc from './Cache';
import OverlaySvc from './Overlay';

export default angular.module('touriends.service', [])
    .service('LoginSvc', LoginSvc)
	.service('CacheSvc', CacheSvc)
	.service('OverlaySvc', OverlaySvc)
    .name;