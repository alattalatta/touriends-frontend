class RegisterCtrl {
    static get $inject() {
        return ['$state', 'LoginSvc']
    }

    constructor($state, LoginSvc) {
        this.$state = $state;
        this.LoginSvc = LoginSvc;

        this.registerObj = {
            login: null,
            pwd: null,
            pwdConfirm: null
        };
    }

    register() {
        if (this.registerObj.pwd !== this.registerObj.pwdConfirm) {
            alert('패스워드 확인!');
            this.registerObj.pwd = this.registerObj.pwdConfirm = null;
            return;
        }

        this.LoginSvc.register(this.registerObj).then((response) => {
            console.log(response);
            if (response.data.success) {
                alert(`${this.registerObj.login} 가입 성공!`);
                this.registerObj = {
                    login: null,
                    pwd: null,
                    pwdConfirm: null
                };
                this.$state.go('login');
            }
            else {
                alert(response.data.message);
                this.registerObj.pwd = this.registerObj.pwdConfirm = null;
            }
        });
    }
}

export default RegisterCtrl;