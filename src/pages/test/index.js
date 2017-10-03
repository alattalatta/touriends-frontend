import param from 'jquery-param';

class TestSuiteCtrl {
	static get $inject() {
		return ['ToastSvc', '$http'];
	}

	constructor(ToastSvc, $http) {
		this.ToastSvc = ToastSvc;
		this.$http = $http;
		this.form = document.querySelector('form');
		this.action = null;
		this.params = [{
			key: null,
			value: null
		}];
	}

	addParam() {
		this.params.push({
			key: null,
			value: null
		});
	}
	removeParam($index) {
		this.params.splice($index, 1);
	}

	async submit() {
		let formData = new FormData(this.form);
		let action = formData.get('action');
		if (! action) {
			this.ToastSvc.toggle('액션이 없어요!');
			return;
		}
		console.log('Form:', formData);

		try {
			let response = await this.$http({
				method: 'POST',
				url: ajax_url,
				data: formData,
				headers: {'Content-Type': undefined}
			});
			this.ToastSvc.toggle('성공!', true);
			console.log(response);
		}
		catch (e) {
			this.ToastSvc.toggle(`${e.status} 오류 발생`, true);
		}
	}
}

export default angular.module('touriends.page.test', ['touriends']).controller('TestSuiteCtrl', TestSuiteCtrl).name;