import param from 'jquery-param';

function Message($timeout) {
  this.message_text='';
  this.you={
    uid : 888,
    name : 'dndn305',
    url: 'http://imgnews.naver.com/image/5239/2015/03/04/209695_image_5_99_20150304181302.jpg'
  }
  this.my={
    uid : 777,
    url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg'
  }
  this.communication=[{
    uid:777,
    content:'hi'
  },{
    uid:888,
    content:'hi'
  },{
    uid:888,
    content:'nice to meet you'
  },{
    uid:777,
    content:'nice to meet younice to meet younice to meet younice to meet younice to meet younice to meet you'
  },{
    uid:777,
    content:'have a good time'
  },{
    uid:777,
    content:'have a good time'
  },{
    uid:777,
    content:'have a good time'
  },{
    uid:777,
    content:'have a good time'
  },{
    uid:777,
    content:'have a good time'
  },{
    uid:777,
    content:'have a good time'
  },{
    uid:777,
    content:'have a good time'
  }];

  this.isMe=function(idx){
    if(this.my.uid===this.communication[idx].uid){
      return true;
    }
    return false;
  };
  this.personImage=function(idx){
    if(this.communication[idx].uid===this.my.uid){
      return {
        'background-image' : `url(${this.my.url})`
      }
    }
    return {
      'background-image' : `url(${this.you.url})`
    }
  };
  this.communicationShow=function(idx){
    if(idx===0) return true;
    else if(this.communication[idx].uid===this.communication[idx-1].uid) return false;
    return true;
  };
  this.nextMessage=function(idx){
    var class_data=null;
    if(this.communication[idx].uid===this.my.uid){
      class_data='next-my-message';
    }else if(this.communication[idx].uid===this.you.uid){
      class_data='next-you-message';
    }
    if(idx===0) return;
    else if(this.communication[idx].uid===this.communication[idx-1].uid){
      return class_data;
    }
    return;
  };
  this.btnSend = function(){
    this.communication.push({
      uid:777,
      content: this.message_text
    });
    this.message_text='';

    $timeout(() => {
			scrollBottom();
		});

  };
  this.btn_disabled=true;
  this.activeBtn = function(){
    if(this.message_text===''){
      this.btn_disabled = true;
      return 'btn-disabled';
    }
    this.btn_disabled = false;
    return 'btn-active';
  };
  $timeout(() => {
    scrollBottom();
  });
  function scrollBottom(){
    var objDiv = document.querySelector(".communication-box");
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(objDiv.scrollTop,objDiv.scrollHeight);
  }

}

Message.$inject = ['$timeout'];

export default angular.module('touriends.page.message', ['touriends']).controller('Message', Message).name;
