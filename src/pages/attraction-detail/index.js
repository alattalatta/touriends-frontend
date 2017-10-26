import param from 'jquery-param';

function AttractionDetail(OverlaySvc, ToastSvc, HttpSvc, $stateParams) {
  this.content = {
    contentid : $stateParams.id,
    title : 'Guam Park',
    addr1 : '42, Heojun-ro 5-gil, Gangseo-gu, Seoul',
    tel : '+82-2-2600-4186',
    homepage : 'parks.seoul.go.kr',
    overview : "오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰오버뷰",
    firstimage : 'http://tong.visitkorea.or.kr/cms/resource/92/566492_image2_1.jpg'
  }

  // HttpSvc.request('tour_Info',{
  //   content_id : $stateParams.id
  // }).then((res) => {
  //   if (res.data.success) {
  //     console.log(res.data);
  //   }
  // });

  this.contentImage = function(){
    return {
      'background-image' : `url(${this.content.firstimage})`
    }
  }

  var select_data=0;
  this.clickSelect = function(data){
    if(select_data!=data){
      select_data = data;
    }
  }
  this.selectStyle = function(data){
    if(select_data===data){
      return{
        'color': '#fffefe',
        'background-color': '#76cddb'
      }
    }
    return{
      'color': 'rgba(0, 0, 0, 0.7)',
      'background-color': '#FFF'
    }
  }

  this.infomationShow = function(){
    if(select_data===1){
      return false;
    }
    return true;
  }

  OverlaySvc.off('loading');
}

AttractionDetail.$inject = ['OverlaySvc', 'ToastSvc', 'HttpSvc', '$stateParams'];

export default angular.module('touriends.page.attraction-detail', ['touriends']).controller('AttractionDetail', AttractionDetail).name;
