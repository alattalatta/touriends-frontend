function MainCtrl(CacheSvc, $state) {

	this.start = async function () {
		// 캐싱 우선
		let when = CacheSvc.get('get_calendar');
		let where = CacheSvc.get('get_place');
		await when;
		await where;

		// 끗
		console.log('done!');
		$state.go('when');
	};
}

MainCtrl.$inject = ['CacheSvc', '$state'];
export default angular.module('touriends.page.main', ['touriends']).controller('MainCtrl', MainCtrl).name;
