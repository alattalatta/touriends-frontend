class LoginCtrl {
	static get $inject() {
		return ['ToastSvc', 'OverlaySvc', 'LoginSvc', '$state', 'gettext']
	}

	constructor(ToastSvc, OverlaySvc, LoginSvc, $state,gettext) {
		this.ToastSvc = ToastSvc;
		this.OverlaySvc = OverlaySvc;
		this.LoginSvc = LoginSvc;
		this.$state = $state;
		this.gettext=gettext;
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
		if (this.loginObj.login === null || this.loginObj.login === '') {
			this.ToastSvc.toggle('Please enter your ID');
			return;
		}
		if (this.loginObj.pwd === null || this.loginObj.pwd === '') {
			this.ToastSvc.toggle('Please enter your password');
			return;
		}

		let formData = new FormData(this.form);

		this.pending = true;
		this.OverlaySvc.on('loading');
		let response = await this.LoginSvc.login(formData);
		this.pending = false;

		if (response.data.success) {
			await this.$state.go('main');
			this.OverlaySvc.off('loading');
		}
		else {
			this.OverlaySvc.off('loading');
			this.ToastSvc.toggle('Wrong ID/Password', true);
			this.loginObj.pwd = null;
		}
	}
}

export default angular.module('touriends.page.login', ['touriends']).controller('LoginCtrl', LoginCtrl).name;