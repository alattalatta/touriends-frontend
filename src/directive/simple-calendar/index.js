require('./style.less');

import leftPad from 'left-pad';

/**
 * https://web.cs.dal.ca/~jamie/CS3172/Course/assig/zeller.html
 */
class SimpleCalendar {
	get Days() {
		return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
	}

	get Month() {
		switch (this.month) {
			case 0:
				return 'JANUARY';
			case 1:
				return 'FEBRUARY';
			case 2:
				return 'MARCH';
			case 3:
				return 'APRIL';
			case 4:
				return 'MAY';
			case 5:
				return 'JUNE';
			case 6:
				return 'JULY';
			case 7:
				return 'AUGUST';
			case 8:
				return 'SEPTEMBER';
			case 9:
				return 'OCTOBER';
			case 10:
				return 'NOVEMBER';
			case 11:
				return 'DECEMBER';
		}
	}

	set Month(val) {
		this.month = val;
		this.createMonth();
		this.toggleMonthSelect();
	}

	get PrevDates() {
		return new Array(this.prevDatesCount);
	}

	get CurrentDates() {
		return new Array(this.currentDatesCount);
	}

	constructor() {
		let current = new Date();
		this.year = current.getFullYear();
		this.month = current.getMonth();

		this.selectMonth = false; // 월 선택 모드?

		this.month12 = new Array(12); // 월 선택 ng-repeat 용

		this.create();
	}

	create() {
		this.resetSelection();
		this.createMonth();
	}

	// 달력 생성
	createMonth() {
		let firstDate = new Date(this.year, this.month, 1); // 금월 1일
		let lastDate = new Date(this.year, this.month + 1, 0); // 금월 마지막일

		this.prevDatesCount = firstDate.getDay(); // 전월 마지막 주에서 넘어온 수 (28, 29, 31, 1, 2, 3, 4 => 3)
		this.currentDatesCount = lastDate.getDate(); // 이번 달 전체 일 수
	}

	// 달력 초기화
	resetSelection() {
		this.dateA = null;
		this.dateB = null;
		this.selectA = true; // true = begin 선택 // false = end 선택
	}

	setDate($index) {
		if (this.selectA) {
			this.dateA = new Date(this.year, this.month, $index + 1);
			if (this.dateB && this.dateA.getTime() === this.dateB.getTime()) {
				this.dateB = null;
			}
		}
		else {
			this.dateB = new Date(this.year, this.month, $index + 1);
			if (this.dateA && this.dateA.getTime() === this.dateB.getTime()) {
				this.dateA = null;
			}
		}

		this.selectA = !this.selectA;
	}

	// 선택된 날짜들 클래스
	getDateClasses($index) {
		let myDate = new Date(this.year, this.month, $index + 1);
		if (!this.dateA && !this.dateB) {
			return null;
		}

		let res = [];
		if (this.dateA && myDate.getTime() === this.dateA.getTime()) {
			res.push('is-selected');
			if (this.dateB) {
				res.push(this.dateA < this.dateB ? 'is-left' : 'is-right');
			}
		}
		else if (this.dateB && myDate.getTime() === this.dateB.getTime()) {
			res.push('is-selected');
			if (this.dateA) {
				res.push(this.dateA > this.dateB ? 'is-left' : 'is-right');
			}
		}
		else if (
			this.dateA && this.dateB && (
				this.dateA < myDate && myDate < this.dateB || // myDate 가 dateA~dateB 사이에 있을 경우
				this.dateB < myDate && myDate < this.dateA    // myDate 가 dateB~dateA 사이에 있을 경우
			)) {
			res.push('is-included');
		}

		return res;
	}

	getMonthClass($index) {
		let myDate = new Date(this.year, $index, 22);

		if (this.dateA &&
			this.dateA.getFullYear() === myDate.getFullYear() &&
			this.dateA.getMonth() === myDate.getMonth()) {
			return 'is-selected';
		}
		if (this.dateB &&
			this.dateB.getFullYear() === myDate.getFullYear() &&
			this.dateB.getMonth() === myDate.getMonth()) {
			return 'is-selected';
		}
		return null;
	}

	toggleMonthSelect() {
		this.selectMonth = !this.selectMonth;
	}

	increaseYear() {
		this.year++;
	}

	decreaseYear() {
		this.year--;
	}

	// 날짜 옆에 0 붙이기
	getPadded($index) {
		return leftPad($index, 2, '0');
	}
}

let simpleCalendar = {
	bindings: {
		dateA: '=',
		dateB: '='
	},
	controller: SimpleCalendar,
	template: require('./template.html')
};

export default simpleCalendar;