import focusSelect from './focus-select';
import imageUploader from './image-uploader';
import loadingOverlay from './loading-overlay';
import mainNav from './main-nav';
import simpleCalendar from './simple-calendar';
import toastOverlay from "./toast-overlay/index";

export default angular.module('touriends.directives', [])
    .component('imageUploader', imageUploader)
    .component('simpleCalendar', simpleCalendar)
	.component('loadingOverlay', loadingOverlay)
	.component('toastOverlay', toastOverlay)
	.component('mainNav', mainNav)
    .directive('focusSelect', focusSelect)
    .name;