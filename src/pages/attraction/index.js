import param from 'jquery-param';

function Attraction(OverlaySvc, ToastSvc, HttpSvc) {
  this.menu=['ALL', 'Attraction', 'Culture', 'Festival'];
  this.all_menu=['Gangnam-gu','Gangdong-gu','Gangbuk-gu','Gangseo-gu','Gwanak-gu','Gwangjin-gu', 'Guro-gu','Geumcheon-gu',
  'Nowon-gu', 'Dobong-gu', 'Dongdaemun-gu', 'Dongjak-gu', 'Mapo-gu', 'Seodaemun-gu', 'Seocho-gu', 'Seongdong-gu','Seongbuk-gu', 'Songpa-gu',
  'Yangcheon-gu', 'Yeongdeungpo-gu','Yongsan-gu', 'Eunpyeong-gu', 'Jongno-gu', 'Jung-gu', 'Jungnagng-gu'];


  //title 괄호에있는 한글 없애기

  //기본값지정
  var origin = this.menu[0];
  this.choiceLocation= this.all_menu[0];
  this.attraction_data = [];

  //Attraction Data AJAX
  this.attractDataAjax = function(){
    HttpSvc.request('testsj').then((res) => {
      console.log(res);
      if (res.data.success) {
        this.attraction_data = res.data.data;
      }
      else {
        ToastSvc.toggle('No data');
      }
    });
  }

  this.attractDataAjax();

  this.choiceMenu=function(idx){ //선택된 메뉴
    if(origin===this.menu[idx]){
      return {
        'background-color' : '#74c7d3'
      }
    }
    return;
  }
  this.menuClick=function(idx){
    var objDiv = document.querySelector(".at-choice");
    objDiv.classList.toggle("active");
    var panel =  document.querySelector(".at-panel");
    var selection_bar =  document.querySelector(".selection-bar");

    if(idx===undefined){ //뾰족이 눌렀을 때
      panel.style.maxHeight = null;
      selection_bar.style.backgroundColor = "white";
      return;
    }

    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      selection_bar.style.backgroundColor = "white";
    } else {
      selection_bar.style.backgroundColor = "#d8d8d8";
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

    origin=this.menu[idx];
  }
  this.locationClick = function(idx){
    this.choiceLocation= this.all_menu[idx];
    console.log('hi');

    this.attractDataAjax();
    console.log('bye');
    this.menuClick();
  }
  this.locationStyle = function(idx){
    if(this.choiceLocation===this.all_menu[idx]){
      return {
        'background-color' : '#74c7d3',
        'color' : 'white'
      }
    }
    return;
  }
  this.attractionImg=function(idx){
    return {
      'background-image' : `url(${this.attraction_data[idx].url})`
    }
  }

  OverlaySvc.off('loading');
}

Attraction.$inject = ['OverlaySvc', 'ToastSvc', 'HttpSvc'];

export default angular.module('touriends.page.attraction', ['touriends']).controller('Attraction', Attraction).name;
