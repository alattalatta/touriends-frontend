function Message(OverlaySvc, $timeout, HttpSvc, CacheSvc, $stateParams, $state) {
	this.getCommunication = function () {
		HttpSvc.request('getConversation', {
			other: $stateParams.id
		}).then((res) => {
			if (res.data.success) {
				this.communication = res.data.messages;
			}
			else {
				console.log('no');
			}
		});
	};

	this.isMe = function (idx) {
		return '1' === this.communication[idx].is_mine;

	};
	this.personImage = function (idx) {
		if (this.communication[idx].is_mine === '1' && this.image) {
			return {
				'background-image': `url(${this.image})`
			}
		}
		if (this.communication[idx].is_mine === '0' && this.you.url) {
			return {
				'background-image': `url(${this.you.url})`
			}
		}
	};
	this.communicationShow = function (idx) {
		if (idx === 0)
			return true;
		else if (this.communication[idx].is_mine === this.communication[idx - 1].is_mine)
			return false;
		return true;
	};

	this.nextMessage = function (idx) { //연속 메세지는 프로필 안나오게 하려는고
		let class_data = null;
		if (this.communication[idx].is_mine === "1") {
			class_data = 'next-my-message';
		} else {
			class_data = 'next-you-message';
		}
		if (idx === 0) return;
		else if (this.communication[idx].is_mine === this.communication[idx - 1].is_mine) {
			return class_data;
		}
		return;
	};

	this.btnSend = function () { //보내기 버튼 누르면 되는고
		console.log({'msg': this.message_text});
		HttpSvc.request('sendMessage', {
			other: $stateParams.id,
			note: this.message_text
		}).then((res) => {
			console.log(res.data);
			if (res.data.success) {
				this.getCommunication();
			}
			else {
				console.log('nono');
			}
		});
		this.message_text = '';
		$timeout(() => {
			this.scrollBottom();
		}, 300);
	};

	this.btn_disabled = true;

	this.activeBtn = function () { //버튼 활성화
		if (this.message_text === '') {
			this.btn_disabled = true;
			return 'btn-disabled';
		}
		this.btn_disabled = false;
		return 'btn-active';
	};

	this.scrollBottom = function() {
		let objDiv = document.querySelector(".communication-box");
		objDiv.scrollTop = objDiv.scrollHeight;
	};
	this.message_text = '';
	this.you = {
		name: null,
		url: null
	};

	//상대방 정보 AJAX
	HttpSvc.request('otherInfo', {
		other: $stateParams.id
	}).then((res) => {
		if (res.data.success) {
			this.you.name = res.data.other_name;
			this.you.url = res.data.other_image;
		}
		else {
			console.log('no');
		}
	});
	HttpSvc.request('read_check', {
		other: $stateParams.id
	});
	this.getCommunication();

	CacheSvc.get('get_profile_image').then((response) => {
		if (response.data.success) {
			// 받아오기 성공
			this.image = response.data.image;
		}
	});

	$timeout(() => {
		this.scrollBottom();
	}, 300);

	this.go = function (stateName) {
		if ($state.is(stateName)) {
			return;
		}
		OverlaySvc.on('loading');
		$state.go(stateName);
	}
	OverlaySvc.off('loading');


}

Message.$inject = ['OverlaySvc', '$timeout', 'HttpSvc', 'CacheSvc', '$stateParams', '$state'];

export default angular.module('touriends.page.message', ['touriends']).controller('Message', Message).name;
