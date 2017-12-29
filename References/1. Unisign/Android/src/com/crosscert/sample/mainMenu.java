/*----------------------------------------------------------------------------------
 * PROJ : CrossCert UniSign Library Sample System
 * NAME : listCert
 * DESC : 메인화면을 띄워주는 클래스
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample;

import java.io.IOException;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.crosscert.androidustk;
import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertListMgr;
import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.android.core.CertUtil;
import com.crosscert.exception.USToolkitException;
import com.crosscert.sample.R;
import com.crosscert.sample.movement.exportcert.ExportCert1InputPasswd;
import com.crosscert.sample.movement.importcert.ImportCert1ApprvNum;
import com.crosscert.sample.shared.MsgMgr;
import com.crosscert.sample.util.PrintLog;

public class mainMenu extends Activity {

	private final String TAG = mainMenu.class.getSimpleName();
	private static Button listCert, importCert, 
	exportCert, mgtCert_verify, mgtCert_password, 
	mgtCert_del, signedData,getR;
	
	private static EditText EditPw;
	private static TextView CertDN; 

	private static String verifyDataBase64 = "";
	private static String envelopedDataBase64 = "";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.crosscert_sample_mainmenu);

		PrintLog.m(TAG, "onCreate");
		
		/**
		 * 각 버튼 및 텍스트 뷰 id값 지정
		 */
		listCert = (Button)findViewById(R.id.listCert);
		importCert = (Button)findViewById(R.id.importCert);
		exportCert = (Button)findViewById(R.id.exportCert);
		mgtCert_verify = (Button)findViewById(R.id.mgtCert_verify);
		mgtCert_password = (Button)findViewById(R.id.mgtCert_password);
		mgtCert_del = (Button)findViewById(R.id.mgtCert_del);
		signedData = (Button)findViewById(R.id.signedData);
		getR=(Button)findViewById(R.id.getR);
		EditPw = (EditText) findViewById(R.id.Cert_pw);
		CertDN = (TextView)findViewById(R.id.SubjectDN);
		
		/**
		 * 인증서 선택되기 전 버튼 비활성화 상태
		 */
		exportCert.setEnabled(false);
		mgtCert_verify.setEnabled(false);
		mgtCert_password.setEnabled(false);
		mgtCert_del.setEnabled(false);
		signedData.setEnabled(false);
		getR.setEnabled(false);
		EditPw.setEnabled(false);
		if(CertListMgr.getInstance().getCurCert()!=null){

			// 선택된 인증서 클래스 획득
			//
			// Function
			//		CertListMgr.getInstance().getCurCert();
			// Parameters
			//
			// Return Value
			// 		cert : 선택된 인증서 정보 클래스
			Cert cert = CertListMgr.getInstance().getCurCert();

			CertDN.append("[");
			CertDN.append(CertUtil.parseDN(cert.getSubjectDN(), "cn"));
			CertDN.append("]\n");

			// 선택된 인증서의 발급자 DN 추출
			//
			// Function
			//		CertListMgr.getInstance().getCurCert().getIssuerDN();
			// Parameters
			//
			// Return Value
			// 		IssuerDN : 선택된 인증서의 발급자 DN
			String IssuerDN = CertListMgr.getInstance().getCurCert().getIssuerDN(); 

			CertDN.append(IssuerDN);

			exportCert.setEnabled(true);
			mgtCert_verify.setEnabled(true);
			mgtCert_password.setEnabled(true);
			mgtCert_del.setEnabled(true);
			signedData.setEnabled(true);
			getR.setEnabled(true);
			EditPw.setEnabled(true);
		}

		Context context=this.getBaseContext();
		attachBasicBtnClickListentner(context);

		mvmtResult();
	}

	public void attachBasicBtnClickListentner(final Context context){	

		//인증서 선택
		listCert.setOnClickListener(new OnClickListener() {
			public void onClick(View v)
			{
				Intent intent = new Intent(context, listCert.class);	       		
				startActivity(intent);
				MsgMgr.getInstance().setNextCallingClassActivity(true);
			}
		});
		//인증서 가져오기
		importCert.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(context, ImportCert1ApprvNum.class);	       		
				startActivity(intent);
				MsgMgr.getInstance().setNextCallingClassActivity(true);
			}
		});
		//인증서 내보내기
		exportCert.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(context, ExportCert1InputPasswd.class);	       		
				startActivity(intent);
				MsgMgr.getInstance().setNextCallingClassActivity(true);
			}
		});
		//인증서 검증
		mgtCert_verify.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {

				// 선택된 인증서 정보 획득
				Cert cert = CertListMgr.getInstance().getCurCert();

				// 선택된 인증서(cert) 에 대한 검증을 수행한다.
				// Function
				//		CertToolkitMgr.getInstance().logicVerifyCert(...);
				// Parameters
				//		cert : 인증서 정보 클래스
				// Return Value
				//		errorMsg : 인증서 검증이 성공이면 null, 실패이면 오류메시지
				String errorMsg = CertToolkitMgr.getInstance().logicVerifyCert(cert);

				if(errorMsg!=null){
					String StrMsg = "";
					if(errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_UNSPECIFIED+", unspecified)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_KEYCOMPROMISE+", keyCompromise)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_CACOMPROMISE+", cACompromise)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_AFFILIATIONCHANGED+", affiliationChanged)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_SUPERSEDED+", superseded)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_CESSATIONOFOPERATION+", cessationOfOperation)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_CERTIFICATIONHOLD+", cetificateHold)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_REMOVEFROMCRL+", removeFromCRL)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_PRIVILEGEWITHDRAWN+", privilegeWithdrawn)")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_REVOKED_AACOMPROMISE+", aACompromise)")
					) {//검증 프로세스 성공적으로 마쳤지만, 검증 오류
						StrMsg =  "인증서가 폐지되었습니다.";		
					}else if(errorMsg.contains("("+androidustk.UST_ERR_LDAP_NO_DATA+")")//검증 프로세스에서 실패
							|| errorMsg.contains("("+androidustk.UST_ERR_LDAP_INIT+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_LDAP_SIMPLE_BIND_S+")")						
							|| errorMsg.contains("("+androidustk.UST_ERR_LDAP_SEARCH_S+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_LDAP_FIRST_ENTRY+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_CMP_SOCKET_WRITE_ERROR+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_CMP_SOCKET_READ_ERROR+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_CERTPATH_ROOTCA+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_CERT_CERTPATH_CA+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_CMP_SOCKET_OPEN_ERROR+")")
							|| errorMsg.contains("("+androidustk.UST_ERR_HTTP_CONNECT +")")
							|| errorMsg.contains("("+androidustk.UST_ERR_WRONG_PASSWORD  +")")
					) {

						StrMsg = "";		


					}else if(errorMsg.contains("("+androidustk.UST_ERR_CERT_EXPIRED_CERT+")")){
						StrMsg = "인증서 유효 기간이 만료되었습니다.";	

					}else{
						//기타 검증오류
						StrMsg = "인증서 검증에 실패하였습니다."+" "+StrMsg.substring(errorMsg.indexOf('('),errorMsg.indexOf(')'))+")";		
					}
					Toast.makeText(getApplication(), errorMsg, Toast.LENGTH_SHORT).show();
				}else{
					Toast.makeText(getApplication(), "유효한 인증서 입니다.", Toast.LENGTH_SHORT).show();
				}
			}
		});
		//비밀번호 변경
		mgtCert_password.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {

				// 선택된 인증서 정보 획득
				Cert cert = CertListMgr.getInstance().getCurCert();

				String prev_passwd = "crosscert12!@"; //인증서 비밀번호 변경 ( 현재 비밀번호 )
				String after_passwd = "crosscert12!@"; //인증서 비밀번호 변경 후 
				
				// 선택된 인증서의 비밀번호 변경
				// Function
				//		CertToolkitMgr.getInstance().logicChangeCertPW(...);
				// Parameters
				//		cert : 	선택된 인증서 정보 클래스
				//		prev_passwd : 변경 전 인증서 비밀번호
				//		after_passwd : 변경 후 인증서 비밀번호
				// Return Value
				//		errorMsg : 인증서 검증이 성공이면 null, 실패이면 오류메시지
				String errorMsg = CertToolkitMgr.getInstance().logicChangeCertPW(
						cert, 
						prev_passwd, 
						after_passwd);
				if(errorMsg!=null){
					Toast.makeText(getApplication(), errorMsg, Toast.LENGTH_SHORT).show();
				}else{
					Toast.makeText(getApplication(), "비밀번호 변경 성공", Toast.LENGTH_SHORT).show();
				}
			}
		});
		//인증서 삭제
		mgtCert_del.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				// 선택된 인증서 정보 획득
				Cert cert = CertListMgr.getInstance().getCurCert();

				// 선택된 인증서 인증서목록 및 안드로이드 저장소에서 삭제
				// Function
				//		CertToolkitMgr.getInstance().logicDeleteCert(...);
				// Parameters
				//		cert : 	선택된 인증서 정보 클래스
				// Return Value
				//		errorMsg : 인증서 검증이 성공이면 null, 실패이면 오류메시지
				String errorMsg = null;
				try {
					CertListMgr.getInstance().deleteCert(CertListMgr.getInstance().getCurCert());
					Toast.makeText(getApplication(), "인증서 삭제 성공", Toast.LENGTH_SHORT).show();
				} catch (IOException e) {
					e.printStackTrace();
					errorMsg = "인증서 파일 삭제 중 오류가 발생했습니다";
					Toast.makeText(getApplication(), errorMsg, Toast.LENGTH_SHORT).show();
				}
				
				
				/**
				 * 인증서 선택되기 전 버튼 비활성화 상태
				 */
				exportCert.setEnabled(false);
				mgtCert_verify.setEnabled(false);
				mgtCert_password.setEnabled(false);
				mgtCert_del.setEnabled(false);
				signedData.setEnabled(false);
			}
		});

		//PKCS#7형태의 SignedData
		signedData.setOnClickListener(new OnClickListener() {			
			public void onClick(View v) {

				// 선택된 인증서 정보 획득
				Cert cert = CertListMgr.getInstance().getCurCert();

				// 서명할 데이터
				byte[] inputData="This is example input data".getBytes();
				// 서명 결과 데이터 : Base64 문자열로 인코딩 된다.
				String inputbase64 = "";

				// 인증서 비밀번호
				//String passwd = "avirexu12@";
				// 인증서 비밀번호
				String passwd = EditPw.getText().toString();
			 

				try{
					// 인증서 전자서명
					// Function
					//		CertToolkitMgr.getInstance().logicCMSSignedData(...);
					// Parameters
					//   	cert : 선택된 인증서
					//   	inputdata : 서명할 문자열
					//   	passwd.getBytes() : 인증서 패스워드
					// Return Value
					//		resultData : 전자서명 메시지
					byte[] resultData=CertToolkitMgr.getInstance().logicCMSSignedData(cert, inputData, passwd.getBytes());

					// 바이너리 데이터 Base 64 인코딩
					// Function
					//		CertToolkitMgr.getInstance().utilBase64Encode(...);
					// Parameters
					//   	resultData : Base64 로 인코딩할 바이너리 데이터
					// Return Value
					// 		inputbase64 : Base64로 인코딩된 문자열, 실패이면 null
					inputbase64 =CertToolkitMgr.getInstance().utilBase64Encode(resultData);

					if(inputbase64!=null)
						Toast.makeText(getApplication(), new String(inputbase64), Toast.LENGTH_SHORT).show();
					verifyDataBase64 = inputbase64;
				}catch (USToolkitException e) {
					Toast.makeText(getApplication(), e.getMessage(), Toast.LENGTH_SHORT).show();
				}
			}
		});
		
		//R값 획득 
		getR.setOnClickListener(new OnClickListener() {		
			public void onClick(View v) {
				
				// 선택된 인증서 정보 획득
				Cert cert = CertListMgr.getInstance().getCurCert();
				// 인증서 비밀번호
				String passwd = EditPw.getText().toString();
				
				
				try {
					// 2) R값 추출
					// Function
					// CertToolkitMgr.getInstance().getVIDRandom()
					// Parameters
					// Cert curCert : 인증서 정보 클래스
					// String pw : 인증서 패스워드
					// Return Value
					// byte[] rValue : 인증서에서 추출한 R값
					byte[] VIDRandomBinary = CertToolkitMgr.getInstance().getVIDRandom(cert,passwd);
					String VIDRandomStr = CertToolkitMgr.getInstance().utilBinToHexString(VIDRandomBinary);
					Toast.makeText(getApplicationContext(), new String(VIDRandomStr), Toast.LENGTH_LONG).show();
				} catch (NullPointerException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (USToolkitException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				
			}
		});
	
	
	}


	private void mvmtResult(){
		Intent intent = getIntent();
		String result = intent.getStringExtra("result");

		if(result!=null){
			if(result.equals("import_success")){
				Toast.makeText(getApplication(), "인증서 가져오기에 성공하였습니다.", Toast.LENGTH_LONG).show();
				MsgMgr.getInstance().setIsProcessSuccess(true);
			}else if( result.equals("import_fail")){
				Toast.makeText(getApplication(), "인증서 가져오기에 실패하였습니다.", Toast.LENGTH_LONG).show();
				MsgMgr.getInstance().setIsProcessSuccess(false);
			}else if( result.equals("export_fail")){
				Toast.makeText(getApplication(), "인증서 내보내기에 실패하였습니다.", Toast.LENGTH_LONG).show();
				MsgMgr.getInstance().setIsProcessSuccess(false);
			}else if( result.equals("export_success")){
				Toast.makeText(getApplication(), "인증서 내보내기에 성공하였습니다.", Toast.LENGTH_LONG).show();
				MsgMgr.getInstance().setIsProcessSuccess(true);
			}else{			
			}
		}
	}
}