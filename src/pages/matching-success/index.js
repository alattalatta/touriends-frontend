// import param from 'jquery-param';

function MatchingSuccessCtrl($timeout) {
	this.repeater = new Array(12);

	this.datalist = [{
		uid: 888,
		url: 'http://imgnews.naver.com/image/5239/2015/03/04/209695_image_5_99_20150304181302.jpg',
		liked: true,
		language1: 'german',
		language2: 'japanese',
		language3: 'french',
		text: '안뇽하세여 저는 도길에서와써여',
		theme: 'k-pop'
	}, {
		uid: 777,
		url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg',
		liked: false,
		language1: 'japanese',
		text: '안뇽하세여 저는 니혼에서와써여',
		theme: 'exhibition'
	}];

	this.person = null;
	this.isChoice = false;

	this.getPersonClasses = function(idx) {
		let res = [];
		// 좋아요?
		let current = this.datalist[idx];
		if (current !== undefined && current.liked) {
			res.push('liked')
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
		if (idx >= this.datalist.length) {
			return null;
		}
		return {
			'background-image': `url(${this.datalist[idx].url})`
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
		return {
			'background-image': `url(${this.datalist[this.person].url})`,
			'opacity': 1
		};
	};

	this.language1Data = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].language1;
	};
	this.language2Data = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].language2;
	};
	this.language3Data = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].language3;
	};
	this.likedData = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].liked;
	};
	this.themeData = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].theme;
	};
	this.cancelShow = function () {
		this.isChoice = false;
		$timeout(() => {
			this.person = null;
		}, 350); // 250 = CSS transition-duration
	};
	this.isLiked = function () {
		this.datalist[this.person].liked =
			this.datalist[this.person].liked === false;
	};

	this.personText = function () {
		if (this.person === null) return null;
		return this.datalist[this.person].text;
	}
}
MatchingSuccessCtrl.$inject = ['$timeout'];

export default angular.module('touriends.page.matching-success', ['touriends']).controller('MatchingSuccessCtrl', MatchingSuccessCtrl).name;
