var Observable = require('FuseJS/Observable');
var Timer = require("FuseJS/Timer");
var UniSign = require("UniSign");
var settings = require('UserSettings');
var Device = require('Device');
var Backend = require('Backend.js');
var Environment = require('FuseJS/Environment');
//공무송수신 시작

//첫페이지를 켰을 떄, 불러오는 리스트
// function getInitialMessageList () {
// 	var stat = "A";
// 	var fld = "A";
// 	var date_type = "S";
// 	var sdd_dt = getCurrentDates();
// 	var end_dt = getOneMonthEarlyDates();
// 	var srch_type = 

// 	console.log("sdd_dt : " + sdd_dt);
// 	console.log("end_dt : " + end_dt);


// }

// function getCurrentDates () {
// 	var today = new Date();
// 	var yearInString = today.getFullYear().toString();
// 	var monthInString = "";
// 	var dateInString = "";

// 	if( (today.getMonth()+1) < 10 ) {
// 		monthInString = "0" + (today.getMonth()+1).toString();
// 	} else {
// 		monthInString = (today.getMonth()+1).toString();
// 	}
	
// 	if(today.getDate() < 10) {
// 		dateInString = "0" +today.getDate().toString();
// 	}else {
// 		dateInString = today.getDate().toString();
// 	}

// 	toDate.year.value = yearInString;
// 	toDate.month.value = monthInString;
// 	toDate.day.value = dateInString;

// 	var currentDate = yearInString+monthInString+dateInString; 
// 	return currentDate;
// }

// function getOneMonthEarlyDates () {
// 	var today = new Date()
// 	var priorDate = new Date().setDate(today.getDate()-30)
// 	var priorDate = new Date(priorDate);

// 	var yearInString = priorDate.getFullYear().toString();
// 	var monthInString = "";
// 	var dateInString = "";

// 	if( (priorDate.getMonth()+1) < 10 ) {
// 		monthInString = "0" + (priorDate.getMonth()+1).toString();
// 	} else {
// 		monthInString = (priorDate.getMonth()+1).toString();
// 	}
	
// 	if(priorDate.getDate() < 10) {
// 		dateInString = "0" +priorDate.getDate().toString();
// 	}else {
// 		dateInString = priorDate.getDate().toString();
// 	}

// 	fromDate.year.value = yearInString;
// 	fromDate.month.value = monthInString;
// 	fromDate.day.value = dateInString;

// 	var oneMonthEarlyDates = yearInString+monthInString+dateInString; 
// 	return oneMonthEarlyDates;
// }

var ds_OffDocTransCountDataList = Observable();

function ds_OffDocTransCountData (args, index) {

	this.INDEX = index;

	if (args.STAT !=null) {
		this.STAT = args.STAT;	
	} else {
		this.STAT = "";
	}
	
	if (args.SEND_DT !=null) {
		this.SEND_DT = args.SEND_DT;	
	} else {
		this.SEND_DT = "";
	}

	if (args.SEND_NM !=null) {
		this.SEND_NM = args.SEND_NM;	
	} else {
		this.SEND_NM = "";
	}

	if (args.RECEIVE_CNT !=null) {
		this.RECEIVE_CNT = args.RECEIVE_CNT;	
	} else {
		this.RECEIVE_CNT = "";
	}

	if (args.SEND_ID !=null) {
		this.SEND_ID = args.SEND_ID;	
	} else {
		this.SEND_ID = "";
	}

	if (args.FLD !=null) {
		this.FLD = args.FLD;	
	} else {
		this.FLD = "";
	}

	if (args.SEND_ORG !=null) {
		this.SEND_ORG = args.SEND_ORG;	
	} else {
		this.SEND_ORG = "";
	}

	if (args.CHECK_CNT !=null) {
		this.CHECK_CNT = args.CHECK_CNT;	
	} else {
		this.CHECK_CNT = "";
	}

	if (args.ATTCH_CNT !=null) {
		this.ATTCH_CNT = args.ATTCH_CNT;	
	} else {
		this.ATTCH_CNT = "";
	}

	if (args.DOC_NO !=null) {
		this.DOC_NO = args.DOC_NO;	
	} else {
		this.DOC_NO = "";
	}

	if (args.DOC_NM !=null) {
		this.DOC_NM = args.DOC_NM;	
	} else {
		this.DOC_NM = "";
	}
		
	if (args.RELAY_CNT !=null) {
		this.RELAY_CNT = args.RELAY_CNT;	
	} else {
		this.RELAY_CNT = "";
	}

	if (args.CHECK_DT !=null) {
		this.CHECK_DT = args.CHECK_DT;	
	} else {
		this.CHECK_DT = "";
	}

	if (args.RELAY_DT !=null) {
		this.RELAY_DT = args.RELAY_DT;	
	} else {
		this.RELAY_DT = "";
	}
}

