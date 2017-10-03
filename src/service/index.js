import LoginSvc from './Login';
import CacheSvc from './Cache';
import OverlaySvc from './Overlay';
import ToastSvc from "./Toast";

export default angular.module('touriends.service', [])
    .service('LoginSvc', LoginSvc)
	.service('CacheSvc', CacheSvc)
	.service('OverlaySvc', OverlaySvc)
	.service('ToastSvc', ToastSvc)
    .name;