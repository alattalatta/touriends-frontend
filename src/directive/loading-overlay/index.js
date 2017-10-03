require('./style.less');

class LoadingOverlay {
	static get $inject() {
		return ['OverlaySvc', '$element'];
	}

	constructor(OverlaySvc, $element) {
		OverlaySvc.add('loading', $element[0]);
	}
}

let loadingOverlay = {
	bindings: {
		dateA: '=',
		dateB: '='
	},
	controller: LoadingOverlay,
	template: require('./template.html')
};

export default loadingOverlay;