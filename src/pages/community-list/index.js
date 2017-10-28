class CommunityListCtrl {
	static get $inject() {
		return ['HttpSvc', 'CacheSvc', 'OverlaySvc', 'ToastSvc', '$state'];
	}

	set Age(val) {
		this.ages[this.ageSelectMode] = val;
		if (this.ages[0] > this.ages[1]) {
			let tmp = this.ages[1];
			this.ages[1] = this.ages[0];
			this.ages[0] = tmp;
		}
		this.ageSelectMode = this.ageSelectMode === 1 ? 0 : 1;
		console.log(this.ages);
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
		this.ageSelectMode = 1; // 0 = min, 1 = max
		this.keyword = null;
		this.filterOpened = false;

		this.fetchData();
	}

	async fetchData(keyword) {
		let res = await this.HttpSvc.request('getCommunityList', {
			keyword: keyword,
			language: this.language,
			ages: this.ages
		});

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

	ageItemClass(key) {
		return this.ages[0] <= key && this.ages[1] >= key ? 'is-active' : null;
	}
	ageHorizontalClass(min, max) {
		return this.ages[0] <= min && this.ages[1] >= max ? 'is-active' : null;
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