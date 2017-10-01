class WhenCtrl {
	static get $inject() {
		return ['$state'];
	}

	constructor($state) {
		this.$state = $state;
	}
	goNext() {
		this.$state.go('where');
	}
}

export default angular.module('touriends.page.when', ['touriends']).controller('WhenCtrl', WhenCtrl).name;