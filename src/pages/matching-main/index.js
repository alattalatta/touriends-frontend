class MatchingMainCtrl {
	static get $inject() {
		return ['CacheSvc', 'OverlaySvc', '$state','gettext'];
	}

	constructor(CacheSvc, OverlaySvc, $state) {
		this.CacheSvc = CacheSvc;
		this.OverlaySvc = OverlaySvc;
		this.$state = $state;

		this.success = true;

		this.fetchData();
	}

	async fetchData() {
		this.CacheSvc.reset('getMatching');
		let res = await this.CacheSvc.get('getMatching');
		if (res.data.success) {
			this.OverlaySvc.off('loading');
			this.success = res.data.matching.length !== 0;
		}
	}

	goNext() {
		this.$state.go('matching-success');
	}
}

export default angular.module('touriends.page.matching-main', ['touriends']).controller('MatchingMainCtrl', MatchingMainCtrl).name;