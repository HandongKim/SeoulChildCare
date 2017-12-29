/*----------------------------------------------------------------------------------
 * PROJ : CrossCert Project CrossCertificattion System
 * NAME : Intro
 * DESC : 초기화면을 보여주고, 데이터를 로딩하는 클래스
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ConcurrentModificationException;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.os.SystemClock;
import android.util.Log;

import com.crosscert.android.core.CertListMgr;
import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.android.util.SystemAccess;
import com.crosscert.exception.InitializeException;
import com.crosscert.sample.R;
import com.crosscert.sample.util.PrintLog;

/**
 * 초기화면 및 데이터 로딩 클래스
 */
public class Intro extends Activity {

	private final String TAG = Intro.class.getSimpleName();
	private static final int DLG_LOAD_FAIL = 0;	
	private String errorMsg = null;
	
	/** 인증서 설치 스레드를 위한 callback */
	final Handler installHandler = new Handler() {
		public void handleMessage(Message msg) {
			String error = msg.getData().getString("error");

			if(error == null) {
				callNextActivity(false);
			} else {
				showDialog(DLG_LOAD_FAIL);
			}
		}
	};

	/**
	 * Called when the activity is first created.
	 *
	 * @param savedInstanceState the saved instance state
	 */
	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		Log.v("unisign","Test");
		setContentView(R.layout.crosscert_sample_intro);
		
//		ProgressDialog.show(this, "", "로딩중입니다.");

		if(!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
			errorMsg = "SD카드를 인식할 수 없습니다";
			showDialog(DLG_LOAD_FAIL);
		}

		try {

			// 스마트폰 보안 라이브러리 초기화
			//    *** 반드시 스마트폰 APP 시작시 설정
			// Function
			// 		CertToolkitMgr.SetAppInfo();
			// Parameters
			//		this : 스마트폰 환경설정을 위한 Activity 클래스
			//		"HccuM8r37sAvNqIdNNHAkg==" : 보안툴킷 라이센스
			// Return Value
			//

		    /*
		    유효기간 : 2017/03/31 
		     */
			CertToolkitMgr.SetAppInfo(this, SampleApp.APP_LICENSEKEY); // test license
			// 스마트폰 보안툴킷 라이센스 정보 추출
			//   ** 툴킷을 포함한 앱 배포 및 인증서 이동 서비스를 위한   
			//      라이센스 획득을 위해 아래 값을 반드시 한국전자인증 담당자에게 전달하여야 한다.
			// Function
			//		CertToolkitMgr.GetLicenseInfo();
			// Parameters
			//
			// Return Value
			//		LicenseInfo : 스마트폰 앱 라이센스 정보
			String LicenseInfo = CertToolkitMgr.GetLicenseInfo();
			Log.v("",LicenseInfo);
			
			
			
			
		}catch (InitializeException e) {
			Log.w("Intro", "toolkit inti fail");
			e.printStackTrace();
		}
		
