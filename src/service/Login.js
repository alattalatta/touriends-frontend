import crypt from 'sjcl';

/**
 * 글로벌 로그인 서비스
 */
class LoginSvc {
	static get $inject() {
		return ['$http', 'CacheSvc', 'gettextCatalog'];
	}

	constructor($http, CacheSvc, localizer) {
		this.$http = $http;
		this.CacheSvc = CacheSvc;
		this.localizer = localizer;

		this.logged = aaa; // 이미 로그인된 경우면 index.php 의 logged = true
		this.user_login = bbb; // 상동
		this.nationality = ccc; // 상동

		this.localize();
	}

	register(formData) {
		formData.set('action', 'register');

		let login = formData.get('login');
		let pwd = formData.get('pwd');
		formData.set('pwd', LoginSvc.hashPwd(login, pwd));

		return this.signIn(formData);
	}

	edit(formData) {
		formData.set('action', 'setEdit');

		let login = formData.get('login');
		let pwd = formData.get('pwd');
		formData.set('pwd', LoginSvc.hashPwd(login, pwd));

		return this.signIn(formData);
	}

	login(formData) {
		formData.set('action', 'login');

		let login = formData.get('login');
		let pwd = formData.get('pwd');
		formData.set('pwd', LoginSvc.hashPwd(login, pwd));

		return this.signIn(formData);
	}

	logout() {
		return this.signOut({action: 'logout'});
	}

	disconnect() {
		return this.signOut({action: 'disconnect'});
	}

	/**
	 * 가입/로그인 공용 로그인 함수
	 */
	signIn(formData) {
		this.CacheSvc.resetAll();
		return this.$http({
			method: 'POST',
			url: ajax_url,
			headers: {'Content-Type': undefined},
			data: formData
		}).then((response) => {
			if (response.data.success) {
				this.logged = true;
				this.user_login = response.data.user_login;
				this.nationality = response.data.nationality;
				this.localize();
			}
			return response;
		});
	}

	/**
	 * 로그아웃/탈퇴 공용 로그아웃 함수
	 */
	signOut(param) {
		return this.$http({
			method: 'GET',
			url: ajax_url,
			params: param
		}).then((response) => {
			this.logged = false;
			this.user_login = null;
			return response;
		});
	}

	/**
	 * 비밀번호 sha256 해시. 로그인은 중복될 수 없으므로 간을 맞추는데 사용.
	 * @param login 워드프레스 로그인
	 * @param pwd 비밀번호
	 * @return string
	 */
	static hashPwd(login, pwd) {
		function hash(string) {
			let out = crypt.hash.sha256.hash(string);
			return crypt.codec.hex.fromBits(out);
		}

		let salt = hash(login);
		return hash(salt + pwd);
	}

	localize() {
		if (this.nationality === 'local') {
			this.localizer.setCurrentLanguage('ko');
		}
		else {
			this.localizer.setCurrentLanguage('en');
		}
	}
}

export default LoginSvc;