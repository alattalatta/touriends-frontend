class CommunityListCtrl {
	static get $inject() {
		return ['HttpSvc', 'CacheSvc', 'OverlaySvc', 'ToastSvc', '$state'];
	}

	set Language(val) {
		if (this.language === val) {
			this.language = null;
		}
		else {
			this.language = val;
		}
	}

	constructor(HttpSvc, CacheSvc, OverlaySvc, ToastSvc, $state) {
		this.HttpSvc = HttpSvc;
		this.CacheSvc = CacheSvc;
		this.OverlaySvc = OverlaySvc;
		this.ToastSvc = ToastSvc;
		this.$state = $state;

		this.dataList = [];
		this.language = null;
		this.ages = [0, 40];
		this.keyword = null;
		this.filterOpened = false;

		this.fetchData();
	}

	async fetchData(keyword) {
		let res = await this.HttpSvc.request('getCommunityList', {
			keyword: keyword,
			language: this.language
		});
		console.log(res.data);

		if (! res.data.success) {
			this.OverlaySvc.off('loading');
			this.ToastSvc.toggle('Could not get community list');
		}
		else {
			this.OverlaySvc.off('loading');
			this.dataList = res.data.users;
		}
	}

	async like($index) {
		let uid = this.dataList[$index].id;
		this.dataList[$index].liked = ! this.dataList[$index].liked;
		let res = await this.HttpSvc.request('bookmark', {
			like: uid,
			override: this.dataList[$index].liked
		});
		if (res.data.success) {
			console.log(res.data);
			this.CacheSvc.reset('getBookmark');
		}
		else {
			this.ToastSvc.toggle('Could not like user ' + uid);
		}
	}

	openFilter() {
		this.filterOpened = true;
	}
	async closeFilter() {
		await this.fetchData(this.keyword);
		this.filterOpened = false;
	}

	languageClass(key) {
		return this.language === key ? 'is-active' : null;
	}

	go($index) {
		let uid = this.dataList[$index].id;
		this.OverlaySvc.on('loading');
		this.$state.go('community-item', {
			id: uid
		});
	}
}

export default angular.module('touriends.page.community-list', ['touriends'])
	.controller('CommunityListCtrl', CommunityListCtrl).name;