var Observable = require('FuseJS/Observable');
var Timer = require("FuseJS/Timer");
var UniSign = require("UniSign");
var settings = require('UserSettings');
var Device = require('Device');

var corSelected = Observable(false);
var onPanel = Observable(false);
var mSignedData = null;


function friSelect() {
	corSelected.value = false;
}

function corSelect() {
	corSelected.value = true;
}

function popUpPanel() {
	onPanel.value = true;
}

function popDownPanel() {
	clearInterval(interval);
	onPanel.value = false;
}

var alertViewBool = Observable("Background");

function goMainPage() {
	console.log("certPw : " + certPw.value);

	var isPasswordCorrect = checkThePassword(certPw.value);
	//테스토 용
	isPasswordCorrect = true;
	if(isPasswordCorrect == true) {
		alert.layer.value="Background";
		connectToServer();
		settings.setString('key', '20171212121212');
	} else {
		console.log("Really Really??????????????????????????????");
		alert.message.value="비밀번호가 틀렸습니다. 121231231231231"
		alert.layer.value = "Overlay";
	}
}

function goMainPage2() {
	router.push("MainPage");
}




onChangePw = Observable(false);
function popUpChangePw() {
	onChangePw.value = true;
}
function popDownChangePw(){
	onChangePw.value = false;
}

onRegPanel = Observable(false);
onRegPanel2 = Observable(false);
function popUpRegPanel() {
	if (corSelected.value) {
		onRegPanel2.value = true;
	} else {
		onRegPanel.value = true;
	}
}
function popDownRegPanel() {
	if (corSelected.value) {
		onRegPanel2.value = false;
	} else {
		onRegPanel.value = false;
	}
}

positionData = ["대표자", "원장", "보육교사", "기타"];

onPicker = Observable(false);
function pickerOn() {
	onPicker.value = true;
}
function pickerDown() {
	onPicker.value = false;
}

onImportPanel = Observable(false);
function popUpImportPanel() {
	importCert();
	onImportPanel.value = true;
}
function popDownImportPanel(){


	onImportPanel.value = false;
}

onExportPanel = Observable(false);

var alert = {
	title: Observable(),
	message: Observable(),
	layer: Observable("Background")
}


function getLicenseInfo () {
		setLicense();
		console.log("getLicenseInfo was clicked");
		console.log("UniSign.getLicenseInfo() : " +  UniSign.getLicenseInfo());

		console.log("after getLicenseInfo was clicked");
};




function popUpExportPanel() {


	onExportPanel.value = true;
	exportCert();

}




function exportCert () {
	// setLicense();
	console.log("exportCert was clicked");

	session = UniSign.startGenerateCert("fzgCFFYVf7f5WKSC0+wf+A==");
	var uniqueInfo = UniSign.getUniqueInfo();
	
	console.log("Unique info: " + JSON.stringify(uniqueInfo));
	
	UniSign.generateCertNum(session, "Export", uniqueInfo).then(result => {
		console.log("Cert nums: " + JSON.stringify(result));

		certNums = JSON.stringify(result);

		firstNum.value = result.substring(0,4);
		secondNum.value = result.substring(4,8);
		thirdNum.value = result.substring(8,13);


		console.log("firstNum : " + firstNum);
		console.log("secondNum : " + secondNum);
		console.log("thirdNum : " + thirdNum);

		console.log(result.substring(0,4) +"-"+ result.substring(4,8) +"-"+ result.substring(8,13));

		UniSign.isPCConnected(session).then(function(result) {
			console.log("We got pc is connected (export): " + result);

			if (result === true) {

				console.log("exportCert is ready for start: " + certificateIndexValue);

				UniSign.exportCert(session, certificateIndexValue).then(result => {
					console.log("Cert export succeeded: " + result);
				});
			}
			console.log("We got pc is connect process finished");
		});
	});
};



function popDownExportPanel(){
	onExportPanel.value = false;
}

