class CommunityItemCtrl {
	static get $inject() {
		return ['HttpSvc', 'CacheSvc', 'OverlaySvc', '$stateParams','gettext'];
	}

	constructor(HttpSvc, CacheSvc, OverlaySvc, $stateParams) {
		this.HttpSvc = HttpSvc;
		this.CacheSvc = CacheSvc;
		this.OverlaySvc = OverlaySvc;
		this.$stateParams = $stateParams;

		this.data = {
			age: null,
			comment: null,
			image: null,
			intro: null,
			languages: [],
			liked: false,
			login: null,
			schedule: null,
			theme: null
		};

		this.fetchData();
	}

	async fetchData() {
		let res = await this.HttpSvc.request('getCommunityItem', {
			id: this.$stateParams.id
		});
		if (res.data.success) {
			this.data = res.data;
			console.log(this.data);
		}
		this.OverlaySvc.off('loading');
	}
}

export default angular.module('touriends.page.community-item', ['touriends'])
	.controller('CommunityItemCtrl', CommunityItemCtrl).name;