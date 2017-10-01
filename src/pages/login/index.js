class LoginCtrl {
	static get $inject() {
		return ['$state', 'LoginSvc']
	}

	constructor($state, LoginSvc) {
		this.$state = $state;
		this.LoginSvc = LoginSvc;

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

	login() {
		let formData = new FormData(this.form);

		this.pending = true;
		this.LoginSvc.login(formData).then((response) => {
			this.pending = false;
			if (response.data.success) {
				this.$state.go('main');
			}
			else {
				alert('Wrong ID/Password!');
			}
			this.loginObj = {
				login: null,
				pwd: null
			}
		});
	}
}

export default angular.module('touriends.page.login', ['touriends']).controller('LoginCtrl', LoginCtrl).name;