class CommunityListCtrl {
	static get $inject() {
		return ['HttpSvc', 'CacheSvc', 'OverlaySvc', 'ToastSvc', '$state', 'gettext'];
	}

	get Languages() {
		return this.languages.reduce((acc, cur, idx) => {
			if (cur) {
				acc.push(this.langs[idx]);
			}
			return acc;
		}, []);
	}

	constructor(HttpSvc, CacheSvc, OverlaySvc, ToastSvc, $state) {
		this.HttpSvc = HttpSvc;
		this.CacheSvc = CacheSvc;
		this.OverlaySvc = OverlaySvc;
		this.ToastSvc = ToastSvc;
		this.$state = $state;

		this.dataList = [];
		this.languages = [false, false, false, false, false, false];
		this.keyword = null;
		this.filterOpened = false;

		this.langs = [gettext('Japanese'), gettext('Korean'), gettext('English'), gettext('French'), gettext('Chinese'), gettext('German')];

		this.fetchData();
	}

	async fetchData(keyword) {
		console.log(this.Languages);
		let res = await this.HttpSvc.request('getCommunityList', {
			keyword: keyword,
			languages: this.Languages
		});

		if (! res.data.success) {
			this.OverlaySvc.off(gettext('loading'));
			this.ToastSvc.toggle(gettext('Could not get community list'));
		}
		else {
			this.OverlaySvc.off(gettext('loading'));
			this.dataList = res.data.users;
		}
	}

	async like($index) {
		let uid = this.dataList[$index].id;
		this.dataList[$index].liked = ! this.dataList[$index].liked;
		console.log(this.dataList[$index].liked);
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