var Observable = require('FuseJS/Observable');
var unReg = Observable(false);
var Backend = require('Backend.js');

var year = Observable();
var years = Observable();
for (var i = 0 ; i < 30 ; i++) {
	years.add(2010+i);
}
var month = Observable();


var months = Observable();
for (var i = 0 ; i < 12 ; i++) {
	months.add(1+i);
}

// 날짜 선택 피커 화면 켜고 끄는 변수
var pickerOn = Observable(false);
// 날짜 선택 피커 화면 올리고 내리는 함수
function pickerUp() {
	pickerOn.value = true;
}

var dsParam = Backend.dsParam;

function clearBackendSubjectValues() {
	Backend.subject.isChoice.clear();
	Backend.subject.color.clear();
	Backend.subject.type.clear();
	Backend.subject.name.clear();
	Backend.subject.text.clear();
	Backend.subject.ESTI_CODE.clear();
	Backend.subject.ESTI_GB.clear();
	Backend.subject.ESTI_SUBCODE.clear();
};

function WhileInActive () {
	console.log("2018.01.03 WhileInactive");
}

var selectOnlineBCashListDatas = Observable();

function selectOnlineBCashListIndividualData (args, index) {
	this.INDEX = index;
	this.SUBJECT = args.SUBJECT;
	this.BILL_NURIGB = args.BILL_NURIGB;
	this.BIGO = args.BIGO;
	this.CASH_IDX2 = args.CASH_IDX2;
	this.GUBUN = args.GUBUN;
	this.CASH_GB = args.CASH_GB;
	this.BILL_NUM = args.BILL_NUM;
	this.BCASH_IDX = args.BCASH_IDX;
	this.BILL_DATE = args.BILL_DATE;
	this.CASH_PLACE = args.CASH_PLACE;
	this.ESTI_SUB_NM = args.ESTI_SUB_NM;
	this.SUM_MONEY = args.SUM_MONEY;
	this.BILL_INPROGRAM = args.BILL_INPROGRAM;
	this.BILL_ETC1 = args.BILL_ETC1;
	this.MEMO = args.MEMO;
	this.BILL_ETC2 = args.BILL_ETC2;
	this.BILL_ETC3 = args.BILL_ETC3;
	this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO;
	this.MONEY_OUT = args.MONEY_OUT;
	this.FIRMNAME = args.FIRMNAME;
	this.ACTION = args.ACTION;
	this.BILL_ETC4 = args.BILL_ETC4;
	this.CASH_ORDER = args.CASH_ORDER;
	this.MONEY_GB = args.MONEY_GB;
	this.EDITABLE = args.EDITABLE;
	this.BILL_BOJOGB = args.BILL_BOJOGB;
	this.ESTI_CODE = args.ESTI_CODE;
	this.CRED_SEQ = args.CRED_SEQ;
	this.ESTI_NAME = args.ESTI_NAME;
	this.BOOK_GB = args.BOOK_GB;
	this.BILL_IDX = args.BILL_IDX;
	this.BILL_CANCELGB = args.BILL_CANCELGB;
	this.BILL_GB = args.BILL_GB;
	this.MEMO_ADD = args.MEMO_ADD;
	this.ESTI_GB = args.ESTI_GB;
	this.BILL_DATE0 = args.BILL_DATE0;
	this.BILL_DATE1 = args.BILL_DATE1;
	this.BILL_DATE4 = args.BILL_DATE4;
	this.CASH_DATE = args.CASH_DATE;
	this.BILL_DATE2 = args.BILL_DATE2;
	this.PURPOSE = args.PURPOSE;
	this.BILL_DATE3 = args.BILL_DATE3;
	this.GRID_NURIGB = args.GRID_NURIGB;
	this.BILL_CLSS = args.BILL_CLSS;
	this.CASH_MEMO = args.CASH_MEMO;
	this.CHK = args.CHK;
	this.BILL_SUBCODE = args.BILL_SUBCODE;
	this.BILL_NUMDETAIL = args.BILL_NUMDETAIL;
	this.BILL_MONEY = args.BILL_MONEY;
	this.GRID_BOJOGB = args.GRID_BOJOGB;
	this.CONTENTS = args.CONTENTS;
	this.BCASH_MEMO = args.BCASH_MEMO;
	this.CASH_IDX = args.CASH_IDX;
	this.ESTI_DISPLAY = args.ESTI_DISPLAY;
	this.PREV_IDX = args.PREV_IDX;
	this.MEMCODE = args.MEMCODE;
	this.BILL_RECEIPT = args.BILL_RECEIPT;
	this.ESTI_PART = args.ESTI_PART;
	this.MONEY = args.MONEY;
	this.REMAIN = args.REMAIN;
	this.ESTI_SUB_YN = args.ESTI_SUB_YN;
	this.BILL_KEEPCODE = args.BILL_KEEPCODE;
	this.MONEY_IN = args.MONEY_IN;
	this.BCASH_MONEY = args.BCASH_MONEY;
}

