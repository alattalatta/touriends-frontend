class LoginCtrl {
	static get $inject() {
		return ['$state', 'LoginSvc']
	}

	constructor($state, LoginSvc) {
		this.$state = $state;
		this.LoginSvc = LoginSvc;

		this.loginObj = {
			login: null,
			pwd: null
		};
		this.registerObj = {
			login: null,
			pwd: null,
			pwdConfirm: null
		};
	}

	login() {
		this.LoginSvc.login(this.loginObj).then((response) => {
			if (response.data.success) {
				this.$state.go('home');
			}
			else {
				alert(response.data.message);
			}
			this.loginObj = {
				login: null,
				pwd: null
			}
		});
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
				this.$state.go('home');
			}
			else {
				alert(response.data.message);
				this.registerObj.pwd = this.registerObj.pwdConfirm = null;
			}
		});
	}
}

export default LoginCtrl;