var Observable = require('FuseJS/Observable');
var Backend = require('Backend.js');
var CommonModule = require('CommonModule.js');
var Environment = require('FuseJS/Environment');
var FileSystem = require("FuseJS/FileSystem");
var Camera = require('FuseJS/Camera');
var CameraRoll = require('FuseJS/CameraRoll');
var ImageTools = require('FuseJS/ImageTools');
var Uploader = require("Uploader");

var connectingPanelLayout = Observable("Background");
var enableClick = Observable("LocalBoundsAndChildren");

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
		// this.subTypeColor = "#8BBDFF";
	} else {
		this.type = "출금";
		this.typeColor = "#FF4200";
		this.money = arg.MONEY;
		// this.subTypeColor = "#FFBA85";
	}

	if (arg.ESTI_CODE != null) {
		if (arg.ESTI_CODE.substr(0,1) == 1) {
			this.subTypeColor = "#8BBDFF";
		} else {
			this.subTypeColor = "#FFBA85";
		}	
	}

	// this.reverse = false;

	// if(arg.BILL_IDX != null) {
	// 	console.log("20180118 ==> arg.BILL_IDX : " + arg.BILL_IDX);
	// 	console.log("arg.ESTI_CODE.substr(0,1) : " + arg.ESTI_CODE.substr(0,1));
	// 	console.log("arg.CASH_GB ==============> " + arg.CASH_GB);
	// 	console.log("arg.ESTI_CODE ==============> " + arg.ESTI_CODE);
	// 	if (arg.CASH_GB != arg.ESTI_CODE.substr(0,1)) {
	// 		this.reverse=true;
	// 	}
	// 	this.isShow = true;
	// } else {
	// 	this.isShow = false;
	// }


	// console.log("this.reverse : " + this.reverse);
	// console.log("this.isShow : " + this.isShow);

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
	if (arg.BILL_IDX !=null && arg.CASH_GB !=null) {
		if (arg.CASH_GB != arg.ESTI_CODE.substr(0,1)){
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
		

	// router.getRoute(function(route) {
	// 	console.log("goBackToPrevious From " + route[0]);
	// 	if (route[0] == "NoteManage") {
	// 		console.log("2018.01.17 NoteManage");
	// 	} else if (route[0] == "DetailNote") {
	// 		console.log("2018.01.17 DetailNote");
	// 	} else if (route[0] == "ShowFile") {
	// 		console.log("2018.01.17 ShowFile");
	// 	} else if (route[0] == "ChoiceSubject") {
	// 		console.log("2018.01.17 ChoiceSubject");
	// 	} else if (route[0] == "Notice") {
	// 		console.log("2018.01.17 Notice");
	// 	} else if (route[0] == "ApplyEdu") {
	// 		console.log("2018.01.17 ApplyEdu");
	// 	} else if (route[0] == "QnA") {
	// 		console.log("2018.01.17 QnA");
	// 	} else {
			
	// 	}
	// });
	router.getRoute(function(route) {
	 	for (var i = 0; i < route.length; i++) {
			console.log("=============== 2018.01.17 route[" + i + "] : "  + route[i]);
		}
	});

















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


			// if (cameFromChoiceSubject == false){
			// 	 initialDataSetting();
			// }
				



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

	cameFromChoiceSubject = false;
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


function initBackendSubject () {

	Backend.subject.isChoice.clear();
	Backend.subject.color.clear();
	Backend.subject.type.clear();
	Backend.subject.name.clear();
	Backend.subject.text.clear();
	Backend.subject.ESTI_CODE.clear();
	Backend.subject.ESTI_GB.clear();
	Backend.subject.ESTI_SUBCODE.clear();

}


var isReadOnly = Observable(false);

var yearAndMonth = "";

function pickFromList(args) {
	subType.reverse.value=false;
	GLOBAL_BILL_SUBCODE = null;

	// initBackendSubject();

	



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
	console.log("BILL_SUBCODE VALUE IS  : " + selectedDetailNoteVariable.BILL_SUBCODE );

	if (selectedDetailNoteVariable.BILL_IDX != null) {
		isReadOnly.value = false;
	}else {
		isReadOnly.value = true;
	}


	var selectedYear = selectedDetailNoteVariable.CASH_DATE.substr(0,4);
	var selectedMonth = selectedDetailNoteVariable.CASH_DATE.substr(4,2);
	var selectedDay = selectedDetailNoteVariable.CASH_DATE.substr(6,2);


	yearAndMonth = selectedYear + selectedMonth;

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

	console.log("validationCheckvalidationCheckvalidationCheckvalidationCheck  : " + ESTI_CODE  );


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






var GLOBAL_BILL_SUBCODE;





function saveData() {
	var ACTION = selectedDetailNoteVariable.ACTION;
	var CASH_IDX = selectedDetailNoteVariable.CASH_IDX;
	var CASH_DATE = selectedDetailNoteVariable.CASH_DATE;
	var CASH_GB = selectedDetailNoteVariable.CASH_GB;
	var CASH_IDX2  =selectedDetailNoteVariable.CASH_IDX2;
	var MONEY = selectedDetailNoteVariable.MONEY;
	var ORG_BCASH_MEMO = selectedDetailNoteVariable.ORG_BCASH_MEMO;
	var BCASH_MEMO = selectedDetailNoteVariable.BCASH_MEMO;
	var BCASH_BILL_SEQ = selectedDetailNoteVariable.BCASH_BILL_SEQ;
	var BCASH_MONEY = selectedDetailNoteVariable.MONEY;





	console.log("ACTION : "  + ACTION);
	console.log("CASH_IDX : "  + CASH_IDX);
	console.log("CASH_DATE : "  + CASH_DATE);
	console.log("CASH_GB : "  + CASH_GB);
	console.log("CASH_IDX2 : "  + CASH_IDX2);
	console.log("MONEY : "  + MONEY);
	console.log("ORG_BCASH_MEMO : "  + ORG_BCASH_MEMO);


	console.log("BCASH_MEMO : "  + BCASH_MEMO);
	console.log("BCASH_BILL_SEQ : "  + BCASH_BILL_SEQ);
	console.log("BCASH_MONEY : "  + BCASH_MONEY);
	





//이거 가져오고

// 	ESTI_CODE: Observable(),
// ESTI_GB: Observable(),
// ESTI_SUBCODE: Observable()
	var ESTI_CODE = null;

	console.log("Backend.subject.ESTI_CODE ================> " + Backend.subject.ESTI_CODE);

	if (Backend.subject.ESTI_CODE.value == null) {
		ESTI_CODE = selectedDetailNoteVariable.ESTI_CODE;
	} else {
		ESTI_CODE = Backend.subject.ESTI_CODE.value;
	}
	
	var ESTI_SUBCODE = null;

	if (Backend.subject.ESTI_SUBCODE.value == null) {
		ESTI_SUBCODE = selectedDetailNoteVariable.ESTI_SUBCODE;
	} else {
		ESTI_SUBCODE = Backend.subject.ESTI_SUBCODE.value;
	}

	
	var BILL_SUBCODE = selectedDetailNoteVariable.BILL_SUBCODE;
	

	console.log("GLOBAL_BILL_SUBCODE : " + GLOBAL_BILL_SUBCODE);

	if (GLOBAL_BILL_SUBCODE != null) {
		BILL_SUBCODE = GLOBAL_BILL_SUBCODE;
		console.log("BILL_SUBCODE = GLOBAL_BILL_SUBCODE");
		console.log("BILL_SUBCODE : "  + BILL_SUBCODE);
	}else {

	}

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

	if (tempMoneyValue != selectedDetailNoteVariable.MONEY) {

		console.log("tempMoneyValue : " + tempMoneyValue);
		console.log("selectedDetailNoteVariable.MONEY : " + selectedDetailNoteVariable.MONEY);
		BCASH_MEMO = ORG_BCASH_MEMO + "중 " + tempMoneyValue.toString();
	}else {

	}



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
		+'","ESTI_CODE":'+ESTI_CODE
		+',"BILL_SUBCODE":'+BILL_SUBCODE
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
		+'","ESTI_CODE":'+ESTI_CODE
		+',"ESTI_SUBCODE":"'+ESTI_SUBCODE
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


	var pictureList = null;
	if (isPictureTaken == true) {
		// pictureList = JSON.stringify(pictureArray._values);
		pictureList = pictureArray +"," + pictureArray;

	}
	

	Backend.selectedPhotoCollectionPictureListFromDetailNote

	console.log("pictureListpictureListpictureListpictureListpictureList : " + pictureList);



	var temp = '{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+',"ds_billAtchMapngList": '+pictureList+'}';
	console.log("temp >>>>>>>>>>>>>>>>>>>>> " + temp);









	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+',"ds_billAtchMapngList": '+pictureList+'}');


	console.log("jsonParam123123123 : " + JSON.stringify(jsonParam));

	updatebCashMobileUrl = Backend.BASE_URL + Backend.updatebCashMobile_URL;
	
	console.log("ESTI_CODEESTI_CODEESTI_CODEESTI_CODEESTI_CODE : " + ESTI_CODE);
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
		var cameFromChoiceSubject = false;

		function goChoiceSubject () {
			var infoJSON = {
					CASH_GB:selectedDetailNoteVariable.CASH_GB
				}
			router.push("ChoiceSubject", infoJSON);
			cameFromChoiceSubject = true;
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
				


				try {
					if (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "2") {
						subType.reverse.value = true;
						moneyValue.value = "-" + moneyValue.value;
					} else if (notes._values[tempIndex].type == "출금" && x.substr(0,1) == "1") {
						subType.reverse.value = true;
						moneyValue.value = "-" +  moneyValue.value;
					} else {
						subType.reverse.value = false;
					}
					console.log("now type : " + notes._values[tempIndex].type);
					console.log("ESTI_CODE Changed : " + x.substr(0,1));
					console.log("reverse state : " + subType.reverse.value);
				}catch (err){
					console.log(err);
				}finally {

				}
			}
		});

		Backend.subject.ESTI_SUBCODE.onValueChanged(null, function(x) {
			console.log("Backend.subject.ESTI_SUBCODE.value before setting GLOBAL_BILL_SUBCODE: " + Backend.subject.ESTI_SUBCODE.value);	
			GLOBAL_BILL_SUBCODE = Backend.subject.ESTI_SUBCODE.value;
		});