function pickedSelectOnlineBCashListIndividualData (args) {
	this.SUBJECT = args.SUBJECT;
	this.BILL_NURIGB = args.BILL_NURIGB;
	this.BIGO = args.BIGO;
	this.CASH_IDX2 = args.CASH_IDX2;
	this.GUBUN = args.GUBUN;
	this.CASH_GB = args.CASH_GB;
	this.BILL_NUM = args.BILL_NUM;
	this.BCASH_IDX = args.BCASH_IDX;
	this.BILL_DATE = args.BILL_DATE;
	this.CASH_PLACE = args.CASH_PLACE;
	this.ESTI_SUB_NM = args.ESTI_SUB_NM;
	this.SUM_MONEY = args.SUM_MONEY;
	this.BILL_INPROGRAM = args.BILL_INPROGRAM;
	this.BILL_ETC1 = args.BILL_ETC1;
	this.MEMO = args.MEMO;
	this.BILL_ETC2 = args.BILL_ETC2;
	this.BILL_ETC3 = args.BILL_ETC3;
	this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO;
	this.MONEY_OUT = args.MONEY_OUT;
	this.FIRMNAME = args.FIRMNAME;
	this.ACTION = args.ACTION;
	this.BILL_ETC4 = args.BILL_ETC4;
	this.CASH_ORDER = args.CASH_ORDER;
	this.MONEY_GB = args.MONEY_GB;
	this.EDITABLE = args.EDITABLE;
	this.BILL_BOJOGB = args.BILL_BOJOGB;
	this.ESTI_CODE = args.ESTI_CODE;
	this.CRED_SEQ = args.CRED_SEQ;
	this.ESTI_NAME = args.ESTI_NAME;
	this.BOOK_GB = args.BOOK_GB;
	this.BILL_IDX = args.BILL_IDX;
	this.BILL_CANCELGB = args.BILL_CANCELGB;
	this.BILL_GB = args.BILL_GB;
	this.MEMO_ADD = args.MEMO_ADD;
	this.ESTI_GB = args.ESTI_GB;
	this.BILL_DATE0 = args.BILL_DATE0;
	this.BILL_DATE1 = args.BILL_DATE1;
	this.BILL_DATE4 = args.BILL_DATE4;
	this.CASH_DATE = args.CASH_DATE;
	this.BILL_DATE2 = args.BILL_DATE2;
	this.PURPOSE = args.PURPOSE;
	this.BILL_DATE3 = args.BILL_DATE3;
	this.GRID_NURIGB = args.GRID_NURIGB;
	this.BILL_CLSS = args.BILL_CLSS;
	this.CASH_MEMO = args.CASH_MEMO;
	this.CHK = args.CHK;
	this.BILL_SUBCODE = args.BILL_SUBCODE;
	this.BILL_NUMDETAIL = args.BILL_NUMDETAIL;
	this.BILL_MONEY = args.BILL_MONEY;
	this.GRID_BOJOGB = args.GRID_BOJOGB;
	this.CONTENTS = args.CONTENTS;
	this.BCASH_MEMO = args.BCASH_MEMO;
	this.CASH_IDX = args.CASH_IDX;
	this.ESTI_DISPLAY = args.ESTI_DISPLAY;
	this.PREV_IDX = args.PREV_IDX;
	this.MEMCODE = args.MEMCODE;
	this.BILL_RECEIPT = args.BILL_RECEIPT;
	this.ESTI_PART = args.ESTI_PART;
	this.MONEY = args.MONEY;
	this.REMAIN = args.REMAIN;
	this.ESTI_SUB_YN = args.ESTI_SUB_YN;
	this.BILL_KEEPCODE = args.BILL_KEEPCODE;
	this.MONEY_IN = args.MONEY_IN;
	this.BCASH_MONEY = args.BCASH_MONEY;
}




var selectOnlineBCashList_URL = Backend.BASE_URL + Backend.selectOnlineBCashList_URL;