		// 기본 인증서 설치 및 목록 초기화
		LoadingThread thread = new LoadingThread(installHandler);
		thread.start();
		
	}

	/**
	 * 다이얼로그 Container 
	 */
	protected Dialog onCreateDialog(int id) {

		AlertDialog.Builder builder = null;

		switch(id) {
			
		case DLG_LOAD_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("")			
			.setMessage(errorMsg)
			.setPositiveButton("확인", new DialogInterface.OnClickListener() {
				public void onClick(DialogInterface dialog, int which) {
					removeDialog(DLG_LOAD_FAIL);
					callNextActivity(true);
				}});

			return builder.create();

		default:
			return null;
		}
	}

	/**
	 * 메인 스레드 애니메이션에 독립적으로 인증서 설치 수행하기 위한 스레드 클래스.
	 *
	 * @author myung
	 */
	private class LoadingThread extends Thread {

		/** The m handler. */
		Handler mHandler;

		/**
		 * Instantiates a new loading thread.
		 *
		 * @param h : LoadingThread Handler
		 */
		LoadingThread(Handler h) {
			mHandler = h;
		}


		public void run() {
			Message msg = mHandler.obtainMessage();
			Bundle b = new Bundle();

			try {
				File sdRoot = Environment.getExternalStorageDirectory();
				
				// 기본 인증서 설치
				// ** 반드시 기본 저장인증서를 설치 또는 설치 확인하여야 한다.
				installDefaultCert(sdRoot);

				// 인증서 리스트 관리 클래서 초기화 및 인증서 로딩
				// Function
				//		CertListMgr.getInstance().initCertList();
				// Return Value
				//
								
				/*CertListMgr.getInstance().initCertList();
				SystemClock.sleep(1000);
				b.putString("error", null);
				msg.setData(b);
				mHandler.sendMessage(msg);*/
				
				// 삼성 Galaxy(2.2 이전) 를 위한 /sdcard/sd 처리
				// 삼성 Galaxy(2.2 이후) 를 위한 /sdcard/external_sd 처리
				File sdRootGalaxy = new File(sdRoot, "sd");
				File sdRootGalaxy2 = new File(sdRoot, "external_sd");
				File sdRootLG2X = new File(sdRoot, "_ExternalSD");
				if (sdRootLG2X.exists()) {
					installDefaultCert(sdRootLG2X);
				}
				else if(sdRootGalaxy2.exists()) {
					installDefaultCert(sdRootGalaxy2);
				}
				else if(sdRootGalaxy.exists()) {
					installDefaultCert(sdRootGalaxy);
				}

				CertListMgr.getInstance().initCertList();
				SystemClock.sleep(1000);

				b.putString("error", null);
				msg.setData(b);
				mHandler.sendMessage(msg);
				

			} catch (ConcurrentModificationException ce) {
				errorMsg = "인증서 저장소를 사용할 수 없습니다";
				b.putString("error", errorMsg);
				msg.setData(b);
				mHandler.sendMessage(msg);
				return;
			} catch (Throwable e) {
				errorMsg = "오류 - " + e.toString();
				b.putString("error", errorMsg);
				msg.setData(b);
				mHandler.sendMessage(msg);
				return;
			}
		}
	}


	/**
	 * assets 폴더에 저장해 둔 기본 인증서를 디바이스에 설치한다.
	 *
	 * @param sdRoot : 인증서 저장 루트 경로 (/sdcard)
	 * @return 없음
	 * @throws Exception the exception
	 */
	private void installDefaultCert(File sdRoot) throws Exception {
		AssetManager assetManager = getResources().getAssets();

		String rootName = "NPKI";
		String[] assetCAs = assetManager.list(rootName);

		File sdNPKI = new File(sdRoot, rootName);
		if(!sdNPKI.exists()) {
			sdNPKI.mkdir();
		}

		for(String assetCA : assetCAs) {
			File sdCA = new File(sdNPKI, assetCA);
			if(!sdCA.exists()) {
				sdCA.mkdir();
			}

			String[] assetCerts = assetManager.list(rootName+"/"+assetCA);
			for(String assetCert : assetCerts) {
				File sdCert = new File(sdCA, assetCert);

				if(assetCert.equalsIgnoreCase("user")) { continue; }

				if(!sdCert.exists()) {
					InputStream is = assetManager.open(rootName+"/"+assetCA+"/"+assetCert);
					FileOutputStream fos = new FileOutputStream(sdCert);

					int bytesRead = 0;
					byte[] buffer = new byte[1024];
					while((bytesRead = is.read(buffer, 0, 1024)) != -1) {
						fos.write(buffer, 0, bytesRead);
					}

					fos.close();
					is.close();
				}
			}
		}
	}

	/**
	 * 메인 메뉴 Activity로 이동한다.
	 */
	private void callNextActivity(Boolean disable ) {
		Intent intent = new Intent(Intro.this, mainMenu.class); 
		intent.putExtra("disable", disable);
		startActivity(intent);
	}

	/**
	 * 앱 종료.
	 */
	private void finishApplication() {
		finish();
	}

	/*
	 * Intro Activity 종료시 화면 정리
	 */
	@Override
	protected void onStop() {
		super.onStop();
		this.finish(); 
	}
}