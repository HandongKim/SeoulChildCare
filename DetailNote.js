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
			if(arg.MONEY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString().includes("-")) {
				this.reverse = true;
			}else {
				this.reverse = false;	
			}
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
	if (args.INDEX !=null) {
		this.INDEX = args.INDEX;	
	} else {
		this.INDEX="";
	}
	
	if (args.CASH_IDX2 !=null) {
		this.CASH_IDX2 = args.CASH_IDX2;	
	} else {
		this.CASH_IDX2="";
	}

	if (args.CASH_GB !=null) {
		this.CASH_GB = args.CASH_GB;	
	} else {
		this.CASH_GB="";
	}

	if (args.CASH_IDX !=null) {
		this.CASH_IDX = args.CASH_IDX;	
	} else {
		this.CASH_IDX="";
	}

	if (args.BCASH_MEMO !=null) {
		this.BCASH_MEMO = args.BCASH_MEMO;	
	} else {
		this.BCASH_MEMO="";
	}

	if (args.ESTI_CODE !=null) {
		this.ESTI_CODE = args.ESTI_CODE;	
	} else {
		this.ESTI_CODE="";
	}

	if (args.CASH_DATE !=null) {
		this.CASH_DATE = args.CASH_DATE;	
	} else {
		this.CASH_DATE="";
	}

	if (args.ESTI_NAME !=null) {
		this.ESTI_NAME = args.ESTI_NAME;	
	} else {
		this.ESTI_NAME="";
	}

	if (args.SUM_MONEY !=null) {
		this.SUM_MONEY = args.SUM_MONEY;	
	} else {
		this.SUM_MONEY="";
	}

	if (args.BILL_RECEIPT !=null) {
		this.BILL_RECEIPT = args.BILL_RECEIPT;	
	} else {
		this.INDEX="";
	}
	if (args.MONEY !=null) {
		this.MONEY = args.MONEY;	
	} else {
		this.MONEY="";
	}

	if (args.ESTI_SUB_YN !=null) {
		this.ESTI_SUB_YN = args.ESTI_SUB_YN;	
	} else {
		this.ESTI_SUB_YN="";
	}
	if (args.ORG_BCASH_MEMO !=null) {
		this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO;	
	} else {
		this.ORG_BCASH_MEMO="";
	}

	if (args.ACTION !=null) {
		this.ACTION = args.ACTION;	
	} else {
		this.ACTION="";
	}
	if (args.BILL_SUBCODE !=null) {
		this.BILL_SUBCODE = args.BILL_SUBCODE;	
	} else {
		this.BILL_SUBCODE="";
	}

	if (args.BILL_IDX !=null) {
		this.BILL_IDX = args.BILL_IDX;	
	} else {
		this.BILL_IDX="";
	}
	if (args.BCASH_BILL_SEQ !=null) {
		this.BCASH_BILL_SEQ = args.BCASH_BILL_SEQ;	
	} else {
		this.BCASH_BILL_SEQ="";
	}	

	if (args.BILL_CLSS !=null) {
		this.BILL_CLSS = args.BILL_CLSS;	
	} else {
		this.BILL_CLSS="";
	}	
}


// var isItFromNoteManage = null;
// isItFromNoteManage = this.Parameter;

var isItFromNoteManageTrueOrFalse = false;

