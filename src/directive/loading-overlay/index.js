require('./style.less');

class LoadingOverlay {
	static get $inject() {
		return ['OverlaySvc', '$element'];
	}

	constructor(OverlaySvc, $element) {
		OverlaySvc.set('loading', $element[0]);
	}
}

let loadingOverlay = {
	controller: LoadingOverlay,
	template: require('./template.html')
};

export default loadingOverlay;