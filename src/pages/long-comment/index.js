import param from 'jquery-param';

function LongCommentCtrl($http, $state) {
	//this.image = null;
	//this.intro = null;
	//this.login = 'ID';
	//this.byte = 0;
	/*
		$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: 'get_intro_data'
			})
		}).then((response) => {
			console.log(response);
			if (response.data.success === true) {
				this.image = response.data.url;
				this.login = response.data.login;
			}
		});
	*/  // 따로 봐야하고 이부분은

	this.byteCheck = function () {
		if (this.intro === null) return '0/300byte';
		this.byte = 0;
		for (var idx = 0; idx < this.intro.length; idx++) {
			var c = encodeURI(this.intro.charAt(idx));

			if (c.length === 1)
				this.byte++;
			else
				this.byte += 2;
		}

		return this.byte + '/300byte';
	};

	this.submitLongComment = function () {
		if (this.byte > 300) {
			return;
		}
		$http({
			method: 'POST',
			url: ajax_url,
			data: param({
				action: '',
				comments: this.comment
			})
		}).then((response) => {
			console.log('')

			if (response.data.success) {
				$state.go('main');
			}
			else {
				console.log('Not Good');
			}
		});
	}
}

LongCommentCtrl.$inject = ['$http', '$state'];


export default angular.module('touriends.page.long-comment', ['touriends']).controller('LongCommentCtrl', LongCommentCtrl).name;