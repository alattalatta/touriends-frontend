class LoginCtrl {
	static get $inject() {
		return ['OverlaySvc', 'LoginSvc', '$state']
	}

	constructor(OverlaySvc, LoginSvc, $state) {
		this.OverlaySvc = OverlaySvc;
		this.LoginSvc = LoginSvc;
		this.$state = $state;

		this.form = document.getElementById('form_login');

        /**
         * 로그인 요청 전송 여부
         * true: 추가 요청을 방지
         * @type {boolean}
         */
		this.pending = false;
		this.loginObj = {
			login: null,
			pwd: null
		};
	}

	async login() {
		let formData = new FormData(this.form);

		this.pending = true;
		this.OverlaySvc.toggle('loading');
		let response = await this.LoginSvc.login(formData);
		this.pending = false;

		if (response.data.success) {
			await this.$state.go('main');
			this.OverlaySvc.toggle('loading');
		}
		else {
			this.OverlaySvc.toggle('loading');
			alert('Wrong ID/Password!');
			this.loginObj = {
				login: null,
				pwd: null
			}
		}
	}
}

export default angular.module('touriends.page.login', ['touriends']).controller('LoginCtrl', LoginCtrl).name;