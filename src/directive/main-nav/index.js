require('./style.less');

class MainNavCtrl {
    static get $inject() {
        return ['OverlaySvc', '$state'];
    }

    constructor(OverlaySvc, $state) {
    	this.OverlaySvc = OverlaySvc;
    	this.$state = $state;
    }

    getIconClasses(stateName) {
    	let res = [stateName];
    	if (this.$state.current.name.indexOf(stateName) === 0) {
    		res.push('is-active');
	    }
	    return res;
    }

    go(stateName) {
    	if (this.$state.is(stateName)) {
    		return;
	    }

    	this.OverlaySvc.on('loading');
    	this.$state.go(stateName);
    }
}

let mainNav = {
    controller: MainNavCtrl,
    template: require('./template.html')
};

export default mainNav;