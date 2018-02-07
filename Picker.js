		var Observable = require('FuseJS/Observable');

		var Backend = require('Backend.js');
		var isScrolling = Observable(false);
		var stopScrolling = Observable(false);
		var endPosition = Observable();
		var position = Observable(0);
		var scrollPosition = Observable(50);
		var selecting = Observable();
		
		function scrollFunction(arg) {
			// console.log("11111111111");
			position.value = arg.value[1];
			// console.log("222222222222");
			isScrolling.value = true;
			stopScrolling.value = false;
			endPosition.value = Math.round((position.value-10)/50) * 50;

			// console.log("333333333333");
		}

		function initializeForPicker () {
			console.log("initializeinitializeinitializeinitializeinitializeinitializeinitializeinitializeinitializeinitializeinitialize");
			position.value = 0;
			// console.log("222222222222");
			isScrolling.value = true;
			stopScrolling.value = false;
			endPosition.value = Math.round((position.value-10)/50) * 50;
		}

		function stopScroll() {
			isScrolling.value = false;
			stopScrolling.value = true;
		}

		function scrolling(arg) {
			//console.log(arg.data.index);
		}

		var srcData = this.Data.inner();

		var i = 1;
		var datas = srcData.map(function(data) {
			console.log("")
			return {
				data: data,
				index: i++
			}
		});

		module.exports = {
			position, scrollFunction, stopScroll, isScrolling, scrolling, endPosition, stopScrolling,
			datas, scrollPosition, initializeForPicker
		};