var Observable = require('FuseJS/Observable');

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


module.exports = {
};
