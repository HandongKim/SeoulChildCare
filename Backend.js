var Observable = require('FuseJS/Observable');

var subject = {
	isChoice: Observable(),
	color: Observable(),
	type: Observable(),
	text: Observable()
};

var dsParam="";

module.exports = {
	subject, dsParam
};