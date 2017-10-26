import param from 'jquery-param';

function MessageBox(OverlaySvc, $state, HttpSvc, LoginSvc, ToastSvc) {
  HttpSvc.request('showMessage').then((res) => {
    if (res.data.success) {
      console.log(res.data);
      //this.attraction_data = res.data["records"];
    }
    else {
      ToastSvc.toggle('No data');
    }
  });
  this.datalist=[{
    uid:5,
    mid:15,
    new:true,
    name : 'dndn305',
    url: 'http://imgnews.naver.com/image/5239/2015/03/04/209695_image_5_99_20150304181302.jpg'
  },{
    uid:2,
    mid:13,
    new:false,
    name : 'jm9546',
    url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg'
  },{
    uid:6,
    mid:17,
    new:false,
    name : 'jm9546',
    url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg'
  },{
    uid:7,
    mid:20,
    new:false,
    name : 'jm9546',
    url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg'
  }];
  this.datalist.sort(function(a, b) { // 내림차순
    return b["mid"] - a["mid"];
  });
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

  OverlaySvc.off('loading');

  this.go=function(stateName,idx) {
    if ($state.is(stateName)) {
      return;
    }
    OverlaySvc.on('loading');
    $state.go(stateName,{id:this.datalist[idx].uid});
  }
}

MessageBox.$inject = ['OverlaySvc', '$state', 'HttpSvc', 'LoginSvc', 'ToastSvc'];

export default angular.module('touriends.page.message-box', ['touriends']).controller('MessageBox', MessageBox).name;
