import param from 'jquery-param';

function AttractionDetail(OverlaySvc, ToastSvc, HttpSvc, $stateParams) {

  this.detail = {
    parking : null,
    chkbabycarriage : null,
    chkpet : null,
    add_data : {
        restdate : null,
        usetime : null,
        infocenter : null,
        usefee : null,
        parking : null,
        parkingfee : null,
        placeinfo : null,
        playtime : null
    },
    time : {
      eventstartdate : null,
      eventenddate : null,
    }
  }
  this.content = {
    firstimage : null,
    addr1 : '',
    title : ''
  }

  this.getContentData = function(){
    HttpSvc.request('common_Info',{
      contentId : $stateParams.id
    }).then((res) => {
      if (res.data.success) {
        console.log($stateParams.id,res.data.detail.item);
        this.content = res.data.detail.item;
      }
    });
    HttpSvc.request('detail_Info',{
      contentId : $stateParams.id,
      content : $stateParams.type
    }).then((res) => {
      if (res.data.success) {
        this.detail = res.data.detail.item;
        console.log('parking',this.detail.parking);
        this.dataCheck();
        this.getAdditionalData();
        console.log('dd',this.detail.add_data.playtime);
      }
      else{
        console.log("fail");
      }
    });
  }
  this.getContentData();

  this.dataCheck = function(){
    var parking=null, stroller=null, pet=null, restdate=null, usetime=null;
    var usefee=null, infocenter=null, parkingfee=null;
    var placeinfo=null, eventstartdate=null, eventenddate=null;//festival
    var playtime=null, eventplace=null;
    //주차
    if(('parking' in this.detail && this.detail.parking!='')){
      parking="<b>• Parking : </b><br>"+this.detail.parking;
    }else if(('parkingculture' in this.detail && this.detail.parkingculture!='')){
      parking="<b>• Parking : </b><br>"+this.detail.parkingculture;
    }
    //유모차
    if('chkbabycarriage' in this.detail && this.detail.chkbabycarriage!={}){
      stroller=this.detail.chkbabycarriage;
    }else if('chkbabycarriageculture' in this.detail  ){
      stroller=this.detail.chkbabycarriageculture;
    }
    //애완동물
    if('chkpet' in this.detail && this.detail.chkpet!={}){
      pet=this.detail.chkpet;
    }else if('chkpetculture' in this.detail  ){
      pet=this.detail.chkpetculture;
    }
    //쉬는날
    if('restdate' in this.detail ){
      restdate="<b>• Day off : </b><br>"+this.detail.restdate;
    }else if('restdateculture' in this.detail  ){
      restdate="<b>• Day off : </b><br>"+this.detail.restdateculture;
    }
    //운영시간
    if('usetime' in this.detail  ){
      usetime="<b>• Operating hour : </b><br>"+this.detail.usetime;
    }else if('usetimeculture' in this.detail ){
      usetime="<b>• Operating hour : </b><br>"+this.detail.usetimeculture;
    }
    //운영요금
    if('usefee' in this.detail  ){
      usefee="<b>• Charge : </b><br>"+this.detail.usefee;
    }else if('usetimefestival' in this.detail ){
      usefee="<b>• Charge : </b><br>"+this.detail.usetimefestival;
    }else if('eventplace' in this.detail  ){
      usefee="<b>• Charge : </b><br>"+this.detail.eventplace;
    }
    //인포메이션
    if('infocenter' in this.detail  ){
      infocenter="<b>• Information Center : </b><br>"+this.detail.infocenter;
    }else if('infocenterculture' in this.detail ){
      infocenter="<b>• Information Center : </b><br>"+this.detail.infocenterculture;
    }
    //어떻게 가는지
    if('placeinfo' in this.detail  ){
      placeinfo="<b>• Way to go : </b><br>"+this.detail.placeinfo;
    }
    //시작~끝
    if('eventstartdate' in this.detail && 'eventenddate' in this.detail){
      eventstartdate=this.detail.eventstartdate;
      eventenddate=this.detail.eventenddate;
    }
    //공연소요시간
    if('playtime' in this.detail  ){
      playtime="<b>• Showtime : </b><br>"+this.detail.playtime;
    }
    //주차요금
    if('parkingfee' in this.detail  ){
      parkingfee="<b>• Parking fee : </b><br>"+this.detail.parkingfee;
    }
    this.detail = {
      parking : parking,
      chkbabycarriage : stroller,
      chkpet : pet,
      add_data : {
          restdate : restdate,
          usetime : usetime,
          infocenter : infocenter,
          usefee : usefee,
          parking : parking,
          parkingfee : parkingfee,
          placeinfo : placeinfo,
          playtime : playtime
      },
      time : {
        eventstartdate : eventstartdate,
        eventenddate : eventenddate,
      }
    }
  }

  this.additionalData = [];
  this.getAdditionalData = function(){
    for(var key in this.detail.add_data){
      if(this.detail.add_data[key]!=null&&this.detail.add_data[key].length!=27){
        console.log((typeof this.detail.add_data[key]));
        if(this.detail.add_data[key].indexOf("[object Object]")!=-1){}
        else{
          this.additionalData.push(this.detail.add_data[key]);
        }
      }
    }

    console.log('add',this.additionalData);
  }

  this.noImage=function(){
    if(this.content === undefined || this.content.firstimage==null){
      return 'no-image-data';
    }
    return;
  }
  this.contentImage = function(){
    if('firstimage' in this.content){
      return {
        'background-image' : `url(${this.content.firstimage})`
      }
    }
    return;
  }
  this.titleEng = function(){
    var check=[];
    for(var i=0; i<String(this.content.title).length; i++){
      if(this.content.title.charAt(i)==="("){
        check.push(i);
      }
    }
    for(var i=0; i<check.length; i++){
      var ko = checkKorean(this.content.title.charAt(check[i]+1));
      if(ko===true){
        this.content.title = this.content.title.substr(0, check[i]);
      }
    }
    return this.content.title;
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

  this.periodShow = function(){
    if(this.detail.time.eventstartdate!=null){
      return true;
    }
    return false;
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

  this.informationShow = function(){
    if(select_data===1){
      return false;
    }
    return true;
  }


  //usersguide

  this.availImg = function(idx){
    var data = this.detail;
    if(idx===0){
      if(this.detail.parking===null || this.detail.parking==='불가' || this.detail.parking==='없음'){
        return 'disavailable-icon';
      }
      return 'available-icon';
    }
    else if(idx===1){
      if(this.detail.chkbabycarriage===null || this.detail.chkbabycarriage==='불가' || this.detail.chkbabycarriage==='없음'){
        return 'disavailable-icon';
      }
      return 'available-icon';
    }
    else if(idx===2){
      if(this.detail.chkpet===null  || this.detail.chkpet==='불가' || this.detail.chkpet==='없음'){
        return 'disavailable-icon';
      }
      return 'available-icon';
    }
  }

  OverlaySvc.off('loading');
}

AttractionDetail.$inject = ['OverlaySvc', 'ToastSvc', 'HttpSvc', '$stateParams','gettext'];

export default angular.module('touriends.page.attraction-detail', ['touriends']).controller('AttractionDetail', AttractionDetail).name;
