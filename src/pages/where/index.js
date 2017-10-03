import param from 'jquery-param';

class WhereCtrl {
	static get $inject() {
		return ['ToastSvc', 'CacheSvc', '$http', '$state'];
	}

	constructor(ToastSvc, CacheSvc, $http, $state) {
		this.ToastSvc = ToastSvc;
		this.CacheSvc = CacheSvc;
		this.$http = $http;
		this.$state = $state;

		this.places = ['Eunpyeong', 'Gangbuk', 'Dobong', 'Gangnam'
			, 'Jongno', 'Seongbuk', 'Dongdaemun', 'Mapo',
			'Gangseo', 'Jung-gu', 'Seong-dong', 'Nowon',
			'Yeongdeungpo', 'Yangcheon', 'Dongjak', 'Seocho',
			'Songpa', 'Gangdong', 'Guro', 'Geumcheon',
			'Gwanak', 'Gwangjin', 'Jungnang', 'Yongsan', 'Seodaemun'];
		this.place = null; // 인덱스

		this.CacheSvc.get('get_place').then((response) => {
			if (response.data.success) {
				let indexOf = this.places.indexOf(response.data.place);
				// -1 = no such place
				if (indexOf !== -1) {
					this.place = indexOf;
				}
			}
		});
	}

	selectWhere($index) {
		this.place = $index;
	}

	async goNext() {
		if (this.place === null) {
			this.ToastSvc.toggle('Please select a place');
			return;
		}

		let response = await this.$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'place',
				place: this.places[this.place]
			})
		});
		if (response.data.success) {
			this.CacheSvc.reset('get_place');
			this.$state.go('language');
		}
	}
}


export default angular.module('touriends.page.where', ['touriends']).controller('WhereCtrl', WhereCtrl).name;