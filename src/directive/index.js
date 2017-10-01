import imageUploader from './image-uploader';
import simpleCalendar from './simple-calendar';
import focusSelect from './focus-select';
import mainNav from './main-nav';

export default angular.module('touriends.directives', [])
    .component('imageUploader', imageUploader)
    .component('simpleCalendar', simpleCalendar)
	.component('mainNav', mainNav)
    .directive('focusSelect', focusSelect)
    .name;