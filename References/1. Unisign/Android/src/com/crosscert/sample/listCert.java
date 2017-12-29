/*----------------------------------------------------------------------------------
 * PROJ : CrossCert Project CrossCertificattion System
 * NAME : listCert
 * DESC : 인증서 선택창을 띄워주는 클래스
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample;

import java.util.List;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ListView;

import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertListMgr;
import com.crosscert.sample.R;
import com.crosscert.sample.shared.CertListAdapter;
import com.crosscert.sample.shared.MsgMgr;

public class listCert extends Activity {
	
	private static final int DLG_LOADING = 0;
	private static final int DLG_FAIL = 1;
	
	ListView list1;
	
	final Handler loadingHandler = new Handler() {
		public void handleMessage(Message msg) {
			showListMenu(CertListMgr.getInstance().getUserCertList());
			removeDialog(DLG_LOADING);
		}
	};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		MsgMgr.getInstance().initValue();
		setContentView(R.layout.crosscert_sample_listcert);
		
		showDialog(DLG_LOADING);
		LoadingThread thread = new LoadingThread(loadingHandler);
		thread.start();
	}
	
	/**
	 * 인증서 리스트를 배열로 받아 인증서 리스트 뷰를 보여준다
	 * 
	 * @param  listToShow: 인증서 리스트를 배열
	 * @return 없음
	 */
	private void showListMenu(final List<Cert> listToShow){
		
		//setTemplateInformtxt("");
		if(listToShow.size() == 0){
			showDialog(DLG_FAIL);
		}
		
		list1 = (ListView)findViewById(R.id.list);
		
		list1.setAdapter(new CertListAdapter(this,listToShow));
		
		//list1.setAdapter(new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1 , lv_arr));
		list1.setPadding(10, 10, 10, 10);
		//list1.setDivider(null); 
    	
		// 스크롤시 배경을 투명색으로 지정
		list1.setCacheColorHint(0);
    	
		list1.setOnItemClickListener(new OnItemClickListener(){
			@Override
			public void onItemClick(AdapterView<?> AdapterView, View view, int position, long id) {	
				//인증서 리스트 activity호출하기
				listCert.this.getCallingActivity();
				
				// 인덱스에 해당하는 인증서 정보 클래스 획득
				// Function
				//		CertListMgr.getInstance().getUserCertList().get();
				// Parameters
				//   	position : 인증서 리스트의 인덱스 번호 
				// Return Value
				//		curCert : 인덱스에 해당하는 인증서 정보 클래스
				Cert curCert = CertListMgr.getInstance().getUserCertList().get(position);
				
				// 선택된 인증서 정보 설정
				//    - getCurCert() 함수를 통해 선택된 인증서 정보 획득 
				// Function
				//		CertListMgr.getInstance().setCurCert();
				// Parameters
				//   	curCert : 인증서 정보 클래스 
				// Return Value
				//		
				CertListMgr.getInstance().setCurCert(curCert);
				
				Intent intent = new Intent(listCert.this, mainMenu.class);
                startActivity(intent);

                MsgMgr.getInstance().setNextCallingClassActivity(true);
			}	
    		
    	});
	}
	
	/**
	 * 다이얼로그 Container 
	 */
	protected Dialog onCreateDialog(int id) {
		
		AlertDialog.Builder builder = null;
		
		switch(id) {
		
		case DLG_LOADING:
			ProgressDialog dlgLoading=ProgressDialog.show(this, 
					"요청 처리중", "사용자인증서 로딩중입니다.\n잠시만 기다려 주십시오.");
 
	   		return dlgLoading;
	   		
		case DLG_FAIL:
			builder=new AlertDialog.Builder(this);
			builder.setTitle("저장된 인증서가 없습니다.")
			.setPositiveButton("확인", new DialogInterface.OnClickListener() {
				public void onClick(DialogInterface dialog, int which) {
					
				}
			});

			return builder.create();

		default:
			return null;
		}
	}
	
	/**
	 * 스마트폰에 저장된 인증서를 초기화하고 로딩하는 Thread 
	 */
	private class LoadingThread extends Thread {
		Handler mHandler;
		
		LoadingThread(Handler h) {
			mHandler = h;
		}
		
		public void run() {
			try {
				// 스마트폰에 저장된 인증서 로딩
				// Function
				//		CertListMgr.getInstance().initCertList();
				// Parameters
				//
				// Return Value
				//
				
				
				/**
				 * NPKI 공용폴더에 있는 인증서 가져오기  
				 * CertListMgr.getInstance().initCertList();
				 */
				
				/**
				 * NPKI 앱내부에 있는 인증서 가져오기  
				 * CertListMgr.getInstance().initCertList(listCert.this); 
				 */
				CertListMgr.getInstance().initCertList(listCert.this);
				
			} catch (Throwable e) {
			}

			Message msg = mHandler.obtainMessage();
			mHandler.sendMessage(msg);
		}
	}
}
