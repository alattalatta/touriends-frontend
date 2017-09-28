import param from 'jquery-param';

function MainCtrl() {
  this.nav = ['matching','community','home','attraction','mypage'];
  this.start = function(){
    alert('start~');
  }
  this.navbar = function(data){
    for(var i=0; i<this.nav.length; i++){
      if(data===this.nav[i])
        alert(data);
    }
  }
}

MainCtrl.$inject = [];

export default angular.module('touriends.page.main', ['touriends']).controller('MainCtrl', MainCtrl).name;
