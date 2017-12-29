package com.crosscert.sample.util;

import java.text.DecimalFormat;
import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.util.Log;

public class FormatUtil {
	@SuppressWarnings("unused")
	private static final String TAG = FormatUtil.class.getSimpleName();

	// number format
	/**
	 * #이나 0 이나 모두 숫자를 표시
	 *	#은 0일 경우 숫자를 표시하지 않고,
	 * 0은 0일 경우에도 숫자를 표시한다./
	 */
	private static DecimalFormat mNumberlFormat = new DecimalFormat("#,##0.##");
	private static DecimalFormat mDecimalFormat = new DecimalFormat(".##");
	// date format
	private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	private static SimpleDateFormat mDateFormat = new SimpleDateFormat(DATE_FORMAT);

	public static final String DATE_FORMAT_PARAM = "yyyy-MM-dd";
	private static SimpleDateFormat mParamDateFormat = new SimpleDateFormat(DATE_FORMAT_PARAM);

	public static final String DATE_FORMAT_PARAM2 = "yyyyMMdd";
	private static SimpleDateFormat mParamDateFormat2 = new SimpleDateFormat(DATE_FORMAT_PARAM2);

	private static final String DATE_FORMAT_PARAM_TIME = "HH:mm:ss";
	private static SimpleDateFormat mParamTimeFormat = new SimpleDateFormat(DATE_FORMAT_PARAM_TIME);

	private static final String DATE_FORMAT_PARAM_TIME2 = "HHmmss";
	private static SimpleDateFormat mParamTimeFormat2 = new SimpleDateFormat(DATE_FORMAT_PARAM_TIME2);

	private static final String DATE_MIN_FORMAT = "yyyy-MM-dd HH:mm";
	private static SimpleDateFormat mDateMinFormat = new SimpleDateFormat(DATE_MIN_FORMAT);

	public static final String DATE_RSV_DATE = "yyyyMMddHHmmss";
	public static final String DATE_RSV_DATE2 = "yyyy-MM-dd-HH:mm:ss";
	private static SimpleDateFormat mDateRsvFormat = new SimpleDateFormat(DATE_RSV_DATE);

	public static final String DATE_FORMAT_PARAM_SLASH = "yyyy/MM/dd HH:mm";
	private static SimpleDateFormat mParamDateFormatSl = new SimpleDateFormat(DATE_FORMAT_PARAM_SLASH);

	public static final String DATE_FORMAT_PARAM_HOUR_MINUTE = "HH:mm";
	private static SimpleDateFormat mPraramHourMinute = new SimpleDateFormat(DATE_FORMAT_PARAM_HOUR_MINUTE);

	public static final String DATE_FORMAT_DOT_DATE = "yyyy.MM.dd";
	private static SimpleDateFormat mPraramDotDateFormat = new SimpleDateFormat(DATE_FORMAT_DOT_DATE);

	/**
	 * 지정된 포멧으로 출력합니다.
	 * @param dateFormat
	 * @param date
	 * @return
	 */
	public static String toFormat(String dateFormat, Date date) {
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		return format.format(date);
	}

