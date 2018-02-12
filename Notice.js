var Observable = require('FuseJS/Observable');
var Backend = require('Backend.js');
var FileDownload = require('FileDownloadUX');

var type = Observable("제목", "내용");
var selectedType = Observable("제목");

pickerOn = Observable(false);

function pickerUp() {
	pickerOn.value = true;
}

function pickerDown() {
	pickerOn.value = false;
}

function selectedTypes(){
	searchText.clear();
	selectedType.value = "제목";
}

function pageCountInit(){
	pageCount.value = 1;
}

var notices = Observable();
var noticeDetail = Observable();
var noticeFiles = Observable();

var pageCount = Observable(1);
var totalPage = Observable();

var searchText = Observable();

var globalSearch ;

var dsParam = Backend.dsParam;

// function totalCount(count){
// 	if(count.CNT!=null){
// 		this.totalPage = count.CNT;
// 	}else{
// 		this.totalPage = "";
// 	}
// }

//http://www.aseoul.co.kr 외부
//http://192.168.10.210 내부


var AREA = JSON.parse(Backend.dsParam).GVAREACODE;
var commClss = "N";
var fCombo = "ALL";




var notiUserMipListUrl = Backend.BASE_URL + Backend.notiUserMipList_URL;
var noticeUserMipDetailListUrl = Backend.BASE_URL + Backend.noticeUserMipDetailList_URL;

function searchContent(page){
	//조회시 AREA 값은 GVAREACODE 값과 동일 하다. 나중에 서버에서 데이터 받아올 경우 그렇게 세팅 해야 한다.
	pageCount.value = 1;
	var sCombo = "";
	if(selectedType.value=="제목"){
		sCombo = "head";
	}else if (selectedType.value=="내용"){
		sCombo = "main";
	}

	if(searchText.value == null || searchText.value == ""){
		searchText.value = "";
		sCombo = "head";
	}

	notices.clear();

	// var dsParam = '{"GVAREACODE":"11110","GVBOOKGB":"01","GVESTIYEAR" :"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID":"9999990","GVORGCLSS":"5","GVUSERCLSS" :"3"}';

	// var AREA = "11110";
	
	// var fCombo = "ALL";
	var page = "1";


	var dsSearch = '{"AREA":"'+AREA+'","commClss":"'+commClss+'","fCombo":"'+fCombo+'","page":"'+page+'","sch_txt":"'+searchText.value+'","sCombo":"'+sCombo+'"}';
	console.log("===========================================");
	console.log("searchContent ds Search : " + dsSearch);

	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	fetch(notiUserMipListUrl, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(jsonParam)
	        }).then(function(response) {
				var searchResponseData = JSON.stringify(response);
				// console.log("2017.12.21 response : "+ JSON.stringify(response));
				var searchResponseBody = JSON.parse(response._bodyInit);
				console.log("earchResponseBody : "+ JSON.stringify(searchResponseBody));
				// console.log("=================================================================");
				var searchResponseList = searchResponseBody.ds_comm_list[1];
				console.log("searchResponseList : "+ JSON.stringify(searchResponseList));

				// console.log("==============================");
				console.log("searchResponseList.length : "+ searchResponseList.length);
				

				console.log(notices.value);

				for (var i = 0; i < searchResponseList.length; i++) {
					console.log("searchResponseList i : "+ JSON.stringify(searchResponseList[i]));
					notices.add(new noticeList(searchResponseList[i]));
				}

				console.log("notices : " + JSON.stringify(notices.value));

				// 첫 호출 시 에러나면 여길 잘봐야 한다. 객체 형태로 안가져오고 무조건 하나만 가져온다고 생각하여 아래와 같이 소스 구성
				var count = searchResponseBody.ds_cnt[1];
				//들어오는 개수 계산하여 총 페이지 수 도출
				var objCount = parseInt(count[0].CNT);
				var preCnt = parseInt(objCount/5)
				var nextCnt = parseInt(objCount%5)
				if(nextCnt>0){
					preCnt = preCnt +1;
				}
				totalPage.value = preCnt;
				console.log("totalPage : " + JSON.stringify(totalPage.value));

				// searchText.clear();

	            return response.json();
	        }).then(function(jsonData) {
	            var data = jsonData.results[0];
	        }).catch(function(err) {

	        });
}
//noticeList null체크
function noticeList(notice){
	if(notice.SITE_CLSS_SND!=null){
		this.siteClassSnd = notice.SITE_CLSS_SND;
	}else{
		this.siteClassSnd = "";
	}

	if(notice.COMM_CLSS!=null){
		this.commClss = notice.COMM_CLSS;
	}else{
		this.commClss = "";
	}

	if(notice.IDX!=null){
		this.idx = notice.IDX;
	}else{
		this.idx = "";
	}

	if(notice.INQ_USR_CNT!=null){
		this.inqUsrCnt = notice.INQ_USR_CNT;
	}else{
		this.inqUsrCnt = "";
	}

	if(notice.REGDATE!=null){
		this.regDate = notice.REGDATE;
	}else{
		this.regDate = "";
	}

	if(notice.REGDATE1!=null){
		this.regDate1 = notice.REGDATE1;
	}else{
		this.regDate1 = "";
	}

	if(notice.REGDATE2!=null){
		this.regDate2 = notice.REGDATE2;
	}else{
		this.regDate2 = "";
	}
	
	if(notice.WRITER_NM!=null){
		this.writerNm = notice.WRITER_NM;
	}else{
		this.wirterNm = "";
	}
		
	if(notice.PRJ_ORG_NM!=null){
		this.prjOrgNm = notice.PRJ_ORG_NM;
	}else{
		this.prjOrgNm = "";
	}

	if(notice.COMM_SEQ!=null){
		this.commSeq = notice.COMM_SEQ;
	}else{
		this.commSeq = "";
	}

	if(notice.FILE_NM!=null && notice.FILE_NM!=""){
		if(notice.FILE_NM=="N"){
		this.fileNm = false;
		}else{
		this.fileNm = true;
		}
	}else{
		this.fileNm = false;
	}

	if(notice.WRITER_ORG!=null){
		this.writerOrg = notice.WRITER_ORG;
	}else{
		this.writerOrg = "";
	}
	
	if(notice.TITLE!=null){
		this.title = (notice.TITLE).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
	}else{
		this.title = "";
	}
}

