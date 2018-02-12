var Observable = require('FuseJS/Observable');
var unReg = Observable(false);
var Backend = require('Backend.js');

var year = Observable();
var years = Observable();
for (var i = 0 ; i < 30 ; i++) {
	years.add(2010+i);
}
var stYearPos = Observable(0);
for (var i = 0 ; i < years.length ; i++) {
	if (years.getAt(i) == year.value) {
		break;
	} else {
		stYearPos.value += 50;
	}
}

var month = Observable();
var months = Observable();
for (var i = 0 ; i < 12 ; i++) {
	months.add(1+i);
}
var stMonthPos = Observable(0);
for (var i = 0 ; i < months.length ; i++) {
	if (months.getAt(i) == month.value) {
		break;
	} else {
		stMonthPos.value += 50;
	}
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

	if (args.SUBJECT != null)  {
		this.SUBJECT = args.SUBJECT;	
	} else {
		this.SUBJECT = "";
	}
	
	if (args.BILL_NURIGB != null)  {
		this.BILL_NURIGB = args.BILL_NURIGB;
	} else {
		this.BILL_NURIGB = "";	
	}

	if (args.BIGO != null)  {
		this.BIGO = args.BIGO;
	} else {
		this.BIGO = "";
	}	

	if (args.CASH_IDX2 != null)  {
		this.CASH_IDX2 = args.CASH_IDX2;
	} else {
		this.CASH_IDX2 = "";
	}

	if (args.GUBUN != null)  {
		this.GUBUN = args.GUBUN;
	} else {
		this.GUBUN = "";
	}

	if (args.CASH_GB != null)  {
		this.CASH_GB = args.CASH_GB;
	} else {
		this.CASH_GB = "";
	}

	if (args.BILL_NUM != null)  {
		this.BILL_NUM = args.BILL_NUM;
	} else {
		this.BILL_NUM = "";
	}

	if (args.BCASH_IDX != null)  {
		this.BCASH_IDX = args.BCASH_IDX;
	} else {
		this.BCASH_IDX = "";
	}

	if (args.BILL_DATE != null)  {
		this.BILL_DATE = args.BILL_DATE;
	} else {
		this.BILL_DATE = "";
	}

	if (args.CASH_PLACE != null)  {
		this.CASH_PLACE = args.CASH_PLACE;
	} else {
		this.CASH_PLACE = "";
	}

	if (args.ESTI_SUB_NM != null)  {
		this.ESTI_SUB_NM = args.ESTI_SUB_NM;
	} else {
		this.ESTI_SUB_NM = "";
	}

	if (args.SUM_MONEY != null)  {
		this.SUM_MONEY = args.SUM_MONEY;
	} else {
		this.SUM_MONEY = "";
	}

	if (args.BILL_INPROGRAM != null)  {
		this.BILL_INPROGRAM = args.BILL_INPROGRAM;
	} else {
		this.BILL_INPROGRAM = "";
	}

	if (args.BILL_ETC1 != null)  {
		this.BILL_ETC1 = args.BILL_ETC1;
	} else {
		this.BILL_ETC1 = "";
	}

	if (args.MEMO != null)  {
		this.MEMO = args.MEMO;
	} else {
		this.MEMO = "";
	}

	if (args.BILL_ETC2 != null)  {
		this.BILL_ETC2 = args.BILL_ETC2;
	} else {
		this.BILL_ETC2 = "";
	}

	if (args.BILL_ETC3 != null)  {
		this.BILL_ETC3 = args.BILL_ETC3;
	} else {
		this.BILL_ETC3 = "";
	}

	if (args.ORG_BCASH_MEMO != null)  {
		this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO;
	} else {
		this.ORG_BCASH_MEMO = "";
	}

	if (args.MONEY_OUT != null)  {
		this.MONEY_OUT = args.MONEY_OUT;
	} else {
		this.MONEY_OUT = "";
	}

	if (args.FIRMNAME != null)  {
		this.FIRMNAME = args.FIRMNAME;
	} else {
		this.FIRMNAME = "";
	}

	if (args.ACTION != null)  {
		this.ACTION = args.ACTION;
	} else {
		this.ACTION = "";
	}

	if (args.BILL_ETC4 != null)  {
		this.BILL_ETC4 = args.BILL_ETC4;
	} else {
		this.BILL_ETC4 = "";
	}

	if (args.CASH_ORDER != null)  {
		this.CASH_ORDER = args.CASH_ORDER;
	} else {
		this.CASH_ORDER = "";
	}

	if (args.MONEY_GB != null)  {
		this.MONEY_GB = args.MONEY_GB;
	} else {
		this.MONEY_GB = "";
	}

	if (args.EDITABLE != null)  {
		this.EDITABLE = args.EDITABLE;
	} else {
		this.EDITABLE = "";
	}

	if (args.BILL_BOJOGB != null)  {
		this.BILL_BOJOGB = args.BILL_BOJOGB;
	} else {
		this.BILL_BOJOGB = "";
	}

	if (args.ESTI_CODE != null)  {
		this.ESTI_CODE = args.ESTI_CODE;
	} else {
		this.ESTI_CODE = "";
	}

	if (args.CRED_SEQ != null)  {
		this.CRED_SEQ = args.CRED_SEQ;
	} else {
		this.CRED_SEQ = "";
	}

	if (args.ESTI_NAME != null)  {
		this.ESTI_NAME = args.ESTI_NAME;
	} else {
		this.ESTI_NAME = "";
	}

	if (args.BOOK_GB != null)  {
		this.BOOK_GB = args.BOOK_GB;
	} else {
		this.BOOK_GB = "";
	}

	if (args.BILL_IDX != null)  {
		this.BILL_IDX = args.BILL_IDX;
	} else {
		this.BILL_IDX = "";
	}

	if (args.BILL_CANCELGB != null)  {
		this.BILL_CANCELGB = args.BILL_CANCELGB;
	} else {
		this.BILL_CANCELGB = "";
	}

	if (args.BILL_GB != null)  {
		this.BILL_GB = args.BILL_GB;
	} else {
		this.BILL_GB = "";
	}

	if (args.MEMO_ADD != null)  {
		this.MEMO_ADD = args.MEMO_ADD;
	} else {
		this.MEMO_ADD = "";
	}

	if (args.ESTI_GB != null)  {
		this.ESTI_GB = args.ESTI_GB;
	} else {
		this.ESTI_GB = "";
	}

	if (args.BILL_DATE0 != null)  {
		this.BILL_DATE0 = args.BILL_DATE0;
	} else {
		this.BILL_DATE0 = "";
	}

	if (args.BILL_DATE1 != null)  {
		this.BILL_DATE1 = args.BILL_DATE1;
	} else {
		this.BILL_DATE1 = "";
	}

	if (args.BILL_DATE4 != null)  {
		this.BILL_DATE4 = args.BILL_DATE4;
	} else {
		this.BILL_DATE4 = "";
	}

	if (args.CASH_DATE != null)  {
		this.CASH_DATE = args.CASH_DATE;
	} else {
		this.CASH_DATE = "";
	}

	if (args.BILL_DATE2 != null)  {
		this.BILL_DATE2 = args.BILL_DATE2;
	} else {
		this.BILL_DATE2 = "";
	}

	if (args.PURPOSE != null)  {
		this.PURPOSE = args.PURPOSE;
	} else {
		this.PURPOSE = "";
	}

	if (args.BILL_DATE3 != null)  {
		this.BILL_DATE3 = args.BILL_DATE3;
	} else {
		this.BILL_DATE3 = "";
	}

	if (args.GRID_NURIGB != null)  {
		this.GRID_NURIGB = args.GRID_NURIGB;
	} else {
		this.GRID_NURIGB = "";
	}

	if (args.BILL_CLSS != null)  {
		this.BILL_CLSS = args.BILL_CLSS;
	} else {
		this.BILL_CLSS = "";
	}

	if (args.CASH_MEMO != null)  {
		this.CASH_MEMO = args.CASH_MEMO;
	} else {
		this.CASH_MEMO = "";
	}

	if (args.CHK != null)  {
		this.CHK = args.CHK;
	} else {
		this.CHK = "";
	}

	if (args.BILL_SUBCODE != null)  {
		this.BILL_SUBCODE = args.BILL_SUBCODE;
	} else {
		this.BILL_SUBCODE = "";
	}

	if (args.BILL_NUMDETAIL != null)  {
		this.BILL_NUMDETAIL = args.BILL_NUMDETAIL;
	} else {
		this.BILL_NUMDETAIL = "";
	}

	if (args.BILL_MONEY != null)  {
		this.BILL_MONEY = args.BILL_MONEY;
	} else {
		this.BILL_MONEY = "";
	}

	if (args.GRID_BOJOGB != null)  {
		this.GRID_BOJOGB = args.GRID_BOJOGB;
	} else {
		this.GRID_BOJOGB = "";
	}

	if (args.CONTENTS != null)  {
		this.CONTENTS = args.CONTENTS;
	} else {
		this.CONTENTS = "";
	}

	if (args.BCASH_MEMO != null)  {
		this.BCASH_MEMO = args.BCASH_MEMO;
	} else {
		this.BCASH_MEMO = "";
	}

	if (args.CASH_IDX != null)  {
		this.CASH_IDX = args.CASH_IDX;
	} else {
		this.CASH_IDX = "";
	}

	if (args.ESTI_DISPLAY != null)  {
		this.ESTI_DISPLAY = args.ESTI_DISPLAY;
	} else {
		this.ESTI_DISPLAY = "";
	}

	if (args.PREV_IDX != null)  {
		this.PREV_IDX = args.PREV_IDX;
	} else {
		this.PREV_IDX = "";
	}

	if (args.MEMCODE != null)  {
		this.MEMCODE = args.MEMCODE;
	} else {
		this.MEMCODE = "";
	}

	if (args.BILL_RECEIPT != null)  {
		this.BILL_RECEIPT = args.BILL_RECEIPT;
	} else {
		this.BILL_RECEIPT = "";
	}

	if (args.ESTI_PART != null)  {
		this.ESTI_PART = args.ESTI_PART;
	} else {
		this.ESTI_PART = "";
	}

	if (args.MONEY != null)  {
		this.MONEY = args.MONEY;
	} else {
		this.MONEY = "";
	}

	if (args.REMAIN != null)  {
		this.REMAIN = args.REMAIN;
	} else {
		this.REMAIN = "";
	}

	if (args.ESTI_SUB_YN != null)  {
		this.ESTI_SUB_YN = args.ESTI_SUB_YN;
	} else {
		this.ESTI_SUB_YN = "";
	}

	if (args.BILL_KEEPCODE != null)  {
		this.BILL_KEEPCODE = args.BILL_KEEPCODE;
	} else {
		this.BILL_KEEPCODE = "";
	}

	if (args.MONEY_IN != null)  {
		this.MONEY_IN = args.MONEY_IN;
	} else {
		this.MONEY_IN = "";
	}

	if (args.BCASH_MONEY != null)  {
		this.BCASH_MONEY = args.BCASH_MONEY;
	} else {
		this.BCASH_MONEY = "";
	}
}

