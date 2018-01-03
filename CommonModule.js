var Observable = require('FuseJS/Observable');


var currentYear = Observable();
var currentMonth = Observable();
var currentYearAndMonth = Observable();

function getCurrentDate() {
	//오늘날짜(년월일) 받아오기 
	var tempDate = new Date();
	//금년도 값 받아오기
	var tempYear = tempDate.getFullYear();
	//지역변수에 금년도 값 넣기
	currentYear.value = tempYear.toString();
	//현재 월값 가져오기 
	var tempMonth = currentTime.getMonth() + 1;
	//1-9월 까지는 앞에 0 붙히기 
	if(tempMonth < 10) {
		tempMonth = "0" +tempMonth.toString();
	}

	//지역변수에 현재 월값 넣기 
	currentMonth.value = tempMonth.toString();
	currentYearAndMonth.value = tempYear.value + tempMonth.value;
}




module.exports = {
	currentYear,
	currentMonth,
	currentYearAndMonth,
	getCurrentDate
};
