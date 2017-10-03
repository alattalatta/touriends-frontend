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

	disconnect() {
		this.LoginSvc.disconnect().then(() => {
			this.$state.go('login');
		});
	}
}

export default angular.module('touriends.page.home', ['touriends']).controller('HomeCtrl', HomeCtrl).name;