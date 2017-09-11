require('./style.less');

/**
 * https://www.html5rocks.com/en/tutorials/file/dndfiles/
 */
class ProfileUploaderCtrl {
    static get $inject() {
        return ['$element', '$scope'];
    }

    constructor($element, $scope) {
        this.input = $element.find('input');
        this.fileReader = new FileReader();

        this.fileReader.onload = (e) => {
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

let profileUploader = {
    bindings: {
        fileModel: '=',
        previewModel: '='
    },
    controller: ProfileUploaderCtrl,
    template: require('./template.html')
};

export default profileUploader;