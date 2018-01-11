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

var receiveFromPickerPanelOn = Observable(false);
var fromDate = {
	year: Observable(2017),
	month: Observable(12),
	day: Observable(1)
};

function receiveFromPickerUp() {
	receiveFromPickerPanelOn.value = true;
}
function receiveFromPickerDown() {
	receiveFromPickerPanelOn.value = false;
}

var receiveToPickerPanelOn = Observable(false);
var toDate = {
	year: Observable(2018),
	month: Observable(1),
	day: Observable(1)
};

function receiveToPickerUp() {
	receiveToPickerPanelOn.value = true;
}
function receiveToPickerDown() {
	receiveToPickerPanelOn.value = false;
}

var receiveWorks = Observable();
for (var i = 0 ; i < 5 ; i++) {
	receiveWorks.add({
		sender: "노성순",
		title: "업무연락 부탁드립니다.",
		regDate1: "오후 06:46",
		regDate2: "2018-01-01"
	});
}

module.exports = {
	years, months, days,
	fromDate, receiveFromPickerPanelOn, receiveFromPickerUp, receiveFromPickerDown,
	toDate, receiveToPickerPanelOn, receiveToPickerUp, receiveToPickerDown,
	receiveWorks
};