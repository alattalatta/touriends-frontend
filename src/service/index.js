import LoginSvc from './Login';
import CacheSvc from './Cache';
import HttpSvc from './Http';
import OverlaySvc from './Overlay';
import ToastSvc from "./Toast";

export default angular.module('touriends.service', [])
    .service('LoginSvc', LoginSvc)
	.service('CacheSvc', CacheSvc)
	.service('HttpSvc', HttpSvc)
	.service('OverlaySvc', OverlaySvc)
	.service('ToastSvc', ToastSvc)
    .name;