//http://www.aseoul.co.kr 외부
//http://192.168.10.210 내부
//공지사항 첫페이지 호출
function getNoticeListValue(){
	console.log("function Call ");
	// var dsParam = '{"GVAREACODE":"11110","GVBOOKGB":"01","GVESTIYEAR" :"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID":"9999990","GVORGCLSS":"5","GVUSERCLSS" :"3"}';
	// var AREA = "11110";
	// var commClss = "N";
	// var fCombo = "ALL";
	notices.clear();
	var page = "1";
	var sCombo = "head";
	var dsSearch = '{"AREA":"'+AREA+'","commClss":"'+commClss+'","fCombo":"'+fCombo+'","page":"'+page+'","sch_txt":"","sCombo":"'+sCombo+'"}';
	globalSearch = JSON.parse(dsSearch);
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');

	
	

	fetch(notiUserMipListUrl, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(jsonParam)
	        }).then(function(response) {
				var responseData = JSON.stringify(response);

				var responseBody = JSON.parse(response._bodyInit);
				// console.log("2017.12.21 responseBody : "+ JSON.stringify(responseBody));
				// console.log("=================================================================");
				var responseList = responseBody.ds_comm_list[1];
				// console.log("2017.12.21 responseList : "+ JSON.stringify(responseList));

				// console.log("==============================");
				// console.log("responseList.length : "+ responseList.length);
				// 무조건 본래 있는 곳으로 돌아올시 초기
				
				for (var i = 0; i < responseList.length; i++) {
					notices.add(new noticeList(responseList[i]));
				}

				// 첫 호출 시 에러나면 여길 잘봐야 한다. 객체 형태로 안가져오고 무조건 하나만 가져온다고 생각하여 아래와 같이 소스 구성
				var count = responseBody.ds_cnt[1];
				//들어오는 개수 계산하여 총 페이지 수 도ㅊ
				var objCount = parseInt(count[0].CNT);
				var preCnt = parseInt(objCount/5)
				var nextCnt = parseInt(objCount%5)
				if(nextCnt>0){
					preCnt = preCnt +1;
				}
				totalPage.value = preCnt;
				console.log("totalPage : " + JSON.stringify(totalPage.value));

	            return response.json();
	        }).then(function(jsonData) {
	            var data = jsonData.results[0];
	        }).catch(function(err) {

	        });
}