function pickedSelectOnlineBCashListIndividualData (args) {
	if (args.SUBJECT != null) {
		this.SUBJECT = args.SUBJECT;	
	} else {
		this.SUBJECT = "";
	}
	
	if (args.BCASH_MONEY != null) {
		this.BCASH_MONEY = args.BCASH_MONEY;	
	} else {
		this.BCASH_MONEY = "";
	}
	
	if (args.MONEY_IN != null) {
		this.MONEY_IN = args.MONEY_IN;	
	} else {
		this.MONEY_IN = "";
	}

	if (args.BILL_KEEPCODE != null) {
		this.BILL_KEEPCODE = args.BILL_KEEPCODE;	
	} else {
		this.BILL_KEEPCODE = "";
	}
	
	if (args.ESTI_SUB_YN != null) {
		this.ESTI_SUB_YN = args.ESTI_SUB_YN;	
	} else {
		this.ESTI_SUB_YN = "";
	}
	
	if (args.REMAIN != null) {
		this.REMAIN = args.REMAIN;	
	} else {
		this.REMAIN = "";
	}
	
	if (args.MONEY != null) {
		this.MONEY = args.MONEY;	
	} else {
		this.MONEY = "";
	}
	
	if (args.ESTI_PART != null) {
		this.ESTI_PART = args.ESTI_PART;	
	} else {
		this.ESTI_PART = "";
	}

	if (args.BILL_RECEIPT != null) {
		this.BILL_RECEIPT = args.BILL_RECEIPT;	
	} else {
		this.BILL_RECEIPT = "";
	}
	
	if (args.MEMCODE != null) {
		this.MEMCODE = args.MEMCODE;	
	} else {
		this.MEMCODE = "";
	}

	if (args.PREV_IDX != null) {
		this.PREV_IDX = args.PREV_IDX;	
	} else {
		this.PREV_IDX = "";
	}

	if (args.ESTI_DISPLAY != null) {
		this.ESTI_DISPLAY = args.ESTI_DISPLAY;	
	} else {
		this.ESTI_DISPLAY = "";
	}
	
	if (args.CASH_IDX != null) {
		this.CASH_IDX = args.CASH_IDX;	
	} else {
		this.CASH_IDX = "";
	}

	if (args.BCASH_MEMO != null) {
		this.BCASH_MEMO = args.BCASH_MEMO;	
	} else {
		this.BCASH_MEMO = "";
	}

	if (args.CONTENTS != null) {
		this.CONTENTS = args.CONTENTS;	
	} else {
		this.CONTENTS = "";
	}
	
	if (args.GRID_BOJOGB != null) {
		this.GRID_BOJOGB = args.GRID_BOJOGB;	
	} else {
		this.GRID_BOJOGB = "";
	}

	if (args.BILL_MONEY != null) {
		this.BILL_MONEY = args.BILL_MONEY;	
	} else {
		this.BILL_MONEY = "";
	}
	
	if (args.BILL_NUMDETAIL != null) {
		this.BILL_NUMDETAIL = args.BILL_NUMDETAIL;	
	} else {
		this.BILL_NUMDETAIL = "";
	}
	
	if (args.BILL_SUBCODE != null) {
		this.BILL_SUBCODE = args.BILL_SUBCODE;	
	} else {
		this.BILL_SUBCODE = "";
	}

	if (args.CHK != null) {
		this.CHK = args.CHK;	
	} else {
		this.CHK = "";
	}

	if (args.CASH_MEMO != null) {
		this.CASH_MEMO = args.CASH_MEMO;	
	} else {
		this.CASH_MEMO = "";
	}
	
	if (args.BILL_CLSS != null) {
		this.BILL_CLSS = args.BILL_CLSS;	
	} else {
		this.BILL_CLSS = "";
	}
	
	if (args.GRID_NURIGB != null) {
		this.GRID_NURIGB = args.GRID_NURIGB;	
	} else {
		this.GRID_NURIGB = "";
	}
	
	if (args.BILL_DATE3 != null) {
		this.BILL_DATE3 = args.BILL_DATE3;	
	} else {
		this.BILL_DATE3 = "";
	}
	
	if (args.PURPOSE != null) {
		this.PURPOSE = args.PURPOSE;	
	} else {
		this.PURPOSE = "";
	}

	if (args.BILL_DATE2 != null) {
		this.BILL_DATE2 = args.BILL_DATE2;	
	} else {
		this.BILL_DATE2 = "";
	}

	if (args.CASH_DATE != null) {
		this.CASH_DATE = args.CASH_DATE;	
	} else {
		this.CASH_DATE = "";
	}
	
	if (args.BILL_DATE4 != null) {
		this.BILL_DATE4 = args.BILL_DATE4;	
	} else {
		this.BILL_DATE4 = "";
	}
	
	if (args.BILL_DATE1 != null) {
		this.BILL_DATE1 = args.BILL_DATE1;	
	} else {
		this.BILL_DATE1 = "";
	}
	
	if (args.BILL_DATE0 != null) {
		this.BILL_DATE0 = args.BILL_DATE0;	
	} else {
		this.BILL_DATE0 = "";
	}
	
	if (args.ESTI_GB != null) {
		this.ESTI_GB = args.ESTI_GB;	
	} else {
		this.ESTI_GB = "";
	}
	
	if (args.MEMO_ADD != null) {
		this.MEMO_ADD = args.MEMO_ADD;	
	} else {
		this.MEMO_ADD = "";
	}

	if (args.BILL_GB != null) {
		this.BILL_GB = args.BILL_GB;	
	} else {
		this.BILL_GB = "";
	}
	
	if (args.BILL_CANCELGB != null) {
		this.BILL_CANCELGB = args.BILL_CANCELGB;	
	} else {
		this.BILL_CANCELGB = "";
	}
	
	if (args.BILL_IDX != null) {
		this.BILL_IDX = args.BILL_IDX;	
	} else {
		this.BILL_IDX = "";
	}
	
	if (args.BOOK_GB != null) {
		this.BOOK_GB = args.BOOK_GB;	
	} else {
		this.BOOK_GB = "";
	}
	
	if (args.ESTI_NAME != null) {
		this.ESTI_NAME = args.ESTI_NAME;	
	} else {
		this.ESTI_NAME = "";
	}

	if (args.CRED_SEQ != null) {
		this.CRED_SEQ = args.CRED_SEQ;	
	} else {
		this.CRED_SEQ = "";
	}	

	if (args.ESTI_CODE != null) {
		this.ESTI_CODE = args.ESTI_CODE;	
	} else {
		this.ESTI_CODE = "";
	}
	
	if (args.BILL_BOJOGB != null) {
		this.BILL_BOJOGB = args.BILL_BOJOGB;	
	} else {
		this.BILL_BOJOGB = "";
	}
		
	if (args.EDITABLE != null) {
		this.EDITABLE = args.EDITABLE;	
	} else {
		this.EDITABLE = "";
	}		

	if (args.MONEY_GB != null) {
		this.MONEY_GB = args.MONEY_GB;	
	} else {
		this.MONEY_GB = "";
	}
		
	if (args.CASH_ORDER != null) {
		this.CASH_ORDER = args.CASH_ORDER;	
	} else {
		this.CASH_ORDER = "";
	}

	if (args.CASH_ORDER != null) {
		this.CASH_ORDER = args.CASH_ORDER;	
	} else {
		this.CASH_ORDER = "";
	}
		
	if (args.BILL_ETC4 != null) {
		this.BILL_ETC4 = args.BILL_ETC4;	
	} else {
		this.BILL_ETC4 = "";
	}
		
	if (args.ACTION != null) {
		this.ACTION = args.ACTION;	
	} else {
		this.ACTION = "";
	}
		
	if (args.FIRMNAME != null) {
		this.FIRMNAME = args.FIRMNAME;	
	} else {
		this.FIRMNAME = "";
	}
	
	if (args.MONEY_OUT != null) {
		this.MONEY_OUT = args.MONEY_OUT;	
	} else {
		this.MONEY_OUT = "";
	}
		
	if (args.ORG_BCASH_MEMO != null) {
		this.ORG_BCASH_MEMO = args.ORG_BCASH_MEMO;	
	} else {
		this.ORG_BCASH_MEMO = "";
	}
		
	if (args.BILL_ETC3 != null) {
		this.BILL_ETC3 = args.BILL_ETC3;	
	} else {
		this.BILL_ETC3 = "";
	}
		
	if (args.BILL_ETC2 != null) {
		this.BILL_ETC2 = args.BILL_ETC2;	
	} else {
		this.BILL_ETC2 = "";
	}

	if (args.MEMO != null) {
		this.MEMO = args.MEMO;	
	} else {
		this.MEMO = "";
	}
		
	if (args.BILL_ETC1 != null) {
		this.BILL_ETC1 = args.BILL_ETC1;	
	} else {
		this.BILL_ETC1 = "";
	}
		
	if (args.BILL_INPROGRAM != null) {
		this.BILL_INPROGRAM = args.BILL_INPROGRAM;	
	} else {
		this.BILL_INPROGRAM = "";
	}

	if (args.SUM_MONEY != null) {
		this.SUM_MONEY = args.SUM_MONEY;	
	} else {
		this.SUM_MONEY = "";
	}
		
	if (args.ESTI_SUB_NM != null) {
		this.ESTI_SUB_NM = args.ESTI_SUB_NM;	
	} else {
		this.ESTI_SUB_NM = "";
	}
		
	if (args.CASH_PLACE != null) {
		this.CASH_PLACE = args.CASH_PLACE;	
	} else {
		this.CASH_PLACE = "";
	}

	if (args.BILL_DATE != null) {
		this.BILL_DATE = args.BILL_DATE;	
	} else {
		this.BILL_DATE = "";
	}
		
	if (args.BCASH_IDX != null) {
		this.BCASH_IDX = args.BCASH_IDX;	
	} else {
		this.BCASH_IDX = "";
	}
		
	if (args.BILL_NUM != null) {
		this.BILL_NUM = args.BILL_NUM;	
	} else {
		this.BILL_NUM = "";
	}
		
	if (args.CASH_GB != null) {
		this.CASH_GB = args.CASH_GB;	
	} else {
		this.CASH_GB = "";
	}
		
	if (args.GUBUN != null) {
		this.GUBUN = args.GUBUN;	
	} else {
		this.GUBUN = "";
	}

	if (args.CASH_IDX2 != null) {
		this.CASH_IDX2 = args.CASH_IDX2;	
	} else {
		this.CASH_IDX2 = "";
	}
		
	if (args.BIGO != null) {
		this.BIGO = args.BIGO;	
	} else {
		this.BIGO = "";
	}
		
	if (args.BILL_NURIGB != null) {
		this.BILL_NURIGB = args.BILL_NURIGB;	
	} else {
		this.BILL_NURIGB = "";
	}

}

