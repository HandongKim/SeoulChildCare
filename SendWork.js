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

var searchText = Observable();
var type = Observable("제목", "내용", "수신자");
var selectedType = Observable("제목");

pickerOn = Observable(false);

function pickerUp() {
	pickerOn.value = true;
}

function pickerDown() {
	pickerOn.value = false;
}

function selectedTypes(){
	searchText.clear();
	selectedType.value = "제목";
}

var sendWorks = Observable();
// for (var i = 0 ; i < 5 ; i++) {
// 	sendWorks.add({
// 		sender: "노성순", 
// 		title: "업무연락 부탁드립니다.",
// 		regDate1: "오후 06:46",
// 		regDate2: "2018-01-01"
// 	});
// }

function sentMessage (args, index) {
	
	if (args.INDEX !=null) {
		this.INDEX = args.INDEX	
	} else {
		this.INDEX = "";
	}
	

	if (args.R_COUNT !=null) {
		this.R_COUNT = args.R_COUNT	
	} else {
		this.R_COUNT = "";
	}


	if (args.REPLY_DEPTH !=null) {
		this.REPLY_DEPTH = args.REPLY_DEPTH	
	} else {
		this.REPLY_DEPTH = "";
	}


	if (args.REPLY_DEPTH !=null) {
		this.REPLY_DEPTH = args.REPLY_DEPTH	
	} else {
		this.REPLY_DEPTH = "";
	}



	if (args.REGDATE !=null) {
		this.REGDATE = args.REGDATE	
	} else {
		this.REGDATE = "";
	}



	if (args.WRITER_NM !=null) {
		this.WRITER_NM = args.WRITER_NM	
	} else {
		this.WRITER_NM = "";
	}

	if (args.BOD_COM_YN !=null) {
		this.BOD_COM_YN = args.BOD_COM_YN	
	} else {
		this.BOD_COM_YN = "";
	}


	if (args.CHK !=null) {
		this.CHK = args.CHK	
	} else {
		this.CHK = "";
	}

	if (args.COMM_SEQ !=null) {
		this.COMM_SEQ = args.COMM_SEQ	
	} else {
		this.COMM_SEQ = "";
	}


	if (args.WRITER_ORG !=null) {
		this.WRITER_ORG = args.WRITER_ORG	
	} else {
		this.WRITER_ORG = "";
	}

	if (args.BOD_FORM_CLSS !=null) {
		this.BOD_FORM_CLSS = args.BOD_FORM_CLSS	
	} else {
		this.REGID = "";
	}

	if (args.TITLE !=null) {
		this.TITLE = (args.TITLE).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
	} else {
		this.TITLE = "";
	}



	


	
}


var sendworkDetail = Observable();
// sendworkDetail.add({
// 	title: "업무연락 부탁드립니다.",
// 	sender: "노성순",
// 	regDate1: "18:46:21",
// 	regDate2: "2018-01-01",
// 	cont: "테스트입니다."
// });








var commClss = "";
function initSentList() {
	console.log("initSentListinitSentListinitSentListinitSentListinitSentList");
	commClss = "D";
	var srch_Type = "TITLE";
	var srch_Text = "";

	getSentMessageList(srch_Type, srch_Text);
}

var sentMessages = Observable();
var REGID = JSON.parse(Backend.dsParam).GVMEMID;

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
	// var REGID = JSON.parse(Backend.dsParam).GVMEMID;
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


function goToDetailSentWork (args) {
	console.log("args : " + JSON.stringify(args));

	console.log(" args.data.COMM_SEQ : "+ args.data.COMM_SEQ);
	console.log(" args.data.REGID : "+ args.data.REGID);
	console.log(" args.data.BOD_FORM_CLSS : "+ args.data.BOD_FORM_CLSS);

	var COMM_SEQ = null;
	var INFO_CONF_DATE = null;
	
	if (args.data.COMM_SEQ !=null) {
		COMM_SEQ = args.data.COMM_SEQ;
	}else {
		COMM_SEQ = "";
	}
	

	if (args.data.INFO_CONF_DATE !=null) {
		INFO_CONF_DATE = args.data.INFO_CONF_DATE;
	}else {
		INFO_CONF_DATE = "";
	}


	console.log("commClss : " +commClss);
	console.log("COMM_SEQ : " +COMM_SEQ);
	// console.log("INFO_CONF_DATE : " +INFO_CONF_DATE);
	// console.log("INFO_CDHD_NO : " +INFO_CDHD_NO);


	var dsSearch = '{"commClss":"'+commClss
				+'","COMM_SEQ":"'+COMM_SEQ
				+'","REGID":"'+REGID
				+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+Backend.dsParam+',"dsSearch": '+dsSearch+'}');


	var searchBusiReceiveAdmDtl_URL = Backend.BASE_URL + Backend.searchBusisendAdmDtl_URL;

	fetch(searchBusiReceiveAdmDtl_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
        	console.log("response : " + JSON.stringify(response));

			// var bodyInit = JSON.parse(response._bodyInit);
			// var messageList = bodyInit.ds_CommList[1];
			// for (var i = 0; i < messageList.length; i++) {
			// 	receiveWorks.add(new receivedMessage(messageList[i], i)); 
			// }
			// console.log("receiveMessages : " + JSON.stringify(receiveWorks));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });



	console.log("hjahaheifheihq iowhefioqhwo iefho wihefoiqw hefiohwioehfw");
}

function searchContent () {
	console.log("selectedType.value : " + selectedType.value);
	var srch_Type = "";
	if (selectedType.value == "제목") {
		srch_Type = "TITLE";
	}else if (selectedType.value == "내용") {
		srch_Type = "CONT";
	} else if (selectedType.value == "수신자") {
		srch_Type = "RECEIVE_NM";
	}
	
	var srch_Text = searchText.value;

	console.log("srch_Type : " + srch_Type);
	console.log("srch_Text : " + srch_Text);

	getSentMessageList(srch_Type, srch_Text);
}

module.exports = {
	years, months, days,
	type, selectedType, pickerOn, pickerUp, pickerDown, selectedTypes,
	fromDate, sendFromPickerPanelOn, sendFromPickerUp, sendFromPickerDown,
	toDate, sendToPickerPanelOn, sendToPickerUp, sendToPickerDown,
	sendWorks, sendworkDetail, initSentList, sentMessages, goToDetailSentWork, searchContent, searchText
};