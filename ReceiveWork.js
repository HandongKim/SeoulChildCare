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






//공무송수신 시작

//첫페이지를 켰을 떄, 불러오는 리스트
function getInitialMessageList () {
	var stat = "A";
	var fld = "A";
	var date_type = "S";
	var sdd_dt = getCurrentDates();
	var end_dt = getOneMonthEarlyDates();
	var srch_type = 

	console.log("sdd_dt : " + sdd_dt);
	console.log("end_dt : " + end_dt);


}

function getCurrentDates () {
	var today = new Date();
	var yearInString = today.getFullYear().toString();
	var monthInString = "";
	var dateInString = "";

	if( (today.getMonth()+1) < 10 ) {
		monthInString = "0" + (today.getMonth()+1).toString();
	} else {
		monthInString = (today.getMonth()+1).toString();
	}
	
	if(today.getDate() < 10) {
		dateInString = "0" +today.getDate().toString();
	}else {
		dateInString = today.getDate().toString();
	}

	toDate.year.value = yearInString;
	toDate.month.value = monthInString;
	toDate.day.value = dateInString;

	var currentDate = yearInString+monthInString+dateInString; 
	return currentDate;
}

function getOneMonthEarlyDates () {
	var today = new Date()
	var priorDate = new Date().setDate(today.getDate()-30)
	var priorDate = new Date(priorDate);

	var yearInString = priorDate.getFullYear().toString();
	var monthInString = "";
	var dateInString = "";

	if( (priorDate.getMonth()+1) < 10 ) {
		monthInString = "0" + (priorDate.getMonth()+1).toString();
	} else {
		monthInString = (priorDate.getMonth()+1).toString();
	}
	
	if(priorDate.getDate() < 10) {
		dateInString = "0" +priorDate.getDate().toString();
	}else {
		dateInString = priorDate.getDate().toString();
	}

	fromDate.year.value = yearInString;
	fromDate.month.value = monthInString;
	fromDate.day.value = dateInString;

	var oneMonthEarlyDates = yearInString+monthInString+dateInString; 
	return oneMonthEarlyDates;
}



//공통적으로 리스트 불러오기
function getReceivedMessgaeList (stat, fld, date_type, stt_dt, end_dt, srch_type, srch_text) {
	var offDocTransList_URL = Backend.BASE_URL + Backend.offDocTransList_URL;

	var RECEIVE_ID = JSON.parse(Backend.dsParam).GVMEMID;
	var STAT = stat;
	var FLD = fld;
	var AREA = "";
	var DATE_TYPE = date_type;
	var STT_DT = stt_dt;
	var END_DT = end_dt;
	var SRCH_TYPE = srch_type;
	var SRCH_TEXT = srch_text;
	
	fetch(offDocTransList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			var responseHeaders = JSON.parse(response._bodyInit);
			console.log("2017.12.18 1 responseData : "+ JSON.stringify(responseHeaders));
			temp = responseHeaders.ds_bCashList[1];
			console.log("");
			console.log("2017.12.18 2 responseHeaders.ds_bCashList : "+ JSON.stringify(temp));
			//
			var date1;
			var type1;
			var typeColor1;
			var isBill1;
			var money1;
			var moneyColor1;
			var contents1;
			//2017.12.18 시작 
			// 
			for (var i = 0; i < temp.length; i++) {
				notes.add(new note(temp[i], i));
				selectOnlineBCashListDatas.add( new selectOnlineBCashListIndividualData(temp[i], i));
			}
			//2017.12.18 끝
        	var responseData = JSON.stringify(response);      	
            return response.json();
        }).then(function(jsonData) {
            var data = jsonData.results[0];
            console.log("data : " + jsonData.results[0]);
			console.log("Reg Succeeded[ios]: " + data.registration_token);
			// maintext.value = maintext.value + "/n" + data.registration_token;
        }).catch(function(err) {
            console.log("Reg Succeeded[ios] Error!! : " + err.message);
        });
}

//공무송수신 끝

function initReceiveList() {
	var srch_Type = "TITLE";
	var srch_Text = "";
	getReceiveList(srch_Type, srch_Text);
}

function getReceiveList(srch_Type, srch_Text) {
	var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
	var commClss = "D";
	var srchType = srch_Type;
	var srchText = srch_Text;

	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","INFO_CDHD_NO":"'+INFO_CDHD_NO+'"}';
	console.log("dsSearch : " + dsSearch);

	var jsonParam = JSON.parse('{"dsSearch":'+dsSearch+'}');

	var selectBusiSendAdminList_URL = Backend.BASE_URL + Backend.selectBusiSendAdminList_URL;


	fetch(selectBusiSendAdminList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			
			console.log("receive work responseData : " + responseData);
            return response.json();
        }).then(function(jsonData) {
            var data = jsonData.results[0];
            // console.log("data : " + jsonData.results[0]);
			// console.log("Reg Succeeded[ios]: " + data.registration_token);
			// maintext.value = maintext.value + "/n" + data.registration_token;
        }).catch(function(err) {
            // console.log("Reg Succeeded[ios] Error!! : " + err.message);
        });

}







module.exports = {
	years, months, days,
	fromDate, receiveFromPickerPanelOn, receiveFromPickerUp, receiveFromPickerDown,
	toDate, receiveToPickerPanelOn, receiveToPickerUp, receiveToPickerDown,
	receiveWorks, receiveworkDetail, getInitialMessageList, initReceiveList
};