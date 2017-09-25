import imageUploader from './image-uploader/index';
import focusSelect from './focus-select/index';

export default angular.module('touriends.directives', [])
    .component('imageUploader', imageUploader)
    .directive('focusSelect', focusSelect)
    .name;