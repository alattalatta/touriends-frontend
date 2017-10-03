function MainCtrl(CacheSvc, OverlaySvc, $state) {

	this.start = async function () {
		OverlaySvc.toggle('loading');
		// 캐싱 우선
		let when = CacheSvc.get('get_calendar');
		let where = CacheSvc.get('get_place');
		let lang = CacheSvc.get('get_language');
		let theme = CacheSvc.get('get_theme');
		await when;
		await where;
		await lang;
		await theme;

		// 끗
		console.log('done!');
		await $state.go('when');
		OverlaySvc.toggle('loading');
	};
}
MainCtrl.$inject = ['CacheSvc', 'OverlaySvc', '$state'];

export default angular.module('touriends.page.main', ['touriends']).controller('MainCtrl', MainCtrl).name;