//==========================================  사진 부분 ==========================================================

var pictureArray = null;
var isPictureTaken  = null;

var print = debug_log;
 "/acusr/acc/bil/MobileReceiptImgUpload.do"

// var uploadUrl = 'http://61.97.121.199:8080/TEST/ImgUploadTest.jsp';// 서버 IP를 변경하세요.

var uploadUrl = Backend.BASE_URL + "/acusr/acc/bil/MobileReceiptImgUpload.do" ;// 서버 IP를 변경하세요.

var sendPictureBtnEnabled = Observable(false);
var targetImgPath = Observable();
var takedPictureWithParamterDetailNote = Observable();
var dateTime = "";

function getDatesInString () {
	var today = new Date();
	var yearInString = today.getFullYear().toString();
	var monthInString = "";
	var dateInString = "";
	var hourInString = "";
	var minuteInString = "";
	var secondInString = ""; 

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

	if (today.getHours() < 10) {
		hourInString = "0" +  today.getHours().toString();
	} else {
		hourInString = today.getHours().toString();
	}

	if (today.getMinutes() < 10) {
		minuteInString = "0" +  today.getMinutes().toString();
	} else {
		minuteInString = today.getMinutes().toString();
	}

	if (today.getSeconds() < 10) {
		secondInString = "0" +  today.getSeconds().toString();
	} else {
		secondInString = today.getSeconds().toString();
	}

	var date = yearInString + "-" + monthInString + "-" + dateInString;
	var time = hourInString + "-" + minuteInString + "-" + secondInString;
	var dateTime = date+'-'+time;

	return dateTime;
}

