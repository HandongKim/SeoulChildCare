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

var receiveFromPickerPanelOn = Observable(false);
var fromDate = {
	year: Observable(2017),
	month: Observable(01),
	day: Observable(01)
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
	month: Observable(01),
	day: Observable(11)
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

var receiveworkDetail = Observable();
receiveworkDetail.add({
	title: "업무연락 부탁드립니다.",
	sender: "노성순",
	regDate1: "18:46:21",
	regDate2: "2018-01-01",
	cont: "테스트입니다."
});

var commClss = "";
function initReceiveList() {
	commClss = "D";
	var srch_Type = "";
	var srch_Text = "";

	getReceivedMessageList(srch_Type, srch_Text);
}

var receiveMessages = Observable();

function receivedMessage (args, index) {
	this.INDEX = index
	this.REGID = args.REGID
	this.INFO_CONF_DATE = args.INFO_CONF_DATE
	this.SITE_CLSS_SND = args.SITE_CLSS_SND
	this.REPLY_DEPTH = args.REPLY_DEPTH
	this.REGDATE = args.REGDATE
	this.WRITER_NM = args.WRITER_NM
	this.BOD_COM_YN = args.BOD_COM_YN
	this.CHK = args.CHK
	this.COMM_SEQ = args.COMM_SEQ
	this.WRITER_ORG = args.WRITER_ORG
	this.BOD_FORM_CLSS = args.BOD_FORM_CLSS
	this.TITLE = args.TITLE
}

function getReceivedMessageList(srch_Type, srch_Text) {
	var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
	var srchType = srch_Type;
	var srchText = srch_Text;
	var dsParam = Backend.dsParam;
	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","INFO_CDHD_NO":"'+INFO_CDHD_NO+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var selectBusiReceiveAdminList_URL = Backend.BASE_URL + Backend.selectBusiReceiveAdminList_URL;

	receiveMessages.clear();

	fetch(selectBusiReceiveAdminList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var bodyInit = JSON.parse(response._bodyInit);
			var messageList = bodyInit.ds_CommList[1];
			for (var i = 0; i < messageList.length; i++) {
				receiveMessages.add(new receivedMessage(messageList[i], i)); 
			}
			console.log("receiveMessages : " + JSON.stringify(receiveMessages));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
}

module.exports = {
	years, months, days,
	fromDate, receiveFromPickerPanelOn, receiveFromPickerUp, receiveFromPickerDown,
	toDate, receiveToPickerPanelOn, receiveToPickerUp, receiveToPickerDown,
	receiveWorks, receiveworkDetail, initReceiveList
};