var Observable = require('FuseJS/Observable');
var Backend = require('Backend.js');

var years = Observable();
for (var i = 0 ; i < 30 ; i++) {
	years.add(2010+i);
}

var months = Observable();
for (var i = 0 ; i < 12 ; i++) {
	months.add(1+i);
}

var days = Observable();
for (var i = 0 ; i < 32 ; i++) {
	days.add(1+i);
}

var receiveFromPickerPanelOn = Observable(false);
var fromDate = {
	year: Observable(2017),
	month: Observable(01),
	day: Observable(01)
};

function receiveFromPickerUp() {
	receiveFromPickerPanelOn.value = true;
}

function receiveFromPickerDown() {
	receiveFromPickerPanelOn.value = false;
}

var receiveToPickerPanelOn = Observable(false);
var toDate = {
	year: Observable(2018),
	month: Observable(01),
	day: Observable(11)
};

function receiveToPickerUp() {
	receiveToPickerPanelOn.value = true;
}
function receiveToPickerDown() {
	receiveToPickerPanelOn.value = false;
}

var type = Observable("제목", "내용", "보낸사람");
var selectedType = Observable("제목");

pickerOn = Observable(false);

function pickerUp() {
	pickerOn.value = true;
}

function pickerDown() {
	pickerOn.value = false;

	console.log("selectedType : " + selectedType.value);

	var temp = "";
	if (selectedType.value =="제목") {
		temp = "TITLE";
	} else if (selectedType.value == "내용") {
		temp = "CONT";
	} else if (selectedType.value == "보낸사람") {
		temp = "WRITER_NM";
	}

	console.log("temp : " +  temp);

}

var searchText = Observable();

function selectedTypes(){
	searchText.clear();
	selectedType.value = "제목";
}

var receiveWorks = Observable();
// for (var i = 0 ; i < 5 ; i++) {
// 	receiveWorks.add({
// 		sender: "노성순",
// 		title: "업무연락 부탁드립니다.",
// 		regDate1: "오후 06:46",
// 		regDate2: "2018-01-01"
// 	});
// }

var receiveworkDetail = Observable();
receiveworkDetail.add({
	title: "업무연락 부탁드립니다.",
	sender: "노성순",
	regDate1: "18:46:21",
	regDate2: "2018-01-01",
	cont: "테스트입니다."
});

var commClss = "";
function initReceiveList() {
	selectedTypes();

	commClss = "D";
	var srch_Type = "";
	var srch_Text = "";

	getReceivedMessageList(srch_Type, srch_Text);
}

var receiveMessages = Observable();

function receivedMessage (args, index) {
	this.INDEX = index
	if (args.REGID !=null) {
		this.REGID = args.REGID	
	} else {
		this.REGID = "";
	}
	

	if (args.INFO_CONF_DATE !=null) {
		this.INFO_CONF_DATE = args.INFO_CONF_DATE	
	} else {
		this.INFO_CONF_DATE = "";
	}


	if (args.SITE_CLSS_SND !=null) {
		this.SITE_CLSS_SND = args.SITE_CLSS_SND	
	} else {
		this.SITE_CLSS_SND = "";
	}


	if (args.REPLY_DEPTH !=null) {
		this.REPLY_DEPTH = args.REPLY_DEPTH	
	} else {
		this.REPLY_DEPTH = "";
	}

	if (args.REGDATE !=null) {
		this.REGDATE = args.REGDATE	
	} else {
		this.REGDATE = "";
	}

	if (args.WRITER_NM !=null) {
		this.WRITER_NM = args.WRITER_NM	
	} else {
		this.WRITER_NM = "";
	}

	if (args.BOD_COM_YN !=null) {
		this.BOD_COM_YN = args.BOD_COM_YN	
	} else {
		this.BOD_COM_YN = "";
	}

	if (args.CHK !=null) {
		this.CHK = args.CHK	
	} else {
		this.CHK = "";
	}

	if (args.COMM_SEQ !=null) {
		this.COMM_SEQ = args.COMM_SEQ	
	} else {
		this.COMM_SEQ = "";
	}

	if (args.WRITER_ORG !=null) {
		this.WRITER_ORG = args.WRITER_ORG	
	} else {
		this.WRITER_ORG = "";
	}

	if (args.BOD_FORM_CLSS !=null) {
		this.BOD_FORM_CLSS = args.BOD_FORM_CLSS	
	} else {
		this.REGID = "";
	}

	if (args.TITLE !=null) {
		this.TITLE = (args.TITLE).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
	} else {
		this.TITLE = "";
	}
}

