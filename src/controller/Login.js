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
	}

	login() {
		this.LoginSvc.login(this.loginObj).then((response) => {
			console.log(response);
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
}

export default LoginCtrl;