import param from 'jquery-param';

/**
 * AJAX 캐시 서비스
 * 화면에 표시하는 것만 넣고 민감정보는 넣지 말아야 함
 */
class HttpSvc {
	static get $inject() {
		return ['$http'];
	}

	constructor($http) {
		this.$http = $http;
	}

	request(action, params) {
		let data = this.actionParamsCombined(action, params);

		return this.$http({
			method: 'POST',
			url: ajax_url,
			data: data
		});
	}

	actionParamsCombined(action, params) {
		let key = {
			action: action
		};
		if (params) {
			key = Object.assign(key, params);
		}
		return param(key);
	}
}

export default HttpSvc;