var selectOnlineBCashList_URL = Backend.BASE_URL + Backend.selectOnlineBCashList_URL;


var noteManageLoadingCircleOn = Observable(false);
var hasBeenSearched = Observable(false);
var selectedYearAndMonth = null;

function pickerDown() {
	hasBeenSearched.value = true;
	var tempMonth;
	console.log("MONTH.VALUE : " + month.value);
	if(month.value <10) {
		tempMonth = "0" +month.value.toString();
	} else {
		tempMonth = month.value
	}
	selectedYearAndMonth = year.value.toString() + tempMonth.toString();

	selectOnlineBCashList();

	pickerOn.value = false;
}
// 타입 선택 피커 화면 켜고 끄는 변수
var pickerOn2 = Observable(false);
var selectedType = Observable("전체");
var type = Observable("전체", "입금", "출금");
var stTypePos = Observable(0);
for (var i = 0 ; i < type.length ; i++) {
	if (type.getAt(i) == selectedType.value) {
		break;
	} else {
		stTypePos.value += 50;
	}
}

// type.clear() 이용해서 type내용 없애고, type.add로 서버에서 받아온 내용을 넣으면 됩니다. 그리고, 처음으로 넣는 값도 selectedType.value에 같이 넣어주세요.

// 타입 선택 피커 화면 올리고 내리는 함수
function pickerUp2() {
	pickerOn2.value = true;
}

