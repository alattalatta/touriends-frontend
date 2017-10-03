/**
 * Alert 대용
 */
class ToastSvc {
	static get $inject() {
		return ['OverlaySvc', '$rootScope', '$timeout'];
	}

	constructor(OverlaySvc, $rootScope, $timeout) {
		this.OverlaySvc = OverlaySvc;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.message = null;
		this.pending = null;
	}

	async toggle(msg, apply) {
		this.message = msg;
		if (apply) {
			this.$rootScope.$apply();
		}

		if (this.pending) {
			this.$timeout.cancel(this.pending);
		}
		else {
			this.OverlaySvc.toggle('toast');
		}

		this.pending = this.$timeout(() => {
			this.OverlaySvc.toggle('toast');
		}, 2000);

		try {
			await this.pending;
			this.pending = null;
		}
		catch(e) {
			this.pending = null;
		}
		console.log('toggle2!');
	}
	dismiss() {
		if (this.pending) {
			this.$timeout.cancel(this.pending);
			this.OverlaySvc.toggle('toast');
		}
	}
}

export default ToastSvc;