require('./style.less');

class ToastOverlay {
	static get $inject() {
		return ['OverlaySvc', 'ToastSvc', '$element', '$scope'];
	}

	constructor(OverlaySvc, ToastSvc, $element, $scope) {
		this.ToastSvc = ToastSvc;
		this.$scope = $scope;

		OverlaySvc.set('toast', $element[0]);
		this.message = null;
		this.$scope.$watch(() => { return this.ToastSvc.message }, () => {
			this.message = this.ToastSvc.message;
		});
	}

	dismiss() {
		this.ToastSvc.dismiss();
	}
}

let toastOverlay = {
	controller: ToastOverlay,
	template: require('./template.html')
};

export default toastOverlay;