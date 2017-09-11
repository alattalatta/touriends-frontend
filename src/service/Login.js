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
		registerObj.action = 'register';
		return this.$http({
			method: 'POST',
			url: ajax_url,
			params: registerObj
		});
	}
	login(loginObj) {
		loginObj.action = 'login';
	    // 구글 검색어 javascript promise
		return this.$http({
			method: 'POST',
			url: ajax_url,
			params: loginObj
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