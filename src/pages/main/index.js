require('slick-carousel');

class MainCtrl {
	static get $inject() {
		return ['CacheSvc', 'HttpSvc', 'OverlaySvc', 'ToastSvc', '$scope', '$timeout', '$state','gettext'];
	}

	get CurrentIndex() {
		return this.current - 1;
	}
	get CurrentTouriends() {
		return this.dataList[this.CurrentIndex];
	}

	constructor(CacheSvc, HttpSvc, OverlaySvc, ToastSvc, $scope, $timeout, $state) {
		this.CacheSvc = CacheSvc;
		this.HttpSvc = HttpSvc;
		this.OverlaySvc = OverlaySvc;
		this.ToastSvc = ToastSvc;
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.$state = $state;
		this.current = 0;

		this.matched = false;
		this.dataList = [];
		this.init();
	}

	async init() {
		let matchChecker = this.CacheSvc.get('matchCheck');
		let bookmark = this.CacheSvc.get('getBookmark');

		let bookmarkRes = await bookmark;
		if (bookmarkRes.data.success) {
			this.dataList = bookmarkRes.data.liked;
			this.$timeout(() => {
				jQuery('.slick-target').slick({
					appendArrows: '.slick-arrows',
					centerMode: true,
					centerPadding: 0,
					nextArrow: "<div class='slick-arrow next'></div>",
					prevArrow: "<div class='slick-arrow prev'></div>"
				}).on('afterChange', (e, s, slide) => {
					this.current = slide;
					this.$scope.$digest();
				});
			}, 50);
		}
		let matchRes = await matchChecker;
		if (matchRes.data.success) {
			this.matched = matchRes.data.matching;
		}
		this.OverlaySvc.off('loading');
	}

	async start() {
		if (this.matched) {
			this.$state.go('matching-main');
		}
		else {
			this.OverlaySvc.on('loading');
			// 캐싱 우선
			let when = this.CacheSvc.get('get_calendar');
			let where = this.CacheSvc.get('get_place');
			let lang = this.CacheSvc.get('get_language');
			let theme = this.CacheSvc.get('get_theme');
			let comment = this.CacheSvc.get('get_tour_comment');
			await when;
			await where;
			await lang;
			await theme;
			await comment;

			// 끗
			await this.$state.go('when');
			this.OverlaySvc.off('loading');
		}
	}

	async like() {
		let idx = this.CurrentIndex;
		let uid = this.CurrentTouriends.uid;
		let res = await this.HttpSvc.request('bookmark', {
			like: uid
		});
		if (res.data.success) {
			this.dataList[idx].liked = res.data.like;
			this.CacheSvc.reset('getBookmark');
		}
		else {
			this.ToastSvc.toggle('Could not like user ' + uid);
		}
	}

	getPersonImage($index) {
		return {
			'background-image': `url(${this.dataList[$index].image})`
		};
	}
	getPersonLabel($index) {
		return `${this.dataList[$index].id} / ${this.dataList[$index].age}`;
	}
}

export default angular.module('touriends.page.main', ['touriends']).controller('MainCtrl', MainCtrl).name;
