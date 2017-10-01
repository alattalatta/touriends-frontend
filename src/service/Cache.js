import param from 'jquery-param';

/**
 * AJAX 캐시 서비스
 * 화면에 표시하는 것만 넣고 민감정보는 넣지 말아야 함
 */
class CacheSvc {
	static get $inject() {
		return ['$http'];
	}

	constructor($http) {
		this.$http = $http;

		this.map = new Map();
	}

	get(action, params) {
		let key = CacheSvc.actionParamsCombined(action, params);
		let val = this.map.get(key);

		// 저장된게 없으면 AJAX 전송
		if (val === undefined) {
			console.log('Cache not found! Key:', key);
			return this.$http({
				method: 'POST',
				url: ajax_url,
				data: key
			}).then((response) => {
				if (response.data.success) {
					this.map.set(key, response);
				}
				return response;
			});
		}
		// 저장된게 있으면 그거 반환
		else {
			// 왜 Promise? => 저장된게 없는 경우 Promise 가 반환되니까 있는 경우도 맞춰야 함
			console.log('Cache found! Key/Val:', key, this.map.get(key));
			return new Promise((resolve) => {
				resolve(val);
			});
		}
	}

	set(action, params, val) {
		let key = CacheSvc.actionParamsCombined(action, params);
		return this.map.set(key, val);
	}

	reset(action, params) {
		let key = CacheSvc.actionParamsCombined(action, params);
		return this.map.delete(key);
	}

	static actionParamsCombined(action, params) {
		let key = {
			action: action
		};
		if (params) {
			key = Object.assign(key, params);
		}
		return param(key);
	}
}

export default CacheSvc;