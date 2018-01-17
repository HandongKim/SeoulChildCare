var Observable = require('FuseJS/Observable');
var Backend = require('Backend.js');
var CommonModule = require('CommonModule.js');

		// var ValueFactory = require('ValueFactory');

		// console.log("===================");
		// console.log(JSON.stringify(ValueFactory.getInfoJson()));
		// console.log("===================");


		
detailText = "불러온 전표내역이 없습니다."
showText = Observable(false);;

		// this.Parameter.onValueChanged(null, function(x) {
		// 	if (x == null) {
		// 		detailText.value = "불러온 전표내역이 없습니다.";
		// 	}
		// });
		
var dsParam = Backend.dsParam;



var	CASH_IDX = Backend.dataFromNoteManageToDetailNote.CASH_IDX.value;
var	BILL_IDX = Backend.dataFromNoteManageToDetailNote.BILL_IDX.value;

function viewWillAppear() {
	console.log("Data Initialised");
	selectedData.value = "결제방법";
	moneyValue.value="";
	selectedMemo.value="";
}

var alert = {
	title: Observable(),
	message: Observable(),
	type: Observable("Check"),
	layer: Observable("Background")
};


//2018.01.17 기존소스 시작
// var alertWithConfirm = {
// 	title: Observable("수정완료"),
// 	message: Observable("수정되었습니다."),
// 	type: Observable("Check"),
// 	layer: Observable("Background")
// };
//2018.01.17 기존소스 끝


//2018.01.17 새로운 소스 시작
var alertWithConfirm = {
	title: Observable(""),
	message: Observable(""),
	type: Observable("Check"),
	layer: Observable("Background")
};
//2018.01.17 새로운 소스 끝




// this.Parameter.onValueChanged(null,function(x) {
// 	if (x == null) {

// 	}else {
// 		CASH_GB = Observable(x.CASH_GB);
// 		if (CASH_GB.value == "1") {
// 			incomeTF.value = false;
// 		} else {
// 			incomeTF.value = true;
// 		}
		
// 		console.log("2018.01.01 CASH_GB : " + CASH_GB.value);
// 		searchTheSubjectList("3"+CASH_GB.value);
// 	}
// });

// this.Parameter.onValueChanged(null, function(args) {
// 	console.log(JSON.stringify(args));
// 	console.log("parameter was changed");
// });








		// this.Parameter.onValueChanged(null,function(x) {
		// 	if (x == null) {
		// 		// detailText.value = "불러온 전표내역이 없습니다.";
		// 		// // console.log(detailText.value);
		// 		// showText.value = true;
		// 		// Backend.subject.text.value = "계정과목 선택";
		// 		// Backend.subject.isChoice.value = false;
		// 	}else {
		// 		SELECTED_DATA = Observable(x.SELECTED_DATA);
		// 		CASH_IDX= Observable(x.CASH_IDX);
		// 		BILL_IDX= Observable(x.BILL_IDX);
		// 		INDEX= Observable(x.INDEX);
		// 		DATE= Observable(x.DATE);
		// 		TYPE= Observable(x.TYPE);
		// 		MONEY= Observable(x.MONEY);
		// 		SUBTYPECOLOR= Observable(x.SUBTYPECOLOR);
		// 		ISBILL= Observable(x.ISBILL);
		// 		SUBTYPE= Observable(x.SUBTYPE);
		// 		NAME= Observable(x.NAME);
		// 		REVERSE= Observable(x.REVERSE);
		// 		RECEIPT= Observable(x.RECEIPT);
		// 		MEMO= Observable(x.MEMO);
		// 		showText.value = false;
		// 		Backend.subject.name.value = "계정과목 선택";
		// 		Backend.subject.isChoice.value = false;

		// 		// // console.log("DetailNote CASH_IDX: " + x.CASH_IDX);
  //   // 			// console.log("DetailNote BILL_IDX: " + x.BILL_IDX);
  //   // 			// console.log("DetailNote BILL_IDX: " + x.REVERSE);
  //   			// console.log("SELECTED_DATA : " + JSON.stringify(SELECTED_DATA));
		// 	}
		// });







var tempCode;
var temp;
var notes = Observable();
var selectMobileOnlineBillList_URL = Backend.BASE_URL + Backend.selectMobileOnlineBillList_URL;
		
