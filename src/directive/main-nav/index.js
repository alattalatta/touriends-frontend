require('./style.less');

class MainNavCtrl {
    static get $inject() {
        return ['$state'];
    }

    constructor($state) {
    	this.$state = $state;
    }

    getIconClasses(stateName) {
    	let res = [stateName];
    	if (this.$state.is(stateName)) {
    		res.push('is-active');
	    }
	    return res;
    }
}

let mainNav = {
    controller: MainNavCtrl,
    template: require('./template.html')
};

export default mainNav;