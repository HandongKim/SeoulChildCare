var Observable = require('FuseJS/Observable');
var Backend = require('Backend.js');

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








var commClss = "";
function initSentList() {
	console.log("initSentListinitSentListinitSentListinitSentListinitSentList");
	commClss = "D";
	var srch_Type = "";
	var srch_Text = "";

	getSentMessageList(srch_Type, srch_Text);
}

var sentMessages = Observable();

function sentMessage (args, index) {
	this.INDEX = index
	this.R_COUNT = args.R_COUNT;
	this.REPLY_DEPTH = args.REPLY_DEPTH;
	this.REGDATE = args.REGDATE;
	this.WRITER_NM = args.WRITER_NM;
	this.BOD_COM_YN = args.BOD_COM_YN;
	this.CHK = args.CHK;
	this.COMM_SEQ = args.COMM_SEQ;
	this.WRITER_ORG = args.WRITER_ORG;
	this.BOD_FORM_CLSS = args.BOD_FORM_CLSS;
	this.TITLE = args.TITLE;
}

function getSentMessageList(srch_Type, srch_Text) {
	var REGID = JSON.parse(Backend.dsParam).GVMEMID;
	var srchType = srch_Type;
	var srchText = srch_Text;
	var dsParam = Backend.dsParam;
	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","REGID":"'+REGID+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var selectBusiSendAdminList_URL = Backend.BASE_URL + Backend.selectBusiSendAdminList_URL;

	console.log("selectBusiSendAdminList_URL : " + selectBusiSendAdminList_URL);
	console.log("jsonParam : " + JSON.stringify(jsonParam));
	sentMessages.clear();

	fetch(selectBusiSendAdminList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
        	var bodyInit = JSON.parse(response._bodyInit);
			var messageList = bodyInit.ds_BusiSendList[1];
			console.log("MessageList : " + messageList);
			for (var i = 0; i < messageList.length; i++) {
				sentMessages.add(new sentMessage(messageList[i], i)); 
			}
			
			console.log("sentMessages : " + JSON.stringify(sentMessages));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
}


















module.exports = {
	years, months, days,
	fromDate, sendFromPickerPanelOn, sendFromPickerUp, sendFromPickerDown,
	toDate, sendToPickerPanelOn, sendToPickerUp, sendToPickerDown,
	sendWorks, sendworkDetail, initSentList
};