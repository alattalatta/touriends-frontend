import EmailValidator from 'email-validator';

class RegisterCtrl {
    static get $inject() {
        return ['$state', 'LoginSvc']
    }

    get ProfileImage() {
        return this.imagePreview === null ?
            null : {'background-image': `url(${this.imagePreview})`};
    }

    constructor($state, LoginSvc) {
        this.$state = $state;
        this.LoginSvc = LoginSvc;

        this.imagePreview = null;
        this.imageData = null;
        this.form = document.getElementById('form_register');

        /**
         * 회원가입 요청 전송 여부
         * true: 추가 요청을 방지
         * @type {boolean}
         */
        this.pending = false;
        /**
         * 회원가입 오브젝트 원본
         * @type {{login: string, pwd: string, pwdConfirm: string}}
         */
        this.registerTemplate = {
            login: null,
            pwd: null,
            pwdConfirm: null
        };
        /**
         * 회원가입 오브젝트
         * @type registerTemplate
         */
        this.registerObj = angular.copy(this.registerTemplate);
    }

    register() {
        if (this.pending) {
            return;
        }
        // 이메일 검사
        if (! EmailValidator.validate(this.registerObj.login)) {
            alert('이메일이 아니에요!');
            return;
        }
        // 패스워드 검사
        if (this.registerObj.pwd !== this.registerObj.pwdConfirm) {
            alert('패스워드가 달라요!');
            this.registerObj.pwd = this.registerObj.pwdConfirm = null; // 잘못된 패스워드는 보통 초기화
            return;
        }

        let data = new FormData(this.form);
        // 이미지 검사
        if (this.imageData) {
            data.append('image', this.imageData);
        }

        this.pending = true;
        this.LoginSvc.register(data).then((response) => {
            console.log(response);
            if (response.data.success) {
                alert(`${this.registerObj.login} 가입에 성공해버렸어요!`);
                // 추가 접근에 대비해 초기화? 사실 필요 없을듯
                // state가 변경되면 컨트롤러가 죽는 것 같다
                // TODO Check
                this.registerObj = angular.copy(this.registerTemplate);
                this.$state.go('login');
            }
            else {
                // TODO Proper error checking
                alert(response.data.message);
                this.registerObj.pwd = this.registerObj.pwdConfirm = null;
            }
            this.pending = false;
        });
    }
}

export default RegisterCtrl;