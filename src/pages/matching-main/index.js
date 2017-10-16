class MatchingMainCtrl {
	static get $inject() {
		return ['OverlaySvc', '$state'];
	}

	constructor(OverlaySvc, $state) {
		this.$state = $state;

		OverlaySvc.off('loading');
	}

	goNext() {
		this.$state.go('matching-success');
	}
}

export default angular.module('touriends.page.matching-main', ['touriends']).controller('MatchingMainCtrl', MatchingMainCtrl).name;