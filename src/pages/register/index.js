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

    // =============== Validation
    get DataValid() {
        return ! this.pending &&
            this.IDValid && this.NameValid && this.EmailValid &&
            this.PasswordValid && this.PasswordConfirmValid &&
            this.GenderValid && this.NationValid && this.BirthValid;
    }
    get IDValid() {
        return this.registerObj.login &&
            /^[A-Za-z0-9\-_.]*$/.test(this.registerObj.login) &&
            this.registerObj.login.length > 1;
    }
    get NameValid() {
        return this.registerObj.name && this.registerObj.name.length > 2;
    }
    get EmailValid() {
        return this.registerObj.email && EmailValidator.validate(this.registerObj.email);
    }
    get PasswordValid() {
        return this.registerObj.pwd &&
            this.registerObj.pwd.length > 6;
    }
    get PasswordConfirmValid() {
        return this.registerObj.pwd && this.registerObj.pwd === this.registerObj.pwdConfirm;
    }
    get GenderValid() {
        return this.registerObj.gender !== null;
    }
    get NationValid() {
        return this.registerObj.nation !== null;
    }
    get BirthValid() {
        return this.BirthYear && this.BirthMonth && this.BirthDay;
    }

    // =============== CSS
    get ProfileImage() {
        if (this.imagePreview === null) {
            return null;
        }
        let rotation;
        switch (this.imageOrientation) {
            case 'left':
                rotation = 'rotate(90deg)';
                break;
            case 'right':
                rotation = 'rotate(-90deg)';
                break;
            case 'bottom':
                rotation = 'rotate(180deg)';
                break;
            default:
                rotation = null;
        }
        return {
            'background-image': `url(${this.imagePreview})`,
            'transform': rotation
        };
    }
    get SignUpLabel() {
        return this.pending ?
            '...' : 'SIGN UP';
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
        this.imageOrientation = null;
        this.form = document.getElementById('form_register');

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
        if (! this.DataValid) {
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
                this.$state.go('introduce');
            }
            else {
                if (response.data.error) {
                    switch (response.data.error) {
                        case 'login_duplicate':
                            this.registerObj.login = null;
                            alert('ID already in use');
                            break;
                        case 'upload_failed':
                            alert('Profile image must not exceed 5MB');
                            break;
                    }
                }
                if (response.data.error === 'login_duplicate') {
                }
                // TODO Proper error checking
                this.registerObj.pwd = this.registerObj.pwdConfirm = null;
            }
            this.pending = false;
        });
    }
}

export default angular.module('touriends.page.register', ['touriends']).controller('RegisterCtrl', RegisterCtrl).name;
