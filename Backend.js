var Observable = require('FuseJS/Observable');

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














module.exports = {
	subject, dsParam, noteManageParamValuesForDetailNote, choiceSubjectList
};