//공통적으로 리스트 불러오기
function getReceivedMessgaeList (stat, fld, date_type, stt_dt, end_dt, srch_type, srch_text) {
	ds_OffDocTransCountDataList.clear();
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

	var dsSearch = '{' 
			+ '"RECEIVE_ID":"'+RECEIVE_ID+ '",' 
			+ '"STAT":"'+STAT+'",' 
			+ '"FLD":"'+FLD+'",'
			+ '"AREA":"'+AREA+'",'
			+ '"DATE_TYPE":"'+DATE_TYPE +'",'
			+ '"STT_DT":"' +STT_DT+ '",' 
			+ '"END_DT":"' +END_DT +'",'
			+ '"SRCH_TYPE":"'+SRCH_TYPE+'",'
			+ '"SRCH_TEXT":"'+SRCH_TEXT+'"' 
			+ '}';

	
	console.log("20180112 getReceivedMessgaeList : " + dsSearch);
	var jsonParam = JSON.parse('{"dsParam":'+Backend.dsParam+',"dsSearch": '+dsSearch+'}');

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
			var temp = responseHeaders.ds_OffDocTransList[1];
			// console.log("");
			console.log("2017.12.18 2 responseHeaders.ds_bCashList : "+ JSON.stringify(temp));
			//
		
			//2017.12.18 시작 
			// 
			// for (var i = 0; i < temp.length; i++) {
			// 	notes.add(new note(temp[i], i));
			// 	selectOnlineBCashListDatas.add( new selectOnlineBCashListIndividualData(temp[i], i));
			// }
			//2017.12.18 끝

			for (var i = 0; i < temp.length; i++) {
				ds_OffDocTransCountDataList.add(new ds_OffDocTransCountData(temp[i], i));			
			}

			console.log(JSON.stringify(ds_OffDocTransCountDataList._values));


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

function formatDate(date) {
	var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

	return [year, month, day].join('');    
}

function initialReceiveMessageList () {
	var stat = "A";
	var fld = "A";
	var date_type ="S";
	var srch_type = "D";
	var srch_text ="";
	//오늘까지 검색
	var end_dt = formatDate(new Date());
	var oneYearBeforeToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
	var firstDateOfOneYearBeforeToday = new Date(oneYearBeforeToday.getFullYear(), oneYearBeforeToday.getMonth(), 1);

	//오늘 부터 1년전 월의 첫쨋날
	var stt_dt = formatDate(firstDateOfOneYearBeforeToday);
	getReceivedMessgaeList(stat, fld, date_type, stt_dt, end_dt, srch_type, srch_text);
}


var selectedType = Observable("전체");
var type = Observable("전체", "입금", "출금");

var statusSelected = Observable("전체");
var statusType = Observable("전체", "회신", "신규", "마감", "확인");

var categorySelected = Observable("전체");
var categoryType = Observable("전체", "회계", "운영", "기타");

var dateTypeSelected = Observable("전체");
var dateType = Observable("발송일", "확인일", "회신일");

var searchTypeSelected = Observable("공문명");
var searchType = Observable("공문명", "내용", "파일명", "첨부파일명", "등록자");



module.exports = {
	initialReceiveMessageList, selectedType,
	type,statusSelected,statusType,categorySelected,
	categoryType,dateTypeSelected,dateType,searchTypeSelected,searchType
};
