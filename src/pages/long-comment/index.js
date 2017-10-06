import param from 'jquery-param';

function LongCommentCtrl(ToastSvc, CacheSvc, $http, $state) {
	this.content = null;
	this.byte = 0;

	CacheSvc.get('get_tour_comment').then((response) => {
		if (response.data.success) {
			this.content = response.data.comment;
		}
	});

	this.byteCheck = function () {
		if (! this.content) {
			return '0/300byte';
		}

		this.byte = 0;
		for (let idx = 0; idx < this.content.length; idx++) {
			let c = encodeURI(this.content.charAt(idx));

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
				action: 'tour_comment',
				comment: this.content
			})
		}).then((response) => {
			console.log(response);
			if (response.data.success) {
				CacheSvc.reset('get_tour_comment');
				$state.go('matching-main');
			}
			else {
				ToastSvc.toggle('Failed to update tour comment');
			}
		});
	}
}

LongCommentCtrl.$inject = ['ToastSvc', 'CacheSvc', '$http', '$state'];


export default angular.module('touriends.page.long-comment', ['touriends']).controller('LongCommentCtrl', LongCommentCtrl).name;