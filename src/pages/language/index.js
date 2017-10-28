import param from 'jquery-param';

class LanguageCtrl {
	static get $inject() {
		return ['ToastSvc', 'CacheSvc', '$http', '$state','gettext'];
	}

	constructor(ToastSvc, CacheSvc, $http, $state) {
		this.ToastSvc = ToastSvc;
		this.CacheSvc = CacheSvc;
		this.$http = $http;
		this.$state = $state;

		this.datalist = [gettext('japanese'), gettext('korean'), gettext('english'),gettext('french'), gettext('chinese'), gettext('german')];
		this.dataChecked = [false, false, false, false, false];
		this.simage = null;
		this.simageCnt = 0;

		// 서버에서 받아오기
		this.retrieveData();
	}

	async retrieveData() {
		let response = await this.CacheSvc.get('get_language');
		if (response.data.success) {
			for (let lang of response.data.language) {
				let indexOf = this.datalist.indexOf(lang);
				if (indexOf !== -1) {
					this.dataChecked[indexOf] = true;
					this.simageCnt++;
					this.simage = indexOf;
				}
			}
		}
	}

	selectData(idx) {
		if (this.simageCnt === 3 && this.dataChecked[idx] === false) {
			this.ToastSvc.toggle(gettext('Already chose three. Please uncheck one first'));
			return;
		}

		this.dataChecked[idx] = ! this.dataChecked[idx];
		if (this.dataChecked[idx]) {
			this.simage = idx;
			this.simageCnt++;
		}
		else {
			this.simageCnt--;
		}
	}
	rmGray(idx) {
		if (this.dataChecked[idx]) {
			return {
				'opacity': '1'
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
		return this.datalist[this.simage];
	}

	async goNext() {
		if (this.simageCnt === 0) {
			this.ToastSvc.toggle(gettext('Please select at least 1 language'));
			return;
		}

		let languages = [];
		for (let i = 0; i < this.datalist.length; i++) {
			if (this.dataChecked[i]) {
				languages.push(this.datalist[i]);
			}
		}

		let response = await this.$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'language',
				language: languages
			})
		});
		if (response.data.success) {
			this.CacheSvc.reset('get_language');
			this.$state.go('theme');
		}
	}
}

export default angular.module('touriends.page.language', ['touriends']).controller('LanguageCtrl', LanguageCtrl).name;
