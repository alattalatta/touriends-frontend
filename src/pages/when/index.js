import param from 'jquery-param';
import leftPad from 'left-pad';

class WhenCtrl {
	static get $inject() {
		return ['ToastSvc', 'CacheSvc', '$http', '$state','gettext'];
	}

	constructor(ToastSvc, CacheSvc, $http, $state, gettext) {
		this.ToastSvc = ToastSvc;
		this.CacheSvc = CacheSvc;
		this.$http = $http;
		this.$state = $state;
		this.dateA = null;
		this.dateB = null;
		this.gettext = gettext;
		this.CacheSvc.get('get_calendar').then((response) => {
			if (response.data.success) {
				this.dateA = new Date(response.data.from + ' 00:00:00');
				this.dateB = new Date(response.data.to + ' 00:00:00');
			}
		})
	}

	async goNext() {
		if (this.dateA === null || this.dateB === null || isNaN(this.dateA.getTime()) || isNaN(this.dateB.getTime())) {
			this.ToastSvc.toggle(this.gettext('Please select two dates'));
			return;
		}

		// Month / Date = 두 자리
		let dateAMonth = leftPad(this.dateA.getMonth() + 1, 2, '0');
		let dateBMonth = leftPad(this.dateB.getMonth() + 1, 2, '0');
		let dateADate = leftPad(this.dateA.getDate(), 2, '0');
		let dateBDate = leftPad(this.dateB.getDate(), 2, '0');

		let from, to;
		if (this.dateA > this.dateB) {
			from = `${this.dateB.getFullYear()}-${dateBMonth}-${dateBDate}`;
			to = `${this.dateA.getFullYear()}-${dateAMonth}-${dateADate}`;
		}
		else {
			from = `${this.dateA.getFullYear()}-${dateAMonth}-${dateADate}`;
			to = `${this.dateB.getFullYear()}-${dateBMonth}-${dateBDate}`;
		}

		let response = await this.$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'calendar',
				from: from,
				to: to
			})
		});
		if (response.data.success) {
			this.CacheSvc.reset('get_calendar');
			this.$state.go('language');
		}
	}
}

export default angular.module('touriends.page.when', ['touriends']).controller('WhenCtrl', WhenCtrl).name;