onEnterPw = Observable(false);
function popUpEnterPw() {
	onEnterPw.value = true;
}
function popDownEnterPw(){

	// console.log("common");

	// var isPasswordCorrect = checkThePassword(exportCertPw.value);
	// //테스토 용
	// // isPasswordCorrect = true;
	// if(isPasswordCorrect == true) {
	// 	alert.layer.value="Background";
	// 	// connectToServer();
	// 	settings.setString('key', '20171212121212');
	// 	// popDownPanel(); 
	// 	// popDownExportPanel();
	// 	// onExportPanel.value = true;
	// 	// onPanel.value = false;

	// } else {
	// 	console.log("Really Really??????????????????????????????");
	// 	alert.message.value="비밀번호가 틀렸습니다. 121231231231231"
	// 	alert.layer.value = "Overlay";
	// 	popDownPanel();
	// 	popDownExportPanel();

		

	// }


	onEnterPw.value = false;
}

var password = Observable();
var friData = {
	id: Observable(),
	password: Observable(),
	confirmPassword: Observable(),
	name: Observable(),
	phone1: Observable(),
	phone2: Observable(),
	phone3: Observable(),
	position: Observable("대표자"),
	centerName: Observable(),
	certificatePassword: Observable()
};
var corData = {
	corNumber: Observable(),
	certificatePassword: Observable()
};
var chgPassword = {
	password: Observable(),
	newPassword: Observable(),
	confirmPassword: Observable()
}






var certPw = Observable();
var exportCertPw = Observable();

function active() {
	console.log("!!!!!!!");
}

var selectedFindingType = Observable("어린이집명");
var findingType = Observable();
findingType.add("어린이집명");
findingType.add("원장명");
findingType.add("사업자번호");
var findingText = Observable();

var onFindingPicker = Observable(false);

function findingPickerOn() {
	onFindingPicker.value = true;
}

function findingPickerDown() {
	onFindingPicker.value = false;
}

var onFindCenter = Observable(false);
function findCenterUp() {
	onFindCenter.value = true;
}
function findCenterDown() {
	onFindCenter.value = false;
}


//UNO 소스

/*
	작성날짜 : 2017.12.12
	타이틀 : 인증서 가져오기 (시작)
	필요 함수 명 :
		- importCert() => 인증서 가져오기 함수 (가져올때 필요한 번호 13자리 생성 및 PC에 연결)
			- 필요 변수
				- firstNum => 인증서 번호 첫 1 ~ 4자리
				- secondNum => 인증서 번호 5 ~ 8 자리
				- thirdNum => 인증서 번호 9 ~ 13 자리

		- startTimer() +> 인증서가 유효한 타이머 시작 (10분)
			- 필요 변수
				- interval => 타이머 변수
				- countDownMinutes => 타이머의 분
				- countDownSeconds => 타이머의 초
	Return Value : N/A
*/

var firstNum = Observable("");
var secondNum = Observable("");
var thirdNum = Observable("");
var session = null;
var interval = 0;

function importCert () {
	//라이센스 셋팅
	// setLicense();

	//타이머 초기화
	clearInterval(interval);
	//타이머 시작
	startTimer();
	console.log("importCert was clicked");
	session = UniSign.startGenerateCert("fzgCFFYVf7f5WKSC0+wf+A==");
	var uniqueInfo = UniSign.getUniqueInfo();
	console.log("Unique info: " + JSON.stringify(uniqueInfo));	
	UniSign.generateCertNum(session, "Import", uniqueInfo).then(result => {
		console.log("Cert nums: " + JSON.stringify(result));
		certNums = JSON.stringify(result);
		firstNum.value = result.substring(0,4);
		secondNum.value = result.substring(4,8);
		thirdNum.value = result.substring(8,13);
		console.log("firstNum : " + firstNum);
		console.log("secondNum : " + secondNum);
		console.log("thirdNum : " + thirdNum);
		console.log(result.substring(0,4) +"-"+ result.substring(4,8) +"-"+ result.substring(8,13));
		UniSign.isPCConnected(session).then(function(result) {
			console.log("We got pc is connected: " + result);

			if (result === true) {
				clearInterval(interval);
				UniSign.importCert(session).then(result => {
					console.log("Cert: " + JSON.stringify(result));
					getList();
					popDownImportPanel();
					popDownPanel();
				});
			}
		});
	});
};

