import imageUploader from './image-uploader/index';
import simpleCalendar from './simple-calendar';
import focusSelect from './focus-select/index';

export default angular.module('touriends.directives', [])
    .component('imageUploader', imageUploader)
    .component('simpleCalendar', simpleCalendar)
    .directive('focusSelect', focusSelect)
    .name;