/*----------------------------------------------------------------------------------
 * PROJ : CrossCert UniSign Library Sample System
 * NAME : ImportCert3Storage
 * DESC : 인증서 가져오기 -> 갤럭시 계열에서 스토리지/외장메모리 선택화면
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample.movement.importcert;

import java.io.File;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertListMgr;
import com.crosscert.sample.R;
import com.crosscert.sample.mainMenu;

public class ImportCert3Storage extends Activity {
private static final int DLG_IMPORT_FAIL = 0;
	
	private Button mystorage;
	private Button sdmemory; 

	private String storage = null;
	
	
    /**
     * Called when the activity is first created.
     *
     * @param savedInstanceState the saved instance state
     */
	@Override
	protected void onCreate(Bundle savedInstanceState) {

			super.onCreate(savedInstanceState);
			setContentView(R.layout.crosscert_sample_movement_importcert_importcert3storage);
			
			mystorage=(Button)findViewById(R.id.import_Storage);
			sdmemory=(Button)findViewById(R.id.import_Memory);
						
			mystorage.setOnClickListener(new OnClickListener(){ 
				@Override
				public void onClick(View v) {	
		       		storage = Environment.getExternalStorageDirectory().getAbsolutePath();
		       		try {
						storage = ImportCert3Storage.this.getPackageManager().getPackageInfo(ImportCert3Storage.this.getPackageName(), 0).applicationInfo.dataDir;
					} catch (NameNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					goNext();
				}
			});
			
			sdmemory.setOnClickListener(new OnClickListener(){
				@Override
				public void onClick(View v) {		
					File sdRoot = Environment.getExternalStorageDirectory();
					File sdRootGalaxy2 = new File(sdRoot, "external_sd");
					File sdRootLG2X = new File(sdRoot, "_ExternalSD");
					if (sdRootLG2X.exists()) {
						storage = new File(sdRoot, "_ExternalSD").getAbsolutePath();
					}
					else if (sdRootGalaxy2.exists()) {
				    	storage = new File(sdRoot, "external_sd").getAbsolutePath();											
				    }
				    else {
				    	storage = new File(sdRoot, "sd").getAbsolutePath();						
				    }
					goNext();
				}
			});
	}	
	
	/**
	 * 인증서 정보와 저장소 정보를 포함하여 ImportCert2InputPasswd 다시 호출
	 * 
	 * @param 없음
	 * @return 없음
	 */
	private void goNext() {
		Intent intent = new Intent(ImportCert3Storage.this, ImportCert2InputPasswd.class);
		Intent input = getIntent();
		
		byte[] bSignCert = input.getByteArrayExtra("bSignCert");
		byte[] bSignPriKey = input.getByteArrayExtra("bSignPriKey");
		byte[] bKMCert = input.getByteArrayExtra("bKMCert");
		byte[] bKMPriKey = input.getByteArrayExtra("bKMPriKey");
		
		try {
			// PC에서 이동한 인증서, 개인키 저장 및 인증서 리스트에 추가
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
			
			// PC에서 이동한 인증서를 인증서 리스트에서 선택된 인증서로 설정
			// Function 
			// 		CertListMgr.getInstance().setCurCert(...)
			// Parameters
			//   	cert : 인증서 정보 클래스
			// Return Value
			//		
			CertListMgr.getInstance().setCurCert(cert);
		} catch (Exception e) {
			showDialog(DLG_IMPORT_FAIL);
		}
		
		intent.putExtra("media", storage);
		intent.putExtra("bSignCert", bSignCert);
		intent.putExtra("bSignPriKey", bSignPriKey);
		intent.putExtra("bKMCert", bKMCert);
		intent.putExtra("bKMPriKey", bKMPriKey);
		
		startActivity(intent);
		ImportCert3Storage.this.finish();
	}
	
	/**
	 * showDialog콜백 함수
	 * ImportCert3Storage Activity에서 호출되는 모든 다이얼로그를 id에 따라 관리
	 * 
	 * @param  id:다이얼로그 id
	 * @return 다이얼로그
	 */	
	protected Dialog onCreateDialog(int id) {
		
		AlertDialog.Builder builder = null;
   		
		switch(id) {
		case DLG_IMPORT_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("인증서 가져오기 실패")
			.setMessage("인증서 저장 중 오류가 발생했습니다.")
			.setPositiveButton("확인",  new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				removeDialog(DLG_IMPORT_FAIL);
					
  					Intent intent = new Intent(ImportCert3Storage.this, mainMenu.class);
		       		intent.putExtra("result", "import_fail");
		       		startActivity(intent);      		 
	   			}});

		default:
			break;
		}
		return null;
	}
	@Override
	protected void onStop() {
		super.onStop();
		this.finish();
	}
}
