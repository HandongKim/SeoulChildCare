var Observable = require('FuseJS/Observable');
var FileSystem = require("FuseJS/FileSystem");
var Environment = require('FuseJS/Environment');
var CameraRoll = require("FuseJS/CameraRoll");
var ImageTools = require("FuseJS/ImageTools");
var Backend = require('Backend.js');
// 어떤 경로로 접근했는지 구분하기 위한 함수
var panelType = Observable("normal");
var Camera = require('FuseJS/Camera');
var ImageTools = require('FuseJS/ImageTools');
var Uploader = require("Uploader");
var connectingPanelLayout = Observable("Background");
var enableClick = Observable("LocalBoundsAndChildren");














this.Parameter.onValueChanged(null, function(x) {
	// console.log(JSON.stringify(x));
	if (x.type == "normal") {
		panelType.value = "normal";
	} else if (x.type == "upload") {
		panelType.value = "upload";
	} else if (x.type == null) {
		panelType.value = "normal";
	}
});

// 피커에 필요한 변수 및 함수
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

var pickerOn = Observable(false);

function pickerUp() {
	pickerOn.value = true;
}

var dsParam = Backend.dsParam;
var getMobileRciptListUrl = Backend.BASE_URL + Backend.getMobileRciptList_URL;
var mImgViewUrl = Backend.BASE_URL + Backend.mImgView_URL;

function pickerDown() {
	photoListFromServer = new Array;
	pictures.clear();

	console.log("year.value : "  + year.value);
	console.log("month.value : "  + month.value);

	var tempMonth = month.value.toString();
	if(month.value < 10) {
		tempMonth = "0" +month.value.toString();
	}
	var yearAndMonth = year.value.toString() + tempMonth;

	Backend.yearAndMonthFromPhotoCollection.value = yearAndMonth;
	// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';
	// var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
	var dsSearch = '{"ATCHMNFL_YM":"'+yearAndMonth+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');  
	console.log('jsonParam : ' + jsonParam);
	console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));

	fetch(getMobileRciptListUrl, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			
			console.log("2017.12.31 responseData : " + responseData);
 
			var message = JSON.parse(response._bodyInit);
			var isSuccess = message.MiResultMsg;
			console.log("message : " + message.MiResultMsg); 
			tempList1 = JSON.parse(response._bodyInit);

			console.log("tempList1 : " + JSON.stringify(tempList1));

			tempList1 = tempList1.resultData[1];

			for (var i = 0; i < tempList1.length; i++) {
				var temp2 = tempList1[i].ATCHMNFL_IDX.toString()
				photoListFromServer.push(temp2);
		
			}

			if (isSuccess =="success") {
				console.log("wjifjwoejfoijo");
				for (var i = 0; i <photoListFromServer.length ; i++) {
					var dsParam = Backend.dsParam;
					var dsSearch = '{"ATCHMNFL_IDX":"'+photoListFromServer[i]+'"}';

					var baseURL= mImgViewUrl;

					var GVMEMCODE = "SEOUL000000000000121";

					var requestParameter = "GVMEMCODE=" + GVMEMCODE+ "&ATCHMNFL_IDX=" + photoListFromServer[i];

					var imgUrl = baseURL + requestParameter;
					console.log("requestParameter : " + imgUrl);


					// var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
					// console.log('jsonParam : ' + jsonParam);
					pictures.add(new ServerPicture(imgUrl, i));

					console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));
				}
				
			} else {
				console.log("isSuccess is failed");
			}
			
            // return response.json();
        }).then(function(jsonData) {
            var data = jsonData.results[0];
           
			// console.log("Reg Succeeded[ios]: " + data.registration_token);
			// maintext.value = maintext.value + "/n" + data.registration_token;
        }).catch(function(err) {
            
        });





	pickerOn.value = false;
}

// 업로드에 필요한 변수 및 함수
var uploadOn = Observable(false);

function tryUpload() {
	uploadOn.value = true;
}

function cancelUpload() {
	uploadOn.value = false;
}

// 이미지를 보여주는데 필요한 변수 및 함수
function Picture(resource) {
	this.index = resource - 1;
	this.resource = "Evidence/Ex" + resource + ".jpg";
	this.isSelected = Observable(false);
	this.isLinked = Observable(false);
}


function toggleSelect(resource, _index) {
	this.index = _index;
	this.resource = resource;
	this.isSelected = Observable(false);
	this.isLinked = Observable(false);
}

function ServerPicture(resource, _index) {
	this.index = _index;
	this.resource = resource;
	this.isSelected = Observable(false);
	this.isLinked = Observable(false);
}


