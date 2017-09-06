class LoginSvc {
	static get $inject() {
		return ['$http'];
	}

	constructor($http) {
		this.$http = $http;
		this.logged = logged;
		this.uid = uid;
	}

	register(loginObj) {
		return this.$http({
			method: 'POST',
			url: ajax_url,
			params: {
				action: 'register',
				login: loginObj.login,
				pwd: loginObj.pwd
			}
		});
	}
	login(loginObj) {
		return this.$http({
			method: 'POST',
			url: ajax_url,
			params: {
				action: 'login',
				login: loginObj.login,
				pwd: loginObj.pwd
			}
		}).then((response) => {
			if (response.data.success) {
				this.logged = true;
				this.uid = response.data.uid;
			}
			return response;
		});
	}
	logout() {
		return this.$http({
			method: 'POST',
			url: ajax_url,
			params: {
				action: 'logout'
			}
		}).then((response) => {
			this.logged = false;
			return response;
		});
	}
}

export default LoginSvc;