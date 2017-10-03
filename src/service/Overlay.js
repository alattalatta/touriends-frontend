/**
 * 슈퍼 오버레이 관리 서비스
 */
class OverlaySvc {
	constructor() {
		this.overlays = new Map();
	}

	get(key) {
		return this.overlays.get(key);
	}
	set(key, elem) {
		this.overlays.set(key, elem);
	}

	toggle(key) {
		let overlay = this.overlays.get(key);
		if (overlay === undefined) {
			throw new Error('Invalid overlay key');
		}
		else {
			overlay.classList.toggle('is-visible');
		}
	}
}

export default OverlaySvc;