var countDownMinutes = Observable();
var countDownSeconds = Observable("00");

function startTimer() {
	var duration = 60 * 10;
	// var duration = 5 ;
    var timer = duration, minutes, seconds;
    var tempSeconds
  	interval = setInterval(function () {
    	console.log("setInterval Started");
        tempSeconds = parseInt(timer / 60, 10);
        
        countDownMinutes.value = parseInt(timer/60, 10).toString();
        countDownSeconds.value = parseInt(timer%60, 10).toString();

        console.log("countDownMinutes : " + countDownMinutes.value);
        console.log("seconds : " + countDownSeconds.value);
        console.log("timer : " + timer);
        
        if (--timer < 0) {
            timer = duration;
        }

        if (timer === 0) {
        	clearInterval(interval);
        	countDownSeconds.value = "0";
        }
    }, 1000);
}

/*
	작성날짜 : 2017.12.12
	타이틀 : 인증서 가져오기 (끝)
	필요 함수 명 :
		- importCert() => 인증서 가져오기 함수 (가져올때 필요한 번호 13자리 생성 및 PC에 연결)
			- 필요 변수
				- firstNum => 인증서 번호 첫 1 ~ 4자리
				- secondNum => 인증서 번호 5 ~ 8 자리
				- thirdNum => 인증서 번호 9 ~ 13 자리

		- startTimer() +> 인증서가 유효한 타이머 시작 (10분)
			- 필요 변수
				- interval => 타이머 변수
				- countDownMinutes => 타이머의 분
				- countDownSeconds => 타이머의 초
	Return Value : N/A
*/



/*
	작성날짜 : 2017.12.12
	타이틀 : 라이센스 셋팅
	필요 함수 명 :
		- setLicense() => 라이센스 셋팅 (공인인증서 라이센스 셋팅)
	Return Value : N/A
*/

function setLicense () {
	console.log("setLicense was clicked");
	UniSign.setLicense("fzgCFFYVf7f5WKSC0+wf+A==");
};



function getLogicSignedData () {
	var value = password.value;
	mSignedData = UniSign.getLogicSignedData(value, certificateIndexValue);
	return mSignedData;
}


/*
	작성날짜 : 2017.12.12
	타이틀 : UUID값 생성
	필요 함수 명 :
		- getUUID () => 각 디바이스의 고유 값 생성 (서버에서 각 기기를 구분할때 쓰임)
	Return Value : deviceUUID
*/

function getUUID () {
	if (Device.UUID == '') {
        Device.getUUID().then(function(uuid) {
            console.log('UUID: ' + uuid);
        }).catch(function(error) {
            console.log('UUID error: ' + error);
        });
    }

	console.log("*****************************************************************");
 	console.log('Current device language: ' + Device.locale); // format in BCP-47 for all mobile platforms
    // output example: en-US

    console.log('UUID:'                + Device.UUID);
    var deviceUUID = Device.UUID;
    
    console.log('before deviceUUID : ' + deviceUUID);

	String.prototype.replaceAll = function (find, replacement) {
		var target = this;
		return target.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '');
	}

	deviceUUID = deviceUUID.replaceAll('-', '');

	console.log('after deviceUUID : ' + deviceUUID);
    console.log('Vendor name: '        + Device.vendor);
    console.log('Model name: '         + Device.model);
    console.log('System: '             + Device.system);
    console.log('System version: '     + Device.systemVersion);
    console.log('System SDK ver: '     + Device.SDKVersion);
    console.log('Logical processors: ' + Device.cores);
    console.log('is retina?: '         + Device.isRetina);
	console.log("*****************************************************************");

	return deviceUUID;
}



