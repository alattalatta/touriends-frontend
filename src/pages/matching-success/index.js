// import param from 'jquery-param';

function MatchingSuccessCtrl(CacheSvc, HttpSvc, OverlaySvc, ToastSvc, $timeout) {
	this.repeater = new Array(12);

	this.datalist = [];
	HttpSvc.request('getMatching').then((response) => {
		if (response.data.success) {
			this.datalist = response.data.matching;
		}
		OverlaySvc.off('loading');
	});

	this.person = null;
	this.isChoice = false;

	this.getPersonClasses = function(idx) {
		let res = [];

		let current = this.datalist[idx];
		if (current !== undefined) {
			res.push('occupied'); // 프사 없을 때 쓸 클래스
			
			if (current.liked) {
				res.push('liked'); // 오홍홍 조아용
			}
		}

		// Large / Middle / Small 중 택 1
		// 12개 중 4개씩 스케일이 달라지니까, 0 = L, 1 = M, 2 = S
		let scale = parseInt(idx / 4);
		switch (scale) {
			case 0:
				res.push('large');
				break;
			case 1:
				res.push('middle');
				break;
			case 2:
				res.push('small');
				break;
		}

		// First / Second / Third / Fourth  중 택 1
		// 4개마다 First 로 돌아가니까, idx % 4
		let pos = idx % 4;
		switch (pos) {
			case 0:
				res.push('first');
				break;
			case 1:
				res.push('second');
				break;
			case 2:
				res.push('third');
				break;
			case 3:
				res.push('fourth');
				break;
		}

		return res;
	};

	this.personData = function (idx) {
		if (idx >= this.datalist.length || this.datalist[idx].image === '') {
			return null;
		}
		return {
			'border': 'none',
			'background-image': `url(${this.datalist[idx].image})`
		}
	};

	this.selectPerson = function (idx) { // person 선택했을시
		if (idx >= this.datalist.length ||
			this.person !== null) {
			return;
		}
		this.person = idx;
		this.isChoice = true;
	};

	this.profileImage = function () {
		if (this.person === null) {
			return {
				'opacity': 0
			};
		}
		let res = {
			'opacity': 1
		};
		if (this.datalist[this.person].image !== '') {
			res['background-image'] = `url(${this.datalist[this.person].image})`;
		}
		return res;
	};

	this.cancelShow = function () {
		this.isChoice = false;
		$timeout(() => {
			this.person = null;
		}, 350); // 250 = CSS transition-duration
	};

	this.like = function () {
		HttpSvc.request('bookmark', {
			like: this.datalist[this.person].uid
		}).then((res) => {
			if (res.data.success) {
				this.datalist[this.person].liked = res.data.like;
			}
			else {
				ToastSvc.toggle('Could not like user ' + this.datalist[this.person].uid);
			}
			CacheSvc.reset('getBookmark');
		});
	};

	this.language1Data = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].languages[0];
	};
	this.language2Data = function () {
		if (this.person === null || this.datalist[this.person].languages[1] === undefined) return 'hidden';
		return this.datalist[this.person].languages[1];
	};
	this.language3Data = function () {
		if (this.person === null || this.datalist[this.person].languages[2] === undefined) return 'hidden';
		return this.datalist[this.person].languages[2];
	};
	this.isLiked = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].liked;
	};
	this.themeData = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].theme;
	};
	this.tourComment = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].comment === '' ? 'No comment' : this.datalist[this.person].comment;
	}
}
MatchingSuccessCtrl.$inject = ['CacheSvc', 'HttpSvc', 'OverlaySvc', 'ToastSvc', '$timeout'];

export default angular.module('touriends.page.matching-success', ['touriends']).controller('MatchingSuccessCtrl', MatchingSuccessCtrl).name;