function pickerDown2() {
 	selectOnlineBCashList();
	pickerOn2.value = false;
}
var pickerOn3 = Observable(false);

function pickerUp3() {
	pickerOn3.value = true;
}

function pickerDown3(args) {
	selectOnlineBCashList();
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
	try {
		this.index = noteIndex;
		this.CASH_DATE = arg.CASH_DATE.substring(4,6) + "." + arg.CASH_DATE.substring(6,8);
	
		if (arg.CASH_GB == "1") {
			this.type = "입금";
			this.typeColor = "#4C9DFF";
			// this.subTypeColor = "#8BBDFF";
		} else {
			this.type = "출금";
			this.typeColor = "#FF4200";
			// this.subTypeColor = "#FFBA85";
		}

		
		if (arg.ESTI_CODE != null) {
			if (arg.ESTI_CODE.substr(0,1) == 1) {
				this.subTypeColor = "#8BBDFF";
			} else {
				this.subTypeColor = "#FFBA85";
			}	
		}

		this.BCASH_MONEY = arg.BCASH_MONEY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		if (arg.BILL_GB == "A02") {
			this.isBill = true;
		} else {
			this.isBill = false;
		}

		if (arg.ESTI_SUB_YN == "Y") {
			this.subType = "세목";
			// this.name = arg.ESTI_NAME;
			if(arg.ESTI_SUB_NM != null) {
				this.name = arg.ESTI_NAME + "[" + arg.ESTI_SUB_NM + "]";
			} else {
				this.name = arg.ESTI_NAME;	
			}	
		} else {
			this.subType = "목";
			this.name = arg.ESTI_NAME;	

		}

		console.log("8");

		this.reverse = false;
		console.log("9");

		if(arg.BILL_IDX != null) {
			console.log("10");
			if (arg.CASH_GB != arg.ESTI_CODE.substr(0,1)) {
				console.log("11");
				if (arg.BCASH_MONEY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString().includes("-")) {
					console.log("12");
					this.reverse=true;
				} else {
					console.log("13");
					this.reverse=false;
				}
				console.log("14");
			}
			this.isShow = true;
			console.log("15");
		} else {
			console.log("16");
			this.isShow = false;
			console.log("17");
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
	}catch (e){

	}
	
}
		



		// 지금은 임시로 넣었지만, 파라메터 값의 조건에 따라 값들을 직접 지정해서 추가해주는 방식을 사용하는 것이 좋을 것 같습니다. ux단에서 구분해서 보여주기 보다는 조건판단은 자바스크립트에서 모두 하고 결과만 보여줄 수 있도록 속성값들을 추가하는 거죠. 함수를 사용하셔서 넣어도 좋고요. 그리고 전표상세로 넘어갈 때에는 파라미터에서 전표를 구분할 수 있는 값을 넘겨줘서, 그것을 가지고 다시 세부적으로 보이게 하는 방향을 사용하는 것이 좋지 않을까 합니다.


var billCashInputData = Observable();
var billCashInputDataList = Observable();

var selectedbillCashInputDataList = Observable("전체");
var billCashInputDataListTotal = Observable();
var stBillCashPos = Observable(0);


function getBillCashInputLoad () {


	console.log("================================================================================================================");
	console.log("================================================================================================================");

	console.log("                                  getBillCashInputLoadgetBillCashInputLoad                                      ");

	console.log("================================================================================================================");
	console.log("================================================================================================================");





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

		console.log("1234567890987654321234567890987654321");
		// console.log(" responseData : " + responseData);
		var responseHeaders = JSON.parse(response._bodyInit);

		var responseDsCashCodeList = JSON.stringify(responseHeaders.ds_bCashCodeList);
		responseDsCashCodeList = responseDsCashCodeList.split('],')[1];
		responseDsCashCodeList = responseDsCashCodeList.substr(0, responseDsCashCodeList.length-1);
		billCashInputData.replaceAll(JSON.parse(responseDsCashCodeList));
		billCashInputDataList.add("전체");

		console.log(" responseDsCashCodeList : " + responseDsCashCodeList);

		var count =0;

		for (var i =0; i < billCashInputData.length; i++) {
			if (billCashInputData.getAt(i).BOOK_GB == "01") {
				var name = billCashInputData.getAt(i).NAME;
				var code = billCashInputData.getAt(i).BCASH_IDX;
				var array = '{"INDEX":"'+count+'","NAME":"'+name+'","BCASH_IDX":"'+code+'"}';
				console.log("array : " + array);
				billCashInputDataListTotal.add(JSON.parse(array));
				billCashInputDataList.add(billCashInputDataListTotal.getAt(count).NAME);

				count++;
			}
				
		}

		stBillCashPos.value = 0;
		for (var i = 0 ; i < billCashInputDataList.length ; i++) {
			if (billCashInputDataList.getAt(i) == selectedbillCashInputDataList.value) {
				break;
			} else {
				stBillCashPos.value += 50;
			}
		}
			return response.json();
	}).then(function(jsonData) {

	}).catch(function(err) {
		console.log("ERROR : " + err.message);
	});
}

