/*----------------------------------------------------------------------------------
 * PROJ : CrossCert UniSign Library Sample System
 * NAME : ImportCert1ApprvNum
 * DESC : 인증서 가져오기 -> 승인번호 띄워지는 화면
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample.movement.importcert;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.widget.EditText;
import android.widget.TextView;

import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertListMgr;
import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.sample.R;
import com.crosscert.sample.SampleApp;
import com.crosscert.sample.mainMenu;
import com.crosscert.sample.shared.MsgMgr;
import com.crosscert.sample.util.Util;

public class ImportCert1ApprvNum extends Activity {

	private static final int DLG_APPVNUM = 0;
	private static final int DLG_APPVNUM_FAIL = 1;
	private static final int DLG_CONNECTED = 2;
	private static final int DLG_IMPORT_FAIL = 3; 
	
	private EditText approvalNum1;
	private EditText approvalNum2;
	private EditText approvalNum3;	
	private TextView leftTime;


	private String errorMsg = null;
	private ImportCertThread importThread = null; 	

//	private static final String appkey = "xzSEJj28hfUz1Bm0abrorQ==";

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
	 * 인증서 가져오기 성공여부에따라 성공시 MvmtResult 호출, 실패시 다이얼로그 보여줌
	 */	
	final Handler importHandler = new Handler() {
		public void handleMessage(Message msg) {
			removeDialog(DLG_CONNECTED);

			errorMsg = msg.getData().getString("error");

			if(errorMsg == null) {

				byte[] bSignCert = msg.getData().getByteArray("bSignCert");
				byte[] bSignPriKey = msg.getData().getByteArray("bSignPriKey");
				byte[] bKMCert = msg.getData().getByteArray("bKMCert");
				byte[] bKMPriKey = msg.getData().getByteArray("bKMPriKey");

				Intent intent = null;
				
				// 저장할 인증서 미디어 정보
				// Function 
				// 		CertListMgr.getInstance().getMedia().length
				// Parameters
				//   	
				// Return Value
				//		1 : sdcard 인증서 저장소
				// 		기타 : MJH 
				if(CertListMgr.getInstance().getMedia().length == 1) {
					
					/**
					 * 인증서 공용폴더에 저장하기  
					 * String storage = Environment.getExternalStorageDirectory().getAbsolutePath(); 
					 */
					
					String storage;
					

					try {
						/**
						 * 인증서 앱내부에 저장하기   
						 * String storage = Environment.getExternalStorageDirectory().getAbsolutePath(); 
						 */
						storage = ImportCert1ApprvNum.this.getPackageManager().getPackageInfo(ImportCert1ApprvNum.this.getPackageName(), 0).applicationInfo.dataDir;
						// 스마트폰 sdcard에서 획득한 인증서, 개인키 저장 및 인증서 리스트에 추가
						// Function 
						// 		CertListMgr.getInstance().addUserCert(...)
						// Parameters
						//   	storage : 인증서 저장소 경로
						//		bSignCert : 서명용 인증서 
						// 		bSignPriKey : 서명용 인증서 개인키
						//		bKMCert : 키관리용 인증서 
						// 		bKMPriKey : 키관리용 인증서 개인키
						// Return Value
						//		cert : 인증서 정보 클레스
						Cert cert = CertListMgr.getInstance().addUserCert(storage, bSignCert, bSignPriKey, bKMCert, bKMPriKey);
						
						// 스마트폰 sdcard에서 획득한 인증서를 인증서 리스트의 선택된 인증서로 설정
						// Function 
						// 		CertListMgr.getInstance().setCurCert(...)
						// Parameters
						//   	cert : 인증서 정보 클래스
						// Return Value
						//							
						CertListMgr.getInstance().setCurCert(cert);
					} catch (Exception e) {
						showDialog(DLG_IMPORT_FAIL);
						return;
					}

					intent = new Intent(ImportCert1ApprvNum.this, ImportCert2InputPasswd.class);
				} else {
					intent = new Intent(ImportCert1ApprvNum.this, ImportCert3Storage.class);
					intent.putExtra("bSignCert", bSignCert);
					intent.putExtra("bSignPriKey", bSignPriKey);
					intent.putExtra("bKMCert", bKMCert);
					intent.putExtra("bKMPriKey", bKMPriKey);
				} 

				startActivity(intent);

			} else {
				showDialog(DLG_IMPORT_FAIL);
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
		setContentView(R.layout.crosscert_sample_movement_importcert_importcert1apprvnum);

		//this.attachPrevOnClickListener(this, CertMoveMenu.class);

		approvalNum1=(EditText)findViewById(R.id.import_num1);
		approvalNum2=(EditText)findViewById(R.id.import_num2);
		approvalNum3=(EditText)findViewById(R.id.import_num3);
		leftTime=(TextView)findViewById(R.id.import_time);

		approvalNum1.setFocusable(false);
		approvalNum2.setFocusable(false);
		approvalNum3.setFocusable(false);
		leftTime.setFocusable(false);

		showDialog(DLG_APPVNUM);

		importThread = new ImportCertThread(numHandler, connHandler, importHandler, timer);
		importThread.start();


		if(getIntent().getExtras()!=null){
			int requestCode = getIntent().getExtras().getInt("requestCode");
			MsgMgr.getInstance().setRequestCode(requestCode);
		}else if(getIntent().getData()!=null){
			int requestCode = Integer.parseInt(getIntent().getData().getQueryParameter("requestCode"));
			MsgMgr.getInstance().setReturnURL(getIntent().getData().getQueryParameter("retURL"));
			MsgMgr.getInstance().setReturnURL(null);
			MsgMgr.getInstance().setRequestCode(requestCode);
		}

		if(MsgMgr.getInstance().getRequestCode()!=-1){
			/*btmTabMenuBtnDisable();
			this.attachPrevOnClickListener(this, null);
			removePrevBtn();*/
		}else{
			//this.attachPrevOnClickListener(this, MainMenu.class);
		}

	}	

	@Override
	protected void onStop() {
		super.onStop();

		String retURL="";

		if(importThread != null) {
			importThread.stopWaiting();
			timer.cancel();
		}

		if(MsgMgr.getInstance().getRequestCode()==-1){//타앱에서 콜하는 것 아님

			this.finish();			
		}else if(MsgMgr.getInstance().getRequestCode()!=-1){//타앱에서 콜 함
			if(	MsgMgr.getInstance().getReturnURL()!=null&&MsgMgr.getInstance().isNextCallingClassActivity()==false){//브라우저에서 호출하고, 브라우저 돌아가는 경우
				//앱 종료 및 리턴값 반환
				retURL= MsgMgr.getInstance().getReturnURL();    		
				Intent intent = new Intent(Intent.ACTION_VIEW);
				Uri uri = Uri.parse(retURL);
				intent.setData(uri); 
				startActivity(intent);
				MsgMgr.getInstance().initValue();

			}else if(MsgMgr.getInstance().isNextCallingClassActivity()==false){//타앱에서 호출하고, 이전 앱으로 돌아가는 경우
				Intent intent = new Intent();	
				setResult(RESULT_OK, intent);
				finishActivity(MsgMgr.getInstance().getRequestCode());
				MsgMgr.getInstance().initValue();
			}
		}
	}

	@Override
	protected void onRestart() {


		String retURL="";
		if(MsgMgr.getInstance().getReturnURL()!=null){
			retURL= MsgMgr.getInstance().getReturnURL();      		
			Intent intent = new Intent(Intent.ACTION_VIEW);
			Uri uri = Uri.parse(retURL);
			intent.setData(uri);
			startActivity(intent);
		}else{
			Intent intent = new Intent();	
			setResult(RESULT_OK, intent);
			finishActivity(MsgMgr.getInstance().getRequestCode());
		}

		MsgMgr.getInstance().initValue();

		this.finish();
		super.onRestart();

	}

	/**
	 * showDialog콜백 함수
	 * importCert1ApprvNum Activity 에서 호출되는 모든 다이얼로그를 id에 따라 관리
	 * 
	 * @param  다이얼로그 id
	 * @return 다이얼로그
	 */	
	protected Dialog onCreateDialog(int id) {

		AlertDialog.Builder builder = null;

		switch(id) {
		case DLG_APPVNUM:
			ProgressDialog importProgressDialog=ProgressDialog.show(this, 
					"승인번호 생성", " 승인번호 생성중(중계서버로부터 승인번호 발급중)");
			return importProgressDialog;

		case DLG_APPVNUM_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("승인번호 생성 실패")
			.setMessage(errorMsg)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
				public void onClick(DialogInterface dialog, int which) {
					removeDialog(DLG_APPVNUM_FAIL);

					Intent intent = new Intent(ImportCert1ApprvNum.this, mainMenu.class);
					intent.putExtra("result", "import_fail");
					startActivity(intent);      	

					MsgMgr.getInstance().setNextCallingClassActivity(true);
				}});

			return builder.create();

		case DLG_CONNECTED:
			ProgressDialog waitDialog=ProgressDialog.show(this, 
					"인증서 이동", "PC로부터 인증서를 가져오고 있습니다");
			return waitDialog;

		case DLG_IMPORT_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 가져오기 실패")
			.setMessage(errorMsg)
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
				public void onClick(DialogInterface dialog, int which) {
					removeDialog(DLG_IMPORT_FAIL);

					Intent intent = new Intent(ImportCert1ApprvNum.this, mainMenu.class);
					intent.putExtra("result", "import_fail");
					startActivity(intent);      		 
				}});
			return builder.create();

		default:
			break;
		}
		return null;
	}


	/**
	 * 인증서 가져오기를 수행하는 쓰레드 : 중계 API 초기화,승인번호 생성,PC와 연결 등 
	 */
	private class ImportCertThread extends Thread {
		private Handler numHandler;
		private Handler connHandler;
		private Handler importHandler;
		private CountDownTimer timer;

		private boolean waiting = false;

		private static final int DIRECTION = 0x10;  // import code

		ImportCertThread(Handler numHandler, Handler connHandler, Handler importHandler, CountDownTimer timer) {
			this.numHandler = numHandler;
			this.connHandler = connHandler;
			this.importHandler = importHandler;
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
				
				String uniqueInfo = Util.getUniqueInfomation(getApplicationContext());
				// 인증서 이등 승인번호 획득
				// Function 
				// 		CertToolkitMgr.getInstance().transGenerateCertNum(...)
				// Parameters
				//   	telephone : 기기고유정보
				//		CertToolkitMgr.DIRECTION_EXPORTCERT : 인증서 내보내기 설정
				// Return Value
				//		certNum : 인증서 이동 초기화 성공 : true, 실패 : false
				String certNum = CertToolkitMgr.getInstance().transGenerateCertNum(uniqueInfo, DIRECTION);
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
						msg = importHandler.obtainMessage();
						msg.setData(b);

						importHandler.sendMessage(msg);
						
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
						// 다른 화면으로 이동할 경우 스레드 종료
						
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

				// PC에서 인증서 획득
				// Function 
				// 		CertToolkitMgr.getInstance().transImportCert()
				// Parameters
				//   	
				// Return Value
				//		importSuccess : 성공이면 true, 실패이면 false		
				boolean importSuccess = CertToolkitMgr.getInstance().transImportCert();

				if(importSuccess) {
					b.putString("error", null);
					// 서명용 인증서
					byte[] bSignCert = CertToolkitMgr.getInstance().transGetSignCert();
					// 서명용 인증서 개인키
					byte[] bSignPriKey = CertToolkitMgr.getInstance().transGetSignPriKey();
					// 키관리용 인증서
					byte[] bKMCert = CertToolkitMgr.getInstance().transGetKmCert();
					// 키관리용 인증서 개인키
					byte[] bKMPriKey = CertToolkitMgr.getInstance().transGetKmPriKey();

					b.putByteArray("bSignCert", bSignCert);
					b.putByteArray("bSignPriKey", bSignPriKey);
					b.putByteArray("bKMCert", bKMCert);
					b.putByteArray("bKMPriKey", bKMPriKey);

				} else {
					b.putString("error", "인증서 가져오기에 실패했습니다"); 
				}

				msg = importHandler.obtainMessage();
				msg.setData(b);

				importHandler.sendMessage(msg);

			} catch(Exception e) {
				b.putString("error", "인증서 가져오기에 실패했습니다");
				msg = importHandler.obtainMessage();
				msg.setData(b);

				importHandler.sendMessage(msg);
			} finally {
				// 중계 API 종료
				
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
		 * PC와의 연결 대기를 중단하고 인증서 이동 API종료
		 * 
		 *  @param 없음
		 *  @return 없음
		 */
		void stopWaiting() {
			waiting = false;
			CertToolkitMgr.getInstance().transFinalize();
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
		 * PC와의 연결 대기를 중단하고 인증서 이동 API종료
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
	}
}