function getDaysInString () { 
	var today = new Date();
	var yearInString = today.getFullYear().toString();
	var monthInString = "";
	

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

	var date = yearInString  + monthInString;
	return date;
}

function takePictureWithParameterDetailNote()
{
	dateTime = getDatesInString();			

	Camera.takePicture().then(function(image)
	{
		// 찍은 사진 리사이징하기
		// 이미지 사이즈 다시 줄이실 때는 아래 두줄 주석 지우세요.
		// var args = { desiredWidth:480, desiredHeight:640 , mode:ImageTools.SCALE_AND_CROP, performInPlace:true };
		// ImageTools.resize(image, args).then(function(resizedImage) {
			// 리사이징한 사진 savepanel3에 표시
			// 다시 사이즈 줄이실 때는 image.path 를 resizedImage.path로 바꾸세요.
			takedPictureWithParamterDetailNote.value = image.path;
			// targetImgPath.value = resizedImage.path;
			sendPictureBtnEnabled.value = true;
			// 리사이징한 사진 저정부분은 삭제
			// CameraRoll.publishImage(resizedImage);
			// console.log("picture was saved");

			// 리사이징한 이미지 흑백으로 변환
			

			console.log("dateTime : " + dateTime);

			// var imageName = dateTime + ".png";
			var imageName = dateTime + ".jpg";
			console.log("Image Name : " + imageName);

			savepanel3.save(imageName);
			console.log("make image");
			var saveDir = "";
			if (Environment.ios) {
				saveDir = FileSystem.iosPaths.documents;
			} else if (Environment.android) {
				// console.log(FileSystem.androidPaths.files);
				saveDir = FileSystem.androidPaths.files;
			}
			var arrayBuff;

			console.log("saveDir : " +saveDir);
			
			setTimeout(function() {

				


				FileSystem.readBufferFromFile(saveDir+"/"+imageName).then(function(image) {
					console.log("read success");
					arrayBuff = image;
					// console.log(JSON.stringify(arrayBuff));
					ImageTools.getImageFromBuffer(arrayBuff).then(function(image) {
						console.log("Scratch image path is: " + image.path);
						// 흑백으로 변한사진 카메라롤에 저장
						CameraRoll.publishImage(image).then(function(x) {
							console.log("save success");
							targetImgPath.value = saveDir + "/"+imageName;
							sendPictureWithParamterDetailNote(yearAndMonth);
							FileSystem.delete(saveDir+"/"+imageName).then(function() {
								console.log("delete success");
							});								
							takedPicture.value = "";
						}, function(error) {
							console.log("error : " );
						});
					});
				}, function(error) {
					console.log(error);
				});
			}, 2000);

			// sendPicture();
		// 이미지 사이즈 다시 줄이실 때는 아래 세줄 주석 지우세요.
		// }).catch(function(reason) {
		// 	console.log("Couldn't resize image: " + reason);
		// });
	}).catch(function(reason) {
		console.log("Couldn't take picture: " + reason);
	});
};