var selectOnlineBCashListData = Observable();
var temp;

function requestToGetNoteList (searchGubun, BCASH_IDX, esti_code, search_month) {
	notes.clear();
	selectOnlineBCashListDatas.clear();

	var BOOK_GB = "01";
	var search_gb = "Y";
	var dsSearch = '{' 
			+ '"BOOK_GB":"'+BOOK_GB+ '",' 
			+ '"search_gubun":"'+searchGubun+'",' 
			+ '"BCASH_IDX":"'+BCASH_IDX+'",'
			+ '"search_cashgb":"'+esti_code+'",'
			+ '"search_month":"'+search_month +'",'
			+ '"search_gb":"' +search_gb+ '"' 
			+ '}';

	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');

    console.log('jsonParam : ' + jsonParam);
    console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));  
    noteManageLoadingCircleOn.value = true;
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
			console.log(temp.length);

			for (var i = 0; i < temp.length; i++) {
				console.log(i + " : started");
				if (i == 14) {
					console.log(" i : " + i);
					console.log(JSON.stringify(temp[i]));				
				}
	

				notes.add(new note(temp[i], i));
				console.log(i + " : Middle");
				selectOnlineBCashListDatas.add( new selectOnlineBCashListIndividualData(temp[i], i));
				console.log(i + " : Finished");
			}
			noteManageLoadingCircleOn.value = false;
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


