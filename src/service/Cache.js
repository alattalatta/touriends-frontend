import param from 'jquery-param';

/**
 * AJAX 캐시 서비스
 * 화면에 표시하는 것만 넣고 민감정보는 넣지 말아야 함
 */
class CacheSvc {
	static get $inject() {
		return ['HttpSvc'];
	}

	constructor(HttpSvc) {
		this.HttpSvc = HttpSvc;
		this.map = new Map();
	}

	/**
	 * 캐시에서 서버 응답 회수, 없으면 새로 $http 후 성공 시(data.success === true) 응답 저장
	 * @param action AJAX 액션명
	 * @param params 액션명 제외한 AJAX 데이터 값
	 * @returns {Promise}
	 */
	get(action, params) {
		let key = this.HttpSvc.actionParamsCombined(action, params);
		let val = this.map.get(key);

		// 저장된게 없으면 AJAX 전송
		if (val === undefined) {
			console.log('Cache not found! Key:', key);
			return this.HttpSvc.request(action, params).then((response) => {
				if (response.data.success) {
					this.map.set(key, response);
				}
				return response;
			});
		}
		// 저장된게 있으면 그거 반환
		else {
			// 왜 Promise? => 저장된게 없는 경우 Promise 가 반환되니까 있는 경우도 Promise 로 맞춰야 함
			console.log('Cache found! Key/Val:', key, this.map.get(key));
			return new Promise((resolve) => {
				resolve(val);
			});
		}
	}

	/**
	 * 저장된 캐시 제거. 액션명에 데이터까지 모두 같아야 응답도 같음을 주의
	 * @param action AJAX 액션명
	 * @param params 액션명 제외한 AJAX 데이터 값
	 * @returns {boolean}
	 */
	reset(action, params) {
		let key = this.HttpSvc.actionParamsCombined(action, params);
		return this.map.delete(key);
	}
}

export default CacheSvc;