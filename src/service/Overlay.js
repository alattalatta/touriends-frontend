/**
 * 슈퍼 오버레이 관리 서비스
 */
class OverlaySvc {
	static get $inject() {
		return ['$timeout']
	}

	constructor($timeout) {
		this.$timeout = $timeout;
		this.overlays = new Map();
	}

	get(key) {
		return this.overlays.get(key);
	}
	set(key, elem) {
		this.overlays.set(key, elem);
	}

	on(key, delay) {
		if (delay === undefined) delay = 0;
		this.$timeout(() => {
			this.overlays.get(key).classList.add('is-visible');
		}, delay);
	}
	off(key, delay) {
		if (delay === undefined) delay = 0;
		this.$timeout(() => {
			this.overlays.get(key).classList.remove('is-visible');
		}, delay);
	}
	toggle(key, delay) {
		if (delay === undefined) delay = 0;
		this.$timeout(() => {
			this.overlays.get(key).classList.toggle('is-visible');
		}, delay);
	}
}

export default OverlaySvc;