Backend.isItFromNoteManage.onValueChanged(null, function(x) {

	console.log("Backend.isItFromNoteManage was onValueChanged!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	console.log("Backend.isItFromNoteManage was onValueChanged : " + x);
	isItFromNoteManageTrueOrFalse = x;


});







// var fromNote = isItFromNoteManage.map(function(x) {
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
// 	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

// 	if (isItFromNoteManage !=null) {


// 		console.log("!@#$%^&*(!@#$%^&*(!@#$%^&*(!@#$%^&*(!@#$%^&*(!@#$%^&*(!@#$%^&*(");
// 		console.log("x.isFromNoteManage.value : " + x.isFromNoteManage.value);


// 		return x.isFromNoteManage;
// 	}else {

// 		return false;
// 	}
// });

function getListDetailNote () {
	alertWithConfirm.layer.value = "Background";
	console.log("getListDetailNote was called on 23rd Jan 2018");
	console.log("Backend.isItFromNoteManage was onValueChanged : " + Backend.isItFromNoteManage.value);

	// router.getRoute(function(route) {
	//  	for (var i = 0; i < route.length; i++) {
	// 		console.log("=============== 2018.01.17 route[" + i + "] : "  + route[i]);
	// 	}
	// });
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

	notes.clear();
	listDetailNotes.clear();
	detailNoteLoadingCircleOn.value =true;

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

		


			// console.log("fefefefefe temp.length : " + temp.length);


			for (var i = 0; i < temp.length; i++) {
				notes.add(new note(temp[i], i));
				// console.log(JSON.stringify(notes.value));
				listDetailNotes.add(new listDetailNote(temp[i], i));
			}


			if (isItFromNoteManageTrueOrFalse == true){
				 initialDataSetting();
				 isItFromNoteManageTrueOrFalse =false;
			}
				

			detailNoteLoadingCircleOn.value = false;

        	var responseData = JSON.stringify(response);
        	

            return response.json();
        }).then(function(jsonData) {
            var data = jsonData.results[0];
            // console.log("data : " + jsonData.results[0]);
			// console.log("Reg Succeeded[ios]: " + data.registration_token);
			// maintext.value = maintext.value + "/n" + data.registration_token;
			detailNoteLoadingCircleOn.value = false;
        }).catch(function(err) {

            // console.log("Reg Succeeded[ios] Error!! : " + err.message);
            detailNoteLoadingCircleOn.value = false;
        });
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

	// Backend.subject.isChoice.clear();
	// Backend.subject.color.clear();
	// Backend.subject.type.clear();
	// Backend.subject.name.clear();
	// Backend.subject.text.clear();
	// Backend.subject.ESTI_CODE.clear();
	// Backend.subject.ESTI_GB.clear();
	// Backend.subject.ESTI_SUBCODE.clear();


	Backend.subject.isChoice.clear();
	Backend.subject.color.clear();
	Backend.subject.type.clear();
	Backend.subject.name.clear();
	Backend.subject.text.clear();
	Backend.subject.ESTI_CODE.clear();
	Backend.subject.ESTI_GB.clear();
	Backend.subject.ESTI_SUBCODE.clear();
	Backend.subject.ESTI_NAME.clear();
};





var isReadOnly = Observable(false);

var yearAndMonth = "";

