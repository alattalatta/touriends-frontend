require('./style.less');

class MainNavCtrl {
    static get $inject() {
        return ['ToastSvc', '$state'];
    }

    constructor(ToastSvc, $state) {
    	this.ToastSvc = ToastSvc;
    	this.$state = $state;
    }

    getIconClasses(stateName) {
    	let res = [stateName];
    	if (this.$state.is(stateName)) {
    		res.push('is-active');
	    }
	    return res;
    }

    go(stateName) {
    	this.$state.go(stateName);
    }
}

let mainNav = {
    controller: MainNavCtrl,
    template: require('./template.html')
};

export default mainNav;