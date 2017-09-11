import imageUploader from './image-uploader/index';

let directives = angular.module('touriends.directives', []);

directives.component('imageUploader', imageUploader);

export default directives;