var hasBeenSearched = Observable(false);
var selectedYearAndMonth;

function pickerDown() {
	hasBeenSearched.value = true;
	console.log("hasBeenSearched.value : " + hasBeenSearched.value);
	notes.clear();
	selectOnlineBCashListDatas.clear();
	var tempMonth;
	console.log("MONTH.VALUE : " + month.value);

	if(month.value <10) {
		tempMonth = "0" +month.value.toString();
	} else {
		tempMonth = month.value
	}

	console.log("tempMonth : " +tempMonth);
	var yearAndMonth = year.value.toString() + tempMonth.toString();
	selectedYearAndMonth = year.value.toString() + tempMonth.toString();

	console.log("yearAndMonth : " + yearAndMonth);
	var esti_code = "";
	console.log("selectedType = " +  selectedType);
	if(selectedType.value == "전체") {
		esti_code="";
	} else if (selectedType.value == "입금") {
		esti_code="1";
	} else if (selectedType.value == "출금") {
		esti_code="2";
	}

	var searchGubun = "A";
	if(unReg.value == true) {
		searchGubun = "N";
	}

	// console.log("testAPI clicked ");
	// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';

	// var dsParam = Backend.dsParam;


 	var dsSearch = '{"BOOK_GB":"01","search_gubun":"'+searchGubun+'","BCASH_IDX":"","search_cashgb":"'+ esti_code+'","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
 // var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"201706","search_gb":"Y"}';
    var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    
    console.log('jsonParam : ' + jsonParam);
    console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));
  
	fetch(selectOnlineBCashList_URL, {
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
	pickerOn.value = false;
}
// 타입 선택 피커 화면 켜고 끄는 변수
var pickerOn2 = Observable(false);
var selectedType = Observable("전체");
var type = Observable("전체", "입금", "출금");

// type.clear() 이용해서 type내용 없애고, type.add로 서버에서 받아온 내용을 넣으면 됩니다. 그리고, 처음으로 넣는 값도 selectedType.value에 같이 넣어주세요.

// 타입 선택 피커 화면 올리고 내리는 함수
function pickerUp2() {
	pickerOn2.value = true;
}

function pickerDown2() {
	notes.clear();
	selectOnlineBCashListDatas.clear();
	var tempMonth;
	console.log("MONTH.VALUE : " + month.value);

	if(month.value <10) {
		tempMonth = "0" +month.value.toString();
	} else {
		tempMonth = month.value
	}
	console.log("tempMonth : " +tempMonth);
	selectedYearAndMonth = year.value.toString() + tempMonth.toString();
	console.log("yearAndMonth : " + selectedYearAndMonth);

	var esti_code = "";
	console.log("selectedType = " +  selectedType);
	if(selectedType.value == "전체") {
		esti_code="";
	} else if (selectedType.value == "입금") {
		esti_code="1";
	} else if (selectedType.value == "출금") {
		esti_code="2";
	}

	var searchGubun = "A";
	if(unReg.value == true) {
		searchGubun = "N";
	}
	var dsSearch = '{"BOOK_GB":"01","search_gubun":"'+searchGubun+'","BCASH_IDX":"","search_cashgb":"'+ esti_code+'","search_month":"'+selectedYearAndMonth+'","search_gb":"Y"}';
 // var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"201706","search_gb":"Y"}';
    var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');  
    console.log('jsonParam : ' + jsonParam);
    console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));

	fetch(selectOnlineBCashList_URL, {
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
	pickerOn2.value = false;
}
var pickerOn3 = Observable(false);
function pickerUp3() {
	pickerOn3.value = true;
}

function pickerDown3(args) {

	var BCASH_IDX = "";
	console.log("args : " + JSON.stringify(args));

	console.log("pickerDown3 was clicked bank type");

	console.log("selectedbillCashInputDataList.value : " + selectedbillCashInputDataList.value);

	for (var i = 0; i < billCashInputDataListTotal.length; i++) {
		if(selectedbillCashInputDataList.value == billCashInputDataListTotal.getAt(i).NAME){
			BCASH_IDX = billCashInputDataListTotal.getAt(i).BCASH_IDX;
		}
	}

	console.log("BCASH_BANKNUM : " + BCASH_IDX);
	notes.clear();
	selectOnlineBCashListDatas.clear();
	var tempMonth;

	console.log("MONTH.VALUE : " + month.value);

	if(month.value <10) {
		tempMonth = "0" +month.value.toString();
	} else {
		tempMonth = month.value
	}

	console.log("tempMonth : " +tempMonth);


	var yearAndMonth = year.value.toString() + tempMonth.toString();





	console.log("yearAndMonth : " + yearAndMonth);


	var esti_code = "";
	console.log("selectedType = " +  selectedType);
	if(selectedType.value == "전체") {
		esti_code="";
	} else if (selectedType.value == "입금") {
		esti_code="1";
	} else if (selectedType.value == "출금") {
		esti_code="2";
	}

	var searchGubun = "A";
	if(unReg.value == true) {
		searchGubun = "N";
	}

	// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';

	var dsSearch = '{"BOOK_GB":"01","search_gubun":"'+searchGubun+'","BCASH_IDX":"'+BCASH_IDX+'","search_cashgb":"'+ esti_code+'","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
	 // var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"201706","search_gb":"Y"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    console.log('jsonParam : ' + jsonParam);
    console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));  

	fetch(selectOnlineBCashList_URL, {
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
	// selectedbillCashInputDataList.value = 
	pickerOn3.value = false;
}

function checkClick() {
	unReg.value = !unReg.value
}

function preClick() {
	if (month.value > 1) {
		month.value--;
	} else {
		month.value = 12;
		year.value--;
	}
}

function nextClick() {
	if (month.value < 12) {
		month.value++;
	} else {
		month.value = 1;
		year.value++;
	}
}

var notes = Observable();

function note(arg, noteIndex) {
	this.index = noteIndex;

	this.CASH_DATE = arg.CASH_DATE.substring(4,6) + "." + arg.CASH_DATE.substring(6,8);

	
	if (arg.CASH_GB == "1") {
		this.type = "입금";
		this.typeColor = "#4C9DFF";
		this.subTypeColor = "#8BBDFF";
	} else {
		this.type = "출금";
		this.typeColor = "#FF4200";
		this.subTypeColor = "#FFBA85";
	}

	this.BCASH_MONEY = arg.BCASH_MONEY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (arg.BILL_GB == "A02") {
		this.isBill = true;
	} else {
		this.isBill = false;
	}

	if (arg.ESTI_SUB_YN == "Y") {
		this.subType = "세목";
		this.name = arg.ESTI_NAME;
	} else {
		this.subType = "목";

		if(arg.ESTI_SUB_NM != null) {
			this.name = arg.ESTI_NAME + "[" + arg.ESTI_SUB_NM + "]";
		} else {
			this.name = arg.ESTI_NAME;	
		}	
	}

	this.reverse = false;
	if(arg.BILL_IDX != null) {
		if (arg.ESTI_GB.substr(1,1) != arg.ESTI_CODE.substr(0,1)) {
			this.reverse=true;
		}
		this.isShow = true;
	} else {
		this.isShow = false;
	}

	if (arg.BILL_RECEIPT > 1) {
		console.log("arg.BILL_RECEIPT : " + arg.BILL_RECEIPT);

		this.receipt = "2";
	} else if (arg.BILL_RECEIPT == 1) {
		this.receipt = "1";
	} else {
		this.receipt = "0";
	}

	this.BCASH_MEMO = arg.BCASH_MEMO;
}
		



		// 지금은 임시로 넣었지만, 파라메터 값의 조건에 따라 값들을 직접 지정해서 추가해주는 방식을 사용하는 것이 좋을 것 같습니다. ux단에서 구분해서 보여주기 보다는 조건판단은 자바스크립트에서 모두 하고 결과만 보여줄 수 있도록 속성값들을 추가하는 거죠. 함수를 사용하셔서 넣어도 좋고요. 그리고 전표상세로 넘어갈 때에는 파라미터에서 전표를 구분할 수 있는 값을 넘겨줘서, 그것을 가지고 다시 세부적으로 보이게 하는 방향을 사용하는 것이 좋지 않을까 합니다.


var billCashInputData = Observable();
var billCashInputDataList = Observable();

var selectedbillCashInputDataList = Observable("전체");
var billCashInputDataListTotal = Observable();


function getBillCashInputLoad () {
	//우선 리스트안에 있는 내용을 없얜다. 
	billCashInputDataList.clear();
	billCashInputDataListTotal.clear();
	// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';
	// var dsParam = Backend.dsParam;
	console.log("2018.01.01 9.20pm dsParam : " + dsParam);
	
	var SEARCH_GB = "Y";
	var SEARCH_TO = "";
	var GVMEMCODE = JSON.parse(dsParam).GVMEMCODE;
	var GVBOOKGB = JSON.parse(dsParam).GVBOOKGB;
	var SEARCH_BILLGB = "";
	var SEARCH_ESTISUB = "";
	var SEARCH_ESTI = "";
	var SEARCH_FROM = "";
	var GVMEMID = JSON.parse(dsParam).GVMEMID;
	var SEARCH_MONTH = "201712";
	var SEARCH_BIGO = "";
	var GVESTIYEAR = JSON.parse(dsParam).GVESTIYEAR;
	var SEARCH_MEMO = "";

	var dsSearch = '{' 
			+ '"SEARCH_GB":"'+SEARCH_GB+ '",' 
			+ '"SEARCH_TO":"'+SEARCH_TO+'",' 
			+ '"GVMEMCODE":"'+GVMEMCODE+'",'
			+ '"GVBOOKGB":"'+GVBOOKGB+'",'
			+ '"SEARCH_BILLGB":"'+SEARCH_BILLGB +'",'
			+ '"SEARCH_ESTISUB":"' +SEARCH_ESTISUB+ '",' 
			+ '"SEARCH_ESTI":"' +SEARCH_ESTI +'",'
			+ '"SEARCH_FROM":"'+SEARCH_FROM+'",'
			+ '"GVMEMID":"'+GVMEMID+'",'
			+ '"SEARCH_MONTH":"'+SEARCH_MONTH+'",'
			+ '"SEARCH_BIGO":"'+SEARCH_BIGO+ '",'
			+ '"GVESTIYEAR":"'+GVESTIYEAR+'",'
			+ '"SEARCH_MEMO":"'+SEARCH_MEMO+'"' 
			+ '}';

	
	console.log("20180112 dsSearch2 : " + dsSearch);
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');

	var url = Backend.BASE_URL + Backend.getBillCashInputLoad_URL;
	console.log("=========================== 2018.01.04===========================");
	console.log("getBillCashInputLoad URL : " + url);
	console.log("=========================== 2018.01.04===========================");

	fetch(url, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
	}).then(function (response) {
		var responseData = JSON.stringify(response);
		var responseHeaders = JSON.parse(response._bodyInit);

		var responseDsCashCodeList = JSON.stringify(responseHeaders.ds_bCashCodeList);
		responseDsCashCodeList = responseDsCashCodeList.split('],')[1];
		responseDsCashCodeList = responseDsCashCodeList.substr(0, responseDsCashCodeList.length-1);
		billCashInputData.replaceAll(JSON.parse(responseDsCashCodeList));
		billCashInputDataList.add("전체");

		for (var i =0; i < billCashInputData.length; i++) {
			var name = billCashInputData.getAt(i).NAME;
			var code = billCashInputData.getAt(i).BCASH_IDX;
			var array = '{"INDEX":"'+i+'","NAME":"'+name+'","BCASH_IDX":"'+code+'"}';
			billCashInputDataListTotal.add(JSON.parse(array));
			billCashInputDataList.add(billCashInputDataListTotal.getAt(i).NAME);
		}
			return response.json();
	}).then(function(jsonData) {

	}).catch(function(err) {
		console.log("ERROR : " + err.message);
	});
}


