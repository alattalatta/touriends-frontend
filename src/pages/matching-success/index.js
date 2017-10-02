import param from 'jquery-param';

function MatchingSuccessCtrl() {
  this.datalist = [{
    uid: 888,
    url: 'http://imgnews.naver.com/image/5239/2015/03/04/209695_image_5_99_20150304181302.jpg',
    liked: true,
    language1: 'german',
    language2: 'japanese',
    language3: 'french',
    text: '안뇽하세여 저는 도길에서와써여',
    theme: 'k-pop'
  },{
    uid: 777,
    url: 'http://imgnews.naver.com/image/038/2013/07/24/wyby31820130724152131_C_00_C_1_59_20130724153211.jpg',
    liked: false,
    language1: 'japanese',
    text: '안뇽하세여 저는 니혼에서와써여',
    theme: 'exhibition'
  }];

  this.person = null;
  this.isChoice = false;
  this.isLanguage2 = false;
  this.isLanguage3 = false;
  this.choicePerson = function(idx){ //person선택했을시
    if(this.person===null){
      this.person = idx;
      this.isChoice = true;
      if(this.datalist[this.person].language2)
        this.isLanguage2 =true;
      if(this.datalist[this.person].language3)
        this.isLanguage3 = true;
    }
  }

  this.profileImage = function(){
    if(this.person===null) return null;
    return{
      'background-image' : `url(${this.datalist[this.person].url})`,
      'background-size' : 'contain',
    }
  }

  this.personData = function(idx){
    var bor = 'none';
    if(this.datalist[idx].liked===true){
      bor = '5px solid #3faabb';
    }
    return {
      'background-image' : `url(${this.datalist[idx].url})`,
      'opacity' : '.7',
      'background-size' : 'contain',
      'border' : bor
    }
  }

  this.language1Data = function(){
    if(this.person === null) return null;
    return this.datalist[this.person].language1;
  }
  this.language2Data = function(){
    if(this.person === null) return null;
    return this.datalist[this.person].language2;
  }
  this.language3Data = function(){
    if(this.person === null) return null;
    return this.datalist[this.person].language3;
  }
  this.likedData = function(){
    if(this.person === null) return null;
    return this.datalist[this.person].liked;
  }
  this.themeData = function(){
    if(this.person === null) return null;
    return this.datalist[this.person].theme;
  }
  this.cancleShow = function(){
    this.person = null;
    this.isChoice = false;
  }
  this.isLiked = function(){
    if(this.datalist[this.person].liked === false){
      this.datalist[this.person].liked = true;
    }
    else {
      this.datalist[this.person].liked = false;
    }
  }

  this.personText = function(){
    if(this.person ===null) return null;
    return this.datalist[this.person].text;
  }
}

MatchingSuccessCtrl.$inject = [];

export default angular.module('touriends.page.matching-success', ['touriends']).controller('MatchingSuccessCtrl', MatchingSuccessCtrl).name;
