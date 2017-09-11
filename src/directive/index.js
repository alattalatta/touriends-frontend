import profileUploader from './profile-uploader/index';

let directives = angular.module('touriends.directives', []);

directives.component('profileUploader', profileUploader);

export default directives;