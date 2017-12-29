/*----------------------------------------------------------------------------------
 * PROJ : CrossCert Project CrossCertificattion System
 * NAME : MsgMgr
 * DESC : 패스워드 문자열 입력시 유효한 입력만을 허용하도록 함
 * AUTHOR : 김정수
 * VER : v1.0
 * 
 * ----------------------------------------------------------------------------------*/
 
package com.crosscert.sample.shared;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.text.Editable;
import android.text.TextWatcher;


/**
 * 패스워드 문자열 입력시 유효한 입력만을 허용하도록 입력제어
 *  
 */
public class PWTextWatcher implements TextWatcher {
	
	private static final char[] SPECIAL_CHARS = {'`','~','!', '@', '#', '$', '%', '^', '&', '*', '(', ')','-','_','=','+','\\','|','[','{',']','}',';',':','\'','\"',',','<','.','>','/','?'};
	 

	private Context context = null;
	private String alertTitleStr="";
	
	
	
	public PWTextWatcher(Context context,String alertTitleStr) {
		this.context = context;
		this.alertTitleStr=alertTitleStr;
	}
	
	/**
	 *  비밀번호를 구성하는 character를 확인
	 *  
	 *  @param ch: single character
	 *  @return 비밀번호 정책에 맞는 character인지를 확인
	 *  
	 */
	private boolean isValid(char ch) {
 
		if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
			return true;
		} else if (ch >= '0' && ch <= '9') {
			return true;
		}
		
		for(char special : SPECIAL_CHARS) {
			if(special == ch) {
				return true;
			}
		}
		
		return false;
	}
	/**
	 * 
	 *  텍스트 입력이 바뀔 때마다 character체크하여 입력 제어
	 *  @param s:선택된 EditText
	 *  @return 없음
	 *  
	 */
	@Override
	public void afterTextChanged(Editable s) {
		for(int i=0; i<s.length(); i++) {
			if(!isValid(s.charAt(i))) {
				s.delete(i, i+1);
				
				AlertDialog.Builder builder=new AlertDialog.Builder(context);
				builder.setTitle(alertTitleStr)			
				.setMessage("입력할 수 없는 문자입니다")
				.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
		   			public void onClick(DialogInterface dialog, int which) {		   				
		   			}});
				builder.create();
				builder.show();
//				Toast.makeText(context, "입력할 수 없는 문자입니다", Toast.LENGTH_SHORT).show();
				break;
			}
		}
	}

	@Override
	public void beforeTextChanged(CharSequence s, int start, int count, int after) {
	}

	@Override
	public void onTextChanged(CharSequence s, int start, int before, int count) {
	}
}