function pickFromList(args) {
	subType.reverse.value = notes._values[args.data.index].reverse;
	GLOBAL_BILL_SUBCODE = null;

	// initBackendSubject();
	selectedData.value = "결제방법";


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

	
	console.log("BILL_CLSS VALUE IS  : " + selectedDetailNoteVariable.BILL_CLSS );	



	if(selectedDetailNoteVariable.BILL_CLSS == "10") {
		selectedData.value = "카드결제";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "20") {
		selectedData.value = "아이행복카드";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "30") {
		selectedData.value = "계좌이체";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "40") {
		selectedData.value = "자동이체";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "50") {
		selectedData.value = "지로";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "60") {
		selectedData.value = "현금결제";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "70") {
		selectedData.value = "기타";
	} else if (selectedDetailNoteVariable.BILL_CLSS = "") {
		selectedData.value = "결제방법"
	}


	console.log("selectedDetailNoteVariable.BILL_IDX : " + selectedDetailNoteVariable.BILL_IDX);

	if (selectedDetailNoteVariable.BILL_IDX != "") {
		isReadOnly.value = false;
	}else {
		isReadOnly.value = true;
	}

	console.log("isReadOnly.value : " + isReadOnly.value);


	if (selectedDetailNoteVariable.ACTION == "I") {
		saveOrEdit.value="저장";
	}else if (selectedDetailNoteVariable.ACTION == "U") {
		saveOrEdit.value="수정";
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

}

function initialDataSetting () {
	moneyValue.clear();
	initBackendSubject();
	// subType.isChoice.clear();
	// subType.color.clear();
	// subType.type.clear();
	// subType.text.clear();
	tempIndex = 0;
	selectedData.value = "결제방법";
	// console.log("args.data.index : " + args.data.index);
	console.log("initialDataSetting listDetailNotes" + JSON.stringify(listDetailNotes._values[0]));
	subType.reverse.value=notes._values[0].reverse;
	selected_BILL_CLSS.clear();




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

	console.log("initialDataSetting selectedDetailNoteVariable.BILL_CLSS : " + selectedDetailNoteVariable.BILL_CLSS);


	if (selectedDetailNoteVariable.ACTION == "I") {
		saveOrEdit.value="저장";
	}else if (selectedDetailNoteVariable.ACTION == "U") {
		saveOrEdit.value="수정";
	}

	if (selectedDetailNoteVariable.BILL_IDX != "") {
		isReadOnly.value = false;
	}else {
		isReadOnly.value = true;
	}


	if(selectedDetailNoteVariable.BILL_CLSS == "10") {
		selectedData.value = "카드결제";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "20") {
		selectedData.value = "아이행복카드";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "30") {
		selectedData.value = "계좌이체";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "40") {
		selectedData.value = "자동이체";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "50") {
		selectedData.value = "지로";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "60") {
		selectedData.value = "현금결제";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "70") {
		selectedData.value = "기타";
	} else if (selectedDetailNoteVariable.BILL_CLSS == "") {
		selectedData.value = "결제방법"
	} else if (selectedDetailNoteVariable.BILL_CLSS == null) {
		selectedData.value = "결제방법"
	}

	
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
		


var uploadOn = Observable(false);

function tryUpload() {
	uploadOn.value = true;
}

function cancelUpload() {
	uploadOn.value = false;
}

var pickerOn = Observable(false);
var selectedData = Observable("결제방법");
var pickerData = Observable("", "카드결제", "아이행복카드", "계좌이체", "자동이체", "지로", "현금결제", "기타");

var stPos = Observable(0);

function pickerUp() {
	console.log("selectedData.value : " + selectedData.value);
	// pickerData.clear();
	selectedData.clear();
	// pickerData.add("");
	// pickerData.add("카드결제");
	// pickerData.add("아이행복카드");
	// pickerData.add("계좌이체");
	// pickerData.add("자동이체");
	// pickerData.add("지로");
	// pickerData.add("현금결제");
	// pickerData.add("기타");
	stPos.value = 0;
	console.log("stPos : " + stPos);


	selectedData.value = "결제방법";
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

	console.log("validateCheck BILL_CLSS" + BILL_CLSS);

	if (BILL_CLSS == null || BILL_CLSS == "") {
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


	if ((ESTI_CODE == null) || (ESTI_CODE == "")) {
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

	console.log("Backend.subject.ESTI_CODE ================> " + Backend.subject.ESTI_CODE.value);

	if (Backend.subject.ESTI_CODE.value == "" || Backend.subject.ESTI_CODE.value == null) {
		console.log("CrazyCrazyCrayzy");
		ESTI_CODE = selectedDetailNoteVariable.ESTI_CODE;
	} else {
		console.log("NOTNOTNOTNOTNOTNOT CrazyCrazyCrayzy");
		ESTI_CODE = Backend.subject.ESTI_CODE.value;
	}
	
	console.log("ESTI_CODE ================> " + ESTI_CODE);




	var ESTI_SUBCODE = null;

	console.log("Backend.subject.ESTI_SUBCODE ================> " + Backend.subject.ESTI_SUBCODE.value);

	if (Backend.subject.ESTI_SUBCODE.value == null) {
		// ESTI_SUBCODE = selectedDetailNoteVariable.ESTI_SUBCODE;
		ESTI_SUBCODE = "";
	} else {
		ESTI_SUBCODE = Backend.subject.ESTI_SUBCODE.value;
	}

	console.log("ESTI_SUBCODEESTI_SUBCODEESTI_SUBCODE : " + ESTI_SUBCODE);


	
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

	BILL_CLSS = selectedDetailNoteVariable.BILL_CLSS;

	if (selected_BILL_CLSS.value != null) {
		BILL_CLSS = selected_BILL_CLSS.value;
		selected_BILL_CLSS.clear();
	} 

	
	
	



	var BILL_RECEIPT =selectedDetailNoteVariable.BILL_RECEIPT;
	
	var ESTI_SUB_YN;

	if(Backend.subject.ESTI_SUB_YN == null) {
		ESTI_SUB_YN = selectedDetailNoteVariable.ESTI_SUB_YN;
	}else {
		ESTI_SUB_YN = Backend.subject.ESTI_SUB_YN.value;
	}
	
	var ESTI_NAME = "";	

	console.log("Backend.subject.ESTI_NAME ================> " + Backend.subject.ESTI_NAME.value);

	if (Backend.subject.ESTI_NAME.value == null) {
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

		if (ACTION =="I") {
			BCASH_MEMO = ORG_BCASH_MEMO + "중 " + tempMoneyValue.toString();
		} else if (ACTION == "U") {
			BCASH_MEMO = ORG_BCASH_MEMO;
		}
		



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
		+'","ESTI_CODE":"'+ESTI_CODE
		+'","BILL_SUBCODE":"'+BILL_SUBCODE
		+'","BILL_IDX":"'+BILL_IDX
		+'","BILL_CLSS":"'+BILL_CLSS
		+'","BILL_RECEIPT":"'+BILL_RECEIPT
		+'","ESTI_SUB_YN":"'+ESTI_SUB_YN
		+'","ESTI_NAME":"'+ESTI_NAME
		+'","BILL_GB":"'+BILL_GB
		+'","ESTI_SUBCODE":"'+ESTI_SUBCODE
		+'","BCASH_BILL_SEQ":"'+BCASH_BILL_SEQ
		+'", "BCASH_MONEY":"'+BCASH_MONEY
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
		+'","BILL_SUBCODE":"'+BILL_SUBCODE
		+'","BILL_IDX":"'+BILL_IDX
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
	var jsonParam = null;


	var pictureList = null;

	pictureList = '{"ATCHMNFL_IDX" : ';


	


	Backend.selectedPhotoCollectionPictureListFromDetailNote.clear();




	// for (var i = 0; i < Backend.selectedPhotoCollectionPictureListFromDetailNote.length; i++) {
	// 	Backend.selectedPhotoCollectionPictureListFromDetailNote[i]
	// }
	// // Backend.selectedPhotoCollectionPictureListFromDetailNote.

	// console.log("pictureListpictureListpictureListpictureListpictureList : " + pictureList);



	// var temp = '{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+',"ds_billAtchMapngList": '+pictureList+'}';
	// console.log("temp >>>>>>>>>>>>>>>>>>>>> " + temp);









	// var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+',"ds_billAtchMapngList": '+pictureList+'}');


	console.log("jsonParam123123123 : " + JSON.stringify(jsonParam));

	updatebCashMobileUrl = Backend.BASE_URL + Backend.updatebCashMobile_URL;
	
	console.log("ESTI_CODEESTI_CODEESTI_CODEESTI_CODEESTI_CODE : " + ESTI_CODE);


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


	var validateChecked = validationCheck(tempMoneyValue, BILL_CLSS, ESTI_CODE);

	if (validateChecked == true) {

		if (isPictureTaken == true) {
		// pictureList = JSON.stringify(pictureArray._values);
		// pictureList = '{"ATCHMNFL_IDX" : '+'['+ pictureArray +',' + pictureArray + ']}';
		pictureList = '{"ATCHMNFL_IDX" : '+'['+ pictureArray +']}';
		// pictureList = '{"ATCHMNFL_IDX" : '+'['+ pictureArray + ']}';
		jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+',"ds_billAtchMapngList": '+pictureList+'}');

		isPictureTaken = false;


		} else {
			var temp = '{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+'}';
			console.log(temp);


			jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+'}');
		}
	
	// pictureList = JSON.parse(pictureList);




	if (Backend.selectedPhotoCollectionPictureListFromDetailNote._values == "") {
		console.log("Backend.selectedPhotoCollectionPictureListFromDetailNote._values == null");
	} else {
		if (Backend.selectedPhotoCollectionPictureListFromDetailNote.length == 1) {
			console.log("Backend.selectedPhotoCollectionPictureListFromDetailNote.length : " + Backend.selectedPhotoCollectionPictureListFromDetailNote.length);

			pictureList = '{"ATCHMNFL_IDX" : '+'['+ Backend.selectedPhotoCollectionPictureListFromDetailNote._values +']}';
		} else {
			for (var i = 0; i < Backend.selectedPhotoCollectionPictureListFromDetailNote.length; i++) {

				if (i == 0 ) {
					pictureList = pictureList +'['+ Backend.selectedPhotoCollectionPictureListFromDetailNote._values[i] + ','; 
				} else if (i != (Backend.selectedPhotoCollectionPictureListFromDetailNote.length -1)){
					pictureList = pictureList + Backend.selectedPhotoCollectionPictureListFromDetailNote._values[i] + ',';
				} else if (i == (Backend.selectedPhotoCollectionPictureListFromDetailNote.length -1)) {
					pictureList = pictureList + Backend.selectedPhotoCollectionPictureListFromDetailNote._values[i] + ']}';
				}		
			}


			console.log("pictureList for many pictures: " + pictureList);

		}
		jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_bCash": '+ds_bCash+',"ds_billAtchMapngList": '+pictureList+'}');
	}



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
			   		
			   		if (ACTION == "I") {
			   			alertWithConfirm.message.value = "저장 되었습니다.";
			   		} else if (ACTION =="U") {
			   			alertWithConfirm.message.value = "수정 되었습니다.";
			   		}
			   		alertWithConfirm.layer.value = "Overlay";	
			   	} else {
			   		if (ACTION == "I") {
				   		alert.message.value = "저장이 안됬습니다.";
						
			   		} else if (ACTION =="U") {
				   		alert.message.value = "수정이 안됬습니다.";
			   		}
			
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


var saveOrEdit = Observable();




var deleteMobileBillListUrl;

function deleteData () {

	if (selectedDetailNoteVariable.ESTI_CODE == "") {
		   			alert.title.value = "";
					alert.message.value = "미등록 거래내역은 삭제할 수 없습니다.";
					alert.type.value = "Check";
					alert.layer.value = "Overlay";
	} else {


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
	// var ESTI_CODE;

	// if (Backend.subject.ESTI_CODE. == null) {
	// 	ESTI_CODE = selectedDetailNoteVariable.ESTI_CODE;
	// } else {
	// 	ESTI_CODE = Backend.subject.ESTI_CODE.value;
	// }


	var ESTI_CODE = null;

	// console.log("Backend.subject.ESTI_CODE ================> " + Backend.subject.ESTI_CODE.value);

	// if (Backend.subject.ESTI_CODE.value == "") {

	ESTI_CODE = selectedDetailNoteVariable.ESTI_CODE;
	// } else {
	// 	ESTI_CODE = Backend.subject.ESTI_CODE.value;
	// }
	
	console.log("ESTI_CODE ================> " + ESTI_CODE);

	var BILL_SUBCODE= selectedDetailNoteVariable.BILL_SUBCODE;

	console.log("BILL_SUBCODE ================> " + BILL_SUBCODE);

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




	ds_bCash ='{"ACTION":"D","CASH_IDX":"'+CASH_IDX
	+'","CASH_DATE":"'+CASH_DATE+'","CASH_GB":"'+CASH_GB
	+'","CASH_IDX2":"'+CASH_IDX2+'","MONEY":"'+tempMoneyValue
	+'","ORG_BCASH_MEMO":"'+ORG_BCASH_MEMO+'","BCASH_MEMO":"'+BCASH_MEMO
	+'","ESTI_CODE":"'+ESTI_CODE+'","BILL_SUBCODE":"'+BILL_SUBCODE+'","BILL_IDX":"'+BILL_IDX
	+'","BILL_CLSS":"'+BILL_CLSS+'","BILL_RECEIPT":"'+BILL_RECEIPT
	+'","ESTI_SUB_YN":"'+ESTI_SUB_YN+'","ESTI_NAME":"'+ESTI_NAME
	+'","BILL_GB":"'+BILL_GB+'","BCASH_BILL_SEQ":"'+BCASH_BILL_SEQ+'"}';	
	



	console.log("ds_bCash : " + ds_bCash);

	
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
					alert.message.value = "삭제가 되지않았습니다.";
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

			console.log("Backend.subject.ESTI_CODE was onValueChanged!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");


			console.log("x.stringify 2018.01.06 : " + JSON.stringify(x));

			console.log("notes._values[tempIndex] : " + JSON.stringify(notes._values[tempIndex]));

			if (notes == null) {
				getListDetailNote();
			}

			// if ((x != null) && (notes._values[tempIndex] != null)) {
			if (x != null) {
				console.log("%%%%%%%%%%%%%%%%%% X value is not null %%%%%%%%%%%%%%%%%%");
				
				try {
					console.log("notes._values[tempIndex].type : " + notes._values[tempIndex].type);
					console.log("x.substr(0,1) : " + x.substr(0,1));
					if (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "2") {
						console.log("7777777777777777777777777777777777777");
						subType.reverse.value = true;
						// if (parseInt(moneyValue.value) < 0) {
						// 	console.log("88888888888888888888888888888888888");
						// 	if (selectedDetailNoteVariable.MONEY < 0) {
						// 		console.log("9999999999999999999999999999999");
						// 		if (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "2") {
						// 			moneyValue.value = moneyValue.value.replace(/,/g , "");
						// 			moneyValue.value = parseInt(moneyValue.value) * -1;
						// 			moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 			subType.reverse.value = false;
						// 		} else {
						// 			console.log("0000000000000000000000000000000000");
						// 			moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 			subType.reverse.value = false;	
						// 		}
						// 	} else {
						// 		console.log("666666666666666666666666666666666666666");
						// 		moneyValue.value = moneyValue.value.replace(/,/g , "");
						// 		moneyValue.value = parseInt(moneyValue.value) * -1;
						// 		moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 		subType.reverse.value = true;					
						// 	}

						// } else {
						// 	console.log("7878787878787878787878787878787878787878787878");
						// 	if (selectedDetailNoteVariable.MONEY < 0) {
						// 		console.log("121212121212121212121212121212121212121212121212");
						// 		moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 		subType.reverse.value = false;					
						// 	} else {
						// 		console.log("34343434343434343434343434343434343434343434343434");

						// 		if ((parseInt(moneyValue.value) < 0) && (selectedDetailNoteVariable.MONEY < 0) ) {
						// 			console.log("5656565656565656565656565656565656565656565656565656");
						// 			moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 			subType.reverse.value = true;						
						// 		} else if (parseInt(moneyValue.value) < 0 && selectedDetailNoteVariable.MONEY > 0) {
						// 			console.log("787878787878787878787878787878787878787878787878787878");
						// 			moneyValue.value = moneyValue.value.replace(/,/g , "");
						// 			moneyValue.value = parseInt(moneyValue.value) * -1;
						// 			moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 			subType.reverse.value = true;							
						// 		} else if ((parseInt(moneyValue.value) > 0) && (selectedDetailNoteVariable.MONEY < 0)  ) {
						// 			console.log("9090909090909090909090909090909090909090909090909090909090909090909090");
						// 			moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 			subType.reverse.value = true;							
						// 		} else if ((parseInt(moneyValue.value) > 0) && (selectedDetailNoteVariable.MONEY > 0)  ) {
						// 			console.log("12121212121212121212121212121212121212121212121212");
						// 			moneyValue.value = moneyValue.value.replace(/,/g , "");
						// 			moneyValue.value = parseInt(moneyValue.value) * -1;
						// 			moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 			subType.reverse.value = true;						
						// 		}
						// 	}
//						}
						if (selectedDetailNoteVariable.MONEY < 0) {
							if (parseInt(moneyValue.value) < 0) {
								if (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "1") {
									// moneyValue.value = moneyValue.value.replace(/,/g , "");
									// moneyValue.value = parseInt(moneyValue.value) * -1;
									// moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									subType.reverse.value=false;
								} else if (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "2") {
									moneyValue.value = moneyValue.value.replace(/,/g , "");
									moneyValue.value = parseInt(moneyValue.value) * -1;
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								}



							} else if (parseInt(moneyValue.value) > 0){

								moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						} else {
							if (parseInt(moneyValue.value) > 0) {
								moneyValue.value = moneyValue.value.replace(/,/g , "");
								moneyValue.value = parseInt(moneyValue.value) * -1;
								moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							} else {
								moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
						}




					} else if (notes._values[tempIndex].type == "출금" && x.substr(0,1) == "1") {				
						console.log("100000000000000000000000000000000");
						if (moneyValue.value.toString().includes("-")) {
							if (selectedDetailNoteVariable.MONEY < 0) {
								console.log("200000000000000000000000000000000");
								// moneyValue.value = moneyValue.value.replace(/,/g , "");
								// moneyValue.value = parseInt(moneyValue.value) * -1;
								if (notes._values[tempIndex].type == "출금" && x.substr(0,1) == "1") {
									moneyValue.value = moneyValue.value.replace(/,/g , "");
									moneyValue.value = parseInt(moneyValue.value) * -1;
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									subType.reverse.value = false;
								}else {
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									subType.reverse.value = false;	
								}
								
							} else {
								console.log("300000000000000000000000000000000");
								moneyValue.value = moneyValue.value.replace(/,/g , "");
								moneyValue.value = parseInt(moneyValue.value) * -1;
								moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								subType.reverse.value = true;
							}

						} else {
							console.log("900000000000000000000000000000000000000000000000");
							if (selectedDetailNoteVariable.MONEY < 0) {
								// moneyValue.value = moneyValue.value.replace(/,/g , "");
								// moneyValue.value = parseInt(moneyValue.value) * -1;
								moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									subType.reverse.value = false;	
							} else {

								console.log("900000000000000000000000000000000000000000000000");

								moneyValue.value = moneyValue.value.replace(/,/g , "");
								moneyValue.value = parseInt(moneyValue.value) * -1;	
								moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
										subType.reverse.value = true;
							}
						}

						console.log("what the hell is this??");

					} else {
						console.log("1555555555555555555555555555555555555");
												
						if ((notes._values[tempIndex].type == "출금" && x.substr(0,1) == "2") || (notes._values[tempIndex].type == "입금" && x.substr(0,1) == "1"))  {

							console.log("123456789012345678901234567890123456789012345678901234567890");
							if (selectedDetailNoteVariable.MONEY < 0) {
								console.log("1111111111111111111111111111111111111111");
								// moneyValue.value = moneyValue.value.replace(/,/g , "");
								// moneyValue.value = parseInt(moneyValue.value) * -1;	
								// moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	

								if (parseInt(moneyValue.value) < 0 ) {
									console.log("222222222222222222222222222222222222");
									// moneyValue.value = moneyValue.value.replace(/,/g , "");
									// moneyValue.value = parseInt(moneyValue.value) * -1;	
									// moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								} else {
									console.log("333333333333333333333333333333333333");
									moneyValue.value = moneyValue.value.replace(/,/g , "");
									moneyValue.value = parseInt(moneyValue.value) * -1;	
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
								}
							} else {
								console.log("4444444444444444444444444444444444444444");
								if (parseInt(moneyValue.value) < 0 ) {
									console.log("55555555555555555555555555555555555555");
									moneyValue.value = moneyValue.value.replace(/,/g , "");
									moneyValue.value = parseInt(moneyValue.value) * -1;	
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
								} else {
									moneyValue.value = moneyValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								}
							}			
						
						} else {


						}




						subType.reverse.value = false;
						console.log("600000000000000000000000000000000");
					}
					console.log("now type : " + notes._values[tempIndex].type);
					console.log("ESTI_CODE Changed : " + x.substr(0,1));
					console.log("reverse state : " + subType.reverse.value);
				} catch (err){
					console.log(err);
				} finally {

				}
			}
		});

		//가격이 바뀌었을 때 타야되는 로직

		moneyValue.onValueChanged(null, function (x) {
			console.log("IT has changed");
		});














		Backend.subject.ESTI_SUBCODE.onValueChanged(null, function(x) {
			console.log("Backend.subject.ESTI_SUBCODE.value before setting GLOBAL_BILL_SUBCODE: " + Backend.subject.ESTI_SUBCODE.value);	
			GLOBAL_BILL_SUBCODE = Backend.subject.ESTI_SUBCODE.value;
		});

//==========================================  사진 부분 ==========================================================

var pictureArray = null;
var isPictureTaken  = null;

var print = debug_log;
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
			detailNoteLoadingCircleOn.value = true;

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
	if (JSON.parse(response).MiResultMsg == "success") {
		// pictureArray.add(JSON.parse(response).ATCHMNFL_IDX);
		pictureArray = JSON.parse(response).ATCHMNFL_IDX;
		isPictureTaken = true;
		detailNoteLoadingCircleOn.value = false;

		alert.message.value="선택된 이미지가 적용되었습니다.";
		alert.layer.value = "Overlay";

	} else {
		detailNoteLoadingCircleOn.value = false;
		alert.message.value="선택된 이미지가 적용되지 않았습니다.";
		alert.layer.value = "Overlay";
	}



		console.log("pictureArray ===============>>>>>>>>>>> : " + pictureArray);
	});
}

function getImageWithParameterDetailNote() {
	CameraRoll.getImage().then(function(image) {
		detailNoteLoadingCircleOn.value = true;
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

var loadingCircle = Observable(true);

//==========================================  사진 부분 ==========================================================


function chosenPictures (args) {
	this.ATCHMNFL_IDX = args
}

var detailNoteLoadingCircleOn = Observable(false);



function testMethod () {
	console.log("testMethodtestMethodtestMethodtestMethodtestMethodtestMethodtestMethod");
}




















		//2018.01.16 기존 소스 끝
		module.exports = {
			detailText, showText, uploadOn, tryUpload, cancelUpload,
			pickerOn, selectedData, pickerData, pickerUp, pickerDown,
			subType, notes, stPos,
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
			}, alert, alertWithConfirm, logOut, isReadOnly, takedPictureWithParamterDetailNote, takePictureWithParameterDetailNote, 
			getImageWithParameterDetailNote, loadingCircle, detailNoteLoadingCircleOn, testMethod, saveOrEdit
		};