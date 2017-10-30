function Attraction(OverlaySvc, ToastSvc, HttpSvc, $state, gettext, LoginSvc) {
	this.menu = [gettext('ALL'),gettext('Attraction'),gettext('Culture'),gettext('Festival')];
	this.all_menu = ['Gangnam-gu', 'Gangdong-gu', 'Gangbuk-gu', 'Gangseo-gu',
		'Gwanak-gu', 'Gwangjin-gu', 'Guro-gu', 'Geumcheon-gu',
		'Nowon-gu', 'Dobong-gu', 'Dongdaemun-gu', 'Dongjak-gu', 'Mapo-gu',
		'Seodaemun-gu', 'Seocho-gu', 'Seongdong-gu', 'Seongbuk-gu', 'Songpa-gu',
		'Yangcheon-gu', 'Yeongdeungpo-gu', 'Yongsan-gu', 'Eunpyeong-gu', 'Jongno-gu', 'Jung-gu', 'Jungnagng-gu'];


	//title 괄호에있는 한글 없애기

	//기본값지정

	this.content = 0;
	this.choiceLocation = 0;
	this.attraction_data = [{
		firstimage : null,
		title : ''
	}];
	//Attraction Data AJAX
	this.attractDataAjax = function () {
		var content_type=3;
		if(LoginSvc.nationality=='local'){
			if(this.content===0){
				content_type = 1;
			}
			else if(this.content===1){
				content_type = 12;
			}
			else if(this.content===2){
				content_type = 14;
			}
			else if(this.content===3){
				content_type = 15;
			}
		}
		else{
			if(this.content===0){
				content_type = 0;
			}
			else if(this.content===1){
				content_type = 76;
			}
			else if(this.content===2){
				content_type = 78;
			}
			else if(this.content===3){
				content_type = 85;
			}
		}
		HttpSvc.request('tour_Info', {
			area: this.choiceLocation + 1,
			content: content_type
		}).then((res) => {
			if (res.data.success) {
				this.attraction_data = res.data.data.item;
				if (this.content === 0) {
					if (this.attraction_data == undefined || this.attraction_data[0] == undefined) {
						this.attraction_data = new Array();
					}
					else if (Array.isArray(this.attraction_data) == false) {
						this.attraction_data = new Array();
						this.attraction_data.push(res.data.data.item);
						console.log(this.attraction_data);
					}
					console.log(this.attraction_data,res.data.data1, res.data.data2);
					console.log(this.attraction_data,res.data.data1, Array.isArray(res.data.data2.item));
					if (Array.isArray(res.data.data1.item) == false){
						if (res.data.data1.item != undefined) {
							this.attraction_data.push(res.data.data1.item);
						}
						else{
						}
					}
					else if (Array.isArray(res.data.data1.item) == true){
						if (res.data.data2.length===0) {
						}
						else{
							this.attraction_data = this.attraction_data.concat(res.data.data1.item);
						}
					}
					if(Array.isArray(res.data.data2.item) == false){
						if (this.attraction_data != undefined) {
							this.attraction_data.push(res.data.data2.item);
						}
						else{
						}
					}
					else if(Array.isArray(res.data.data2.item) == true){
						if (res.data.data2.length===0) {
						}
						else{
							this.attraction_data = this.attraction_data.concat(res.data.data2.item);
						}
					}
				}

				console.log(this.attraction_data);
				if (this.attraction_data == undefined) {
					ToastSvc.toggle('No data');
				}
				else	if(Array.isArray(this.attraction_data)==true){
					if(this.attraction_data[0] == undefined){
						ToastSvc.toggle('No data');
					}
					for(var i=0; i<this.attraction_data.length; i++){
						if(this.attraction_data[i]==undefined){
							this.attraction_data.splice(i,1);
						}
					}
				}
				else if (Array.isArray(this.attraction_data) == false) {
					this.attraction_data = new Array();
					this.attraction_data.push(res.data.data.item);
					console.log(this.attraction_data);
				}
			}
		});
	};

	this.attractDataAjax();

	this.choiceMenu = function (idx) { //선택된 메뉴
		if (this.content === idx) {
			return {
				'background-color': '#74c7d3'
			}
		}
		return null;
	};
	this.menuClick = function (idx) {
		let objDiv = document.querySelector(".at-choice");
		objDiv.classList.toggle("active");
		let panel = document.querySelector(".at-panel");
		let selection_bar = document.querySelector(".selection-bar");
		if (idx === undefined) { //뾰족이 눌렀을 때
			panel.style.maxHeight = null;
			selection_bar.style.backgroundColor = "white";
			return;
		}
		if (panel.style.maxHeight && this.content === idx) {
			panel.style.maxHeight = null;
			selection_bar.style.backgroundColor = "white";
		} else {
			selection_bar.style.backgroundColor = "#d8d8d8";
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
		if (this.content != idx) {
			this.content = idx;
			this.attractDataAjax();
		}
	};
	this.locationClick = function (idx) {
		if (this.choiceLocation != idx) {
			this.choiceLocation = idx;
			this.attractDataAjax();
		}
		this.menuClick();
	};
	this.locationStyle = function (idx) {
		if (this.choiceLocation === idx) {
			return {
				'background-color': '#74c7d3',
				'color': 'white'
			}
		}
		return;
	}
	this.titleEng = function (idx) {
		let check = [];
		for (let i = 0; i < String(this.attraction_data[idx].title).length; i++) {
			if (this.attraction_data[idx].title.charAt(i) === "(") {
				check.push(i);
			}
		}
		for (let i = 0; i < check.length; i++) {
			let ko = checkKorean(this.attraction_data[idx].title.charAt(check[i] + 1));
			if (ko === true || this.attraction_data[idx].title.charAt(check[i] + 1)==this.attraction_data[idx].title.charAt(0)) {
				this.attraction_data[idx].title = this.attraction_data[idx].title.substr(0, check[i]);
			}
		}
		return this.attraction_data[idx].title;
	}

	function checkKorean(objStr) { //한글체크함수
		for (let i = 0; i < objStr.length; i++) {
			if (((objStr.charCodeAt(i) > 0x3130 && objStr.charCodeAt(i) < 0x318F) || (objStr.charCodeAt(i) >= 0xAC00 && objStr.charCodeAt(i) <= 0xD7A3))) {
				return true;
			} else {
				return false;
			}
		}
	}

	this.attractionImg = function (idx) {
		if (this.attraction_data[idx].firstimage == null) {
			return;
		}
		return {
			'background-image': `url(${this.attraction_data[idx].firstimage})`
		}
	}
	this.noImage = function (idx) {
		if (this.attraction_data[idx].firstimage == null) {
			return 'no-image-data';
		}
		return;
	}

	OverlaySvc.off('loading');

	this.go = function (stateName, idx) {
		if ($state.is(stateName)) {
			return;
		}
		OverlaySvc.on('loading');
		$state.go(stateName, {id: this.attraction_data[idx].contentid, type: this.attraction_data[idx].contenttypeid});
	}
}

Attraction.$inject = ['OverlaySvc', 'ToastSvc', 'HttpSvc', '$state', 'gettext', 'LoginSvc'];

export default angular.module('touriends.page.attraction', ['touriends']).controller('Attraction', Attraction).name;
