import EmailValidator from 'email-validator';
import leftPad from 'left-pad';

class RegisterCtrl {
    static get $inject() {
        return ['$scope', '$state', 'LoginSvc']
    }

    // =============== Property
    get BirthMonth() {
        return this.registerObj.birth.month;
    }

    set BirthMonth(val) {
        this.registerObj.birth.month = val;
    }

    get BirthDay() {
        return this.registerObj.birth.day
    }

    set BirthDay(val) {
        this.registerObj.birth.day = val;
    }

    get BirthYear() {
        return this.registerObj.birth.year;
    }

    set BirthYear(val) {
        this.registerObj.birth.year = val;
    }

    // =============== CSS
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
        return !EmailValidator.validate(this.registerObj.email) ?
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

    genderChecked(val) {
        return this.registerObj.gender === val ?
            'is-checked' : null;
    }

    nationChecked(val) {
        return this.registerObj.nation === val ?
            'is-checked' : null;
    }

    sanitizeBirth() {
        this.sanitizeMonth();
        this.sanitizeDay();
        this.sanitizeYear();
    }
    sanitizeMonth() {
        if (this.BirthMonth === null) {
            return;
        }
        let val = parseInt(this.BirthMonth);
        if (Number.isNaN(val) || val < 1) {
            this.BirthMonth = 1;
        }
        else if (val > 12) {
            this.BirthMonth = 12;
        }
    }
    sanitizeDay() {
        if (this.BirthDay === null) {
            return;
        }
        let val = parseInt(this.BirthDay);
        if (Number.isNaN(val) || val < 1) {
            this.BirthDay = 1;
        }
        else {
            switch (this.BirthMonth) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if (val > 31) {
                        this.BirthDay = 31;
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if (val > 30) {
                        this.BirthDay = 30;
                    }
                    break;
                case 2:
                    if (this.BirthYear !== null
                        && ((this.BirthYear % 4 === 0) && (this.BirthYear % 100 !== 0))
                        || (this.BirthYear % 400 === 0)) {
                        if (this.BirthDay > 29) {
                            this.BirthDay = 29;
                        }
                    }
                    else if (this.BirthYear > 28) {
                        this.BirthDay = 28;
                    }
                    break;
            }
        }
    }
    sanitizeYear() {
        if (this.BirthYear === null) {
            return;
        }
        let val = parseInt(this.BirthYear);
        if (Number.isNaN(val) || val < 1900) {
            this.BirthYear = 1990;
        }
        else if (val > 2020) {
            this.BirthYear = 2020;
        }
    }

    constructor($scope, $state, LoginSvc) {
        this.$scope = $scope;
        this.$state = $state;
        this.LoginSvc = LoginSvc;

        this.imagePreview = null;
        this.imageData = null;
        this.form = document.getElementById('form_register');
        this.invalidStyle = {'box-shadow': '0 0 5.9px 3.2px rgba(255, 0, 0, 0.22)'};

        /**
         * 회원가입 요청 전송 여부
         * true: 추가 요청을 방지
         * @type {boolean}
         */
        this.pending = false;
        /**
         * 회원가입 오브젝트 원본
         */
        this.registerTemplate = {
            login: null,
            name: null,
            email: null,
            pwd: null,
            pwdConfirm: null,
            birth: {
                month: null,
                day: null,
                year: null
            },
            gender: null,
            nation: null
        };
        /**
         * 회원가입 오브젝트
         */
        this.registerObj = angular.copy(this.registerTemplate);
    }

    register() {
        if (this.pending) {
            return;
        }
        // 이메일 검사
        if (!EmailValidator.validate(this.registerObj.email)) {
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