var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
var dsParam = Backend.dsParam;

function searchContent () {

	var srchType = "";
	// if (selectedType.value ="제목") {
	// 	srchType = "TITLE";
	// } else if (selectedType.value = "내용") {
	// 	srchType = "CONT";
	// } else if (selectedType.value= "보낸사람") {
	// 	srchType = "WRITER_NM";
	// }



var srchType = "";
	if (selectedType.value =="제목") {
		srchType = "TITLE";
	} else if (selectedType.value == "내용") {
		srchType = "CONT";
	} else if (selectedType.value == "보낸사람") {
		srchType = "WRITER_NM";
	}


	console.log("selectedType.value : " + selectedType.value);

	var srchText = searchText.value;
	
	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","INFO_CDHD_NO":"'+INFO_CDHD_NO+'"}';


	console.log("dsSearch : " + dsSearch);

	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var selectBusiReceiveAdminList_URL = Backend.BASE_URL + Backend.selectBusiReceiveAdminList_URL;

	receiveWorks.clear();

	fetch(selectBusiReceiveAdminList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
        	console.log(JSON.stringify(response));
			var bodyInit = JSON.parse(response._bodyInit);
			var messageList = bodyInit.ds_CommList[1];
			for (var i = 0; i < messageList.length; i++) {
				receiveWorks.add(new receivedMessage(messageList[i], i)); 
			}
			console.log("receiveMessages FROM SEARCH CONTENT: " + JSON.stringify(receiveWorks));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
}



function getReceivedMessageList(srch_Type, srch_Text) {
	// var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
	var srchType = srch_Type;
	var srchText = srch_Text;
	
	var dsSearch = '{"commClss":"'+commClss+'","srchType":"'+srchType+'","srchText":"'+srchText+'","INFO_CDHD_NO":"'+INFO_CDHD_NO+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var selectBusiReceiveAdminList_URL = Backend.BASE_URL + Backend.selectBusiReceiveAdminList_URL;

	receiveWorks.clear();

	fetch(selectBusiReceiveAdminList_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var bodyInit = JSON.parse(response._bodyInit);
			var messageList = bodyInit.ds_CommList[1];
			for (var i = 0; i < messageList.length; i++) {
				receiveWorks.add(new receivedMessage(messageList[i], i)); 
			}
			console.log("receiveMessages : " + JSON.stringify(receiveWorks));
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
}


var detailReceivedWorks = Observable();
var detailReceivedWorkVariable = null;

function detailReceiveWork (args, index) {

	this.INDEX = index;

	if (args.INFO_CONF_DATE != null) {
		this.INFO_CONF_DATE = args.INFO_CONF_DATE;	
	} else {
		this.INFO_CONF_DATE = "";	
	}
	
	if (args.REPLY_DEPTH != null) {
		this.REPLY_DEPTH = args.REPLY_DEPTH;	
	} else {
		this.REPLY_DEPTH = "";	
	}

	if (args.REGDATE != null) {
		this.REGDATE = args.REGDATE;	
	} else {
		this.REGDATE = "";	
	}

	if (args.WRITER_NM != null) {
		this.WRITER_NM = args.WRITER_NM;	
	} else {
		this.WRITER_NM = "";	
	}

	if (args.BOD_COM_YN != null) {
		this.BOD_COM_YN = args.BOD_COM_YN;	
	} else {
		this.BOD_COM_YN = "";	
	}

	if (args.CONT != null) {
		this.CONT = (args.CONT).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");;	
	} else {
		this.CONT = "";	
	}

	if (args.COMM_SEQ != null) {
		this.COMM_SEQ = args.COMM_SEQ;	
	} else {
		this.COMM_SEQ = "";	
	}

	if (args.REPLY_REF != null) {
		this.REPLY_REF = args.REPLY_REF;	
	} else {
		this.REPLY_REF = "";	
	}

	if (args.WRITER_ORG != null) {
		this.WRITER_ORG = args.WRITER_ORG;	
	} else {
		this.WRITER_ORG = "";	
	}

	if (args.BOD_FORM_CLSS != null) {
		this.BOD_FORM_CLSS = args.BOD_FORM_CLSS;	
	} else {
		this.BOD_FORM_CLSS = "";	
	}

	if (args.REPLY_REF_SEQ != null) {
		this.REPLY_REF_SEQ = args.REPLY_REF_SEQ;	
	} else {
		this.REPLY_REF_SEQ = "";	
	}

	if (args.TITLE != null) {
		this.TITLE = (args.TITLE).replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");

	} else {
		this.TITLE = "";	
	}
}

function goToDetailReceiveWork (args) {
	console.log("goToDetailReceiveWork was called");
	detailReceivedWorks.clear();
	detailReceivedWorkVariable = null;
	console.log("args : " + JSON.stringify(args));

	console.log(" args.data.COMM_SEQ : "+ args.data.COMM_SEQ);
	console.log(" args.data.REGID : "+ args.data.REGID);
	console.log(" args.data.BOD_FORM_CLSS : "+ args.data.BOD_FORM_CLSS);

	var COMM_SEQ = null;
	var INFO_CONF_DATE = null;
	// var INFO_CDHD_NO = JSON.parse(Backend.dsParam).GVMEMID;
	if (args.data.COMM_SEQ !=null) {
		COMM_SEQ = args.data.COMM_SEQ;
	}else {
		COMM_SEQ = "";
	}
	

	if (args.data.INFO_CONF_DATE !=null) {
		INFO_CONF_DATE = args.data.INFO_CONF_DATE;
	}else {
		INFO_CONF_DATE = "";
	}


	console.log("commClss : " +commClss);
	console.log("COMM_SEQ : " +COMM_SEQ);
	console.log("INFO_CONF_DATE : " +INFO_CONF_DATE);
	console.log("INFO_CDHD_NO : " +INFO_CDHD_NO);


	var dsSearch = '{"commClss":"'+commClss
				+'","commSeq":"'+COMM_SEQ
				+'","INFO_CONF_DATE":"'+INFO_CONF_DATE
				+'","INFO_CDHD_NO":"'+INFO_CDHD_NO
				+'"}';

	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');

	var searchBusiReceiveAdmDtl_URL = Backend.BASE_URL + Backend.searchBusiReceiveAdmDtl_URL;

	fetch(searchBusiReceiveAdmDtl_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
        	// console.log("response : " + JSON.stringify(response));

			var bodyInit = JSON.parse(response._bodyInit);
			var messageList = bodyInit.ds_CommList[1];

			console.log("messageList : " + JSON.stringify(messageList));

			for (var i = 0; i < messageList.length; i++) {
				console.log("MessageList.length : " + messageList.length);
				console.log("MessageList[" + i +"] : " + messageList[i]);

				detailReceivedWorkVariable = new detailReceiveWork(messageList[i], i); 
				detailReceivedWorks.add(new detailReceiveWork(messageList[i], i));
				// detailReceivedWorks.add("This is : " + i);


				console.log("=========================================================================");			
			}

			// detailReceivedWorkVariable = new selectedDetailNote(detailReceivedWorks._values[args.data.index]);
			console.log("detailReceivedWorkVariable.INFO_CONF_DATE : " + detailReceivedWorkVariable.INFO_CONF_DATE);
			console.log("detailReceivedWorkVariable.WRITER_NM : " + detailReceivedWorkVariable.WRITER_NM);
			console.log("detailReceivedWorkVariable.COMM_SEQ : " + detailReceivedWorkVariable.COMM_SEQ);
			console.log("detailReceivedWorkVariable.BOD_FORM_CLSS : " + detailReceivedWorkVariable.BOD_FORM_CLSS);





			console.log("=========================================================================");
			console.log("detailReceivedWorks : " + JSON.stringify(detailReceivedWorks));
			console.log("=========================================================================");
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });



	
}

var replyTitle = Observable();
var replyCont = Observable();

function setTheReplyTitle () {
	replyTitle.value = "[답변]" + detailReceivedWorks._values[0].TITLE;
}


function replyReceiveWork() {
	var saveBusiReceiveAdmin_URL = Backend.BASE_URL + Backend.saveBusiReceiveAdmin_URL;

	var SITE_CLSS_SND ="";
	var TITLE = ""; 
	var CONT = "";
	var REPLY_REF = "";
	var REPLY_DEPTH = "";
	
	var REPLY_SORTKEY = "";
	var AREA = "";
	var WRITE_HOST = "";
	var BOD_FORM_CLSS = "";
	var BOD_COM_YN = "";
	var REGID = "";
	var INFO_CDHD_NO = "";
	var INFO_OBJ_CTGO = "";
	var RECEIVE_NM = "";
	var RECEIVE_ORG = "";


	var COMM_SEQ = "";


	if (JSON.parse(dsParam).GVORGCLSS != null) {
		SITE_CLSS_SND = JSON.parse(dsParam).GVORGCLSS;
	} else {
		SITE_CLSS_SND = "";
	}
		
	if (replyTitle.value !=null || replyTitle.value != "") {
		TITLE = replyTitle.value;	
	} else {
		TITLE = "";
	}
	
	if (replyCont.value !=null || replyCont.value !="") {
		console.log("replyCont.value : " + replyCont.value);
		CONT = replyCont.value;
	} else {
		CONT = "";
	}

	if (detailReceivedWorkVariable.COMM_SEQ !=null) {
		REPLY_REF = detailReceivedWorkVariable.COMM_SEQ;
	} else {
		REPLY_REF = "";
	}

	REPLY_DEPTH = "1";

	if (detailReceivedWorkVariable.COMM_SEQ !=null) {
		REPLY_SORTKEY = parseInt(detailReceivedWorkVariable.COMM_SEQ) *40;
	} else {
		REPLY_SORTKEY = "";
	}

	if (JSON.parse(dsParam).GVAREACODE != null) {
		AREA = JSON.parse(dsParam).GVAREACODE;
	} else {
		AREA = "";
	}


	if (detailReceivedWorkVariable.BOD_FORM_CLSS !=null) {
		BOD_FORM_CLSS = parseInt(detailReceivedWorkVariable.BOD_FORM_CLSS) *40;
	} else {
		BOD_FORM_CLSS = "";
	}


	if (detailReceivedWorkVariable.BOD_COM_YN !=null) {
		BOD_COM_YN = parseInt(detailReceivedWorkVariable.BOD_COM_YN) *40;
	} else {
		BOD_COM_YN = "";
	}









	if (JSON.parse(dsParam).GVMEMID != null) {
		REGID = JSON.parse(dsParam).GVMEMID;
	} else {
		REGID = "";
	}

	if (detailReceivedWorkVariable.REGID !=null) {
		INFO_CDHD_NO = parseInt(detailReceivedWorkVariable.REGID) *40;
	} else {
		INFO_CDHD_NO = "";
	}


	if (detailReceivedWorkVariable.SITE_CLSS_SND !=null) {
		INFO_OBJ_CTGO = parseInt(detailReceivedWorkVariable.SITE_CLSS_SND) *40;
	} else {
		INFO_OBJ_CTGO = "";
	}
	if (detailReceivedWorkVariable.WRITER_NM != null) {
		RECEIVE_NM = detailReceivedWorkVariable.WRITER_NM;
	} else {
		RECEIVE_NM = "";
	}

	if (detailReceivedWorkVariable.WRITER_ORG != null) {
		RECEIVE_ORG = detailReceivedWorkVariable.WRITER_ORG;
	} else {
		RECEIVE_ORG = "";
	}

	if (detailReceivedWorkVariable.COMM_SEQ !=null) {
		COMM_SEQ = detailReceivedWorkVariable.COMM_SEQ;
	} else {
		COMM_SEQ = "";
	}




// NOT DONE YET
// 	var REPLY_DEPTH","1");                                     //질문 답변인지여부 0:질문 1:답변
// 	var REPLY_SORTKEY",ds_FvCommList.GetColumn(0,"COMM_SEQ")); //답변대상 COMM_SEQ +0 * 40
// 	var WRITE_HOST = "";
		
// 	var BOD_FORM_CLSS",ds_FvCommList.GetColumn(0,"BOD_FORM_CLSS")); //업무연락구분
// 	var BOD_COM_YN",ds_FvCommList.GetColumn(0,"BOD_COM_YN"));
// 	var REGID",gvMEMID);
// //수신자데이타
// 	var INFO_CDHD_NO",ds_FvCommList.GetColumn(0,"REGID"));     //수신자ID
// 	var INFO_OBJ_CTGO",ds_FvCommList.GetColumn(0,"SITE_CLSS_SND"));    //수신자 권한
	
// NOT DONE YET

		// SITE_CLSS_SND", gvORGCLSS);                  //답변자 ORGCLSS
		// TITLE", gfn_Edit2Html(edt_Title));                                //제목
		// CONT", ta_cont.Text);                                   //내용
		// REPLY_REF",ds_FvCommList.GetColumn(0,"COMM_SEQ"));     //답변대상 COMM_SEQ

		// REPLY_REF",ds_FvCommList.GetColumn(0,"reSeq"));     //답변대상 COMM_SEQ

		// REPLY_DEPTH","1");                                     //질문 답변인지여부 0:질문 1:답변
		// REPLY_SORTKEY",ds_FvCommList.GetColumn(0,"COMM_SEQ")); //답변대상 COMM_SEQ +0 * 40
		// WRITE_HOST",fn_GetIp());                          //로컬 IP
		// AREA",gvAREACODE);                              //지원기관코드
		// BOD_FORM_CLSS",ds_FvCommList.GetColumn(0,"BOD_FORM_CLSS")); //업무연락구분
		// BOD_COM_YN",ds_FvCommList.GetColumn(0,"BOD_COM_YN"));
		// REGID",gvMEMID);
		//수신자데이타
		// INFO_CDHD_NO",ds_FvCommList.GetColumn(0,"REGID"));     //수신자ID
		// INFO_OBJ_CTGO",ds_FvCommList.GetColumn(0,"SITE_CLSS_SND"));    //수신자 권한
		// RECEIVE_NM",ds_FvCommList.GetColumn(0,"WRITER_NM"));       //수신자 이름
		// RECEIVE_ORG",ds_FvCommList.GetColumn(0,"WRITER_ORG"));      //수신자 소속


	




	


	var ds_comm_list ='{"SITE_CLSS_SND":"' + SITE_CLSS_SND 
		+'","TITLE":"'+TITLE
		+'","CONT":"'+CONT
		+'","REPLY_REF":"'+REPLY_REF
		+'","REPLY_DEPTH":"'+REPLY_DEPTH
		+'","REPLY_SORTKEY":"'+REPLY_SORTKEY
		+'","WRITE_HOST":"'+WRITE_HOST
		+'","AREA":"'+AREA
		+'","BOD_FORM_CLSS":"'+BOD_FORM_CLSS
		+'","BOD_COM_YN":"'+BOD_COM_YN
		+'","REGID":"'+REGID
		+'","INFO_CDHD_NO":"'+INFO_CDHD_NO
		+'","INFO_OBJ_CTGO":"'+INFO_OBJ_CTGO
		+'","RECEIVE_NM":"'+RECEIVE_NM
		+'","RECEIVE_ORG":"'+RECEIVE_ORG
		+'"}';	




	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"ds_comm_list": '+ds_comm_list+', "reSeq":"'+COMM_SEQ+'"}');


	console.log("jsonParam : " + JSON.stringify(jsonParam));

	var selectBusiReceiveAdminList_URL = Backend.BASE_URL + Backend.selectBusiReceiveAdminList_URL;

	

	fetch(saveBusiReceiveAdmin_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			console.log(JSON.stringify(response));
			
            return response.json();
        }).then(function(jsonData) {
        
        }).catch(function(err) {

        });
} 











module.exports = {
	years, months, days,
	type, selectedType, pickerOn, pickerUp, pickerDown, selectedTypes,
	fromDate, receiveFromPickerPanelOn, receiveFromPickerUp, receiveFromPickerDown,
	toDate, receiveToPickerPanelOn, receiveToPickerUp, receiveToPickerDown, searchContent,
	receiveWorks, receiveworkDetail, initReceiveList, goToDetailReceiveWork, setTheReplyTitle,
	searchText, detailReceivedWorks, detailReceivedWorkVariable, replyReceiveWork, replyTitle, replyCont
};