function chooseCertificate(args) {
	// console.log(args.data.isSelected.value);
	data.forEach(function(cert) {
		if (args.data.certificateIndexValue == cert.certificateIndexValue) {
			cert.isSelected.value = true;
		} else {
			cert.isSelected.value = false;
		}
	});
	// console.log(args.data.isSelected.value);
	var argsValue = JSON.stringify(args);
	var certificateInfo = JSON.parse(argsValue);

	var test = JSON.stringify(certificateInfo.data.certIndex);
	
	certificateIndexValue = test;

	// console.log("certificateInfo : " + certificateInfo);
	// console.log("certificateInfo : " + test);
	console.log("certificateIndexValue : " + certificateIndexValue);

	console.log("chooseCertificate : args : "+ args.certIndex);

	// getLogicSignedData();
}function exportCert () {
	// setLicense();
	console.log("exportCert was clicked");

	session = UniSign.startGenerateCert("fzgCFFYVf7f5WKSC0+wf+A==");
	var uniqueInfo = UniSign.getUniqueInfo();
	
	console.log("Unique info: " + JSON.stringify(uniqueInfo));
	
	UniSign.generateCertNum(session, "Export", uniqueInfo).then(result => {
		console.log("Cert nums: " + JSON.stringify(result));

		certNums = JSON.stringify(result);

		firstNum.value = result.substring(0,4);
		secondNum.value = result.substring(4,8);
		thirdNum.value = result.substring(8,13);


		console.log("firstNum : " + firstNum);
		console.log("secondNum : " + secondNum);
		console.log("thirdNum : " + thirdNum);

		console.log(result.substring(0,4) +"-"+ result.substring(4,8) +"-"+ result.substring(8,13));

		UniSign.isPCConnected(session).then(function(result) {
			console.log("We got pc is connected (export): " + result);

			if (result === true) {

				console.log("exportCert is ready for start: " + certificateIndexValue);

				UniSign.exportCert(session, certificateIndexValue).then(result => {
					console.log("Cert export succeeded: " + result);
				});
			}
			console.log("We got pc is connect process finished");
		});
	});
};


/*
	작성날짜 : 2017.12.12 
	타이틀 : 인증서 리스트 가져오기 (시작)
	필요 함수 명 :
		- importCert() => 인증서 가져오기 함수 (가져올때 필요한 번호 13자리 생성 및 PC에 연결)
			- 필요 변수
				- firstNum => 인증서 번호 첫 1 ~ 4자리
				- secondNum => 인증서 번호 5 ~ 8 자리
				- thirdNum => 인증서 번호 9 ~ 13 자리

		- startTimer() => 인증서가 유효한 타이머 시작 (10분)
			- 필요 변수
				- interval => 타이머 변수
				- countDownMinutes => 타이머의 분
				- countDownSeconds => 타이머의 초
*/

var certificates = null;
var data = Observable();

function getList () {
	// setLicense(); 
	console.log("javascript getList started ");

	// if(UniSign.getUserCertificates()==null){
	// 	console.log("certificates is null");
	// }else{
	certificates = UniSign.getUserCertificates();

	if (certificates != null && certificates[0]=="0") {
		console.log("certificates is null");
		certificates = null;	
	} else {
		
	// console.log("There are ["+ certificates.length + "] certificates");
	console.log("certificates : " + JSON.stringify(certificates));
	if(certificates.length > 0) {
		setTheInitialData();	
	} 
	var stringValue = JSON.stringify(certificates);
	//data = JSON.parse(stringValue);
	//로그에는 이렇게 하면 값이 나온다
	var whywhywhy = JSON.parse(stringValue);
	console.log("whywhywhy.ExpireDays : " + whywhywhy[0].ExpireDays );
	//로그에는 이렇게 하면 값이 나온다
	console.log("============================================== Total List ==============================================");
	console.log("certificates : " + stringValue);
	console.log("============================================== Total data ==============================================");
	}

	// data.forEach(function(cert) {
		// console.log(cert.certIndex);
		// cert.isSelected = Observable(true);
	// });
}

