import param from 'jquery-param';

function MessageBox(OverlaySvc, $state, HttpSvc, LoginSvc, ToastSvc,gettext) {
  this.datalist=[];
  this.getOther = function(){
    HttpSvc.request('showMessage').then((res) => {
      if (res.data.success) {
        this.datalist = res.data.box;
        this.new = res.data.new;
        console.log(this.datalist);
        for(var i=0; i<this.datalist.length; i++){
          console.log('zz');
          var other_id = parseInt(this.datalist[i].other);
          this.getOtherInfo(i, other_id);
        }
      }
      else {
        ToastSvc.toggle('No data');
      }
    });
  }
  this.getOther();

  this.getOtherInfo = function(i, other_id){
    HttpSvc.request('otherInfo',{
      other : other_id
    }).then((res) => {
      if (res.data.success) {
        console.log("data",other_id, res.data);
        this.datalist[i] = {
          mid : this.datalist[i].mid,
          other : this.datalist[i].other,
          new_ck : this.new[i].newmsg,
          url : res.data.other_image,
          name : res.data.other_name
        };
        console.log(this.datalist);
      }
      else {
        console.log('no');
      }
    });
  }


  this.messagePerson=function(idx){
    console.log(this.datalist);
    return {
      'background-color' : '#F7F7F7'
    };
  };
  this.personImage=function(idx){
    if(this.datalist[idx].url===''){
      return{
        'background-color' : 'grey'
      };
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
    $state.go(stateName,{id:this.datalist[idx].other});
  }
}

MessageBox.$inject = ['OverlaySvc', '$state', 'HttpSvc', 'LoginSvc', 'ToastSvc','gettext'];

export default angular.module('touriends.page.message-box', ['touriends']).controller('MessageBox', MessageBox).name;
