import param from 'jquery-param';

function LanguageCtrl() {
  this.datalist = ['Japanese','English','French','Chinese','German'];
  this.simage = null;
  this.selectData = function(idx){
      this.simage=idx; // 인덱스만 저장합니다 ^^~
  }
  this.selectImage = function() {
    if (this.simage === null) return null;

    return this.datalist[this.simage];
  }
  this.selectedTitle = function() {
    if (this.simage === null) return '　';
    return this.datalist[this.simage];
  }
  this.rmGray = function(idx) {
      if (this.simage === idx) {
        return {
          'opacity': '1'
        }
      }
      return null;
  }
}

LanguageCtrl.$inject = [];

export default angular.module('touriends.page.language', ['touriends']).controller('LanguageCtrl', LanguageCtrl).name;