function nextPage(){
	console.log("nextPage");
	if(pageCount.value == totalPage.value){
		console.log("최대 페이지까지 생성되었습니다.");
	}else{
	pageCount.value = pageCount.value + 1;
	getNoticeNextPage(pageCount);
	}
}

//http://www.aseoul.co.kr 외부
//http://192.168.10.210 내부
// 다음 페이지 호출을 위한 함수
function getNoticeNextPage(page){
	var sCombo;
	if(selectedType.value=="제목"){
		sCombo = "head";
	}else if (selectedType.value=="내용"){
		sCombo = "main";
	}

	if(searchText.value==null){
		searchText.value = "";
		sCombo = "head";
	}


	// var AREA = "11110";
	// var commClss = "N";

	console.log("function Call ");
	// var dsParam = '{"GVAREACODE":"11110","GVBOOKGB":"01","GVESTIYEAR" :"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID":"9999990","GVORGCLSS":"5","GVUSERCLSS" :"3"}';
	var dsSearch = '{"AREA":"'+AREA+'","commClss":"'+commClss+'","fCombo":"'+fCombo+'","page":"'+page.value+'","sch_txt":"'+searchText.value+'","sCombo":"'+sCombo+'"}';
	// console.log("nextPage : " + dsSearch);
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	

	fetch(notiUserMipListUrl, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(jsonParam)
	        }).then(function(response) {
				var responseData = JSON.stringify(response);

				var responseBody = JSON.parse(response._bodyInit);
				console.log("2017.12.21 responseBody : "+ JSON.stringify(responseBody));
				// console.log("=================================================================");
				var responseList = responseBody.ds_comm_list[1];
				console.log("2017.12.21 responseList : "+ JSON.stringify(responseList));

				// console.log("==============================");
				// console.log("responseList.length : "+ responseList.length);

				for (var i = 0; i < responseList.length; i++) {
					notices.add(new noticeList(responseList[i]));
					// console.log("==============================");
					// console.log("res : " + responseList[i].REGDATE);
					// console.log("==============================");
					// console.log("notices : " + JSON.stringify(notices.value));
				}
	            return response.json();
	        }).then(function(jsonData) {
	            var data = jsonData.results[0];
	        }).catch(function(err) {

	        });
}

// 리스트 클릭시 호출 함수
function getClickListValue(value){
	console.log("getClickListValue was clicked");

	var noticeData = value.data;
	console.log("noticeData : "+JSON.stringify(noticeData));
	getNoticeDetailValue(noticeData);
}

