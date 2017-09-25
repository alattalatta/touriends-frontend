require('./style.less');

import EXIF from '../../exif';

/**
 * https://www.html5rocks.com/en/tutorials/file/dndfiles/
 */
class ImageUploaderCtrl {
    static get $inject() {
        return ['$element', '$scope'];
    }

    constructor($element, $scope) {
        this.input = $element.find('input');
        this.fileReader = new FileReader();

        this.fileReader.onload = (e) => {
            let exif = EXIF.readFromBinaryFile(EXIF.base64ToArrayBuffer(e.target.result));
            console.log(exif.Orientation);
            switch (exif.Orientation) {
                case 8:
                    this.orientationModel = 'right';
                    break;
                case 3:
                    this.orientationModel = 'bottom';
                    break;
                case 6:
                    this.orientationModel = 'left';
                    break;
                default:
                    this.orientationModel = 'top';
            }
            console.log(this.orientationModel);
            this.previewModel = e.target.result; // Base64, 바로 background-image 지정 가능 (url(...))
            $scope.$apply();
        };
        this.input.on('change', (e) => {
            let image = e.target.files[0]; // 사진 한 장만 선택 가능
            if (!image.type.match('image.*')) { // 이미지 아님
                return;
            }
            this.fileReader.readAsDataURL(image);
            this.fileModel = image; // File 오브젝트, PHP 업로드
        });
    }
}

let imageUploader = {
    bindings: {
        fileModel: '=',
        previewModel: '=',
        orientationModel: '='
    },
    controller: ImageUploaderCtrl,
    template: require('./template.html')
};

export default imageUploader;