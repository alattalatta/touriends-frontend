/**
 * 글로벌 로그인 서비스
 */
class LoginSvc {
	static get $inject() {
		return ['$http'];
	}

	constructor($http) {
		this.$http = $http;
		this.logged = logged; // 이미 로그인된 경우면 index.php의 logged = true
		this.uid = uid;       // 이미 로그인된 경우면 index.php의 uid = 현재 사용자 ID
	}

	register(registerObj) {
		return this.$http({
			method: 'POST',
			url: ajax_url,
			params: {
				action: 'register',
				login: registerObj.login,
				pwd: registerObj.pwd
			}
		});
	}
	login(loginObj) {
	    // 구글 검색어 javascript promise
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
			this.uid = null;
			return response;
		});
	}
}

export default LoginSvc;