function setTheInitialData () {
	var stringValue = JSON.stringify(certificates);
	
	var today = new Date();

	console.log("today : " + today);

	var certificateExpireDate = null;

	var tempData = [];

	// var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	var individualCertificate;
	var imageName = Observable();

	for (var i =0; i<certificates.length; i++) {
		console.log("certificates.PolicyHumanReadableForm : " + certificates[i].PolicyHumanReadableForm );
		console.log("certificates.CommonName : " + certificates[i].CommonName );
		console.log("certificates.Organization : " + certificates[i].Organization );
		console.log("certificates.ValidityEndDate : " + certificates[i].ValidityEndDate );	





		certificateExpireDate = new Date(certificates[i].ValidityEndDate);
		if (daysBetween(today, certificateExpireDate) < 0) {

			console.log("Certificate is expired");
			imageName.value="Images/icon3.png"

		} else if (daysBetween(today, certificateExpireDate) <= 30) {
			console.log("Certificate Expiry days is less than 30 days ");
			imageName.value="Images/icon2.png"
		} else  {
			console.log("Certificate Expiry days is more than 30 days ");
			imageName.value="Images/icon1.png"
		}
		// individualCertificate = '{"certIndex":' +i +      ', "ImageName":"' +imageName.value +      '", "PolicyHumanReadableForm":"'+certificates[i].PolicyHumanReadableForm+'","CommonName":"'+certificates[i].CommonName+'","Organization":"'+certificates[i].Organization+'","ValidityEndDate":"' + daysBetween(today, certificateExpireDate).toString()+'"}';
		individualCertificate = '{"certIndex":' +i +      ', "ImageName":"' +imageName.value +      '", "PolicyHumanReadableForm":"'+certificates[i].PolicyHumanReadableForm+'","CommonName":"'+certificates[i].CommonName+'","Organization":"'+certificates[i].Organization+'","ValidityEndDate":"' + certificates[i].ValidityEndDate+'"}';
		console.log("individualCertificate : " + individualCertificate);
		var tempArray = JSON.parse(individualCertificate);
		tempArray.isSelected = Observable(false);
		tempData.push(tempArray);
	}
	
	// console.log("tempData : " + tempData.toArray());
	console.log("stringValue : " + stringValue);
	console.log("typeof :" + typeof(stringValue));
	data.replaceAll(tempData);
    console.log("stringValue Value : " + data);
    // console.log(JSON.stringify(data));
}

/*
	작성날짜 : 2017.12.12 
	타이틀 : 인증서 리스트 가져오기 (끝)
	필요 함수 명 :
		- importCert() => 인증서 가져오기 함수 (가져올때 필요한 번호 13자리 생성 및 PC에 연결)
			- 필요 변수
				- firstNum => 인증서 번호 첫 1 ~ 4자리
				- secondNum => 인증서 번호 5 ~ 8 자리
				- thirdNum => 인증서 번호 9 ~ 13 자리

		- startTimer() => 인증서가 유효한 타이머 시작 (10분)
			- 필요 변수
				- interval => 타이머 변수
				- countDownMinutes => 타이머의 분
				- countDownSeconds => 타이머의 초
*/


function daysBetween(first, second) {

    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}

/*
	작성날짜 : 2017.12.13 
	타이틀 : 비밀번호 체크
	필요 함수 명 :
		- checkThePassword() => 선택한 공인인증서의 비밀번호와, 입력하 비밀번호가 동일한지 확인
			- 필요 변수
				- password => 입력한 비밀번호 담을 변수
				- certificateIndexValue => 선택한 공인인증서의 인덱스 번호
	Return Value : isPasswordCorrect
*/

