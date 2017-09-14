import EmailValidator from 'email-validator';

class RegisterCtrl {
    static get $inject() {
        return ['$state', 'LoginSvc']
    }

    // =============== 인라인 CSS
    /**
     * 선택한 프로필 이미지의 인라인 백그라운드 이미지 스타일
     * @returns {*}
     */
    get ProfileImage() {
        return this.imagePreview === null ?
            null : {'background-image': `url(${this.imagePreview})`};
    }
    get SignUpLabel() {
        return this.pending ?
            '...' : 'SIGN UP';
    }
    get EmailStyle() {
        if (this.registerObj.email === null) {
            return null;
        }
        return ! EmailValidator.validate(this.registerObj.email) ?
            this.invalidStyle : null;
    }
    get PasswordStyle() {
        if (this.registerObj.pwd === null) {
            return null;
        }
        if (this.registerObj.pwd.search(/[0-9]/g) < 0 || this.registerObj.pwd.search(/[a-z]/ig)) {
            return this.invalidStyle;
        }
        return this.registerObj.pwd.length < 6 ?
            this.invalidStyle : null;
    }
    get PasswordConfirmStyle() {
        return this.registerObj.pwd !== this.registerObj.pwdConfirm ?
            this.invalidStyle : null;
    }

    constructor($state, LoginSvc) {
        this.$state = $state;
        this.LoginSvc = LoginSvc;

        this.imagePreview = null;
        this.imageData = null;
        this.form = document.getElementById('form_register');
        this.invalidStyle = {'border-color': 'rgba(255, 55, 55, .25)'};

        /**
         * 회원가입 요청 전송 여부
         * true: 추가 요청을 방지
         * @type {boolean}
         */
        this.pending = false;
        /**
         * 회원가입 오브젝트 원본
         * @type {{
         * login: string,
         * name: string,
         * email: null,
         * pwd: string,
         * pwdConfirm: string
         * }}
         */
        this.registerTemplate = {
            login: null,
            name: null,
            email: null,
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

export default angular.module('touriends.page.register', ['touriends']).controller('RegisterCtrl', RegisterCtrl).name;