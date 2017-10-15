class MatchingMainCtrl {
	static get $inject() {
		return ['$state'];
	}

	constructor($state) {
		this.$state = $state;
	}

	goNext() {
		this.$state.go('matching-success');
	}
}

export default angular.module('touriends.page.matching-main', ['touriends']).controller('MatchingMainCtrl', MatchingMainCtrl).name;