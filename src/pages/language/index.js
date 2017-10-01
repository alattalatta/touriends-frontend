import param from 'jquery-param';

function LanguageCtrl(CacheSvc, $http, $state) {
	this.datalist = ['Japanese', 'English', 'French', 'Chinese', 'German'];
	this.simage = null;
	
	// 서버에서 받아오기
	CacheSvc.get('get_language').then((response) => {
		if (response.data.success) {
			let indexOf = this.datalist.indexOf(response.data.language);
			if (indexOf !== -1) {
				this.simage = indexOf;
			}
		}
	});

	this.selectData = function (idx) {
		this.simage = idx; // 인덱스만 저장합니다 ^^~
	};

	this.selectImage = function () {
		if (this.simage === null) return null;

		return this.datalist[this.simage];
	};

	this.selectedTitle = function () {
		if (this.simage === null) return '　';
		return this.datalist[this.simage];
	};

	this.rmGray = function (idx) {
		if (this.simage === idx) {
			return {
				'opacity': '1'
			}
		}
		return null;
	};
	
	this.goNext = function() {
		$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'set_language',
				val: this.datalist[this.simage]
			})
		}).then((response) => {
			if (response.data.success) {
				CacheSvc.reset('get_language');
				$state.go('theme');
			}
		});
	}
}

LanguageCtrl.$inject = ['CacheSvc', '$http', '$state'];

export default angular.module('touriends.page.language', ['touriends']).controller('LanguageCtrl', LanguageCtrl).name;