	/**
	 * yyyy-MM-dd HH:mm:ss 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formyyyyMMddHHmmss(Date date) {
		return mDateFormat.format(date);
	}

	/**
	 * yyyy.MM.dd 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formDotyyyyMMdd(Date date){
		return mPraramDotDateFormat.format(date);
	}

	/**
	 * yyyy-MM-dd HH:mm:ss 형식의 값을 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * 
	 *  - Json 내에 사용되는 Date 값을 파싱합니다.
	 * @param date
	 * @return
	 */
	public static Date formyyyyMMddHHmmss(String date) {
		try {
			return mDateFormat.parse(date);
		} catch (ParseException e) {
			//Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}

	/**
	 * # String to Date
	 * @param dateStr
	 * @return
	 */
	public Date formyyyyMMddHHmmssNoSeparator(String dateStr) {
		try {
			return mDateRsvFormat.parse(dateStr);
		} catch (ParseException e) {
			return null;
			//Log.e(TAG, "date format error! - " + dateStr, e);
		}
		
	}
	
	/**
	 * yyyy-MM-dd HH:mm 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formyyyyMMddHHmm(Date date) {
		return mDateMinFormat.format(date);
	}

	/**
	 * yyyy-MM-dd HH:mm 형식의 값을 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * 
	 *  - Json 내에 사용되는 Date 값을 파싱합니다.
	 * @param date
	 * @return
	 */
	public static Date formyyyyMMddHHmm(String date) {
		try {
			return mDateMinFormat.parse(date);
		} catch (ParseException e) {
			Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}

	/**
	 * date를 "HH:mm:ss" 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formHHmm(Date date) {
		return mParamTimeFormat.format(date);
	}

	/**
	 * "HH:mm:ss" 형식의 String를 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * @param date
	 * @return
	 */
	public static Date formHHmm(String date) {
		try {
			return mParamTimeFormat.parse(date);
		} catch (ParseException e) {
			Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}

	/**
	 * date를 "yyyy-MM-dd" 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formyyyyMMddHyphen(Date date) {
		return mParamDateFormat.format(date);
	}

	/**
	 * date를 "yyyyMMdd" 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formyyyyMMdd(Date date) {
		return mParamDateFormat2.format(date);
	}

	/**
	 * "yyyy-MM-dd" 형식의 String를 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * @param date
	 * @return
	 */
	public static Date formyyyyMMddHyphen(String date) {
		try {
			return mParamDateFormat.parse(date);
		} catch (ParseException e) {
			//Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}

	/**
	 * "yyyyMMdd" 형식의 String를 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * @param date
	 * @return
	 */
	public static Date formyyyyMMdd(String date) {
		try {
			return mParamDateFormat2.parse(date);
		} catch (ParseException e) {
			//Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}

	/**
	 * date를 "yyyyMMddHHmmss" 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String formyyyyMMddHHmmNoSeparator(Date date) {
		String result = "";
		try {
			result = mDateRsvFormat.format(date);
		} catch (Exception e) {
		}

		return result;
	}

	/**
	 * "yyyyMMddHHmmss" 형식의 String를 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * @param date
	 * @return
	 */
	public static Date formyyyyMMddHHmmNoSeparator(String date) {
		try {
			return mDateRsvFormat.parse(date);
		} catch (ParseException e) {
			//Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}


	/**
	 * date를 "yyyy/MM/dd HH:mm" 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String toShashDate(Date date) {
		return mParamDateFormatSl.format(date);
	}

	/**
	 * "yyyy/MM/dd HH:mm" 형식의 String를 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * @param date
	 * @return
	 */
	public static Date fromHourMinute(String date) {
		try {
			return mPraramHourMinute.parse(date);
		} catch (ParseException e) {
			PrintLog.upLoadLog(TAG, "fromHourMinute", e);
			return null;
		}
	}
	

	/**
	 * date를 "mm:ss" 형식으로 출력합니다.
	 * @param date
	 * @return
	 */
	public static String toHourMinute(Date date) {
		String result = "";
		try {
			result = mPraramHourMinute.format(date);
		} catch (Exception e) {
		}
		return result;
	}

	/**
	 * "mm:ss" 형식의 String를 date객체로 변환합니다.
	 * 형식이 맞지 않으면 null을 반환합니다.
	 * @param date
	 * @return
	 */
	public static Date fromShashDate(String date) {
		try {
			return mParamDateFormatSl.parse(date);
		} catch (ParseException e) {
			//PrintLog.upLoadLog(TAG, e);
			//Log.e(TAG, "date format error! - " + date, e);
			return null;
		}
	}

	/**
	 * 2014-09-14 --> 20140914
	 * @param paramDateStr
	 * @return
	 */
	public static String ConvertParamToParam2(String paramDateStr) {
		String result = "";

		try {
			String[] tempBirth = paramDateStr.split("-");
			String birth_Year = tempBirth[0];
			String birth_Month = tempBirth[1];
			String birth_Day = tempBirth[2];
			result = birth_Year + birth_Month + birth_Day;
		} catch (Exception e) {
		}
		return result;

	}

	/**
	 * 20140914 --> 2014-09-14
	 * @return
	 */
	public static String ConvertParam2ToParam(String param2DateStr) {
		String result = "";

		try {
			result += param2DateStr.substring(0, 4);
			result += "-";
			result += param2DateStr.substring(4, 6);
			result += "-";
			result += param2DateStr.substring(6, 8);
		} catch (Exception e) {
		}
		return result;

	}
	
	/**
	 * 2014 --> 20:14
	 * @return
	 */
	public static String ConvertParam2ToParamTime(String param2TimeStr) {
		String result = "";

		try {
			result += param2TimeStr.substring(0, 2);
			result += ":";
			result += param2TimeStr.substring(2, 4);
		} catch (Exception e) {
		}
		return result;

	}

	/**
	 * 3자리씩 ","로 끊어서 출력합니다.
	 *
	 * @param num
	 * @return
	 */
	public static String toMoney(final int num) {
		return mNumberlFormat.format(num);
	}

	/**
	 * 3자리씩 ","로 끊어서 출력합니다.
	 *
	 * @param num
	 * @return
	 */
	public static String toMoney(final double num) {
		
		return mNumberlFormat.format(num);
	}

	/**
	 * 3자리씩 ","로 끊어서 출력합니다.
	 *
	 * @param num
	 * @return
	 */
	public static String toMoney(final float num) {
		return mNumberlFormat.format(num);
	}

	public static String toMoney(final String num) {
		String tempNum = "";
		int decimalStartIndex = num.indexOf(".");
		
		String decimal="";
		if(decimalStartIndex>0){
			decimal  = num.substring(decimalStartIndex);
			tempNum = num.substring(0, decimalStartIndex).replace(",", "");
		}else{
			tempNum = num.replace(",", "");
		}
		
//		PrintLog.d(TAG, "decimal : "+decimal);
		if (tempNum.equals("")) {
			return "0";
		}
		
		double input = Double.parseDouble(tempNum);
		StringBuffer sb = new StringBuffer();
		sb.append(mNumberlFormat.format(input));
		if(decimalStartIndex>0){
			sb.append(decimal);
		}
		PrintLog.d(TAG, "sb.toString() : "+sb.toString());
		return sb.toString();
	}

	public static String toPercent(final float num) {
		return MessageFormat.format("{0,number,#.##%}", num);
	}
	
	/**
	 * 사업자 등록번호를 형태에 맞는 포맷으로 변환합니다.
	 * @param registNo
	 * @return
	 */
	public static String registerNoConvert(final String registNo) {
		StringBuffer registerNoCode = new StringBuffer(registNo);
		registerNoCode.insert(3, "-");
		registerNoCode.insert(6, "-");
		return registerNoCode.toString();
	}

	/**
	 * 신용카드 번호에 맞는 포매승로 변환합니다.
	 * @param cardNo
	 * @return
	 */
	public static String cardNoConvert(final String cardNo) {
		StringBuffer registerNoCode = new StringBuffer(cardNo);
		registerNoCode.insert(4, "-");
		registerNoCode.insert(9, "-");
		registerNoCode.insert(14, "-");
		return registerNoCode.toString();
	}

	/**
	 * 현금영수증에 맞는 포맷을 변환합니다.
	 * @param cardNo
	 * @return
	 */
	public static String cashReceiptNoConvert(final String cardNo) {
		StringBuffer registerNoCode = new StringBuffer(cardNo);
		if (cardNo.length() == 11) {
			registerNoCode.insert(3, "-");
			registerNoCode.insert(8, "-");
		} else if (cardNo.length() == 10) {
			registerNoCode.insert(3, "-");
			registerNoCode.insert(6, "-");
		}
		return registerNoCode.toString();
	}

	public static String appendZeroToCdGoods(final int num) {
		StringBuffer sbResult = new StringBuffer();
		for (int j = Integer.toString(num).length(); j < 7; j++) {
			sbResult.append("0");
		}
		sbResult.append(num);
		return sbResult.toString();
	}

	public static String fillZeroLeft(String value, int size) {
		StringBuffer sbResult = new StringBuffer();
		for (int j = value.length(); j < size; j++) {
			sbResult.append("0");
		}
		sbResult.append(value);
		return sbResult.toString();
	}

	public static String fillZeroLeft(int value, int size) {
		StringBuffer sbResult = new StringBuffer();
		for (int j = Integer.toString(value).length(); j < size; j++) {
			sbResult.append("0");
		}
		sbResult.append(value);
		return sbResult.toString();
	}

	public static String fillSpaceLeft(String value, int size) {
		StringBuffer sbResult = new StringBuffer();
		for (int j = value.length(); j < size; j++) {
			sbResult.append(" ");
		}
		sbResult.append(value);
		return sbResult.toString();
	}
	public String cutString(String src, int bytesLimit) {
		if (src == null) return "";
		byte[] bytes = src.getBytes();
		String rv = src;
		if (bytes.length > bytesLimit) {
			double cutRatio = bytesLimit / bytes.length;
			int newCharLen = (int)Math.ceil(src.length() * cutRatio);
			rv = src.substring(0, newCharLen);
		}
		return rv;
	}

	public static String fillSpaceRightByByte(String src,
											  int bytesLimit,
											  int strLength,
											  int magnificationValue) {
		PrintLog.m("","fillSpaceRightByByte");
		StringBuffer sbResult = new StringBuffer();
		if (src == null){
			return "";
		}

		String rv = src;
//		byte[] bytes = src.getBytes();

		PrintLog.d("","src : "+src);
		PrintLog.d("","bytesLimit : "+bytesLimit);
		PrintLog.d("","strLength : "+strLength);
//		byte[] bytes = src.getBytes();
//		PrintLog.d("","bytes : "+bytes.length);

		if (strLength > bytesLimit) {
			double cutRatio = bytesLimit / strLength;
			int newCharLen = (int)Math.ceil(src.length() * cutRatio);
			rv = src.substring(0, newCharLen);
			sbResult.append(rv);
		}else{
			sbResult.append(rv);
			PrintLog.d("","bytesLimit - strLength : "+(bytesLimit - strLength));
			int countSpace = (bytesLimit - strLength)/magnificationValue;
			PrintLog.d("","countSpace : "+countSpace);

			for (int j = 0 ; j < countSpace ; j++) {
				sbResult.append(" ");
			}

		}

//		PrintLog.d("","주문 메뉴 크기공백포함: "+sbResult.toString().getBytes().length);
		return sbResult.toString();
	}

	public static String fillSpaceLeftByByte(String src, int bytesLimit, int magnificationValue) {

		StringBuffer sbResult = new StringBuffer();
		if (src == null){
			return "";
		}

		String rv = src;
		int srcLength = src.length()*magnificationValue;
//		byte[] bytes = src.getBytes();
		PrintLog.d("","srcLength : "+srcLength);
		PrintLog.d("","bytesLimit : "+bytesLimit);


		if (srcLength > bytesLimit) {
			double cutRatio = bytesLimit / srcLength;
			int newCharLen = (int)Math.ceil(src.length() * cutRatio);
			rv = src.substring(0, newCharLen);
			sbResult.append(rv);
		}else{
			for (int j = srcLength ; j < bytesLimit/magnificationValue ; j++) {
				sbResult.append(" ");
			}
			sbResult.append(rv);
		}

		PrintLog.d("","주문수량 크기공백포함: "+sbResult.toString().getBytes().length);
		return sbResult.toString();
	}

	public static boolean includeNotEngChar(char str) {
		PrintLog.d(TAG,"str : "+(int)str);
		char ch = str;
		Character.UnicodeBlock unicodeBlock = Character.UnicodeBlock.of(ch);
		if( Character.UnicodeBlock.HANGUL_SYLLABLES.equals(unicodeBlock) ||
				Character.UnicodeBlock.HANGUL_COMPATIBILITY_JAMO.equals(unicodeBlock) ||
				Character.UnicodeBlock.HANGUL_JAMO.equals(unicodeBlock) ||
				Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS.equals(unicodeBlock) ||
				Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A.equals(unicodeBlock) ||
				Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B.equals(unicodeBlock) ||
				Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS.equals(unicodeBlock) ||
				Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT.equals(unicodeBlock) ||
				Character.UnicodeBlock.HIRAGANA.equals(unicodeBlock) ||
				Character.UnicodeBlock.KATAKANA.equals(unicodeBlock) ||
				Character.UnicodeBlock.KATAKANA_PHONETIC_EXTENSIONS.equals(unicodeBlock)||
				(int)str>255
				){
			return true;
		}else{
			return false;
		}
	}

	public static String fillSpaceLeft(int value, int size) {
		StringBuffer sbResult = new StringBuffer();
		for (int j = Integer.toString(value).length(); j < size; j++) {
			sbResult.append(" ");
		}
		sbResult.append(value);
		return sbResult.toString();
	}

	public static String fillSpaceRight(String value, int size) {
		StringBuffer sbResult = new StringBuffer();
		sbResult.append(value);
		for (int j = value.length(); j < size; j++) {
			sbResult.append(" ");
		}
		return sbResult.toString();
	}

	public static String fillSpaceRight(int value, int size) {
		StringBuffer sbResult = new StringBuffer();
		sbResult.append(value);
		for (int j = Integer.toString(value).length(); j < size; j++) {
			sbResult.append(" ");
		}
		return sbResult.toString();
	}

}