pictures = Observable();
for (i = 1; i < 11; i++) {
	pictures.add(new Picture(i));
}

selectionMode = Observable(false);
numberOfSelected = Observable(0);
selectedMode = Observable(false);
selectedPicture = Observable();

header = Observable(function () {
	if (selectionMode.value === false)
		return 'Gallery';
	else return 'Gallery (' + numberOfSelected.value + ')';
});


function goToSelectionMode() {
	if (selectionMode.value === true) return;
	selectionMode.value = true;
	panelType.value = "selecting";
	numberOfSelected.value = 1;
	// console.log(JSON.stringify(args));
}

function cancelSelectionMode() {
	if (selectionMode.value === false) return;
	selectionMode.value = false;
	panelType.value = "upload";
	numberOfSelected.value = 0;
	pictures.forEach(function(picture) {
		picture.isSelected.value = false;
	});
}

var activeIndex = Observable(0);
var spicture = Observable();
activeIndex.onValueChanged(null, function(x) {
	// console.log(JSON.stringify(selectedPicture.getAt(x)));
	if (selectedPicture.getAt(x) != null) {
		spicture.value = selectedPicture.getAt(x).resource;
	}
});


var currentPictureIndex = Observable();






function toggleSelect(args) {
	if (selectionMode.value === false) {
		selectedMode.value = true;
		activeIndex.value = args.data.index;





		currentPictureIndex.value = args.data.index;


		console.log("currentPictureIndex.value : " + currentPictureIndex.value);

		spicture.value = args.data.resource;

		selectedPicture.add(pictures.getAt(activeIndex.value));
		for (var i = 0 ; i < activeIndex.value ; i++) {
			selectedPicture.insertAt(i, pictures.getAt(i));
		}
		
		for (var i = activeIndex.value + 1 ; i < pictures.length ; i++) {
			selectedPicture.add(pictures.getAt(i));
		}

		// console.log(JSON.stringify(selectedPicture));
		return;
	}

	if (args.data.isSelected.value === false) {
		numberOfSelected.value = numberOfSelected.value + 1;
		console.log(" args.data.isSelected.value === false currentPictureIndex.value : " + args.data.index);
		Backend.selectedPhotoCollectionPictureListFromDetailNote.add(tempList1[args.data.index].ATCHMNFL_IDX.toString());
		console.log(JSON.stringify(Backend.selectedPhotoCollectionPictureListFromDetailNote));
	} else {
		numberOfSelected.value = numberOfSelected.value - 1;

		Backend.selectedPhotoCollectionPictureListFromDetailNote.remove(tempList1[args.data.index].ATCHMNFL_IDX.toString());
		console.log(JSON.stringify(Backend.selectedPhotoCollectionPictureListFromDetailNote));
		if (numberOfSelected.value === 0) {
			selectionMode.value = false;
		}
	}

	args.data.isSelected.value = !args.data.isSelected.value;
save
}

function cancelSelectedMode() {
	selectedMode.value = false;
	selectedPicture.clear();
}

function deleteSelected(args) {
	pictures.removeWhere(function (p) {
		return p.isSelected.value === true;
	});
	numberOfSelected.value = 0;
	selectionMode.value = false;
}

var alert = {
	title: Observable(),
	message: Observable(),
	type: Observable("Check"),
	layer: Observable("Background")
};


function save() {

	// console.log("save");
	// var FileSystem = require("FuseJS/FileSystem");

	// var oReq = new XMLHttpRequest();
	// oReq.open("GET", "[http://www.aseoul.co.kr/acusr/acc/bil/mImgDownLoad.do?GVMEMCODE=SEOUL000000000000121&ATCHMNFL_IDX=12]", true);
	// oReq.responseType = "arraybuffer";

	// oReq.onload = function (oEvent) {
	// 	console.log("oReq.onload");
 //  		var arrayBuffer = oReq.response; 
 //  		if (arrayBuffer) {
 //    		var path = FileSystem.dataDirectory + "/" + "testfile.jpg";
 //    		FileSystem.writeBufferToFile(path, arrayBuffer);
 //  		}
	// };

	// oReq.send(null);


	var today = new Date();
	var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
	var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
	var dateTime = date+''+time;
	var imageName = dateTime + ".png";

	savepanel.save(imageName);
	console.log("make image");
	var saveDir = "t";
	if (Environment.ios) {
		saveDir = FileSystem.iosPaths.documents;
	} else if (Environment.android) {
		// console.log(FileSystem.androidPaths.files);
		saveDir = FileSystem.androidPaths.files;
	}
	var arrayBuff;
	setTimeout(function() {
		FileSystem.readBufferFromFile(saveDir+"/"+imageName).then(function(image) {
			console.log("read success");
			arrayBuff = image;
			// console.log(JSON.stringify(arrayBuff));
			ImageTools.getImageFromBuffer(arrayBuff).then(function(image) {
				console.log("Scratch image path is: " + image.path);
				CameraRoll.publishImage(image).then(function(x) {
					console.log("save success");
					FileSystem.delete(saveDir+"/"+imageName).then(function() {
						console.log("delete success");
					});

					alert.message.value="저장되었습니다";
					alert.layer.value = "Overlay";

				}, function(error) {
					console.log(error);
				});
			});
			// resource.value = saveDir+"/test.png";




		}, function(error) {
			console.log(error);
		});
	}, 1500);
}