function getCurrentDate () {
	var currentTime;
	var tempYear;
	var monthTemp;
	var tempMonth;
	var yearAndMonth;

	year.clear();
	month.clear();

	currentTime = new Date()
	tempYear = currentTime.getFullYear();
	console.log("date : " + typeof(tempYear));
	monthTemp = currentTime.getMonth() + 1;
	console.log("month : " + month);
	year.value = tempYear;
	stYearPos.value = 0;
	for (var i = 0 ; i < years.length ; i++) {
		if (years.getAt(i) == year.value) {
			break;
		} else {
			stYearPos.value += 50;
		}
	}
	month.value = monthTemp;
	stMonthPos.value = 0;
	for (var i = 0 ; i < months.length ; i++) {
		if (months.getAt(i) == month.value) {
			break;
		} else {
			stMonthPos.value += 50;
		}
	}
	tempMonth = monthTemp.toString();

	if(monthTemp < 10) {
		tempMonth = "0" +monthTemp.toString();
	}

	yearAndMonth = tempYear + tempMonth;
	console.log("yearAndMonth : " +yearAndMonth);
	console.log("year.value : " + year.value);
	console.log("month.value : " + month.value);

	return yearAndMonth;
}



function selectOnlineBCashList () {
	//뒷단에 저장해둔 선택한 계정과목 값 초기화
	console.log("================================================================================================================");
	console.log("================================================================================================================");

	console.log("                                  selectOnlineBCashListselectOnlineBCashLists                                   ");

	console.log("================================================================================================================");
	console.log("================================================================================================================");




	clearBackendSubjectValues();

	var yearAndMonth = "";
	// console.log("hasBeenSearched.value : " + hasBeenSearched.value );

	if (hasBeenSearched.value == false) {

		console.log("20180115  hasBeenSearched.value == false hasBeenSearched.value : " + hasBeenSearched.value );


		yearAndMonth = getCurrentDate();

		console.log("20180115 hasBeenSearched.value == false  yearAndMonth : " + yearAndMonth);

	} else {
		yearAndMonth = selectedYearAndMonth;

		console.log("20180115  hasBeenSearched.value == true selectedYearAndMonth : " + selectedYearAndMonth);
		console.log("20180115 hasBeenSearched.value == true  yearAndMonth : " + yearAndMonth);

		if (selectedYearAndMonth == null) {

		console.log("20180115 hasBeenSearched.value == true  selectedYearAndMonth == null selectedYearAndMonth : " + selectedYearAndMonth);			

		yearAndMonth = getCurrentDate();
		console.log("20180115 hasBeenSearched.value == true  selectedYearAndMonth == null yearAndMonth : " + yearAndMonth);			
		}

	}






	console.log("yearAndMonthyearAndMonthyearAndMonthyearAndMonth : " + yearAndMonth);

	//새로운 소스 시자
	var BCASH_IDX = "";
	// console.log("args : " + JSON.stringify(args));

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

	requestToGetNoteList(searchGubun, BCASH_IDX, esti_code, yearAndMonth);
}


