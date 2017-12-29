/*----------------------------------------------------------------------------------
 * PROJ : CrossCert UniSign Library Sample System
 * NAME : ExportCert1InputPasswd
 * DESC : 인증서 내보내기 -> 인증서 비밀번호 입력 화면
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample.movement.exportcert;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.SystemClock;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.EditText;

import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertListMgr;
import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.sample.R;
import com.crosscert.sample.shared.PWTextWatcher;

public class ExportCert1InputPasswd extends Activity {

	private static final int DLG_PROCESSING = 0;
	private static final int DLG_FAIL = 1;
	static final int RECHECK_PSWD= 2;

	private EditText ed_passwdConfirm;	
	private String errorMsg = null;
	private String recheckPasswd=null;
	

	/**
	 * 인증서 내보내기 성공 여부에 따라, 성공시에는 비밀번호 입력화면을 호출하고 
	 * 실패시는 실패여부를 다이얼로그로 보여줌
	 */

	private final Handler pwHandler = new Handler() {
		public void handleMessage(Message msg) {
			removeDialog(DLG_PROCESSING);
			
			errorMsg = msg.getData().getString("error");
			 
			if(errorMsg == null) {
				Intent intent = new Intent(ExportCert1InputPasswd.this, ExportCert2ApproveNum.class);
				startActivity(intent);
			} else {
				showDialog(DLG_FAIL);

				findViewById(R.id.export_inputpasswd_submit).setOnClickListener(new OnClickListener(){
					@Override
					public void onClick(View v) {
						VerifyPWThread thread = new VerifyPWThread(pwHandler);
						thread.start();
						findViewById(R.id.export_inputpasswd_submit).setOnClickListener(null);
					}			
				});
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
		setContentView(R.layout.crosscert_sample_movement_exportcert_exportcert1inputpasswd);
		
		ed_passwdConfirm=(EditText)findViewById(R.id.export_inputpasswd);
		
		findViewById(R.id.export_inputpasswd_submit).setOnClickListener(new OnClickListener(){
			@Override
			public void onClick(View v) {
				String passwd = ed_passwdConfirm.getText().toString();
				if(passwd == null || "".equals(passwd)) {

					recheckPasswd="비밀번호를 입력하십시오.";
					showDialog(RECHECK_PSWD);
//					Toast.makeText(ExportCert2InputPasswd.this, "비밀번호를 입력하십시오.", Toast.LENGTH_LONG).show();
					return;
				}
				
				VerifyPWThread thread = new VerifyPWThread(pwHandler);
				thread.start();
				findViewById(R.id.export_inputpasswd_submit).setOnClickListener(null);
			}			
		});
	
		ed_passwdConfirm.addTextChangedListener(new PWTextWatcher(this,"인증서 이동"));
	}	
	@Override
	protected void onStop() {
		super.onStop(); 
		this.finish();
	}
	
	/**
	 * showDialog콜백 함수
	 * Exportcert2InputPasswd에서 호출되는 모든 다이얼로그를 id에 따라 관리
	 * 
	 * @param  id: 다이얼로그 id
	 * @return 다이얼로그
	 */	
	
	protected Dialog onCreateDialog(int id) {
   		
   		AlertDialog.Builder builder = null;
   		
		switch(id) {
		case DLG_PROCESSING:
			ProgressDialog dlgChangePW=ProgressDialog.show(this, 
					"요청 처리중", "비밀번호 검증중입니다.\n 잠시만 기다려 주십시오");

	   		return dlgChangePW;

		case DLG_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 이동 실패")			
			.setMessage(errorMsg)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(DLG_FAIL);
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
	 * 인증서 내보내기시에 비밀번호를 검증하는 Thread
	 */
	private class VerifyPWThread extends Thread {
		Handler mHandler; 
		
		VerifyPWThread(Handler h) {
			mHandler = h;
		}
		
		public void run() {
			
			// 선택된 인증서 정보 클레스 획득
			Cert cert = CertListMgr.getInstance().getCurCert();
			
			String errorMsg = null;
			byte[] key = null; 
			
			try {
				// 인증서 복호화 ( 인증서 비밀번호 체크 )
				// Function
				//		CertToolkitMgr.getInstance().certDecryptPriKey(...);
				// Parameters
				//   	ed_passwdConfirm.getText().toString().getBytes() : 인증서 비밀번호
				//   	cert.getBSignPriKey() : 인증서 개인키
				// Return Value
				//		key : 복호화된 개인키, 실패이면 null
				key = CertToolkitMgr.getInstance().certDecryptPriKey(
						ed_passwdConfirm.getText().toString().getBytes(), cert.getBSignPriKey()
				);
				
				if(key == null) {
					errorMsg = "비밀번호 검증 중 오류가 발생했습니다.";
				}
			} catch (Exception e) {
				errorMsg = "잘못된 비밀번호입니다.";
			}

			SystemClock.sleep(2000);
			
			Bundle b = new Bundle();
			b.putString("error", errorMsg);

			Message msg = mHandler.obtainMessage();
			msg.setData(b);

			mHandler.sendMessage(msg);
		}
	}
}
