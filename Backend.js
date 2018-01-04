var Observable = require('FuseJS/Observable');

//기본 도메인 주소 (운영) 개발할땐 주석처리
// var BASE_URL = "http://www.aseoul.co.kr";
//기본 도메인 주소 (개발) 운영으로 할땐 주석 처리
var BASE_URL = "http://112.218.172.44:52102";

//로그인 URL
var LOGIN_URL = "/common/loginSigned.do";
//NoteManage (전표관리에서 쓰이는 URL)
var selectOnlineBCashList_URL = "/acusr/acc/bil/selectOnlineBCashList.do";
var getBillCashInputLoad_URL ="/acusr/acc/bil/getBillCashInputLoad";

//DetailNote [전표관리상세보기에 쓰이는 URL]
var selectMobileOnlineBillList_URL = "/acusr/acc/bil/selectMobileOnlineBillList.do";




var subject = {
	isChoice: Observable(),
	color: Observable(),
	type: Observable(),
	name: Observable(),
	text: Observable(),
	ESTI_CODE: Observable(),
	ESTI_GB: Observable(),
	ESTI_SUBCODE: Observable()
};

var dsParam="";
var choiceSubjectList = Observable();




//NoteMangae에서 DetailNote로 넘기는 파람 값
var noteManageParamValuesForDetailNote = {
	index:Observable(),
	bill_idx: Observable(),
	cash_idx: Observable(),
	cash_idx2: Observable(),
	org_bcash_memo: Observable(),
	date:Observable(),
	type : Observable(),
	money : Observable(),
	subtype : Observable(),
	subtypecolor: Observable(),
	isBill : Observable(),
	name: Observable(),
	reverse: Observable(),
	receipt: Observable(),
	memo:Observable(),
	selected_data: Observable()
}

var CASH_INX = "";
var BILL_INX = "";


var testArray = {
	cash:Observable(),
	bill:Observable()
}











module.exports = {
	subject, dsParam, noteManageParamValuesForDetailNote, choiceSubjectList, 
	BASE_URL, LOGIN_URL, selectOnlineBCashList_URL, getBillCashInputLoad_URL,
	selectMobileOnlineBillList_URL, CASH_INX, BILL_INX, testArray
};