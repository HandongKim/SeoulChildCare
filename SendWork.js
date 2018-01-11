var Observable = require('FuseJS/Observable');

var years = Observable();
for (var i = 0 ; i < 30 ; i++) {
	years.add(2010+i);
}

var months = Observable();
for (var i = 0 ; i < 12 ; i++) {
	months.add(1+i);
}

var days = Observable();
for (var i = 0 ; i < 32 ; i++) {
	days.add(1+i);
}

var sendFromPickerPanelOn = Observable(false);
var fromDate = {
	year: Observable(2017),
	month: Observable(12),
	day: Observable(1)
};

function sendFromPickerUp() {
	sendFromPickerPanelOn.value = true;
}
function sendFromPickerDown() {
	sendFromPickerPanelOn.value = false;
}

var sendToPickerPanelOn = Observable(false);
var toDate = {
	year: Observable(2018),
	month: Observable(1),
	day: Observable(1)
};

function sendToPickerUp() {
	sendToPickerPanelOn.value = true;
}
function sendToPickerDown() {
	sendToPickerPanelOn.value = false;
}

var sendWorks = Observable();
for (var i = 0 ; i < 5 ; i++) {
	sendWorks.add({
		sender: "노성순",
		title: "업무연락 부탁드립니다.",
		regDate1: "오후 06:46",
		regDate2: "2018-01-01"
	});
}

var sendworkDetail = Observable();
sendworkDetail.add({
	title: "업무연락 부탁드립니다.",
	sender: "노성순",
	regDate1: "18:46:21",
	regDate2: "2018-01-01",
	cont: "테스트입니다."
});

module.exports = {
	years, months, days,
	fromDate, sendFromPickerPanelOn, sendFromPickerUp, sendFromPickerDown,
	toDate, sendToPickerPanelOn, sendToPickerUp, sendToPickerDown,
	sendWorks, sendworkDetail
};