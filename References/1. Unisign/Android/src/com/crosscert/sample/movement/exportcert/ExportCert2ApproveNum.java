/*----------------------------------------------------------------------------------
 * PROJ : CrossCert UniSign Library Sample System
 * NAME : ExportCert2ApproveNum
 * DESC : 인증서 내보내기 -> 승인번호 띄워지는 화면
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample.movement.exportcert;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.EditText;
import android.widget.TextView;

import com.crosscert.androidustk;
import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertListMgr;
import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.sample.R;
import com.crosscert.sample.SampleApp;
import com.crosscert.sample.mainMenu;

public class ExportCert2ApproveNum extends Activity {

	private static final int DLG_APPVNUM = 0;
	private static final int DLG_APPVNUM_FAIL = 1;
	private static final int DLG_CONNECTED = 2;
	private static final int DLG_EXPORT_FAIL = 3;
	
	private EditText approvalNum1;
	private EditText approvalNum2;
	private EditText approvalNum3;	
	private TextView leftTime;

	
	private String errorMsg = null;	
	private ExportCertThread exportThread = null; 

//	private static final String appkey = "xzSEJj28hfUz1Bm0abrorQ==";
//	private static final String appkey = "Td6EXXXBthUPJQXqDsLUog==";
	
	/**
	 * 승인번호를 받아 화면에 뿌려줌
	 */	
	final Handler numHandler = new Handler() {
		public void handleMessage(Message msg) {
			removeDialog(DLG_APPVNUM);
			
			errorMsg = msg.getData().getString("error");
			 
			if(errorMsg == null) {
				String appvNum = msg.getData().getString("appvNum");
				
				approvalNum1.setText(appvNum.substring(0, 4));
				approvalNum2.setText(appvNum.substring(4, 8));
				approvalNum3.setText(appvNum.substring(8));
				
			} else {
				showDialog(DLG_APPVNUM_FAIL);
			}
		}
	};
	

	/**
	 * PC와 연결시 다이얼로그를 띄어줌
	 */
	final Handler connHandler = new Handler() {
		public void handleMessage(Message msg) {
			showDialog(DLG_CONNECTED);
		}
	};
	
	/**
	 * 인증서 내보내기 성공여부에따라 성공시 MvmtResult 호출, 실패시 다이얼로그 보여줌
	 */
	final Handler exportHandler = new Handler() {
		public void handleMessage(Message msg) {
			removeDialog(DLG_CONNECTED);
			
			errorMsg = msg.getData().getString("error");
			 
			if(errorMsg == null) {
				Intent intent = new Intent(ExportCert2ApproveNum.this,mainMenu.class);
	       		intent.putExtra("result", "export_success");
   				ExportCert2ApproveNum.this.finish();
   				
	       		startActivity(intent);      		 
			} else {
				showDialog(DLG_EXPORT_FAIL);
			}
		}
	};
	
	/**
	 * 인증서 가져오기 타임아웃 설정 및 남은시간 세팅
	 */
	final CountDownTimer timer = new CountDownTimer(600000, 1000) {

		@Override
		public void onFinish() {
			leftTime.setText("");
		}

		@Override
		public void onTick(long millisUntilFinished) {
			long sec = millisUntilFinished / 1000;
			
			long m_left = sec / 60;
			long s_left = sec % 60;
			
			String m_left_str = "0" + m_left;
			String s_left_str = s_left < 10 ? "0"+s_left : ""+s_left;
			
			leftTime.setText("접속대기시간  "+m_left_str+":"+s_left_str);
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
			setContentView(R.layout.crosscert_sample_movement_exportcert_exportcert2approvenum);
			
			approvalNum1=(EditText)findViewById(R.id.export_num1);
			approvalNum2=(EditText)findViewById(R.id.export_num2);
			approvalNum3=(EditText)findViewById(R.id.export_num3);
			leftTime=(TextView)findViewById(R.id.export_time);
			
			approvalNum1.setFocusable(false);
			approvalNum2.setFocusable(false);
			approvalNum3.setFocusable(false); 

			showDialog(DLG_APPVNUM);
			
			exportThread = new ExportCertThread(numHandler, connHandler, exportHandler, timer);
			exportThread.start();
	}	
	
	@Override
	protected void onStop() {
		super.onStop();
		
		if(exportThread != null) {
			exportThread.stopWaiting();
			timer.cancel();
		}

		// UniSign 인증서 이동 종료
		CertToolkitMgr.getInstance().transFinalize();
		
		finish();
	}
	
	/**
	 * showDialog콜백 함수
	 * ExportCert3ApproveNum Activity에서 호출되는 모든 다이얼로그를 id에 따라 관리
	 * 
	 * @param  id:다이얼로그 id
	 * @return 다이얼로그
	 */	
	protected Dialog onCreateDialog(int id) {
		
		AlertDialog.Builder builder = null;
   		
		switch(id) {
		case DLG_APPVNUM:
			ProgressDialog importProgressDialog=ProgressDialog.show(this, 
					"승인번호 생성", "중계서버로부터 승인번호 발급중");
	   		return importProgressDialog;

		case DLG_APPVNUM_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("승인번호 생성 실패")
			.setMessage(errorMsg)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(DLG_APPVNUM_FAIL);
					
  					Intent intent = new Intent(ExportCert2ApproveNum.this,mainMenu.class);
		       		intent.putExtra("result", "export_fail");
		       		startActivity(intent);      		 
	   			}});
	   		
	   		return builder.create();

		case DLG_CONNECTED:
			ProgressDialog waitDialog=ProgressDialog.show(this, 
					"인증서 이동", "PC로 인증서를 전송하고 있습니다");
	   		return waitDialog;
	   		
		case DLG_EXPORT_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 내보내기 실패")
			.setMessage(errorMsg)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(DLG_EXPORT_FAIL);
					
  					Intent intent = new Intent(ExportCert2ApproveNum.this,mainMenu.class);
		       		intent.putExtra("result", "export_fail");
		       		startActivity(intent);      		 
	   			}});

			return builder.create();

		default:
			break;
		}
		return null;
	}
	
	/**
	 * 인증서 내보내기를 수행하는 쓰레드 : 중계 API 초기화,승인번호 생성,PC와 연결 등 
	 */
	private class ExportCertThread extends Thread {
		private Handler numHandler;
		private Handler connHandler;
		private Handler exportHandler;
		private CountDownTimer timer;
		
		private static final int DIRECTION = 0x20;  // export code
		
		private boolean waiting = false;
		
		ExportCertThread(Handler numHandler, Handler connHandler, Handler exportHandler, CountDownTimer timer) {
			this.numHandler = numHandler;
			this.connHandler = connHandler;
			this.exportHandler = exportHandler;
			this.timer = timer;
		}
		
		public void run() {
			Message msg;
			Bundle b = new Bundle();
			
			// 인증서 이동 API 초기화
			// Function
			//		CertToolkitMgr.getInstance().transInit(...);
			// Parameters
			//		ID     : 앱 ID
			//   	crskey : 인증서 이동 서버 라이센스
			//		state  : false
			// Return Value
			//		boolean : 인증서 이동 초기화 성공 : true, 실패 : false

			if(!CertToolkitMgr.getInstance().transInit(getPackageName(),SampleApp.APP_LICENSEKEY,false)) {
				b.putString("error", "중계서버 접속 중 오류가 발생했습니다");

				msg = numHandler.obtainMessage();
				msg.setData(b);

				numHandler.sendMessage(msg);
				return;
			}
			
			try {
				
				// 기기고유정보 : 전화번호 또는 시리얼번호
				String telephone = getTelephoneNumber();

				// 인증서 이등 승인번호 획득
				// Function 
				// 		CertToolkitMgr.getInstance().transGenerateCertNum(...)
				// Parameters
				//   	telephone : 기기고유정보
				//		CertToolkitMgr.DIRECTION_EXPORTCERT : 인증서 내보내기 설정
				// Return Value
				//		certNum : 인증서 이동 초기화 성공 : true, 실패 : false
				String certNum = CertToolkitMgr.getInstance().transGenerateCertNum(telephone, DIRECTION);
				if(!isValidCertNum(certNum)) { return; }
				
				// PC와 연결 대기 부분
				waiting = true;
				timer.start();
				
				// PC 접속 대기 확인
				// Function 
				// 		CertToolkitMgr.getInstance().transIsPCConnected()
				// Parameters
				//   	
				// Return Value
				//		true : PC 접속, false : PC 접속 실패
				if(CertToolkitMgr.getInstance().transIsPCConnected()) {
					msg = connHandler.obtainMessage();
					connHandler.sendMessage(msg);
				} else {
					timer.cancel();
					if(waiting) {
						// 실패 화면으로 이동
						b.putString("error", "접속 대기시간을 초과했습니다.");
						msg = exportHandler.obtainMessage();
						msg.setData(b);
			
						exportHandler.sendMessage(msg);
						// 스마트폰 인증서 이동 종료
						// Function 
						// 		CertToolkitMgr.getInstance().transFinalize()
						// Parameters
						//   	
						// Return Value
						//		
						CertToolkitMgr.getInstance().transFinalize();
						return;
					} else {
						// 스마트폰 인증서 이동 종료
						// Function 
						// 		CertToolkitMgr.getInstance().transFinalize()
						// Parameters
						//   	
						// Return Value
						//		
						CertToolkitMgr.getInstance().transFinalize();
						return;
					}
				}
				waiting = false;
				
				Cert cert = CertListMgr.getInstance().getCurCert();

				// 스마트폰 인증서 PC로 내보내기
				// Function 
				// 		CertToolkitMgr.getInstance().transExportCert(...)
				// Parameters
				//   	androidustk.USC_ALG_SYMM_SEED : 인증서 내보내기 암호화 모듈 ( SEED 알고리즘 )
				//		cert.getBSignCert() : 서명용 인증서
				//		cert.getBSignPriKey() : 서명용 인증서 개인키
				//		cert.getBKMCert() : 키관리용 인증서
				//		cert.getBKMPriKey() : 키관리용 인증서 개인키
				// Return Value
				//		exportSuccess :  인증서이동 성공(true) 또는 실패(false)	
				boolean exportSuccess = CertToolkitMgr.getInstance().transExportCert(
						androidustk.USC_ALG_SYMM_SEED,
						cert.getBSignCert(), cert.getBSignPriKey(),
						cert.getBKMCert(), cert.getBKMPriKey()
				);
				
				b.putString("error", exportSuccess ? null : "인증서 내보내기에 실패했습니다");
	
				msg = exportHandler.obtainMessage();
				msg.setData(b);
	
				exportHandler.sendMessage(msg);
			} finally {			
				// 스마트폰 인증서 이동 종료
				// Function 
				// 		CertToolkitMgr.getInstance().transFinalize()
				// Parameters
				//   	
				// Return Value
				//		
				CertToolkitMgr.getInstance().transFinalize();
			}
			
		}
		
		/**
		 * Device의 고유ID(전화번호)를 리턴
		 * 
		 * @param 없음
		 * @return 전화번호를 리턴, 전화번호를 얻을 수 없는 경우는  unique device Id
		 */
		
		private String getTelephoneNumber() {
			TelephonyManager tManager = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
			String telephone = tManager.getLine1Number();
			if(telephone == null) {
				telephone = tManager.getDeviceId();
			}
			
			return telephone;
		}
		
		
		/**
		 * 승인번호가 유효한지를 확인(13자리인지를 확인)
		 * 
		 * @param certNum: 승인번호 문자열
		 * @return 유효하면 true, 그렇지 않으면 false
		 */
		
		private boolean isValidCertNum(String certNum) {
			boolean result = false;
			
			if(Character.isDigit(certNum.charAt(0)) && certNum.length() == 13) {
				result = true;
				
				Bundle b = new Bundle();
				b.putString("error", null);
				b.putString("appvNum", certNum);

				Message msg = numHandler.obtainMessage();
				msg.setData(b);

				numHandler.sendMessage(msg);
				
			} else {
				Bundle b = new Bundle();
				b.putString("error", certNum);

				Message msg = numHandler.obtainMessage();
				msg.setData(b);

				numHandler.sendMessage(msg);
			}
			
			return result;
		}
		
		/**
		 * PC와의 연결 대기를 중단하고 인증서 이동 API종료
		 * 
		 *  @param 없음
		 *  @return 없음
		 */
		void stopWaiting() {
			waiting = false;
			// 스마트폰 인증서 이동 종료
			// Function 
			// 		CertToolkitMgr.getInstance().transFinalize()
			// Parameters
			//   	
			// Return Value
			//		
			CertToolkitMgr.getInstance().transFinalize();
		} 
		
	}
}