function unRegisteredChecked() {
		// alert("pLease ");
// 	notes.clear();
// 	var tempMonth;

// 	console.log("MONTH.VALUE : " + month.value);

// 	if(month.value <10) {
// 		tempMonth = "0" +month.value.toString();
// 	} else {
// 		tempMonth = month.value
// 	}

// 	console.log("tempMonth : " +tempMonth);


// 	var yearAndMonth = year.value.toString() + tempMonth.toString();





// 	console.log("yearAndMonth : " + yearAndMonth);


// 	var esti_code = "";
// 	console.log("selectedType = " +  selectedType);
// 	if(selectedType.value == "전체") {
// 		esti_code="";
// 	} else if (selectedType.value == "입금") {
// 		esti_code="1";
// 	} else if (selectedType.value == "출금") {
// 		esti_code="2";
// 	}

// 	var searchGubun = "A";
// 	if(unReg.value == true) {
// 		searchGubun = "N";
// 	}


// // var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';
// // var dsParam = Backend.dsParam
	


// 	var dsSearch = '{"BOOK_GB":"01","search_gubun":"'+searchGubun+'","BCASH_IDX":"","search_cashgb":"'+ esti_code+'","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
//  	// var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"201706","search_gb":"Y"}';
//     var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
//     // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    
//     console.log('jsonParam : ' + jsonParam);
//     console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));

    
// 	fetch(selectOnlineBCashList_URL, {
// 		method: 'POST',
// 		headers: {
// 			"Content-type": "application/json"
// 		},
// 		body: JSON.stringify(jsonParam)
//         }).then(function(response) {
// 			var responseData = JSON.stringify(response);
// 			var responseHeaders = JSON.parse(response._bodyInit);
// 			console.log("2017.12.18 1 responseData : "+ JSON.stringify(responseHeaders));
// 			temp = responseHeaders.ds_bCashList[1];
// 			console.log("");
// 			console.log("2017.12.18 2 responseHeaders.ds_bCashList : "+ JSON.stringify(temp));

// 			//
// 			var date1;
// 			var type1;
// 			var typeColor1;
// 			var isBill1;
// 			var money1;
// 			var moneyColor1;
// 			var contents1;


// 			//2017.12.18 시작 
// 			// 



// 			for (var i = 0; i < temp.length; i++) {
// 				notes.add(new note(temp[i], i));
// 			}



// 			//2017.12.18 끝
//         	var responseData = JSON.stringify(response);
        	
//             return response.json();
//         }).then(function(jsonData) {
//             var data = jsonData.results[0];
//             console.log("data : " + jsonData.results[0]);
// 			console.log("Reg Succeeded[ios]: " + data.registration_token);
// 			// maintext.value = maintext.value + "/n" + data.registration_token;
//         }).catch(function(err) {
//             console.log("Reg Succeeded[ios] Error!! : " + err.message);
//         });
	selectOnlineBCashList();
}






