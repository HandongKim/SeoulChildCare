var Observable = require('FuseJS/Observable');
var Storage = require("FuseJS/Storage");
var FileSystem = require("FuseJS/FileSystem");
var Environment = require('FuseJS/Environment');

// 어떤 경로로 접근했는지 구분하기 위한 함수
var panelType = Observable("normal");

this.Parameter.onValueChanged(null, function(x) {
	// console.log(JSON.stringify(x));
	if (x.type == "normal") {
		panelType.value = "normal";
	} else if (x.type == "upload") {
		panelType.value = "upload";
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

function pickerDown() {
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
function toggleSelect(args) {
	if (selectionMode.value === false) {
		selectedMode.value = true;
		activeIndex.value = args.data.index;
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
	} else {
		numberOfSelected.value = numberOfSelected.value - 1;
		if (numberOfSelected.value === 0) {
			selectionMode.value = false;
		}
	}
	args.data.isSelected.value = !args.data.isSelected.value;
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

function save() {

	console.log("save");
	var FileSystem = require("FuseJS/FileSystem");

	var oReq = new XMLHttpRequest();
	oReq.open("GET", "[http://112.218.172.44:52102/acusr/acc/bil/mImgDownLoad.do?GVMEMCODE=SEOUL000000000000121&ATCHMNFL_IDX=12]", true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function (oEvent) {
		console.log("oReq.onload");
  		var arrayBuffer = oReq.response; 
  		if (arrayBuffer) {
    		var path = FileSystem.dataDirectory + "/" + "testfile.jpg";
    		FileSystem.writeBufferToFile(path, arrayBuffer);
  		}
	};

	oReq.send(null);




	savepanel.save("test.png");
	var saveDir = "t";
	if (Environment.ios) {
		saveDir = FileSystem.iosPaths.documents;
	} else if (Environment.android) {
		console.log(FileSystem.androidPaths.files);
		saveDir = FileSystem.androidPaths.files;
	}
	pictures.add({
		index: pictures.length,
		resource: saveDir+"/test.png",
		isSelected: Observable(false),
		isLinked: Observable(false)
	});
}

function clicked(args) {
	console.log(JSON.stringify(args));
}


var photoListFromServer;

function getPhotoList () {
	photoListFromServer = new Array;

	pictures.clear();

	console.log("getPhotoList");

	var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';

	// var dsSearch = '{"BOOK_GB":"01","search_gubun":"A","BCASH_IDX":"","search_cashgb":"","search_month":"'+yearAndMonth+'","search_gb":"Y"}';
	 var dsSearch = '{"ATCHMNFL_YM":"201711"}';
	var jsonParam = JSON.parse('{"dsParam":'+dsParam+',"dsSearch": '+dsSearch+'}');
	    // var jsonParam = JSON.parse('{"dsParam":'+staticParamStringValue+',"dsSearch": '+dsSearch+'}');
	    
	console.log('jsonParam : ' + jsonParam);
	console.log('JSON.stringify(jsonParam) : ' + JSON.stringify(jsonParam));



	fetch("http://112.218.172.44:52102/acusr/acc/bil/getMobileRciptList.do", {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(jsonParam)
        }).then(function(response) {
			var responseData = JSON.stringify(response);
			
			// console.log("responseData : " + responseData);
 
			var message = JSON.parse(response._bodyInit);
			var isSuccess = message.MiResultMsg;
			console.log("message : " + message.MiResultMsg); 

			


			


			var tempList1 = JSON.parse(response._bodyInit);

			console.log("tempList1 : " + JSON.stringify(tempList1));

			tempList1 = tempList1.resultData[1];

			for (var i = 0; i < tempList1.length; i++) {
				var temp2 = tempList1[i].ATCHMNFL_IDX.toString()
				photoListFromServer.push(temp2);
		
			}

			if (isSuccess =="success") {
				
				for (var i = 0; i <photoListFromServer.length ; i++) {
					var dsParam = '{"BILLDATE":"20170301","ESTICODE":"1090101","FROMDATE" :"20170201","GVAREACODE" :"11110","GVBOOKGB":"01","GVESTIYEAR":"2017","GVMEMCODE" :"SEOUL000000000000121","GVMEMID" :"10009987", "GVORGCLSS" :"5","GVUSERCLSS" :"2","PERESTIYEAR" :"2016","TODATE" :"20170229"}';					
					var dsSearch = '{"ATCHMNFL_IDX":"'+photoListFromServer[i]+'"}';

					var baseURL= "http://112.218.172.44:52102/acusr/acc/bil/mImgView.do?";

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




}

module.exports = {
	panelType,
	year, years, month, months, pickerOn, pickerUp, pickerDown,
	uploadOn, tryUpload, cancelUpload,
	pictures, selectionMode, goToSelectionMode, cancelSelectionMode, toggleSelect, header, deleteSelected,
	selectedMode, cancelSelectedMode, selectedPicture, activeIndex,
	save, clicked, spicture, getPhotoList
};
