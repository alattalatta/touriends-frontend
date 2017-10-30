class CommunityItemCtrl {
	static get $inject() {
		return ['HttpSvc', 'CacheSvc', 'ToastSvc', 'OverlaySvc', '$state', '$stateParams'];
	}

	constructor(HttpSvc, CacheSvc, ToastSvc, OverlaySvc, $state, $stateParams) {
		this.HttpSvc = HttpSvc;
		this.CacheSvc = CacheSvc;
		this.ToastSvc = ToastSvc;
		this.OverlaySvc = OverlaySvc;
		this.$state = $state;
		this.$stateParams = $stateParams;

		this.uid = this.$stateParams.id;
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
			id: this.uid
		});
		if (res.data.success) {
			this.data = res.data;
			console.log(this.data);
		}
		this.OverlaySvc.off('loading');
	}

	async like() {
		this.data.liked = ! this.data.liked;
		let res = await this.HttpSvc.request('bookmark', {
			like: this.uid,
			override: this.data.liked
		});
		if (res.data.success) {
			this.CacheSvc.reset('getBookmark');
		}
		else {
			this.ToastSvc.toggle('Could not like user ' + this.uid);
		}
	}

	goBack() {
		this.$state.go('community-list');
	}
}

export default angular.module('touriends.page.community-item', ['touriends'])
	.controller('CommunityItemCtrl', CommunityItemCtrl).name;