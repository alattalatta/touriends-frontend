import param from 'jquery-param';

function ThemeCtrl(CacheSvc, $http, $state) {
	this.datalist = ['k-pop', 'food', 'exhibition', 'culture', 'activity'];
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

	this.selectData = function (idx) {
		this.simage = idx; // 인덱스만 저장합니다 ^^~
	};

	this.selectImage = function () {
		if (this.simage === null) return null;

		return this.datalist[this.simage];
	};

	this.selectedTitle = function () {
		if (this.simage === null) return '　';
		return this.datalist[this.simage].toUpperCase();
	};

	this.rmGray = function (idx) {
		if (this.simage === idx) {
			return {
				'filter': 'none'
			}
		}
		return null;
	};

	this.goNext = function() {
		$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'set_theme',
				val: this.datalist[this.simage]
			})
		}).then((response) => {
			if (response.data.success) {
				CacheSvc.reset('get_theme');
				$state.go('main');
			}
		});
	}
}

ThemeCtrl.$inject = ['CacheSvc', '$http', '$state'];

export default angular.module('touriends.page.theme', ['touriends']).controller('ThemeCtrl', ThemeCtrl).name;
