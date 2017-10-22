class MyCtrl {
	static get $inject() {
		return ['ToastSvc', 'OverlaySvc', 'CacheSvc', 'LoginSvc', '$scope', '$http', '$state']
	}

	get ProfileImage() {
		if (! this.image) {
			return null;
		}
		let rotation;
		switch (this.imageOrientation) {
			case 'left':
				rotation = 'rotate(90deg)';
				break;
			case 'right':
				rotation = 'rotate(-90deg)';
				break;
			case 'bottom':
				rotation = 'rotate(180deg)';
				break;
			default:
				rotation = null;
		}
		return {
			'background-image': `url(${this.image})`,
			'transform': rotation
		};
	}

	constructor(ToastSvc, OverlaySvc, CacheSvc, LoginSvc, $scope, $http, $state) {
		this.OverlaySvc = OverlaySvc;
		this.CacheSvc = CacheSvc;
		this.LoginSvc = LoginSvc;
		this.$state = $state;

		this.image = null;
		this.imageData = null;
		this.imageOrientation = null;

		this.user_login = LoginSvc.user_login;
		this.schedule = null;
		this.intro = null;
		this.theme = null;
		this.languages = null;

		this.fetchData();

		// 프사 업로드 시...
		$scope.$on('imageUploaderOnLoad', () => {
			let data = new FormData();
			data.set('action', 'set_profile_image');
			data.append('image', this.imageData);

			// 업로드?
			$http({
				method: 'POST',
				url: ajax_url,
				headers: {'Content-Type': undefined},
				data: data
			}).then((response) => {
				// 업로드 성공
				if (response.data.success) {
					// 다시 URL 로 받아오기?
					CacheSvc.reset('get_profile_image');
					CacheSvc.get('get_profile_image').then((response) => {
						if (response.data.success) {
							// 받아오기 성공
							this.image = response.data.image;
							ToastSvc.toggle('Profile image changed')
						}
					});
				}
				else {
					// 업로드 실패. 받아오기가 실패할 수 있을까...
					ToastSvc.toggle('Upload failed');
				}
			});
		});
	}

	async fetchData() {
		// 프사
		let imageData = this.CacheSvc.get('get_profile_image');
		// 스케쥴 (달력 + 포맷)
		let scheduleData = this.CacheSvc.get('get_schedule');
		// 60소개
		let introData = this.CacheSvc.get('get_intro');
		// 테마
		let themeData = this.CacheSvc.get('get_theme');
		// 언어
		let languageData = this.CacheSvc.get('get_language');

		let imageRes = await imageData;
		let scheduleRes = await scheduleData;
		let introRes = await introData;
		let themeRes = await themeData;
		let languagesRes = await languageData;

		this.image = imageRes.data.image;
		this.schedule = scheduleRes.data.schedule;
		this.intro = introRes.data.intro;
		this.theme = themeRes.data.theme;
		this.languages = languagesRes.data.language;

		this.OverlaySvc.off('loading');
	}

	async logout() {
		let response = await this.LoginSvc.logout();
		if (response.data.success) {
			this.$state.go('login');
		}
	}
}

export default angular.module('touriends.page.my', ['touriends']).controller('MyCtrl', MyCtrl).name;