function clicked(args) {
	console.log(JSON.stringify(args));
}


var photoListFromServer;
var tempList1 = null;

function getPhotoList () {
	alert.layer.value = "Background";
	year.clear();
	month.clear();

	years.clear();
	months.clear();


	for (var i = 0 ; i < 30 ; i++) {
		years.add(2010+i);
	}

	for (var i = 0 ; i < 12 ; i++) {
		months.add(1+i);
	}
	
	photoListFromServer = new Array;

	pictures.clear();

	console.log("getPhotoList");

	var currentTime = new Date()
	var tempYear = currentTime.getFullYear();
	console.log("date : " + typeof(tempYear));

	var monthTemp = currentTime.getMonth() + 1;

	console.log("month : " + month);


	console.log("20180116 tempYear : " +tempYear);
	console.log("20180116 monthTemp : " +monthTemp);

	year.value = tempYear;
	month.value = monthTemp;



	console.log("20180116 year.value : " +year.value);
	console.log("20180116 month.value : " +month.value);


	var tempMonth = monthTemp.toString();
	if(monthTemp < 10) {

		tempMonth = "0" +monthTemp.toString();
	}

	var yearAndMonth = tempYear + tempMonth;

	console.log("yearAndMonth : " +yearAndMonth);










	var dsParam = Backend.dsParam;

	// var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
	var dsSearch = '{"ATCHMNFL_YM":"'+yearAndMonth+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
	    
	console.log('jsonParam : ' + jsonParam);
	console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));



	fetch(getMobileRciptListUrl, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			
			console.log("2017.12.31 responseData : " + responseData);
 
			var message = JSON.parse(response._bodyInit);
			var isSuccess = message.MiResultMsg;
			console.log("message : " + message.MiResultMsg); 

			


			


			tempList1 = JSON.parse(response._bodyInit);

			console.log("tempList1 : " + JSON.stringify(tempList1));

			tempList1 = tempList1.resultData[1];

			for (var i = 0; i < tempList1.length; i++) {
				var temp2 = tempList1[i].ATCHMNFL_IDX.toString()
				photoListFromServer.push(temp2);
		
			}

			var baseURL = Backend.BASE_URL + Backend.mImgView_URL;

			if (isSuccess =="success") {
				console.log("wjifjwoejfoijo");
				for (var i = 0; i <photoListFromServer.length ; i++) {
					var dsParam = Backend.dsParam;
					var dsSearch = '{"ATCHMNFL_IDX":"'+photoListFromServer[i]+'"}';
					// var baseURL= "http://112.218.172.44:51442/acusr/acc/bil/mImgView.do?";
					var GVMEMCODE = JSON.parse(dsParam).GVMEMCODE;

					var requestParameter = "GVMEMCODE=" + GVMEMCODE+ "&ATCHMNFL_IDX=" + photoListFromServer[i];

					var imgUrl = baseURL + requestParameter;
					console.log("requestParameter : " + imgUrl);


					// var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
					// console.log('jsonParam : ' + jsonParam);
					pictures.add(new ServerPicture(imgUrl, i));

					console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));
				}
				
			} else {
				console.log("isSuccess is failed");
			}
			
            // return response.json();
        }).then(function(jsonData) {
            var data = jsonData.results[0];
           
			// console.log("Reg Succeeded[ios]: " + data.registration_token);
			// maintext.value = maintext.value + "/n" + data.registration_token;
        }).catch(function(err) {
            
        });




}