function checkThePassword (passwordValue) {
	console.log("certificateIndexValue : " + certificateIndexValue);
	console.log("passwordValue : " + passwordValue);

 	isPasswordCorrect =UniSign.checkThePassword(passwordValue, certificateIndexValue);
 	console.log("isPasswordCorrect : " + isPasswordCorrect);
 	return isPasswordCorrect;
}

function removeCertificate (){
	console.log("removeCertificate was clicked");
	var isPasswordCorrect = checkThePassword(certPw.value);
	var removed = false;

	if (isPasswordCorrect != false) {
		console.log("Password is Correct");	
		removed = UniSign.removeUserCertificate(certificateIndexValue);
		if(removed != false) {
			console.log("Certificate is removed");
			getList();
		} else {
			console.log("Certificate is not removed");
		}
	} else {
		console.log("Password is incorrect");
	}
}

function changePassword () {
	console.log("certificateIndexValue : " + certificateIndexValue);
	if(checkThePassword(chgPassword.password.value) == true) {
		if(chgPassword.newPassword.value == chgPassword.confirmPassword.value) {
			UniSign.changePassword(chgPassword.password.value, chgPassword.newPassword.value, certificateIndexValue);
		} else {
			console.log("Check your new password ");
		}
	} else {
		console.log("Password is incorrect");
	}
	chgPassword.password.value = "";
	chgPassword.newPassword.value = "";
	chgPassword.confirmPassword.value = "";
}

var staticDsParam = null;
var staticDsSearch = null;
var staticParamStringValue = "";

function connectToServer() {
	getLogicSignedData();
	console.log("mSignedData : " + mSignedData);
	var isConnected = false;

	fetch("http://112.218.172.44:52102/common/loginSigned.do", {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify({
			"SIGNGB":"1",
			"signedText":mSignedData
                })
        }).then(function(response) {
        	console.log("response.ok :"  + response.ok);
        	isConnected = response.ok;

			// staticDsParam = JSON.parse(response._bodyInit);
   //      	// staticDsParam = staticDsParam.result;
   //      	staticParamStringValue = JSON.stringify(staticDsParam.dsParam);
   //      	console.log("staticDsParam : " + staticDsParam);
			// console.log("staticParamStringValue : " + staticParamStringValue);
        	if(isConnected == true) {
        		router.goto("MainPage");
        	}
        	console.log("isConnected : " + isConnected);

        	var responseData = JSON.stringify(response);
			console.log("responseData : "+ responseData);
            return response.json();
        	
        }).then(function(jsonData) {
            // var data = jsonData.results[0];

            // console.log("data : " + jsonData.results[0]);
			
        }).catch(function(err) {
            console.log("Reg Succeeded[ios] Error!! : " + err.message);
        });
        
}


module.exports = {
	goMainPage, goMainPage2, getLicenseInfo,
	corSelected, friSelect, corSelect,
	onPanel, popUpPanel, popDownPanel,
	onChangePw, popUpChangePw, popDownChangePw,
	onRegPanel, onRegPanel2, popUpRegPanel, popDownRegPanel,
	positionData, onPicker, pickerOn, pickerDown,
	onImportPanel, popUpImportPanel, popDownImportPanel,
	onExportPanel, popUpExportPanel, popDownExportPanel,
	onEnterPw, popUpEnterPw, popDownEnterPw,
	password, friData, corData, chgPassword,
	certPw, exportCertPw,
	active,
	selectedFindingType, findingType, findingText,
	onFindingPicker, findingPickerOn, findingPickerDown,
	onFindCenter, findCenterUp, findCenterDown,
	firstNum, secondNum, thirdNum, countDownSeconds, countDownMinutes,
	importCert, getList, data, chooseCertificate, removeCertificate,changePassword, 
	alert, setLicense
};