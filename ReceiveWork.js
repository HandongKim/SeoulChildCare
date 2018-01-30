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

var type = Observable("제목", "내용", "보낸사람");
var selectedType = Observable("제목");

pickerOn = Observable(false);

function pickerUp() {
	pickerOn.value = true;
}

function pickerDown() {
	pickerOn.value = false;

	console.log("selectedType : " + selectedType.value);

	var temp = "";
	if (selectedType.value =="제목") {
		temp = "TITLE";
	} else if (selectedType.value == "내용") {
		temp = "CONT";
	} else if (selectedType.value == "보낸사람") {
		temp = "WRITER_NM";
	}

	console.log("temp : " +  temp);

}

var searchText = Observable();

function selectedTypes(){
	searchText.clear();
	selectedType.value = "제목";
}

var receiveWorks = Observable();
// for (var i = 0 ; i < 5 ; i++) {
// 	receiveWorks.add({
// 		sender: "노성순",
// 		title: "업무연락 부탁드립니다.",
// 		regDate1: "오후 06:46",
// 		regDate2: "2018-01-01"
// 	});
// }

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
	selectedTypes();

	commClss = "D";
	var srch_Type = "";
	var srch_Text = "";

	getReceivedMessageList(srch_Type, srch_Text);
}

var receiveMessages = Observable();

function receivedMessage (args, index) {
	this.INDEX = index
	if (args.REGID !=null) {
		this.REGID = args.REGID	
	} else {
		this.REGID = "";
	}
	

	if (args.INFO_CONF_DATE !=null) {
		this.INFO_CONF_DATE = args.INFO_CONF_DATE	
	} else {
		this.INFO_CONF_DATE = "";
	}


	if (args.SITE_CLSS_SND !=null) {
		this.SITE_CLSS_SND = args.SITE_CLSS_SND	
	} else {
		this.SITE_CLSS_SND = "";
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

var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
var dsParam = Backend.dsParam;

function searchContent () {

	var srchType = "";
	// if (selectedType.value ="제목") {
	// 	srchType = "TITLE";
	// } else if (selectedType.value = "내용") {
	// 	srchType = "CONT";
	// } else if (selectedType.value= "보낸사람") {
	// 	srchType = "WRITER_NM";
	// }



var srchType = "";
	if (selectedType.value =="제목") {
		srchType = "TITLE";
	} else if (selectedType.value == "내용") {
		srchType = "CONT";
	} else if (selectedType.value == "보낸사람") {
		srchType = "WRITER_NM";
	}


	console.log("selectedType.value : " + selectedType.value);

	var srchText = searchText.value;
	
	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","INFO_CDHD_NO":"'+INFO_CDHD_NO+'"}';


	console.log("dsSearch : " + dsSearch);

	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var selectBusiReceiveAdminList_URL = Backend.BASE_URL + Backend.selectBusiReceiveAdminList_URL;

	receiveWorks.clear();

	fetch(selectBusiReceiveAdminList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
        	console.log(JSON.stringify(response));
			var bodyInit = JSON.parse(response._bodyInit);
			var messageList = bodyInit.ds_CommList[1];
			for (var i = 0; i < messageList.length; i++) {
				receiveWorks.add(new receivedMessage(messageList[i], i)); 
			}
			console.log("receiveMessages FROM SEARCH CONTENT: " + JSON.stringify(receiveWorks));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
}



function getReceivedMessageList(srch_Type, srch_Text) {
	// var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
	var srchType = srch_Type;
	var srchText = srch_Text;
	
	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","INFO_CDHD_NO":"'+INFO_CDHD_NO+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var selectBusiReceiveAdminList_URL = Backend.BASE_URL + Backend.selectBusiReceiveAdminList_URL;

	receiveWorks.clear();

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
				receiveWorks.add(new receivedMessage(messageList[i], i)); 
			}
			console.log("receiveMessages : " + JSON.stringify(receiveWorks));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
}

function goToDetailReceiveWork (args) {
	console.log("args : " + JSON.stringify(args));

	console.log(" args.data.COMM_SEQ : "+ args.data.COMM_SEQ);
	console.log(" args.data.REGID : "+ args.data.REGID);
	console.log(" args.data.BOD_FORM_CLSS : "+ args.data.BOD_FORM_CLSS);

	var COMM_SEQ = null;
	var INFO_CONF_DATE = null;
	// var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
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
	console.log("INFO_CONF_DATE : " +INFO_CONF_DATE);
	console.log("INFO_CDHD_NO : " +INFO_CDHD_NO);


	var dsSearch = '{"commClss":"'+commClss
				+'","commSeq":"'+COMM_SEQ
				+'","INFO_CONF_DATE":"'+INFO_CONF_DATE
				+'","INFO_CDHD_NO":"'+INFO_CDHD_NO
				+'"}';



	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');


	var searchBusiReceiveAdmDtl_URL = Backend.BASE_URL + Backend.searchBusiReceiveAdmDtl_URL;

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

module.exports = {
	years, months, days,
	type, selectedType, pickerOn, pickerUp, pickerDown, selectedTypes,
	fromDate, receiveFromPickerPanelOn, receiveFromPickerUp, receiveFromPickerDown,
	toDate, receiveToPickerPanelOn, receiveToPickerUp, receiveToPickerDown, searchContent,
	receiveWorks, receiveworkDetail, initReceiveList, goToDetailReceiveWork, searchText
};