class MyCtrl {
	static get $inject() {
		return ['CacheSvc', 'LoginSvc', '$state']
	}
}

export default angular.module('touriends.page.my', ['touriends']).controller('MyCtrl', MyCtrl).name;