function note(arg, noteIndex) {
	this.index = noteIndex;
	this.date = arg.CASH_DATE.substring(4,6) + "." + arg.CASH_DATE.substring(6,8);
	this.CASH_IDX = arg.CASH_IDX;
	if (arg.CASH_GB == "1") {
		this.type = "입금";
		this.typeColor = "#4C9DFF";
		this.money = arg.MONEY;
		this.subTypeColor = "#8BBDFF";
	} else {
		this.type = "출금";
		this.typeColor = "#FF4200";
		this.money = arg.MONEY;
		this.subTypeColor = "#FFBA85";
	}
	this.money = arg.MONEY;
	if(this.money != null) {
		this.money = this.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
	}
	if (arg.MONEY == "A02") {
		this.isBill = true;
	} else {
		this.isBill = false;
	}
	if (arg.ESTI_SUB_YN == "Y") {
		this.subType = "세목";
		this.name = arg.ESTI_NAME;
	} else {
		this.subType = "목";
		this.name = arg.ESTI_NAME;
	}

	this.reverse = false;
	if (arg.BILL_IDX !=null && arg.ESTI_GB !=null) {
		if (arg.ESTI_GB.substr(1,1) != arg.ESTI_CODE.substr(0,1)){
			this.reverse = true;
		}
	}
	if(arg.BILL_IDX != null) {
		this.isShow = true;
	} else {
		this.isShow = false;
	}
	if (arg.BILL_RECEIPT > 1) {
		// console.log("arg.BILL_RECEIPT : " + arg.BILL_RECEIPT);
		this.receipt = "2";
	} else if (arg.BILL_RECEIPT == 1) {
		this.receipt = "1";
	} else {
		this.receipt = "0";
	}
	this.memo = arg.BCASH_MEMO;
}
		
var listDetailNotes = Observable();

function listDetailNote (args, index) {
	this.INDEX = index;
	this.CASH_IDX2 = args.CASH_IDX2;
	this.CASH_GB=args.CASH_GB;
	this.CASH_IDX= args.CASH_IDX;
	this.BCASH_MEMO = args.BCASH_MEMO;
	this.ESTI_CODE = args.ESTI_CODE
	this.CASH_DATE = args.CASH_DATE
	this.ESTI_NAME = args.ESTI_NAME
	this.BILL_CLSS = args.BILL_CLSS
	this.SUM_MONEY = args.SUM_MONEY
	this.BILL_RECEIPT = args.BILL_RECEIPT
	this.MONEY = args.MONEY
	this.ESTI_SUB_YN = args.ESTI_SUB_YN
	this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO
	this.ACTION = args.ACTION
	this.BILL_SUBCODE = args.BILL_SUBCODE
	this.BILL_IDX = args.BILL_IDX
	this.BCASH_BILL_SEQ = args.BCASH_BILL_SEQ
}

function selectedDetailNote(args) {
	this.INDEX = args.INDEX;
	this.CASH_IDX2 = args.CASH_IDX2;
	this.CASH_GB=args.CASH_GB;
	this.CASH_IDX= args.CASH_IDX;
	this.BCASH_MEMO = args.BCASH_MEMO;
	this.ESTI_CODE = args.ESTI_CODE
	this.CASH_DATE = args.CASH_DATE
	this.ESTI_NAME = args.ESTI_NAME
	this.SUM_MONEY = args.SUM_MONEY
	this.BILL_RECEIPT = args.BILL_RECEIPT
	this.MONEY = args.MONEY
	this.ESTI_SUB_YN = args.ESTI_SUB_YN
	this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO
	this.ACTION = args.ACTION
	this.BILL_SUBCODE = args.BILL_SUBCODE
	this.BILL_IDX = args.BILL_IDX
	this.BCASH_BILL_SEQ = args.BCASH_BILL_SEQ
}