//세부사항 null Check
function noticeDetailList(detail){

	if(detail.COMM_CLSS!=null){
		this.commClss = detail.COMM_CLSS;
	}else{
		this.commClss = "";			
	}

	if(detail.INQ_USR_CNT!=null){
		this.inqUsrCnt = detail.INQ_USR_CNT;
	}else{
		this.inqUsrCnt = "";
	}
	if(detail.REGDATE!=null){
		this.regDate = detail.REGDATE;
	}else{
		this.regDate = "";
	}

	if(detail.REGDATE1!=null){
		this.regDate1 = detail.REGDATE1;
	}else{
		this.regDate1 = "";
	}

	if(detail.REGDATE2!=null){
		this.regDate2 = detail.REGDATE2;
	}else{
		this.regDate2 = "";
	}

	if(detail.WRITER_NM!=null){
		this.writerNm = detail.WRITER_NM;
	}else{
		this.wirterNm = "";
	}
	if(detail.PRJ_ORG_NM!=null){
		this.prjOrgNm = detail.PRJ_ORG_NM;
	}else{
		this.prjOrgNm = "";
	}

	if(detail.CONT!=null){
		this.cont = (detail.CONT).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
		this.cont = this.cont.replace(/&nbsp;/g, '');
	}else{
		this.cont = "";
	}

	if(detail.COMM_SEQ!=null){
	this.commSeq = detail.COMM_SEQ;
	}else{
		this.commSeq = "";
	}

	if(detail.WRITER_ORG!=null){
	this.writerOrg = detail.WRITER_ORG;
	}else{
		this.writerOrg = "";
	}

	if(detail.TITLE!=null){
	this.title = (detail.TITLE).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
	}else{
		this.title = "";
	}
	console.log("detail 생성 완료!");
}
//fileList null Check
function noticeFileList(fileList){

	console.log("fileList.FILE_STORE_DIR : " + fileList.FILE_STORE_DIR);
	if(fileList.FILE_STORE_DIR!=null){
		this.fileStoreDir = fileList.FILE_STORE_DIR;
	}else{
		this.fileStoreDir = "";
	}

	console.log("fileList.COMM_CLSS : " + fileList.COMM_CLSS);
	if(fileList.COMM_CLSS!=null){
		this.commClss = fileList.COMM_CLSS;
	}else{
		this.commClss = "";
	}

	console.log("fileList.COMM_SEQ : " + fileList.COMM_SEQ);
	if(fileList.COMM_SEQ!=null){
		this.commSeq = fileList.COMM_SEQ;
	}else{
		this.commSeq = "";
	}

	console.log("fileList.FILE_NM : " + fileList.FILE_NM);
	if(fileList.FILE_NM!=null){
		this.hasFile = true;
		this.fileNm = fileList.FILE_NM;
	}else{
		this.hasFile = false;
		this.fileNm = "";
	}

	console.log("this.hasFile : " + this.hasFile);
	console.log("this.fileNm : " + this.fileNm);

	if(fileList.FILE_BLOB!=null){
		this.fileBlob = fileList.FILE_BLOB;
	}else{
		this.fileBlob = "";
	}

	if(fileList.FILE_STORE_NM!=null){
		this.fileStoreNm = fileList.FILE_STORE_NM;
	}else{
		this.fileStoreNm = "";
	}

	if(fileList.FILE_SIZE!=null){
		this.fileSize = fileList.FILE_SIZE;
	}else{
		this.fileSize = "";
	}

	if(fileList.FILE_SEQ!=null){
		this.fileSeq = fileList.FILE_SEQ;
	}else{
		this.fileSeq = "";
	}
	console.log("파일 생성 완료!");
}

