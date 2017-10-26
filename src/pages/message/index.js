import param from 'jquery-param';

function Message(OverlaySvc, $timeout, HttpSvc, LoginSvc, CacheSvc, $stateParams) {
  this.message_text='';
  console.log($stateParams.id);
  this.you={
    uid : $stateParams.id,
    name : 'dndn305',
    url: 'http://imgnews.naver.com/image/5239/2015/03/04/209695_image_5_99_20150304181302.jpg'
  }

  //상대방 정보 AJAX
  var other_id = $stateParams.id;
  //other_name = other_name.toString();
  //console.log('other', typeof other_name);
  HttpSvc.request('otherInfo',{
    other : other_id
  }).then((res) => {
    if (res.data.success) {
      console.log(res.data);
      this.you.name = res.data.other_name,
      this.you.url = res.data.other_image
    }
    else {
      console.log('no');
    }
  });

  //대화 가져오기
  HttpSvc.request('getConversation',{
    other : this.you.uid
  }).then((res) => {
    if (res.data.success) {
      this.communication = res.data.messages;
      console.log(res.data);
    }
    else {
      console.log('no');
    }
  });
  CacheSvc.get('get_profile_image').then((response) => {
    if (response.data.success) {
      // 받아오기 성공
      this.image = response.data.image;
    }
  });
  this.getCommunication=function(){
    HttpSvc.request('getConversation',{
      other : this.you.uid
    }).then((res) => {
      if (res.data.success) {
        this.communication = res.data.messages;
        console.log(res.data);
      }
      else {
        console.log('no');
      }
    });
  }
  this.getCommunication();

  this.isMe=function(idx){
    if("1"===this.communication[idx].is_mine){
      return true;
    }
    return false;
  };
  this.personImage=function(idx){
    if(this.communication[idx].is_mine==="1"){
      console.log('zz');
      return {
        'background-image' : `url(${this.image})`
      }
    }
    return {
      'background-image' : `url(${this.you.url})`
    }
  };
  this.communicationShow=function(idx){
    if(idx===0) return true;
    else if(this.communication[idx].is_mine===this.communication[idx-1].is_mine) return false;
    return true;
  };

  this.nextMessage=function(idx){ //연속 메세지는 프로필 안나오게 하려는고
    var class_data=null;
    if(this.communication[idx].is_mine==="1"){
      class_data='next-my-message';
    }else {
      class_data='next-you-message';
    }
    if(idx===0) return;
    else if(this.communication[idx].is_mine===this.communication[idx-1].is_mine){
      return class_data;
    }
    return;
  };

  this.btnSend = function(){ //보내기 버튼 누르면 되는고
    HttpSvc.request('sendMessage', {
      other: this.you.uid,
      note: this.message_text
    }).then((res) => {
      if (res.data.success) {
        this.getCommunication();
      }
      else {
        console.log('nono');
      }
    });
    this.message_text='';
    $timeout(() => {
			scrollBottom();
		},300);
  };

  this.btn_disabled=true;

  this.activeBtn = function(){ //버튼 활성화
    if(this.message_text===''){
      this.btn_disabled = true;
      return 'btn-disabled';
    }
    this.btn_disabled = false;
    return 'btn-active';
  };

  $timeout(() => {
    scrollBottom();
  },300);

  function scrollBottom(){
    var objDiv = document.querySelector(".communication-box");
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(objDiv.scrollTop,objDiv.scrollHeight);
  }

  OverlaySvc.off('loading');

}

Message.$inject = ['OverlaySvc', '$timeout', 'HttpSvc', 'LoginSvc', 'CacheSvc', '$stateParams'];

export default angular.module('touriends.page.message', ['touriends']).controller('Message', Message).name;
