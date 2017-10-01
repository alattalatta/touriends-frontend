import param from 'jquery-param';

function IntroduceCtrl(LoginSvc, CacheSvc, $http, $state) {
    this.image = null;
    this.intro = null;
	this.login = LoginSvc.user_login;
    this.byte = 0;

	// 자기소개 가져오기
	CacheSvc.get('get_intro').then((response) => {
		if (response.data.success) {
			this.intro = response.data.intro;
		}
	});

	// 프사 가져오기
	CacheSvc.get('get_profile_image').then((response) => {
		if (response.data.success) {
			this.image = response.data.image;
		}
	});

    this.byteCheck = function () {
        if (this.intro === null) return '0/60byte';
        this.byte = 0;
	    for (let idx = 0; idx < this.intro.length; idx++) {
		    let c = encodeURI(this.intro.charAt(idx));

            if (c.length === 1)
                this.byte++;
            else
                this.byte += 2;
        }

        return this.byte + '/60byte';
    };

    this.profileImage = function () {
        if (! this.image) return null;
        return {
            'background-image': `url(${this.image})`
        };
    };

    this.submitIntro = function () {
	    if (this.byte > 60) {
		    return;
	    }
	    $http({
		    method: 'POST',
		    url: ajax_url,
		    data: param({
			    action: 'set_intro',
			    intro: this.intro
		    })
	    }).then((response) => {
		    if (response.data.success) {
			    CacheSvc.delete('get_intro');
			    $state.go('main');
		    }
		    else {
			    alert('설정에 실패했어요!'); // todo change message
			    console.log(response.data);
		    }
	    });
    }
}

IntroduceCtrl.$inject = ['LoginSvc', 'CacheSvc', '$http', '$state'];

export default angular.module('touriends.page.introduce', ['touriends']).controller('IntroduceCtrl', IntroduceCtrl).name;
