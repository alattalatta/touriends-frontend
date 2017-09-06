class HomeCtrl {
	static get $inject() {
		return ['$state', 'LoginSvc'];
	}

	constructor($state, LoginSvc) {
		this.$state = $state;
		this.LoginSvc = LoginSvc;
	}

	logout() {
		this.LoginSvc.logout().then(() => {
			this.$state.go('login');
		});
	}
}

export default HomeCtrl;