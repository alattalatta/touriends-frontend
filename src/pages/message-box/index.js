import param from 'jquery-param';

function MessageBox(OverlaySvc, $state) {
  this.datalist=[{
    uid:888,
    new:true,
    name : 'dndn305',
    url: 'http://imgnews.naver.com/image/5239/2015/03/04/209695_image_5_99_20150304181302.jpg'
  },{
    uid:777,
    new:false,
    name : 'jm9546',
    url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg'
  }];

  this.messagePerson=function(idx){
    if(this.datalist[idx].uid===null){
      return ;
    }
    return {
      'background-color' : '#F7F7F7'
    };
  };
  this.personImage=function(idx){
    if(this.datalist[idx].uid===null){
      return;
    }
    return{
      'background-image' : `url(${this.datalist[idx].url})`,
    }
  };
  //시도해보다가 망한거ㅋ..
  // this.go=function(stateName,idx) {
  //   if (this.$state.is(stateName)) {
  //     return;
  //   }
  //
  //   this.OverlaySvc.on('loading');
  //   this.$state.go(stateName,{id:this.datalist[idx].uid});
  // }
}

MessageBox.$inject = ['OverlaySvc', '$state'];

export default angular.module('touriends.page.message-box', ['touriends']).controller('MessageBox', MessageBox).name;
