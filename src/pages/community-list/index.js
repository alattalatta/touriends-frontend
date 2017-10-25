class CommunityListCtrl {
	static get $inject() {
		return ['OverlaySvc'];
	}

	constructor(OverlaySvc) {
		OverlaySvc.off('loading');

		this.dataList = [{
			uid: 777,
			id: 'kimgapsu7',
			age: 23,
			image: 'http://fimg2.pann.com/new/download.jsp?FileID=31360266',
			theme: 'k-pop',
			languages: ['korean', 'english', 'french'],
			intro: '60 byte long',
			liked: false
		}, {
			uid: 788,
			id: 'kimgapsu8',
			age: 32,
			image: 'http://fimg2.pann.com/new/download.jsp?FileID=31360266',
			theme: 'k-pop',
			languages: ['english', 'french'],
			intro: '60 byte long',
			liked: true
		}, {
			uid: 931,
			id: 'kimgapsu9',
			age: 33,
			image: 'http://fimg2.pann.com/new/download.jsp?FileID=31360266',
			theme: 'k-pop',
			languages: ['korean'],
			intro: '60 byte long',
			liked: false
		}];
	}

	like($index) {
		let uid = this.dataList[$index];
		uid.liked = ! uid.liked;
	}
}

export default angular.module('touriends.page.community-list', ['touriends'])
	.controller('CommunityListCtrl', CommunityListCtrl).name;