function getListDetailNote () {
	alertWithConfirm.layer.value = "Background";
// console.log("testAPI clicked ");
// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';
// var dsSearch = '{"SEARCH_ESTI":"", "SEARCH_FROM":"","SEARCH_BIGO":"","SEARCH_BILLGB":"","SEARCH_ESTISUB":"","SEARCH_GB":"Y","SEARCH_MEMO":"","SEARCH_MONTH":"201712","SEARCH_TO":""}';
// var dsSearch = '{"SEARCH_GB":"Y","SEARCH_TO":"","GVMEMCODE":"SEOUL000000000000121","GVBOOKGB":"01","SEARCH_BILLGB":"","SEARCH_ESTISUB":"","SEARCH_ESTI":"", "SEARCH_FROM":"", "GVMEMID":"9999990","SEARCH_MONTH":"201712","SEARCH_BIGO":"","GVESTIYEAR":"2017","SEARCH_MEMO":""}';
// 2017.12.18 dsSearch에 요청하는 파람값을 변경한다.


	CASH_IDX = Backend.dataFromNoteManageToDetailNote.CASH_IDX.value;
	BILL_IDX = Backend.dataFromNoteManageToDetailNote.BILL_IDX.value;



    var dsSearch = '{"SEARCH_BCASH":'+CASH_IDX+',"SEARCH_BILL_IDX": '+BILL_IDX+'}';

    console.log("CASH_IDX : " + CASH_IDX);
    console.log("SEARCH_BILL_IDX : " + BILL_IDX);




	// // console.log(" dsSearch : " + dsSearch);
    var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    // console.log('jsonParam : ' + jsonParam);
    // console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));

    console.log("getListDetailNote was called");

    // moneyValue.value="";
    // selectedData.value="카드결제";
    // subType.isChoice.value=false;




	fetch(selectMobileOnlineBillList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);

			console.log("2017.12.30 : responseData : "+ responseData);

			var responseHeaders = JSON.parse(response._bodyInit);
			// console.log("2017.12.18 1 responseData : "+ JSON.stringify(responseHeaders));
			// var damnIT = JSON.parse();
			
			// console.log("2017.12.18 2 responseHeaders.ds_billList : "+ JSON.stringify(responseHeaders.ds_billList[1]));


			temp = responseHeaders.ds_billList[1];
			
			console.log("2017.12.18 2 responseHeaders.ds_billList : "+ JSON.stringify(temp));

			notes.clear();
			listDetailNotes.clear();


			// console.log("fefefefefe temp.length : " + temp.length);


			for (var i = 0; i < temp.length; i++) {
				notes.add(new note(temp[i], i));
				// console.log(JSON.stringify(notes.value));
				listDetailNotes.add(new listDetailNote(temp[i], i));
			}


			initialDataSetting();
        	var responseData = JSON.stringify(response);
        	

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

function initialDataSetting () {
	moneyValue.clear();
	// subType.isChoice.clear();
	// subType.color.clear();
	// subType.type.clear();
	// subType.text.clear();

	// console.log("args.data.index : " + args.data.index);
	console.log(JSON.stringify(listDetailNotes._values[0]));

	//서버에 쓰일 데이터.
	selectedDetailNoteVariable = new selectedDetailNote(listDetailNotes._values[0]);
	

	console.log("BILL_IDX VALUE IS  : " + selectedDetailNoteVariable.BILL_IDX );





	var selectedYear = selectedDetailNoteVariable.CASH_DATE.substr(0,4);
	var selectedMonth = selectedDetailNoteVariable.CASH_DATE.substr(4,2);
	var selectedDay = selectedDetailNoteVariable.CASH_DATE.substr(6,2);

	selectedMemo.value = selectedDetailNoteVariable.BCASH_MEMO;
	selectedMoney.value = Backend.dataFromNoteManageToDetailNote.BCASH_MONEY;

	year.value =selectedYear;
	month.value = selectedMonth;
	day.value = selectedDay;
	
	moneyValue.value = notes._values[0].money;
	
	console.log("notes._values[args.data.index] : " + JSON.stringify(notes._values[0]));
	console.log("notes._values[args.data.index].color : " + notes._values[0].color);
	console.log("notes._values[args.data.index].type : " + notes._values[0].type);
	console.log("notes._values[args.data.index].text : " + notes._values[0].text);

	Backend.subject.isChoice.value = true;
	Backend.subject.name.value = notes._values[0].name;
	Backend.subject.color.value = notes._values[0].subTypeColor;
	Backend.subject.type.value = notes._values[0].subType;
}



var selectedTemp;
var selectedMemo = Observable();
var selectedMoney = Observable();
var CASH_GB = Observable();
var	INDEX;
var	DATE;
var	TYPE;
var	MONEY;
var	SUBTYPECOLOR;
var	ISBILL;
var	SUBTYPE;
var	NAME;
var	REVERSE;
var	RECEIPT;
var	MEMO;
var SELECTED_DATA;
var moneyValue = Observable();


var selectedDetailNoteVariable = null;

var tempIndex = null;

function pickFromList(args) {

	console.log("args.data.index : " + args.data.index);

	tempIndex = args.data.index;

	console.log("tempIndex : " + tempIndex);
	// console.log(JSON.stringify(args));
	// console.log("temp[arg.data.index].CASH_DATE : " + temp[args.data.index].CASH_DATE);

	moneyValue.clear();
	// subType.isChoice.clear();
	// subType.color.clear();
	// subType.type.clear();
	// subType.text.clear();

	console.log("args.data.index : " + args.data.index);
	console.log(JSON.stringify(listDetailNotes._values[args.data.index]));

	//서버에 쓰일 데이터.
	selectedDetailNoteVariable = new selectedDetailNote(listDetailNotes._values[args.data.index]);
	

	console.log("BILL_IDX VALUE IS  : " + selectedDetailNoteVariable.BILL_IDX );





	var selectedYear = selectedDetailNoteVariable.CASH_DATE.substr(0,4);
	var selectedMonth = selectedDetailNoteVariable.CASH_DATE.substr(4,2);
	var selectedDay = selectedDetailNoteVariable.CASH_DATE.substr(6,2);

	selectedMemo.value = selectedDetailNoteVariable.BCASH_MEMO;
	selectedMoney.value = Backend.dataFromNoteManageToDetailNote.BCASH_MONEY;

	year.value =selectedYear;
	month.value = selectedMonth;
	day.value = selectedDay;
	
	moneyValue.value = notes._values[args.data.index].money;
	
	console.log("notes._values[args.data.index] : " + JSON.stringify(notes._values[args.data.index]));
	console.log("notes._values[args.data.index].color : " + notes._values[args.data.index].color);
	console.log("notes._values[args.data.index].type : " + notes._values[args.data.index].type);
	console.log("notes._values[args.data.index].text : " + notes._values[args.data.index].text);

	Backend.subject.isChoice.value = true;
	Backend.subject.name.value = notes._values[args.data.index].name;
	Backend.subject.color.value = notes._values[args.data.index].subTypeColor;
	Backend.subject.type.value = notes._values[args.data.index].subType;

	// selectedTemp = temp[args.data.index];
	// var selectedSubject = temp[args.data.index].ESTI_NAME;

	// CASH_GB.value = temp[args.data.index].CASH_GB;

	// console.log("temp[args.data.index].CASH_GB : " +  CASH_GB.value);

	// selectedMemo.clear();
	// selectedMemo.value= selectedTemp.BCASH_MEMO;

	 
	// tempCode = args.data.ESTI_CODE;
	// Backend.subject.isChoice.value = true;
	// Backend.subject.color.value = args.data.subTypeColor;
	// Backend.subject.type.value = args.data.subType;
	// Backend.subject.name.value = selectedSubject;

	// moneyValue.value = temp[args.data.index].MONEY;


		// console.log("selectedTemp : " + JSON.stringify(selectedTemp));





		// console.log("temp[arg.data.index].MONEY : " + temp[args.data.index].MONEY);
}


		


var uploadOn = Observable(false);

function tryUpload() {
	uploadOn.value = true;
}

function cancelUpload() {
	uploadOn.value = false;
}

var pickerOn = Observable(false);
var selectedData = Observable("결제방법");
var pickerData = Observable("카드결제", "아이행복카드", "계좌이체", "자동이체", "지로", "현금결제", "기타");

function pickerUp() {
	selectedData.value = "카드결제";
	pickerOn.value = true;
}

var selected_BILL_CLSS = Observable();

function pickerDown() {
	console.log("selectedData : " + selectedData.value);

	if(selectedData.value == "카드결제") {
		selected_BILL_CLSS.value = "10";
	} else if (selectedData.value == "아이행복카드") {
		selected_BILL_CLSS.value = "20";
	} else if (selectedData.value == "계좌이체") {
		selected_BILL_CLSS.value = "30";
	} else if (selectedData.value == "자동이체") {
		selected_BILL_CLSS.value = "40";
	} else if (selectedData.value == "지로") {
		selected_BILL_CLSS.value = "50";
	} else if (selectedData.value == "현금결제") {
		selected_BILL_CLSS.value = "60";
	} else if (selectedData.value == "기타") {
		selected_BILL_CLSS.value = "70";
	} else if (selectedData.value = "결제방법") {
		selected_BILL_CLSS.value = null
	}





	pickerOn.value = false;
}

var subType = {
	isChoice: Backend.subject.isChoice,
	color: Backend.subject.color,
	type: Backend.subject.type,
	text: Backend.subject.name,
	reverse: Observable(false)
};

var choiceSubjectPanelOn = Observable(false);
function choiceSubjectPanelUp() {

	// console.log("huh?????????? ");

	// searchTheSubjectList();
	choiceSubjectPanelOn.value = true;
}
function choiceSubjectPanelDown() {
	choiceSubjectPanelOn.value = false;
}

var year = Observable(2017);
var years = Observable();
for (var i = 0 ; i < 30 ; i++) {
	years.add(2002+i);
}
var month = Observable(11);
var months = Observable();
for (var i = 0 ; i < 12 ; i++) {
	months.add(1+i);
}
var day = Observable(11);
var days = Observable();
for (var i = 0 ; i < 31 ; i++) {
	days.add(1+i);
}



var datePickerOn = Observable(false);
function datePickerUp() {
	datePickerOn.value = true;
}
function datePickerDown() {
	datePickerOn.value = false;
}



		// function searchTheSubjectList () {
		// 	var esti_gb = "";
		// 	if (CASH_GB.value == "1") {
		// 			esti_gb = "31"
		// 	} else if (CASH_GB.value =="2") {
		// 		esti_gb="32"
		// 	}

			


		// 	var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229", "ESTI_GB":"' + esti_gb +'", "BOOKGB":"01"}';




		// 	var ds_bCash = CASH_GB.value;




		// 	console.log("2017.12.30 log =================================================================");
		// 	console.log("dsParam : " + dsParam);
		// 	console.log("dsParm TYpe : " + typeof(dsParam) );
		// 	console.log("2017.12.30 log =================================================================");
		// 	console.log('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+'}');
		// 	// var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": "'+ds_bCash+'"}');

		// 	var jsonParam = JSON.parse('{"dsParam":'+dsParam+'}');


		// 	fetch("http://112.218.172.44:51442/acusr/acc/bil/getEstiSearchLoad.do", {
		// 			method: 'POST',
		// 			headers: {
		// 				"Content-type": "application/json"
		// 			},
		// 			body: JSON.stringify(jsonParam)
		// 	        }).then(function(response) {
		// 				var responseData = JSON.stringify(response);
		// 				console.log("responseData : "+ responseData);
		// 	            return response.json();
		// 	        }).then(function(jsonData) {
			            
		// 	        }).catch(function(err) {
			            
		// 	        });
		// }





function validationCheck (tempMoneyValue, BILL_CLSS, ESTI_CODE) {
 	var allChecked = false;

 	var isMoneyChecked = false;
 	var isBillClssChecked = false;
 	var isEstiCodeChecked = false;


 	if (tempMoneyValue == null) {
		console.log("money empty");
		alert.title.value = "금액 입력";
		alert.message.value = "금액을 입력하세요.";
		alert.type.value = "Check";
		alert.layer.value = "Overlay";
		// break;
	} else {
		isMoneyChecked = true;
	}


	if (BILL_CLSS == null) {
		console.log("doesn't select card");
		alert.title.value = "결제 수단";
		alert.message.value = "결제 수단을 선택해주세요.";
		alert.type.value = "Check";
		alert.layer.value = "Overlay";
		// break;
	} else {
		isBillClssChecked  = true;
	}

	if (ESTI_CODE == null) {
		console.log("doesn't select subject");
		alert.title.value = "계정과목";
		alert.message.value = "계정과목을 입력해주세요.";
		alert.type.value = "Check";
		alert.layer.value = "Overlay";
		// break;
	} else {
		isEstiCodeChecked = true;
	}

	if ((isMoneyChecked == true) && (isBillClssChecked == true ) && (isEstiCodeChecked == true)) {
		allChecked = true;
	} 

	return allChecked;
}

var updatebCashMobileUrl;



function saveData() {
	var ACTION = selectedDetailNoteVariable.ACTION;
	var CASH_IDX = selectedDetailNoteVariable.CASH_IDX;
	var CASH_DATE = selectedDetailNoteVariable.CASH_DATE;
	var CASH_GB = selectedDetailNoteVariable.CASH_GB;
	var CASH_IDX2  =selectedDetailNoteVariable.CASH_IDX2;
	var MONEY = selectedDetailNoteVariable.MONEY;
	var ORG_BCASH_MEMO = selectedDetailNoteVariable.ORG_BCASH_MEMO;
	var BCASH_MEMO = selectedDetailNoteVariable.ORG_BCASH_MEMO;
	var BCASH_BILL_SEQ = selectedDetailNoteVariable.BCASH_BILL_SEQ;
	var BCASH_MONEY = selectedDetailNoteVariable.MONEY;

//이거 가져오고

// 	ESTI_CODE: Observable(),
// ESTI_GB: Observable(),
// ESTI_SUBCODE: Observable()
	var ESTI_CODE = null;

	if (Backend.subject.ESTI_CODE == null) {
		ESTI_CODE = selectedDetailNoteVariable.ESTI_CODE;
	} else {
		ESTI_CODE = Backend.subject.ESTI_CODE.value;
	}
	
	var ESTI_SUBCODE = null;

	if (Backend.subject.ESTI_SUBCODE == null) {
		ESTI_SUBCODE = selectedDetailNoteVariable.ESTI_SUBCODE;
	} else {
		ESTI_SUBCODE = Backend.subject.ESTI_SUBCODE.value;
	}



	var BILL_SUBCODE= selectedDetailNoteVariable.BILL_SUBCODE;
	

	var BILL_IDX= selectedDetailNoteVariable.BILL_IDX;


	console.log("BIL_IDX from saveData : " + BILL_IDX);


	var BILL_CLSS  = null;

	BILL_CLSS = selected_BILL_CLSS.value;
	var BILL_RECEIPT =selectedDetailNoteVariable.BILL_RECEIPT;
	
	var ESTI_SUB_YN;

	if(Backend.subject.ESTI_SUB_YN == null) {
		ESTI_SUB_YN = selectedDetailNoteVariable.ESTI_SUB_YN;
	}else {
		ESTI_SUB_YN = Backend.subject.ESTI_SUB_YN.value;
	}
	
	var ESTI_NAME;	

	if (Backend.subject.ESTI_NAME == null) {
		ESTI_NAME = selectedDetailNoteVariable.ESTI_NAME;
	} else {
		ESTI_NAME = Backend.subject.ESTI_NAME.value;	
	}

	var tempMoneyValue = null;

	tempMoneyValue = moneyValue.value;
 	tempMoneyValue = tempMoneyValue.replace(/,/g , "");
	


 	

	var BILL_GB = "A04";
	// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';

	console.log("so cold........................ dsParam : " + dsParam);
	console.log("moneyValue.value : " + moneyValue.value);

	var ds_bCash;

	// if (BILL_IDX == "null") {
		// console.log("BILL_IDX is null 1 " )
		// console.log("BILL_IDX : " + BILL_IDX);
		// console.log("moneyValue.value : " + moneyValue.value);



	if (ACTION == "I") {
		//insert할때 쓰이는 ds_bCash값
		ds_bCash ='{"ACTION":"' + ACTION 
		+'","CASH_IDX":"'+CASH_IDX
		+'","CASH_DATE":"'+CASH_DATE
		+'","CASH_GB":"'+CASH_GB
		+'","CASH_IDX2":"'+CASH_IDX2
		+'","MONEY":"'+tempMoneyValue
		+'","ORG_BCASH_MEMO":"'+ORG_BCASH_MEMO
		+'","BCASH_MEMO":"'+BCASH_MEMO
		+'","ESTI_CODE":"'+ESTI_CODE
		+'","BILL_SUBCODE":'+BILL_SUBCODE
		+',"BILL_IDX":'+BILL_IDX
		+',"BILL_CLSS":"'+BILL_CLSS
		+'","BILL_RECEIPT":'+BILL_RECEIPT
		+',"ESTI_SUB_YN":'+ESTI_SUB_YN
		+',"ESTI_NAME":'+ESTI_NAME
		+',"BILL_GB":"'+BILL_GB
		+'","ESTI_SUBCODE":"'+ESTI_SUBCODE
		+'","BCASH_BILL_SEQ":'+BCASH_BILL_SEQ
		+', "BCASH_MONEY":"'+BCASH_MONEY
		+'"}';	

	} else if (ACTION =="U") {
		ds_bCash ='{"ACTION":"' + ACTION 
		+'","CASH_IDX":"'+CASH_IDX
		+'","CASH_DATE":"'+CASH_DATE
		+'","CASH_GB":"'+CASH_GB
		+'","CASH_IDX2":"'+CASH_IDX2
		+'","MONEY":"'+tempMoneyValue
		+'","ORG_BCASH_MEMO":"'+ORG_BCASH_MEMO
		+'","BCASH_MEMO":"'+BCASH_MEMO
		+'","ESTI_CODE":"'+ESTI_CODE
		+'","ESTI_SUBCODE":"'+ESTI_SUBCODE
		+'","BILL_SUBCODE":'+BILL_SUBCODE
		+',"BILL_IDX":"'+BILL_IDX
		+'","BILL_CLSS":"'+BILL_CLSS
		+'","BILL_RECEIPT":"'+BILL_RECEIPT
		+'","ESTI_SUB_YN":"'+ESTI_SUB_YN
		+'","ESTI_NAME":"'+ESTI_NAME
		+'","BILL_GB":"'+BILL_GB
		+'","BCASH_BILL_SEQ":"'+BCASH_BILL_SEQ
		+'"}';	
	}

	console.log("ds_bCash : " + ds_bCash);
		
	// } else {
		// console.log("BILL_IDX is not null 1 ")
		// console.log("BILL_IDX : " + BILL_IDX);

		// console.log("moneyValue.value : " + moneyValue.value);


		// ds_bCash ='{"ACTION":"' + ACTION +'","CASH_IDX":"'+CASH_IDX+'","CASH_DATE":"'+CASH_DATE+'","CASH_GB":"'+CASH_GB+'","CASH_IDX2":"'+CASH_IDX2+'","MONEY":"'+moneyValue.value +'","ORG_BCASH_MEMO":"'+ORG_BCASH_MEMO+'","BCASH_MEMO":"'+BCASH_MEMO+'","ESTI_CODE":"'+ESTI_CODE+'","BILL_SUBCODE":"'+BILL_SUBCODE+'","BILL_IDX":"'+BILL_IDX+'","BILL_CLSS":"'+BILL_CLSS+'","BILL_RECEIPT":"'+BILL_RECEIPT+'","ESTI_SUB_YN":"'+ESTI_SUB_YN+'","ESTI_NAME":"'+ESTI_NAME+'","BILL_GB":"'+BILL_GB+'"}';

		// console.log("BILL_IDX is not null 2 ")
	// }

	// var temp_ds_bCash = '{"ds_bCash":' + ds_bCash+'}';

	// // console.log("ds_bCash : " + temp_ds_bCash);

	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+'}');

	// console.log("jsonParam : " + JSON.stringify(jsonParam));

	updatebCashMobileUrl = Backend.BASE_URL + Backend.updatebCashMobile_URL;
	

	var validateChecked = validationCheck(tempMoneyValue, BILL_CLSS, ESTI_CODE);


	if (validateChecked == true) {
		console.log("check: " + tempMoneyValue + ", " + BILL_CLSS +", " + ESTI_CODE);

		fetch(updatebCashMobileUrl, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(jsonParam)
			 
			}).then(function(response) {
				var responseData = JSON.stringify(response);
				console.log("20180115 responseDatas : " + responseData);

				var responseHeaders = JSON.parse(response._bodyInit);
				var MiResultMsg = responseHeaders.MiResultMsg;		
			   	
			   	console.log("MiResultMsg  : "   + MiResultMsg);

			   	if (MiResultMsg == "success") {
			   		console.log("수정완료!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			   		alertWithConfirm.message.value = "수정되었습니다.";
					alertWithConfirm.layer.value = "Overlay";

			   	} else {
			   		alert.title.value = "";
					alert.message.value = "수정 안 됐습니다.";
					alert.type.value = "Check";
					alert.layer.value = "Overlay";
			   	}

		    	

			       return response.json();
			   }).then(function(jsonData) {
			       var data = jsonData.results[0];
			   }).catch(function(err) {
			   });
		}
}


