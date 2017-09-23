/**
 * https://web.cs.dal.ca/~jamie/CS3172/Course/assig/zeller.html
 */
class SimpleCalendar {
    constructor() {
        let current = new Date();
        this.year = current.getFullYear();
        this.month = current.getMonth();
    }

    createMonth() {
        let firstDate = new Date(this.year, this.month, 1); // 금월 1일
        let lastDate = new Date(this.year, this.month + 1, 0); // 금월 마지막일

        let prevDatesCount = firstDate.getDay(); // 전월 마지막 주에서 넘어온 수 (28, 29, 31, 1, 2, 3, 4 => 3)
        let currentDatesCount = lastDate.getDate(); // 이번 달 전체 일 수
    }
}