var selectOnlineBCashListData = Observable();
var temp;

function selectOnlineBCashList () {
	//뒷단에 저장해둔 선택한 계정과목 값 초기화
	clearBackendSubjectValues();
	//
	getBillCashInputLoad();
	notes.clear(); 
	console.log("testAPI clicked ");

	var currentTime;
	var tempYear;
	var monthTemp;
	var tempMonth;
	var yearAndMonth;

	console.log("hasBeenSearched.value : " + hasBeenSearched.value );

	if (hasBeenSearched.value == false) {
		currentTime = new Date()
		tempYear = currentTime.getFullYear();
		console.log("date : " + typeof(tempYear));
		monthTemp = currentTime.getMonth() + 1;
		console.log("month : " + month);
		year.value = tempYear;
		month.value = monthTemp;
		tempMonth = monthTemp.toString();
		if(monthTemp < 10) {
			tempMonth = "0" +monthTemp.toString();
		}
		yearAndMonth = tempYear + tempMonth;
		console.log("yearAndMonth : " +yearAndMonth);
		console.log("year.value : " + year.value);
		console.log("month.value : " + month.value);
	} else {
		yearAndMonth = selectedYearAndMonth;
		// hasBeenSearched.value = false;
	}


	console.log("yearAndMonthyearAndMonthyearAndMonthyearAndMonth : " + yearAndMonth);




    // var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"201706","search_gb":"Y"}';

    var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"'+yearAndMonth+'","search_gb":"Y"}';


    var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    
    console.log('jsonParam : ' + jsonParam);
    console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));


     

    console.log("=========================== 2018.01.04===========================");
	console.log("selectOnlineBCashList_URL URL : " + selectOnlineBCashList_URL);
	console.log("=========================== 2018.01.04===========================");




	fetch(selectOnlineBCashList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			var responseHeaders = JSON.parse(response._bodyInit);
			// console.log("2017.12.18 1 responseData : "+ JSON.stringify(responseHeaders));
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
			console.log("selectOnlineBCashListDatas : " + JSON.stringify(selectOnlineBCashListDatas));
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


function unRegisteredChecked() {
		// alert("pLease ");

	notes.clear();
	
	var tempMonth;

	console.log("MONTH.VALUE : " + month.value);

	if(month.value <10) {
		tempMonth = "0" +month.value.toString();
	} else {
		tempMonth = month.value
	}

	console.log("tempMonth : " +tempMonth);


	var yearAndMonth = year.value.toString() + tempMonth.toString();





	console.log("yearAndMonth : " + yearAndMonth);


	var esti_code = "";
	console.log("selectedType = " +  selectedType);
	if(selectedType.value == "전체") {
		esti_code="";
	} else if (selectedType.value == "입금") {
		esti_code="1";
	} else if (selectedType.value == "출금") {
		esti_code="2";
	}

	var searchGubun = "A";
	if(unReg.value == true) {
		searchGubun = "N";
	}


// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';
// var dsParam = Backend.dsParam
	


	var dsSearch = '{"BOOK_GB":"01","search_gubun":"'+searchGubun+'","BCASH_IDX":"","search_cashgb":"'+ esti_code+'","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
 	// var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"201706","search_gb":"Y"}';
    var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    
    console.log('jsonParam : ' + jsonParam);
    console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));

    
	fetch(selectOnlineBCashList_URL, {
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




function goDetailNote2 (arg) {

		// pickedSelectOnlineBCashListIndividualDataInstance = Observable();
	console.log("goDetailNote 2 was clicked");


	// console.log("[arg.data.index] : " + arg.data.index);
	// console.log("selectOnlineBCashListDatas[" +arg.data.index +"].CASH_IDX : " + JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_IDX));
	// console.log("selectOnlineBCashListDatas[" +arg.data.index +"].BILL_IDX : " + JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_IDX));
	console.log(JSON.stringify(notes._values[arg.data.index]));






		// Backend.CASH_IDX = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_IDX);
		// Backend.BILL_IDX = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_IDX);
	
	//선택 된 

	Backend.dataFromNoteManageToDetailNote.INDEX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].INDEX);
	Backend.dataFromNoteManageToDetailNote.SUBJECT.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].SUBJECT);
	Backend.dataFromNoteManageToDetailNote.BILL_NURIGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_NURIGB);
	Backend.dataFromNoteManageToDetailNote.BIGO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BIGO);
	Backend.dataFromNoteManageToDetailNote.CASH_IDX2.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_IDX2);
	Backend.dataFromNoteManageToDetailNote.GUBUN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].GUBUN);
	Backend.dataFromNoteManageToDetailNote.CASH_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_GB);
	Backend.dataFromNoteManageToDetailNote.BILL_NUM.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_NUM);
	Backend.dataFromNoteManageToDetailNote.BCASH_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BCASH_IDX);
	Backend.dataFromNoteManageToDetailNote.BILL_DATE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE);
	Backend.dataFromNoteManageToDetailNote.CASH_PLACE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_PLACE);
	Backend.dataFromNoteManageToDetailNote.ESTI_SUB_NM.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_SUB_NM);
	Backend.dataFromNoteManageToDetailNote.SUM_MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].SUM_MONEY);
	Backend.dataFromNoteManageToDetailNote.BILL_INPROGRAM.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_INPROGRAM);
	Backend.dataFromNoteManageToDetailNote.BILL_ETC1.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC1);
	Backend.dataFromNoteManageToDetailNote.MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MEMO);
	Backend.dataFromNoteManageToDetailNote.BILL_ETC2.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC2);
	Backend.dataFromNoteManageToDetailNote.BILL_ETC3.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC3);
	Backend.dataFromNoteManageToDetailNote.ORG_BCASH_MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ORG_BCASH_MEMO);
	Backend.dataFromNoteManageToDetailNote.MONEY_OUT.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY_OUT);
	Backend.dataFromNoteManageToDetailNote.FIRMNAME.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].FIRMNAME);
	Backend.dataFromNoteManageToDetailNote.ACTION.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ACTION);
	Backend.dataFromNoteManageToDetailNote.BILL_ETC4.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC4);
	Backend.dataFromNoteManageToDetailNote.CASH_ORDER.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_ORDER);
	Backend.dataFromNoteManageToDetailNote.MONEY_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY_GB);
	Backend.dataFromNoteManageToDetailNote.EDITABLE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].EDITABLE);
	Backend.dataFromNoteManageToDetailNote.BILL_BOJOGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_BOJOGB);
	Backend.dataFromNoteManageToDetailNote.ESTI_CODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_CODE);
	Backend.dataFromNoteManageToDetailNote.CRED_SEQ.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CRED_SEQ);
	Backend.dataFromNoteManageToDetailNote.ESTI_NAME.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_NAME);
	Backend.dataFromNoteManageToDetailNote.BOOK_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BOOK_GB);
	Backend.dataFromNoteManageToDetailNote.BILL_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_IDX);
	Backend.dataFromNoteManageToDetailNote.BILL_CANCELGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_CANCELGB);
	Backend.dataFromNoteManageToDetailNote.BILL_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_GB);
	Backend.dataFromNoteManageToDetailNote.MEMO_ADD.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MEMO_ADD);
	Backend.dataFromNoteManageToDetailNote.ESTI_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_GB);
	Backend.dataFromNoteManageToDetailNote.BILL_DATE0.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE0);
	Backend.dataFromNoteManageToDetailNote.BILL_DATE1.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE1);
	Backend.dataFromNoteManageToDetailNote.BILL_DATE4.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE4);
	Backend.dataFromNoteManageToDetailNote.CASH_DATE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_DATE);
	Backend.dataFromNoteManageToDetailNote.BILL_DATE2.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE2);
	Backend.dataFromNoteManageToDetailNote.PURPOSE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].PURPOSE);
	Backend.dataFromNoteManageToDetailNote.BILL_DATE3.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE3);
	Backend.dataFromNoteManageToDetailNote.GRID_NURIGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].GRID_NURIGB);
	Backend.dataFromNoteManageToDetailNote.BILL_CLSS.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_CLSS);
	Backend.dataFromNoteManageToDetailNote.CASH_MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_MEMO);
	Backend.dataFromNoteManageToDetailNote.CHK.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CHK);
	Backend.dataFromNoteManageToDetailNote.BILL_SUBCODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_SUBCODE);
	Backend.dataFromNoteManageToDetailNote.BILL_NUMDETAIL.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_NUMDETAIL);
	Backend.dataFromNoteManageToDetailNote.BILL_MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_MONEY);
	Backend.dataFromNoteManageToDetailNote.GRID_BOJOGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].GRID_BOJOGB);
	Backend.dataFromNoteManageToDetailNote.CONTENTS.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CONTENTS);
	Backend.dataFromNoteManageToDetailNote.BCASH_MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BCASH_MEMO);
	Backend.dataFromNoteManageToDetailNote.CASH_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_IDX);
	Backend.dataFromNoteManageToDetailNote.ESTI_DISPLAY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_DISPLAY);
	Backend.dataFromNoteManageToDetailNote.PREV_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].PREV_IDX);
	Backend.dataFromNoteManageToDetailNote.MEMCODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MEMCODE);
	Backend.dataFromNoteManageToDetailNote.BILL_RECEIPT.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_RECEIPT);
	Backend.dataFromNoteManageToDetailNote.ESTI_PART.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_PART);
	Backend.dataFromNoteManageToDetailNote.MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY);
	Backend.dataFromNoteManageToDetailNote.REMAIN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].REMAIN);
	Backend.dataFromNoteManageToDetailNote.ESTI_SUB_YN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_SUB_YN);
	Backend.dataFromNoteManageToDetailNote.BILL_KEEPCODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_KEEPCODE);
	Backend.dataFromNoteManageToDetailNote.MONEY_IN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY_IN);
	Backend.dataFromNoteManageToDetailNote.BCASH_MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BCASH_MONEY);

	Backend.dataFromNoteManageToDetailNote.note_index.value = notes._values[arg.data.index].index;
	Backend.dataFromNoteManageToDetailNote.note_CASH_DATE.value = notes._values[arg.data.index].CASH_DATE;
	Backend.dataFromNoteManageToDetailNote.note_type.value = notes._values[arg.data.index].type;
	Backend.dataFromNoteManageToDetailNote.note_typeColor.value = notes._values[arg.data.index].typeColor;
	Backend.dataFromNoteManageToDetailNote.note_subTypeColor.value = notes._values[arg.data.index].subTypeColor;
	Backend.dataFromNoteManageToDetailNote.note_BCASH_MONEY.value = notes._values[arg.data.index].BCASH_MONEY;
	Backend.dataFromNoteManageToDetailNote.note_isBill.value = notes._values[arg.data.index].isBill;
	Backend.dataFromNoteManageToDetailNote.note_subType.value = notes._values[arg.data.index].subType;
	Backend.dataFromNoteManageToDetailNote.note_name.value  = notes._values[arg.data.index].name;
	Backend.dataFromNoteManageToDetailNote.note_reverse.value = notes._values[arg.data.index].reverse;
	Backend.dataFromNoteManageToDetailNote.note_isShow.value = notes._values[arg.data.index].isShow;
	Backend.dataFromNoteManageToDetailNote.note_receipt.value = notes._values[arg.data.index].receipt;
	Backend.dataFromNoteManageToDetailNote.note_BCASH_MEMO.value = notes._values[arg.data.index].BCASH_MEMO;



	Backend.subject.ESTI_CODE.clear();
	Backend.subject.name.value = "계정과목 선택";
    Backend.subject.isChoice.value = false;

  	var infoJSON = {
		isFromNoteManage:true
	}

	

	router.push("DetailNote", infoJSON);



		// testValueToBe="TEST VALUE 2";
		// pickedSelectOnlineBCashListIndividualDataInstance.add(new pickedSelectOnlineBCashListIndividualData(selectOnlineBCashListDatas._values[arg.data.index]));

		// console.log("pickedSelectOnlineBCashListIndividualDataInstance.CASH_IDX : " + pickedSelectOnlineBCashListIndividualDataInstance.length);
		// console.log("pickedSelectOnlineBCashListIndividualDataInstance.BILL_IDX : " + pickedSelectOnlineBCashListIndividualDataInstance.value.BILL_IDX);

		// var infoJSON = {
		// 	CASH_IDX2:temp[arg.data.index].CASH_IDX2,
		// 	ORG_BCASH_MEMO:temp[arg.data.index].ORG_BCASH_MEMO,
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],

		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],
		// 	SELECTED_DATA:temp[arg.data.index],

		// 	CASH_IDX:temp[arg.data.index].CASH_IDX,
		// 	BILL_IDX:temp[arg.data.index].BILL_IDX,

		// 	INDEX:notes._values[arg.data.index].index,
		// 	DATE:notes._values[arg.data.index].date,
		// 	TYPE:notes._values[arg.data.index].type,
		// 	MONEY:notes._values[arg.data.index].money,
		// 	SUBTYPECOLOR:notes._values[arg.data.index].subTypeColor,
		// 	ISBILL:notes._values[arg.data.index].isBill,
		// 	SUBTYPE:notes._values[arg.data.index].subType,
		// 	NAME:notes._values[arg.data.index].name,
		// 	REVERSE:notes._values[arg.data.index].reverse,
		// 	RECEIPT:notes._values[arg.data.index].receipt,
			
		// 	MEMO:temp[arg.data.index].BCASH_MEMO

			
		// }


		
		// console.log("temp[arg.data.index].CASH_IDX : " + temp[arg.data.index].CASH_IDX);
		// console.log("temp[arg.data.index].BILL_IDX : " + temp[arg.data.index].BILL_IDX);
		// // console.log("notes[arg.data.index].reverse : " + notes[arg.data.index]._values.reverse);



		
		
	}








module.exports = {
	unReg, checkClick,
	year, month, years, months, pickerOn, pickerUp, pickerDown, preClick, nextClick, pickerOn2, pickerOn3, pickerUp2, pickerDown2, selectedType, type, notes,
	goDetailNote1: function(arg) {
		Backend.subject.name.value = "계정과목 선택";
        Backend.subject.isChoice.value = false;
		router.push("DetailNote", "new");
	},goDetailNote2,
	getBillCashInputLoad, billCashInputDataList	,pickerUp3, pickerDown3, selectOnlineBCashList, selectedbillCashInputDataList,
	unRegisteredChecked, WhileInActive
};