var Observable = require('FuseJS/Observable');

//기본 도메인 주소 (운영) 개발할땐 주석처리
// var BASE_URL = "http://www.aseoul.co.kr";
//기본 도메인 주소 (개발) 운영으로 할땐 주석 처리
// var BASE_URL = "http://112.218.172.44:52102";
var BASE_URL = "http://112.218.172.44:51442";
//로그인 URL
var LOGIN_URL = "/common/loginSigned.do";
//NoteManage (전표관리에서 쓰이는 URL)
var selectOnlineBCashList_URL = "/acusr/acc/bil/selectOnlineBCashList.do";
var getBillCashInputLoad_URL ="/acusr/acc/bil/getBillCashInputLoad.do";
//DetailNote [전표관리상세보기에 쓰이는 URL]
var selectMobileOnlineBillList_URL = "/acusr/acc/bil/selectMobileOnlineBillList.do";
var updatebCashMobile_URL = "/acusr/acc/bil/updatebCashMobile.do";
var deleteMobileBillList_URL = "/acusr/acc/bil/deleteMobileBillList.do"
//Notice [공지사항 URL]
var notiUserMipList_URL = "/acusr/cmt/notiUserMipList.do";
var noticeUserMipDetailList_URL = "/acusr/cmt/noticeUserMipDetailList.do";
//QnA [질의응답 URL]
var qnaList_URL = "/acusr/cmt/qnaList.do";
var qnaListDtl_URL = "/acusr/cmt/qnaListDtl.do"
var qnaUserUpdate_URL = "/acusr/cmt/qnaUserUpdate.do"
var insertQnaCommList_URL = "/acusr/cmt/insertQnaCommList.do";
//ApplyEdu [교육신청]
var educationMain_URL = "/mobile/education/main.do";
var eduapply_URL = "/mobile/education/eduapply.do"
//PhotoCollection [증빙자료모음]
var getMobileRciptList_URL = "/acusr/acc/bil/getMobileRciptList.do";
var mImgView_URL = "/acusr/acc/bil/mImgView.do?";
var deleteMapngReceipt_URL = "/acusr/acc/bil/DeleteMapngReceipt.do"
//ChoiceSubject [계정과목 선택]
var getEstiSearchLoad_URL = "/acusr/acc/bil/getEstiSearchLoad.do";

//공무송수신함
var offDocTransList_URL = "/acadm/offDocMng/offDocTransList.do"



//업무연락 [받은업무함 전체리스트 및 Search URL]
var selectBusiReceiveAdminList_URL = "/acadm/cmt/selectBusiReceiveAdminList.do";


//업무연락 [보낸업무함 전체리스트 및 Search URL]
var selectBusiSendAdminList_URL = "/acadm/cmt/selectBusiSendAdminList.do";


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

var AndroidLicenseKey = "ikdt8CleK1HVv3Qa0temFA==";
var iOSLicenseKey = "zfUVW8JVY6SCgx9TLS9xNQ==";








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

var dataFromNoteManageToDetailNote = {
	INDEX:Observable(),
	SUBJECT:Observable(),
	BILL_NURIGB:Observable(),
	BIGO:Observable(),
	CASH_IDX2:Observable(),
	GUBUN:Observable(),
	CASH_GB:Observable(),
	BILL_NUM:Observable(),
	BCASH_IDX:Observable(),
	BILL_DATE:Observable(),
	CASH_PLACE:Observable(),
	ESTI_SUB_NM:Observable(),
	SUM_MONEY:Observable(),
	BILL_INPROGRAM:Observable(),
	BILL_ETC1:Observable(),
	MEMO:Observable(),
	BILL_ETC2:Observable(),
	BILL_ETC3:Observable(),
	ORG_BCASH_MEMO:Observable(),
	MONEY_OUT:Observable(),
	FIRMNAME:Observable(),
	ACTION:Observable(),
	BILL_ETC4:Observable(),
	CASH_ORDER:Observable(),
	MONEY_GB:Observable(),
	EDITABLE:Observable(),
	BILL_BOJOGB:Observable(),
	ESTI_CODE:Observable(),
	CRED_SEQ:Observable(),
	ESTI_NAME:Observable(),
	BOOK_GB:Observable(),
	BILL_IDX:Observable(),
	BILL_CANCELGB:Observable(),
	BILL_GB:Observable(),
	MEMO_ADD:Observable(),
	ESTI_GB:Observable(),
	BILL_DATE0:Observable(),
	BILL_DATE1:Observable(),
	BILL_DATE4:Observable(),
	CASH_DATE:Observable(),
	BILL_DATE2:Observable(),
	PURPOSE:Observable(),
	BILL_DATE3:Observable(),
	GRID_NURIGB:Observable(),
	BILL_CLSS:Observable(),
	CASH_MEMO:Observable(),
	CHK:Observable(),
	BILL_SUBCODE:Observable(),
	BILL_NUMDETAIL:Observable(),
	BILL_MONEY:Observable(),
	GRID_BOJOGB:Observable(),
	CONTENTS:Observable(),
	BCASH_MEMO:Observable(),
	CASH_IDX:Observable(),
	ESTI_DISPLAY:Observable(),
	PREV_IDX:Observable(),
	MEMCODE:Observable(),
	BILL_RECEIPT:Observable(),
	ESTI_PART:Observable(),
	MONEY:Observable(),
	REMAIN:Observable(),
	ESTI_SUB_YN:Observable(),
	BILL_KEEPCODE:Observable(),
	MONEY_IN:Observable(),
	BCASH_MONEY:Observable(),
	note_index:Observable(),
	note_CASH_DATE:Observable(),
	note_type:Observable(),
	note_typeColor:Observable(),
	note_subTypeColor:Observable(),
	note_BCASH_MONEY:Observable(),
	note_isBill:Observable(),
	note_subType:Observable(),
	note_name:Observable(),
	note_reverse:Observable(),
	note_isShow:Observable(),
	note_receipt:Observable(),
	note_BCASH_MEMO:Observable()

}

var dataFromChoiceSubjectToDetailNote = {
	type:Observable(),
	text:Observable(),
	name:Observable(),
	ESTI_CODE:Observable(),
	ESTI_GB:Observable(),
	ESTI_SUBCODE:Observable(),
	ESTI_SUB_YN:Observable()
}

module.exports = {
	subject, dsParam, noteManageParamValuesForDetailNote, choiceSubjectList, 
	BASE_URL, LOGIN_URL, selectOnlineBCashList_URL, updatebCashMobile_URL, deleteMobileBillList_URL,
	getBillCashInputLoad_URL, selectMobileOnlineBillList_URL, dataFromNoteManageToDetailNote,notiUserMipList_URL,
	noticeUserMipDetailList_URL, qnaList_URL, qnaListDtl_URL,qnaUserUpdate_URL, insertQnaCommList_URL,
	dataFromChoiceSubjectToDetailNote, educationMain_URL, eduapply_URL, getMobileRciptList_URL,mImgView_URL, deleteMapngReceipt_URL,
	getEstiSearchLoad_URL, AndroidLicenseKey, iOSLicenseKey, offDocTransList_URL, selectBusiReceiveAdminList_URL, selectBusiSendAdminList_URL
};