function deleteThePicture() {
	// var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';
	var dsParam = Backend.dsParam;
	var ATCHMNFL_IDX = tempList1[activeIndex.value].ATCHMNFL_IDX.toString();

	console.log("ATCHMNFL_IDX : " + ATCHMNFL_IDX); 

	console.log("activeIndex : " + activeIndex.value);


// var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
	var dsSearch = '{"ATCHMNFL_IDX":"'+ATCHMNFL_IDX+'"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
    
	console.log('jsonParam : ' + jsonParam);
	console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));


	var deleteMapngReceipt_URL = Backend.BASE_URL + Backend.deleteMapngReceipt_URL;

	fetch(deleteMapngReceipt_URL, {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			
			console.log("2017.12.31 responseData : " + responseData);
 
			var message = JSON.parse(response._bodyInit);
			var isSuccess = message.MiResultMsg;
			console.log("message : " + message.MiResultMsg); 
			var tempList1 = JSON.parse(response._bodyInit);

			console.log("tempList1 : " + JSON.stringify(tempList1));

			tempList1 = tempList1.resultData[1];

			
			
            // return response.json();
        }).then(function(jsonData) {
            var data = jsonData.results[0];
           
			// console.log("Reg Succeeded[ios]: " + data.registration_token);
			// maintext.value = maintext.value + "/n" + data.registration_token;
        }).catch(function(err) {
            
        });

}







//==========================================  사진 부분 ==========================================================

		var Environment = require('FuseJS/Environment');
		var FileSystem = require("FuseJS/FileSystem");
		var Camera = require('FuseJS/Camera');
		var CameraRoll = require('FuseJS/CameraRoll');
		var ImageTools = require('FuseJS/ImageTools');
		var Uploader = require("Uploader");
		var Backend = require('Backend.js');

		var connectingPanelLayout = Observable("Background");
		var enableClick = Observable("LocalBoundsAndChildren");
		
		var print = debug_log;
		 "/acusr/acc/bil/MobileReceiptImgUpload.do"

		// var uploadUrl = 'http://61.97.121.199:8080/TEST/ImgUploadTest.jsp';// 서버 IP를 변경하세요.

		var uploadUrl = Backend.BASE_URL + "/acusr/acc/bil/MobileReceiptImgUpload.do" ;// 서버 IP를 변경하세요.

		var sendPictureBtnEnabled = Observable(false);
		var targetImgPath = Observable();
		var takedPictureWithParamter = Observable();
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



		function takePictureWithParameter()
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
					takedPictureWithParamter.value = image.path;
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
									sendPictureWithParamter();
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

		function sendPictureWithParamter()
		{
			

			var atchmnfl_ym = getDaysInString();

			if (Backend.yearAndMonthFromPhotoCollection.value !="") {
				atchmnfl_ym = Backend.yearAndMonthFromPhotoCollection.value;
			}
			
			Backend.yearAndMonthFromPhotoCollection.value = "";


			console.log("sendPicture was called");
			// var dsParam = '{"GVAREACODE":"11110","GVBOOKGB":"01","GVESTIYEAR" :"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID":"9999990","GVORGCLSS":"5","GVUSERCLSS" :"3"}';
			var dsSearch = '{"ATCHMNFL_YM":"'+atchmnfl_ym+'","FILE_SE":"N","DOWN_LVL":"ALL"}';
			console.log("===========================================");
			console.log("searchContent ds Search : " + dsSearch);

			// var jsonParam = JSON.parse('{"dsParam":'+Backend.dsParam+',"ds_search": '+dsSearch+'}');

			// console.log("2018.01.05 jsonParam : " + JSON.stringify(jsonParam));


			var gvmemcode = JSON.parse(Backend.dsParam).GVMEMCODE;
			console.log("gvmemcode : " + gvmemcode);

			Uploader.send(targetImgPath.value, uploadUrl, Backend.dsParam, dsSearch, gvmemcode,  atchmnfl_ym, "N", "ALL").then(function(response) {
				console.log("upload complete.");
				console.log(JSON.stringify(response));
				
				console.log("response.MiResultMsg : " + JSON.parse(response).ATCHMNFL_IDX);




			});
		}

		function getImage() {
			CameraRoll.getImage().then(function(image) {
				takedPicture.value = image.path;
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
					sendPicture();
					

					FileSystem.delete(saveDir+"/"+imageName).then(function() {
						console.log("delete success");
					});
					
					takedPicture.value = "";
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
module.exports = {
	panelType,
	month, months, pickerOn, pickerUp, pickerDown,year, years, 
	uploadOn, tryUpload, cancelUpload,
	pictures, selectionMode, goToSelectionMode, cancelSelectionMode, toggleSelect, header, deleteSelected,
	selectedMode, cancelSelectedMode, selectedPicture, activeIndex,
	save, clicked, spicture, getPhotoList,deleteThePicture, alert, takePictureWithParameter, takedPictureWithParamter
};