function sendPictureWithParamterDetailNote(yearAndMonth)
{
	pictureArray = null;

	isPictureTaken = false;

	var atchmnfl_ym = yearAndMonth

	console.log("atchmnfl_ym from sendPictureWithParamterDetailNote : " + atchmnfl_ym);
	
	console.log("sendPicture was called");
	// var dsParam = '{"GVAREACODE":"11110","GVBOOKGB":"01","GVESTIYEAR" :"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID":"9999990","GVORGCLSS":"5","GVUSERCLSS" :"3"}';
	var dsSearch = '{"ATCHMNFL_YM":"'+atchmnfl_ym+'","FILE_SE":"N","DOWN_LVL":"ALL"}';
	console.log("===========================================");
	console.log("searchContent ds Search : " + dsSearch);

	// var jsonParam = JSON.parse('{"dsParam":'+Backend.dsParam+',"ds_search": '+dsSearch+'}');

	// console.log("2018.01.05 jsonParam : " + JSON.stringify(jsonParam));


	var gvmemcode = JSON.parse(Backend.dsParam).GVMEMCODE;
	console.log("gvmemcode : " + gvmemcode);
	var temPictureAtchmnfl_idx = "";

	Uploader.send(targetImgPath.value, uploadUrl, Backend.dsParam, dsSearch, gvmemcode,  atchmnfl_ym, "N", "ALL").then(function(response) {
		console.log("upload complete.");
		console.log(JSON.stringify(response));
		
		console.log("DetailNote response.ATCHMNFL_IDX : " + JSON.parse(response).ATCHMNFL_IDX);

		// console.log("pictureArray : " + JSON.stringify(pictureArray._values));

		// // pictureArray.add(new chosenPictures(JSON.parse(response).ATCHMNFL_IDX));

		// console.log("pictureArray : " + JSON.stringify(pictureArray._values));




		if (JSON.parse(response).MiResultMsg == "success") {
			// pictureArray.add(JSON.parse(response).ATCHMNFL_IDX);
			pictureArray = JSON.parse(response).ATCHMNFL_IDX;
			isPictureTaken = true;
		}

		console.log("pictureArray ===============>>>>>>>>>>> : " + pictureArray);


	});
}

function getImageWithParameterDetailNote() {
	CameraRoll.getImage().then(function(image) {
		takedPictureWithParamterDetailNote.value = image.path;
		sendPictureBtnEnabled.value = true;

		var today = new Date();
		var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
		var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
		var dateTime = date+''+time;
		var imageName = dateTime + ".png";
		savepanel3.save(imageName);
		var saveDir = "";
		if (Environment.ios) {
			saveDir = FileSystem.iosPaths.documents;
		} else if (Environment.android) {
			saveDir = FileSystem.androidPaths.files;
		}

		setTimeout(function() {
			targetImgPath.value = saveDir + "/"+imageName;
			sendPictureWithParamterDetailNote(yearAndMonth);
			

			FileSystem.delete(saveDir+"/"+imageName).then(function() {
				console.log("delete success");
			});
			
			takedPictureWithParamterDetailNote.value = "";
		}, 6000);
	}).catch(function(reason) {
		console.log("Couldn't get image: "+reason);
	});
};

var margin = Observable();

function placed(args) {
	margin.value = args.width / 25;
}

//==========================================  사진 부분 ==========================================================


function chosenPictures (args) {
	this.ATCHMNFL_IDX = args
}


























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
			}, alert, alertWithConfirm, logOut, isReadOnly, takedPictureWithParamterDetailNote, takePictureWithParameterDetailNote, getImageWithParameterDetailNote
		};