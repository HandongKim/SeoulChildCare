/*----------------------------------------------------------------------------------
 * PROJ : CrossCert UniSign Library Sample System
 * NAME : ImportCert2InputPasswd
 * DESC : 인증서 가져오기 -> 인증서 비밀번호 입력 화면
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample.movement.importcert;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.EditText;
import android.widget.Toast;

import com.crosscert.android.core.CertListMgr;
import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.android.core.CertUtil;
import com.crosscert.sample.R;
import com.crosscert.sample.mainMenu;
import com.crosscert.sample.shared.PWTextWatcher;

public class ImportCert2InputPasswd extends Activity {
	private static final int DLG_PROCESSING = 0;
	private static final int DLG_FAIL = 1;
	private static final int DLG_SUCCESS = 2;
	static final int RECHECK_PSWD= 3;
	
	private EditText new_passwd_confirm_input; 
	private EditText new_passwd_input;
	private EditText cur_passwd_input;
	
	private CheckBox passwd_chg_check;
	
	private String errorMsg = null;
	private String recheckPasswd=null;
	private boolean showGuide = true;

	/**
	 * 가져오기 시 비밀번호 변경 성공여부를 다이얼로그로 보여줌
	 */
	private final Handler changeHandler = new Handler() {
		public void handleMessage(Message msg) {
			removeDialog(DLG_PROCESSING);
			
			errorMsg = msg.getData().getString("error");
			 
			if(errorMsg == null) {
				showDialog(DLG_SUCCESS);
			} else {
				showDialog(DLG_FAIL);
			}
			
		}
	};
	
    /**
     * Called when the activity is first created.
     *
     * @param savedInstanceState the saved instance state
     */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
	
		super.onCreate(savedInstanceState);	
		setContentView(R.layout.crosscert_sample_movement_importcert_importcert2inputpasswd);
		
		cur_passwd_input=(EditText)findViewById(R.id.import_cur_inputpasswd);
		new_passwd_input=(EditText)findViewById(R.id.import_new_inputpasswd1);
		new_passwd_confirm_input=(EditText)findViewById(R.id.import_new_inputpasswd2);
		
		passwdInputEnabled(false);
		
		passwd_chg_check=(CheckBox)findViewById(R.id.import_CheckBox);
		
		cur_passwd_input.requestFocus();	
				
		new_passwd_confirm_input.setFocusable(false);
		new_passwd_input.setFocusable(false);
		cur_passwd_input.setFocusable(false);
		
		new_passwd_confirm_input.addTextChangedListener(new PWTextWatcher(this,"인증서 이동"));		
		new_passwd_input.addTextChangedListener(new PWTextWatcher(this,"인증서 이동"));
		cur_passwd_input.addTextChangedListener(new PWTextWatcher(this,"인증서 이동"));
		
		passwd_chg_check.setOnCheckedChangeListener(new OnCheckedChangeListener(){
			@Override
			public void onCheckedChanged(CompoundButton buttonView,
					boolean isChecked) {
						if(isChecked){
							passwdInputEnabled(true);							
						}else{
							passwdInputEnabled(false);					
						}		
					}			
			});
		
		cur_passwd_input.setOnFocusChangeListener(new OnFocusChangeListener() {
			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				if(hasFocus) {
					String after = new_passwd_input.getText().toString();
					String confirm = new_passwd_confirm_input.getText().toString();
					
					if(after != null && !"".equals(after)) {
						String errorMsg = CertUtil.verifyPass(after);
						if(errorMsg != null) {

							recheckPasswd=errorMsg;
							showDialog(RECHECK_PSWD);
							new_passwd_input.requestFocus();
							return;
						}
					}
					if(confirm != null && !"".equals(confirm)) {
						String errorMsg = CertUtil.verifyPass(confirm);
						if(errorMsg != null) {
							recheckPasswd=errorMsg;
							showDialog(RECHECK_PSWD);
							
							new_passwd_confirm_input.requestFocus();
							return;
						}
					}
				}
			}
		});
		
		new_passwd_input.setOnFocusChangeListener(new OnFocusChangeListener() {
			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				if(hasFocus) {
					String confirm = new_passwd_confirm_input.getText().toString();
					
					if(confirm != null && !"".equals(confirm)) {
						String errorMsg = CertUtil.verifyPass(confirm);
						if(errorMsg != null) {

							recheckPasswd=errorMsg;
							showDialog(RECHECK_PSWD);
							new_passwd_confirm_input.requestFocus();
							return;
						}
					}
					
					// 개인키 비밀번호 체크 
					// 문자, 숫자, 특수문자 2종류 이상 8자리 이상 수정
					if(showGuide) {
						Toast toast=Toast.makeText(ImportCert2InputPasswd.this,
								"비밀번호 생성 도움말\n\n" +
								"1. 문자,숫자,특수문자 2종류 이상\n 8자 이상 입력\n" +
								"2. 동일문자 반복 제한\n   예) 11111(x), 11113(o)\n" +
								"3. 연속된 문자열(4개 이상 연속) 제한\n   예) 123(o), 1234(x)\n" +
								"4. 동일문자패턴 반복 제한\n   예) 123412(x) : 12가 2번 포함"
						, Toast.LENGTH_LONG);
						toast.setGravity(Gravity.TOP, 0, 0);
						toast.show();
						showGuide = false;
					}
				}
			}
		});
		
		new_passwd_confirm_input.setOnFocusChangeListener(new OnFocusChangeListener() {
			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				if(hasFocus) {
					String after = new_passwd_input.getText().toString();
					
					if(after != null && !"".equals(after)) {
						String errorMsg = CertUtil.verifyPass(after);
						if(errorMsg != null) {

							recheckPasswd=errorMsg;
							showDialog(RECHECK_PSWD);
							new_passwd_input.requestFocus();
							return;
						}
					}
				}
			}
		});
		findViewById(R.id.import_inputpasswd_submit).setOnClickListener(new OnClickListener(){
			@Override
			public void onClick(View v) {
				if(cur_passwd_input.isFocusable()) {
					changePW();				
				} else {
					Intent intent = new Intent(ImportCert2InputPasswd.this, mainMenu.class);
					intent.putExtra("result", "import_success");
					startActivity(intent);
				}
			}			
		});
	}
   
	/**
     * 비밀번호 변경
     *
     * @param 없음
     */
	private void changePW() { 
		String pw_prev = cur_passwd_input.getText().toString();
		String pw_after = new_passwd_input.getText().toString();
		String pw_confirm = new_passwd_confirm_input.getText().toString();
		
		if("".equals(pw_prev)) {

			recheckPasswd="변경전 비밀번호를 입력하세요";
			showDialog(RECHECK_PSWD);
			return;
		}
		
		if("".equals(pw_after)) {
			recheckPasswd="새 비밀번호를 입력하세요";
			showDialog(RECHECK_PSWD);
			return;
		}

		if("".equals(pw_confirm)) {
			recheckPasswd="확인용 비밀번호를 입력하세요";
			showDialog(RECHECK_PSWD);
			return;
		}
		
		if(!pw_after.equals(pw_confirm)) {
			recheckPasswd="새 비밀번호와 확인용 비밀번호가 일치하지 않습니다";
			showDialog(RECHECK_PSWD);
			return;
		}
		
		errorMsg = CertUtil.verifyPass(pw_after);
		if(errorMsg != null) {
			recheckPasswd=errorMsg;
			showDialog(RECHECK_PSWD);
			return;
		}
		
		ChangePWThread thread = new ChangePWThread(changeHandler);
   		thread.start();

		showDialog(DLG_PROCESSING);
		
	}
	
	/**
	 * showDialog콜백 함수
	 * ImportCert2InputPasswd Activity에서 호출되는 모든 다이얼로그를 id에 따라 관리
	 * 
	 * @param  id:다이얼로그 id
	 * @return 다이얼로그
	 */	
	protected Dialog onCreateDialog(int id) {
   		
   		AlertDialog.Builder builder = null;
   		
		switch(id) {
		case DLG_PROCESSING:
			ProgressDialog dlgChangePW=ProgressDialog.show(this, 
					"요청 처리중", "비밀번호 변경중입니다.\n 잠시만 기다려 주십시오");

	   		return dlgChangePW;

		case DLG_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 이동")			
			.setMessage(errorMsg)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(DLG_FAIL);
	   			}});
	   		return builder.create();
	   		
		case DLG_SUCCESS:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 이동")			
			.setMessage("비밀번호 변경에 성공하였습니다.")
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(DLG_SUCCESS);
	   				
					Intent intent = new Intent(ImportCert2InputPasswd.this, mainMenu.class);
					intent.putExtra("result", "import_success");
					startActivity(intent);
	   			}});
	   		
	   		return builder.create();
	   		
		case RECHECK_PSWD:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 이동")			
			.setMessage(recheckPasswd)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(RECHECK_PSWD);	   				  		 
	   			}});
	   		
	   		return builder.create();
			
		default:
			break;
		}
		return null;
	}
    
	/**
     * 비밀번호 변경 활성화 여부에 따라  입력창 변화
     *
     * @param enabled: 비밀번호 변경 형식 활성화 여부
     */
	private void passwdInputEnabled(boolean enabled){
		if(enabled){
			
			new_passwd_confirm_input.setBackgroundColor(Color.rgb(247, 247, 247));
			new_passwd_input.setBackgroundColor(Color.rgb(247, 247, 247));
			cur_passwd_input.setBackgroundColor(Color.rgb(247, 247, 247));

			cur_passwd_input.setFocusableInTouchMode(true);		
			new_passwd_confirm_input.setFocusableInTouchMode(true);
			new_passwd_input.setFocusableInTouchMode(true);
			
			cur_passwd_input.requestFocus();
			
		}else{

			new_passwd_confirm_input.setBackgroundColor(Color.rgb(51, 73, 113));
			new_passwd_input.setBackgroundColor(Color.rgb(51, 73, 113));
			cur_passwd_input.setBackgroundColor(Color.rgb(51, 73, 113));
			new_passwd_confirm_input.setFocusable(false);
			new_passwd_input.setFocusable(false);
			cur_passwd_input.setFocusable(false);
		}
	}
	
	@Override
	protected void onStop() {
		super.onStop();
		this.finish();
	}
	

	/**
	 * 인증서 가져오기 시 비밀번호 변경 기능을 수행하는 쓰레드 클래스 : 
	 * 중계 API 초기화,승인번호 생성,PC와 연결 등 
	 */
	private class ChangePWThread extends Thread {
		Handler mHandler;
		
		ChangePWThread(Handler h) {
			mHandler = h;
		}
		
		public void run() {
			String errorMsg = CertToolkitMgr.getInstance().logicChangeCertPW(
					CertListMgr.getInstance().getCurCert(), 
					cur_passwd_input.getText().toString(), 
					new_passwd_input.getText().toString() 
			);

			Bundle b = new Bundle();
			b.putString("error", errorMsg);

			Message msg = mHandler.obtainMessage();
			msg.setData(b);

			mHandler.sendMessage(msg);
		}
	}
}
