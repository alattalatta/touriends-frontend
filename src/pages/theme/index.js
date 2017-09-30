import param from 'jquery-param';

function ThemeCtrl() {
  this.datalist = ['k-pop','food','exhibition','culture','activity'];
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
    return this.datalist[this.simage].toUpperCase();
  }
  this.rmGray = function(idx) {
      if (this.simage === idx) {
        return {
          'filter': 'none'
        }
      }
      return null;
  }
}

ThemeCtrl.$inject = [];

export default angular.module('touriends.page.theme', ['touriends']).controller('ThemeCtrl', ThemeCtrl).name;