function goDetailNote2 (arg) {

		// pickedSelectOnlineBCashListIndividualDataInstance = Observable();
	console.log("goDetailNote 2 was clicked");	
	//선택 된 

	// Backend.dataFromNoteManageToDetailNote.INDEX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].INDEX);
	// Backend.dataFromNoteManageToDetailNote.SUBJECT.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].SUBJECT);
	// Backend.dataFromNoteManageToDetailNote.BILL_NURIGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_NURIGB);
	// Backend.dataFromNoteManageToDetailNote.BIGO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BIGO);
	// Backend.dataFromNoteManageToDetailNote.CASH_IDX2.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_IDX2);
	// Backend.dataFromNoteManageToDetailNote.GUBUN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].GUBUN);
	// Backend.dataFromNoteManageToDetailNote.CASH_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_GB);
	// Backend.dataFromNoteManageToDetailNote.BILL_NUM.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_NUM);
	// Backend.dataFromNoteManageToDetailNote.BCASH_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BCASH_IDX);
	// Backend.dataFromNoteManageToDetailNote.BILL_DATE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE);
	// Backend.dataFromNoteManageToDetailNote.CASH_PLACE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_PLACE);
	// Backend.dataFromNoteManageToDetailNote.ESTI_SUB_NM.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_SUB_NM);
	// Backend.dataFromNoteManageToDetailNote.SUM_MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].SUM_MONEY);
	// Backend.dataFromNoteManageToDetailNote.BILL_INPROGRAM.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_INPROGRAM);
	// Backend.dataFromNoteManageToDetailNote.BILL_ETC1.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC1);
	// Backend.dataFromNoteManageToDetailNote.MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MEMO);
	// Backend.dataFromNoteManageToDetailNote.BILL_ETC2.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC2);
	// Backend.dataFromNoteManageToDetailNote.BILL_ETC3.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC3);
	// Backend.dataFromNoteManageToDetailNote.ORG_BCASH_MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ORG_BCASH_MEMO);
	// Backend.dataFromNoteManageToDetailNote.MONEY_OUT.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY_OUT);
	// Backend.dataFromNoteManageToDetailNote.FIRMNAME.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].FIRMNAME);
	// Backend.dataFromNoteManageToDetailNote.ACTION.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ACTION);
	// Backend.dataFromNoteManageToDetailNote.BILL_ETC4.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_ETC4);
	// Backend.dataFromNoteManageToDetailNote.CASH_ORDER.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_ORDER);
	// Backend.dataFromNoteManageToDetailNote.MONEY_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY_GB);
	// Backend.dataFromNoteManageToDetailNote.EDITABLE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].EDITABLE);
	// Backend.dataFromNoteManageToDetailNote.BILL_BOJOGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_BOJOGB);
	// Backend.dataFromNoteManageToDetailNote.ESTI_CODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_CODE);
	// Backend.dataFromNoteManageToDetailNote.CRED_SEQ.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CRED_SEQ);
	// Backend.dataFromNoteManageToDetailNote.ESTI_NAME.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_NAME);
	// Backend.dataFromNoteManageToDetailNote.BOOK_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BOOK_GB);
	// Backend.dataFromNoteManageToDetailNote.BILL_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_IDX);
	// Backend.dataFromNoteManageToDetailNote.BILL_CANCELGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_CANCELGB);
	// Backend.dataFromNoteManageToDetailNote.BILL_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_GB);
	// Backend.dataFromNoteManageToDetailNote.MEMO_ADD.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MEMO_ADD);
	// Backend.dataFromNoteManageToDetailNote.ESTI_GB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_GB);
	// Backend.dataFromNoteManageToDetailNote.BILL_DATE0.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE0);
	// Backend.dataFromNoteManageToDetailNote.BILL_DATE1.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE1);
	// Backend.dataFromNoteManageToDetailNote.BILL_DATE4.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE4);
	// Backend.dataFromNoteManageToDetailNote.CASH_DATE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_DATE);
	// Backend.dataFromNoteManageToDetailNote.BILL_DATE2.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE2);
	// Backend.dataFromNoteManageToDetailNote.PURPOSE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].PURPOSE);
	// Backend.dataFromNoteManageToDetailNote.BILL_DATE3.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_DATE3);
	// Backend.dataFromNoteManageToDetailNote.GRID_NURIGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].GRID_NURIGB);
	// Backend.dataFromNoteManageToDetailNote.BILL_CLSS.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_CLSS);
	// Backend.dataFromNoteManageToDetailNote.CASH_MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_MEMO);
	// Backend.dataFromNoteManageToDetailNote.CHK.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CHK);
	// Backend.dataFromNoteManageToDetailNote.BILL_SUBCODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_SUBCODE);
	// Backend.dataFromNoteManageToDetailNote.BILL_NUMDETAIL.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_NUMDETAIL);
	// Backend.dataFromNoteManageToDetailNote.BILL_MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_MONEY);
	// Backend.dataFromNoteManageToDetailNote.GRID_BOJOGB.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].GRID_BOJOGB);
	// Backend.dataFromNoteManageToDetailNote.CONTENTS.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CONTENTS);
	// Backend.dataFromNoteManageToDetailNote.BCASH_MEMO.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BCASH_MEMO);
	// Backend.dataFromNoteManageToDetailNote.CASH_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].CASH_IDX);
	// Backend.dataFromNoteManageToDetailNote.ESTI_DISPLAY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_DISPLAY);
	// Backend.dataFromNoteManageToDetailNote.PREV_IDX.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].PREV_IDX);
	// Backend.dataFromNoteManageToDetailNote.MEMCODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MEMCODE);
	// Backend.dataFromNoteManageToDetailNote.BILL_RECEIPT.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_RECEIPT);
	// Backend.dataFromNoteManageToDetailNote.ESTI_PART.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_PART);
	// Backend.dataFromNoteManageToDetailNote.MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY);
	// Backend.dataFromNoteManageToDetailNote.REMAIN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].REMAIN);
	// Backend.dataFromNoteManageToDetailNote.ESTI_SUB_YN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].ESTI_SUB_YN);
	// Backend.dataFromNoteManageToDetailNote.BILL_KEEPCODE.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BILL_KEEPCODE);
	// Backend.dataFromNoteManageToDetailNote.MONEY_IN.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].MONEY_IN);
	// Backend.dataFromNoteManageToDetailNote.BCASH_MONEY.value = JSON.stringify(selectOnlineBCashListDatas._values[arg.data.index].BCASH_MONEY);

	// Backend.dataFromNoteManageToDetailNote.note_index.value = notes._values[arg.data.index].index;
	// Backend.dataFromNoteManageToDetailNote.note_CASH_DATE.value = notes._values[arg.data.index].CASH_DATE;
	// Backend.dataFromNoteManageToDetailNote.note_type.value = notes._values[arg.data.index].type;
	// Backend.dataFromNoteManageToDetailNote.note_typeColor.value = notes._values[arg.data.index].typeColor;
	// Backend.dataFromNoteManageToDetailNote.note_subTypeColor.value = notes._values[arg.data.index].subTypeColor;
	// Backend.dataFromNoteManageToDetailNote.note_BCASH_MONEY.value = notes._values[arg.data.index].BCASH_MONEY;
	// Backend.dataFromNoteManageToDetailNote.note_isBill.value = notes._values[arg.data.index].isBill;
	// Backend.dataFromNoteManageToDetailNote.note_subType.value = notes._values[arg.data.index].subType;
	// Backend.dataFromNoteManageToDetailNote.note_name.value  = notes._values[arg.data.index].name;
	// Backend.dataFromNoteManageToDetailNote.note_reverse.value = notes._values[arg.data.index].reverse;
	// Backend.dataFromNoteManageToDetailNote.note_isShow.value = notes._values[arg.data.index].isShow;
	// Backend.dataFromNoteManageToDetailNote.note_receipt.value = notes._values[arg.data.index].receipt;
	// Backend.dataFromNoteManageToDetailNote.note_BCASH_MEMO.value = notes._values[arg.data.index].BCASH_MEMO;



	Backend.subject.ESTI_CODE.clear();
	Backend.subject.name.value = "계정과목 선택";
    Backend.subject.isChoice.value = false;

  	// var infoJSON = 

  	console.log("	Backend.isItFromNoteMange.value  " + 	Backend.isItFromNoteManage.value);


	Backend.isItFromNoteManage.value = true;

	//2018.02.12 Start


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
	Backend.dataFromNoteManageToDetailNote.note_name.value = notes._values[arg.data.index].name;
	Backend.dataFromNoteManageToDetailNote.note_reverse.value = notes._values[arg.data.index].reverse;
	Backend.dataFromNoteManageToDetailNote.note_isShow.value = notes._values[arg.data.index].isShow;
	Backend.dataFromNoteManageToDetailNote.note_receipt.value = notes._values[arg.data.index].receipt;
	Backend.dataFromNoteManageToDetailNote.note_BCASH_MEMO.value = notes._values[arg.data.index].BCASH_MEMO;








	//2018.02.12 End



























	router.push("DetailNote");

















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
	year, month, years, stYearPos, months, stMonthPos, pickerOn, pickerUp, pickerDown, preClick, nextClick, pickerOn2, pickerOn3, pickerUp2, pickerDown2, selectedType, type, stTypePos, notes,
	goDetailNote1: function(arg) {
		Backend.subject.name.value = "계정과목 선택";
        Backend.subject.isChoice.value = false;
		router.push("DetailNote", "new");
	},goDetailNote2,
	getBillCashInputLoad, billCashInputDataList	,pickerUp3, pickerDown3, selectOnlineBCashList, selectedbillCashInputDataList, stBillCashPos,
	unRegisteredChecked, WhileInActive, noteManageLoadingCircleOn
};