function logOut() {
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
	console.log("console log out");
}







var deleteMobileBillListUrl;

function deleteData () {
	var ACTION = selectedDetailNoteVariable.ACTION;
	var CASH_IDX = selectedDetailNoteVariable.CASH_IDX;
	var CASH_DATE = selectedDetailNoteVariable.CASH_DATE;
	var CASH_GB = selectedDetailNoteVariable.CASH_GB;
	var CASH_IDX2  =selectedDetailNoteVariable.CASH_IDX2;
	var MONEY = selectedDetailNoteVariable.MONEY;
	var ORG_BCASH_MEMO = selectedDetailNoteVariable.ORG_BCASH_MEMO;
	var BCASH_MEMO = selectedDetailNoteVariable.ORG_BCASH_MEMO;
	var BCASH_BILL_SEQ = selectedDetailNoteVariable.BCASH_BILL_SEQ;

//이거 가져오고

// 	ESTI_CODE: Observable(),
// ESTI_GB: Observable(),
// ESTI_SUBCODE: Observable()
	var ESTI_CODE;

	if (Backend.subject.ESTI_CODE == null) {
		ESTI_CODE = selectedDetailNoteVariable.ESTI_CODE;
	} else {
		ESTI_CODE = Backend.subject.ESTI_CODE.value;
	}
	
	var BILL_SUBCODE= selectedDetailNoteVariable.BILL_SUBCODE;
	var BILL_IDX= selectedDetailNoteVariable.BILL_IDX;
	console.log("BIL_IDX from saveData : " + BILL_IDX);
	var BILL_CLSS=selected_BILL_CLSS.value;
	var BILL_RECEIPT =selectedDetailNoteVariable.BILL_RECEIPT;
	var ESTI_SUB_YN;

	if(Backend.subject.ESTI_SUB_YN == null) {
		ESTI_SUB_YN = selectedDetailNoteVariable.ESTI_SUB_YN;
	}else {
		ESTI_SUB_YN = Backend.subject.ESTI_SUB_YN.value;
	}
	
	var ESTI_NAME;	

	if (Backend.subject.ESTI_NAME == null) {
		ESTI_NAME = selectedDetailNoteVariable.ESTI_NAME;
	} else {
		ESTI_NAME = Backend.subject.ESTI_NAME.value;	
	}

	//모바일 결제로 하기 때문에 BILL_GB는 "A04"로 고정
	var BILL_GB = "A04";
	console.log("so cold........................ dsParam : " + dsParam);
	console.log("moneyValue.value : " + moneyValue.value);

	var ds_bCash;

	
 	var tempMoneyValue = moneyValue.value;
 	tempMoneyValue = tempMoneyValue.replace(/,/g , "");


		

		// ds_bCash ='{"ACTION":"' + ACTION +'","CASH_IDX":"'+CASH_IDX+'","CASH_DATE":"'+CASH_DATE+'","CASH_GB":"'+CASH_GB+'","CASH_IDX2":"'+CASH_IDX2+'","MONEY":"'+MONEY+'","ORG_BCASH_MEMO":"'+ORG_BCASH_MEMO+'","BCASH_MEMO":"'+BCASH_MEMO+'","ESTI_CODE":"'+ESTI_CODE+'","BILL_SUBCODE":"'+BILL_SUBCODE+'","BILL_IDX":"'+BILL_IDX+'","BILL_CLSS":"'+BILL_CLSS+'","BILL_RECEIPT":"'+BILL_RECEIPT+'","ESTI_SUB_YN":"'+ESTI_SUB_YN+'","ESTI_NAME":"'+ESTI_NAME+'" }';
	
		// console.log("deleteData BILL is not  NULL ")
		// console.log("BILL_IDX : " + BILL_IDX);




	ds_bCash ='{"ACTION":"D","CASH_IDX":"'+CASH_IDX+'","CASH_DATE":"'+CASH_DATE+'","CASH_GB":"'+CASH_GB+'","CASH_IDX2":"'+CASH_IDX2+'","MONEY":"'+tempMoneyValue+'","ORG_BCASH_MEMO":"'+ORG_BCASH_MEMO+'","BCASH_MEMO":"'+BCASH_MEMO+'","ESTI_CODE":"'+ESTI_CODE+'","BILL_SUBCODE":'+BILL_SUBCODE+',"BILL_IDX":"'+BILL_IDX+'","BILL_CLSS":"'+BILL_CLSS+'","BILL_RECEIPT":"'+BILL_RECEIPT+'","ESTI_SUB_YN":"'+ESTI_SUB_YN+'","ESTI_NAME":"'+ESTI_NAME+'","BILL_GB":"'+BILL_GB+'","BCASH_BILL_SEQ":"'+BCASH_BILL_SEQ+'"}';	
	



	// // console.log("ds_bCash : " + temp_ds_bCash);

	
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+'}');

	console.log("jsonParam : " + JSON.stringify(jsonParam));

	deleteMobileBillListUrl = Backend.BASE_URL + Backend.deleteMobileBillList_URL;
	
	fetch(deleteMobileBillListUrl, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			console.log("20180115 responseDatas : " + responseData);

			var responseHeaders = JSON.parse(response._bodyInit);
			var MiResultMsg = responseHeaders.MiResultMsg;		
		   	
		   	console.log("MiResultMsg  : "   + MiResultMsg);

		   	if (MiResultMsg == "success") {
		   		console.log("수정완료!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		   		alertWithConfirm.message.value = "삭제 되었습니다.";
				alertWithConfirm.layer.value = "Overlay";

		   	} else {
		   		alert.title.value = "";
				alert.message.value = "수정 안 됐습니다.";
				alert.type.value = "Check";
				alert.layer.value = "Overlay";
		   	} 	
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





		// this.Parameter.onValueChanged(null, function(x) {
		// 	viewWillAppear();
		// 	getListDetailNote();
		// });


		// var tempCode2 = Backend.ESTI_CODE;

		// subType.text.onValueChanged(null, function(code) {
		// 	if (tempCode2.value != tempCode) {
		// 		notes.forEach(function(note) {
		// 			if (note.index == selectedTemp) {
		// 				note.reverse.value = true;
		// 			}
		// 		});
		// 	}
		// });

		function goChoiceSubject () {
			var infoJSON = {
					CASH_GB:selectedDetailNoteVariable.CASH_GB
				}

				router.push("ChoiceSubject", infoJSON);
		}

		//2018.01.16 기존 소스 시작
		Backend.subject.ESTI_CODE.onValueChanged(null, function(x) {

			console.log("x.stringify 2018.01.06 : " + JSON.stringify(x));

			console.log("notes._values[tempIndex] : " + JSON.stringify(notes._values[tempIndex]));

			if (notes == null) {
				getListDetailNote();
			}

			// if ((x != null) && (notes._values[tempIndex] != null)) {
			if (x != null) {
				console.log("notes._values[tempIndex].type : " + notes._values[tempIndex].type);	

				if (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "2") {
					subType.reverse.value = true;
				} else if (notes._values[tempIndex].type == "출금" && x.substr(0,1) == "1") {
					subType.reverse.value = true;
				} else {
					subType.reverse.value = false;
				}
				console.log("now type : " + notes._values[tempIndex].type);
				console.log("ESTI_CODE Changed : " + x.substr(0,1));
				console.log("reverse state : " + subType.reverse.value);
			}
		});

		//2018.01.16 기존 소스 끝
		module.exports = {
			detailText, showText, uploadOn, tryUpload, cancelUpload,
			pickerOn, selectedData, pickerData, pickerUp, pickerDown,
			subType, notes,
			choiceSubjectPanelOn, choiceSubjectPanelUp, choiceSubjectPanelDown,
			year, years, month, months, day, days,
			datePickerOn, datePickerUp, datePickerDown,
			goPhotoCollection: function() {
				router.push("PhotoCollection", {type: "upload"});
				uploadOn.value = false;
			},
			goChoiceSubject,
			getListDetailNote,pickFromList, moneyValue,viewWillAppear, saveData,  deleteData, selectedMemo,

			goShowFile: function() {
				console.log("goShowFile : goShowFile");
				console.log("selectedDetailNoteVariable : " + selectedDetailNoteVariable.BILL_IDX);
				var infoJSON = {
					BILL_IDX:selectedDetailNoteVariable.BILL_IDX
				}


				router.push("ShowFile", infoJSON);
			}, alert, alertWithConfirm, logOut
		};