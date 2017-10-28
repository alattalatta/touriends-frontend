import param from 'jquery-param';

function Attraction(OverlaySvc, ToastSvc, HttpSvc, $state, gettext) {
  this.menu=[gettext('ALL'), gettext('Attraction'),gettext( 'Culture'), gettext('Festival')];
  this.all_menu=[gettext('Gangnam-gu'),gettext('Gangdong-gu'),gettext('Gangbuk-gu'),gettext('Gangseo-gu'),
      gettext('Gwanak-gu'),gettext('Gwangjin-gu'), gettext('Guro-gu'),gettext('Geumcheon-gu'),
      gettext('Nowon-gu'), gettext('Dobong-gu'), gettext('Dongdaemun-gu'), gettext('Dongjak-gu'), gettext('Mapo-gu'),
      gettext('Seodaemun-gu'),gettext('Seocho-gu'), gettext('Seongdong-gu'),gettext('Seongbuk-gu'), gettext('Songpa-gu'),
      gettext('Yangcheon-gu'), gettext('Yeongdeungpo-gu'),gettext('Yongsan-gu'), gettext('Eunpyeong-gu'), gettext('Jongno-gu'), 'Jung-gu', 'Jungnagng-gu'];


  //title 괄호에있는 한글 없애기

  //기본값지정
  this.content = 0;
  this.choiceLocation= 0;
  this.attraction_data = [];
  //Attraction Data AJAX
  this.attractDataAjax = function(){
    HttpSvc.request('tour_Info',{
      area: this.choiceLocation+1,
      content : this.content
    }).then((res) => {
      if (res.data.success) {
        this.attraction_data = res.data.data.item;
        if(this.content===0){
          this.attraction_data=this.attraction_data.concat(res.data.data1.item);
          this.attraction_data=this.attraction_data.concat(res.data.data2.item);
          console.log(this.attraction_data);
        }
        if(this.attraction_data==undefined || this.attraction_data==[undefined]){
          ToastSvc.toggle('No data');
        }
        else if(Array.isArray(res.data.data.item)==false ){
          this.attraction_data=[];
          this.attraction_data.push(res.data.data.item);
          console.log(this.attraction_data);
        }
      }
    });
  }

  this.attractDataAjax();

  this.choiceMenu=function(idx){ //선택된 메뉴
    if(this.content===idx){
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
    if (panel.style.maxHeight && this.content===idx){
      panel.style.maxHeight = null;
      selection_bar.style.backgroundColor = "white";
    }else{
      selection_bar.style.backgroundColor = "#d8d8d8";
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    if(this.content!=idx){
      this.content=idx;
      this.attractDataAjax();
    }
  }
  this.locationClick = function(idx){
    if(this.choiceLocation!=idx){
      this.choiceLocation= idx;
      this.attractDataAjax();
    }
    this.menuClick();
  }
  this.locationStyle = function(idx){
    if(this.choiceLocation===idx){
      return {
        'background-color' : '#74c7d3',
        'color' : 'white'
      }
    }
    return;
  }
  this.titleEng = function(idx){
    var check=[];
    for(var i=0; i<String(this.attraction_data[idx].title).length; i++){
      if(this.attraction_data[idx].title.charAt(i)==="("){
        check.push(i);
      }
    }
    for(var i=0; i<check.length; i++){
      var ko = checkKorean(this.attraction_data[idx].title.charAt(check[i]+1));
      if(ko===true){
        this.attraction_data[idx].title = this.attraction_data[idx].title.substr(0, check[i]);
      }
    }
    return this.attraction_data[idx].title;
  }
  function checkKorean(objStr) { //한글체크함수
      for (var i = 0; i < objStr.length; i++) {
          if (((objStr.charCodeAt(i) > 0x3130 && objStr.charCodeAt(i) < 0x318F) || (objStr.charCodeAt(i) >= 0xAC00 && objStr.charCodeAt(i) <= 0xD7A3))) {
              return true;
          } else {
              return false;
          }
      }
  }

  this.attractionImg=function(idx){
    if(this.attraction_data[idx].firstimage==null){
      return;
    }
    return {
      'background-image' : `url(${this.attraction_data[idx].firstimage})`
    }
  }
  this.noImage=function(idx){
    if(this.attraction_data[idx].firstimage==null){
      return 'no-image-data';
    }
    return;
  }

  OverlaySvc.off('loading');

  this.go=function(stateName,idx) {
    if ($state.is(stateName)) {
      return;
    }
    OverlaySvc.on('loading');
    $state.go(stateName,{id:this.attraction_data[idx].contentid, type:this.attraction_data[idx].contenttypeid});
  }
}

Attraction.$inject = ['OverlaySvc', 'ToastSvc', 'HttpSvc', '$state', 'gettext'];

export default angular.module('touriends.page.attraction', ['touriends']).controller('Attraction', Attraction).name;
