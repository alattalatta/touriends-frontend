import param from 'jquery-param';

class ThemeCtrl {
	static get $inject() {
		return ['ToastSvc', 'CacheSvc', '$http', '$state','gettext'];
	}

	constructor(ToastSvc, CacheSvc, $http, $state) {
		this.ToastSvc = ToastSvc;
		this.CacheSvc = CacheSvc;
		this.$http = $http;
		this.$state = $state;

		this.datalist = [gettext('k-pop'), gettext('food'), gettext('exhibition'), gettext('culture'), gettext('activity')];
		this.simage = null;

		// 서버에서 받아오기
		CacheSvc.get('get_theme').then((response) => {
			if (response.data.success) {
				let indexOf = this.datalist.indexOf(response.data.theme);
				if (indexOf !== -1) {
					this.simage = indexOf;
				}
			}
		});
	}

	selectData(idx) {
		this.simage = idx; // 인덱스만 저장합니다 ^^~
	}
	rmGray(idx) {
		if (this.simage === idx) {
			return {
				'filter': 'none'
			}
		}
		return null;
	}

	selectedImage() {
		if (this.simage === null) return null;
		return this.datalist[this.simage];
	}
	selectedTitle() {
		if (this.simage === null) return '　';
		return this.datalist[this.simage].toUpperCase();
	}

	async goNext() {
		if (this.simage === null) {
			this.ToastSvc.toggle(gettext('Please select a theme'));
			return;
		}

		let response = await this.$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'theme',
				theme: this.datalist[this.simage]
			})
		});
		if (response.data.success) {
			this.CacheSvc.reset('get_theme');
			this.$state.go('long-comment');
		}
	}
}

export default angular.module('touriends.page.theme', ['touriends']).controller('ThemeCtrl', ThemeCtrl).name;
