class MatchingMainCtrl {
	static get $inject() {
		return ['$state', 'LoginSvc']
	}
}

export default angular.module('touriends.page.matching-main', ['touriends']).controller('MatchingMainCtrl', MatchingMainCtrl).name;