//http://www.aseoul.co.kr 외부
//http://192.168.10.210 내부
//세부사항 첨부파일 호출 
function getNoticeDetailValue(noticeData){
	console.log("넘어온 idx 값 : "+JSON.stringify(noticeData.idx));
	console.log("getNoticeDetailValue was called");
	console.log("DetailValue function Call ");
	// var dsParam = '{"GVAREACODE":"11110","GVBOOKGB":"01","GVESTIYEAR" :"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID":"9999990","GVORGCLSS":"5","GVUSERCLSS" :"3"}';


	var commClss = "";
	var commSeq = "";
	var fCombo = "";
	var prjOrgNm = "";
	var sch_txt = "";
	var sCombo = "";

	if (noticeData.commClss !=null) {
		commClss = noticeData.commClss;
	}  else {
		commClss = "";
	}
	
	if (noticeData.commSeq !=null) {
		commSeq = noticeData.commSeq;
	}  else {
		commSeq = "";
	}
	
	if (globalSearch.fCombo !=null) {
		fCombo = globalSearch.fCombo;
	}  else {
		fCombo = "";
	}

	if (noticeData.prjOrgNm !=null) {
		prjOrgNm = noticeData.prjOrgNm;
	}  else {
		prjOrgNm = "";
	}

	if (globalSearch.sch_txt !=null) {
		sch_txt = globalSearch.sch_txt;
	}  else {
		sch_txt = "";
	}

	if (globalSearch.sCombo !=null) {
		sCombo = globalSearch.sCombo;
	}  else {
		sCombo = "";
	}

	if(globalSearch!=null){
		var dsSearch = '{"commClss":"'+commClss
						+'","commSeq":"'+commSeq
						+'","fCombo":"'+fCombo
						+'","prjOrgNm":"'+prjOrgNm
						+'","sch_txt":"'+sch_txt
						+'","sCombo":"'+sCombo+'"}';
	}else{
		var dsSearch = '{}';
	}
	console.log("dsSearch : " + dsSearch);
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');

	noticeFiles.clear();

	fetch(noticeUserMipDetailListUrl, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(jsonParam)
	        }).then(function(response) {

				var responseData = JSON.stringify(response);
				// console.log("2017.12.21 responseBody : "+ JSON.stringify(responseData));
				var responseBody = JSON.parse(response._bodyInit);
				console.log("2017.12.21 responseBody : "+ JSON.stringify(responseBody));
				// console.log("=================================================================");
				var responseDetail = responseBody.ds_comm_dtl[1];
				console.log("2017.12.21 responseList : "+ JSON.stringify(responseDetail));

				console.log("==============================");
				// console.log("responseList.length : "+ responseDetail.length);

				// noticeDetail = null;


				noticeDetail.clear();

				for (var i = 0; i < responseDetail.length; i++) {
					noticeDetail.add(new noticeDetailList(responseDetail[i]));
				}

				console.log("noticeDetail : " + JSON.stringify(noticeDetail.value));


				// noticeFiles = Observable();

				var responseFileList = responseBody.ds_filelist[1];

				console.log(JSON.stringify(responseFileList));

				if (responseFileList.length == 0) {
					noticeFiles.add(new noticeFileList(responseFileList[0]));
				} else {
					for(var i = 0; i< responseFileList.length; i++){
						noticeFiles.add(new noticeFileList(responseFileList[i]));
					}	
				}


				
				console.log("noticeFiles.value : "  + JSON.stringify(noticeFiles.value));

	            return response.json();
	        }).then(function(jsonData) {
	            // var data = jsonData.results[0];
	        }).catch(function(err) {

	        });
}



function downloadFile(args) {
	console.log("downloadFile was clicked");

	console.log("args : " + JSON.stringify(args));

	var COMM_CLSS = args.data.commClss;

	var COMM_SEQ = args.data.commSeq;

	var FILE_SEQ=args.data.fileSeq;



	var url = Backend.BASE_URL + "/common/mobileBlobFileDown.do?";

	url = url + "COMM_CLSS=" + COMM_CLSS+"&COMM_SEQ=" + COMM_SEQ + "&FILE_SEQ=" +FILE_SEQ;
	// FileDownload.documentDownload("http://smart.knou.ac.kr/fileDownServlet?rFileName=*EB*93*B1*EB*A1*9D*EA*B3*B5*EA*B3*A0.hwp&sFileName=COMF_1801150957376e680017.hwp&filePath=/business/board/BOAD_130926103441595d0000/");

	FileDownload.documentDownload(url);

}
module.exports = {
	type, selectedType, pickerOn, pickerUp, 
	pickerDown, getNoticeListValue, notices, noticeDetail, noticeFiles,getClickListValue, pageCount, totalPage, 
	nextPage,searchText, searchContent, selectedTypes, pageCountInit,downloadFile
};