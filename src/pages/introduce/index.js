import param from 'jquery-param';

function IntroduceCtrl($http, $state) {
    this.image = null;
    this.intro = null;
    this.byte = 0;

    $http({
        method: 'POST',
        url: ajax_url,
        data: param({
            action: 'get_profile_image'
        })
    }).then((response) => {
        if (response.data.success === true) {
            this.image = response.data.image;
        }
    });

    this.byteCheck = function () {
        if (this.intro === null) return '0/60byte';
        this.byte = 0;
        for (var idx = 0; idx < this.intro.length; idx++) {
            var c = encodeURI(this.intro.charAt(idx));

            if (c.length === 1)
                this.byte++;
            else
                this.byte += 2;
        }

        return this.byte + '/60byte';
    };

    this.profileImage = function () {
        if (this.image === null) return null;
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
                action: 'submit_intro',
                intro: this.intro
            })
        }).then((response) => {
            if (response.data.success === true) {
                alert('hi, thank you');
            }
            $state.go('home'); // todo change
        });
    }
}
IntroduceCtrl.$inject = ['$http', '$state'];

export default angular.module('touriends.page.introduce', ['touriends']).controller('IntroduceCtrl', IntroduceCtrl).name;
