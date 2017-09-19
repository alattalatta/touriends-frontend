import param from 'jquery-param';

function IntroduceCtrl($http){
  this.image=null;
  this.intro = null;
  $http({
    method: 'POST',
    url: ajax_url,
    data: param({
      action: 'get_profile_image'
    })
  }).then((response) => {
    if (response.data.success === true) {
      this.image = response.data.image;
    }
  });

  this.byteCheck = function() {
      if(this.intro===null) return '0/60byte';
      var l= 0;
      for(var idx=0; idx < this.intro.length; idx++) {
          var c = escape(this.intro.charAt(idx));

          if( c.length==1 ) l ++;
          else if( c.indexOf("%u")!=-1 ) l += 2;
          else if( c.indexOf("%")!=-1 ) l += c.length/3;
      }

      return l+'/60byte';
    };

    this.profileImage = function(){
      if(this.image===null) return null;
      return {
        'background-image' : `url(${this.image})`
      }

    }

    this.submitIntro=function(){
      $http({
        method :'POST',
        url : ajax_url,
        data : param({
          action : 'submit_intro',
          intro : this.intro
        })
      }).then((response)=>{
          if(response.data.success===true){
            alert('hi, thank you');
          }
      });
    }
}
IntroduceCtrl.$inject=['$http'];
export default angular.module('touriends.page.introduce', ['touriends']).controller('IntroduceCtrl', IntroduceCtrl).name;
