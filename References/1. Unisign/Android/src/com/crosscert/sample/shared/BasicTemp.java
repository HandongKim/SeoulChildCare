/*----------------------------------------------------------------------------------
 * PROJ : CrossCert Project CrossCertificattion System
 * NAME : BAISC TEMPLATE ACTIVITY
 * DESC : 각 ACTIVITY의 상단 바와 하단 메뉴를 가진 모든 화면의 기본이 되는 템플릿 클레스
 * AUTHOR : 김정수
 * VER : v1.0
 * ----------------------------------------------------------------------------------*/
 
package com.crosscert.sample.shared;


import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Window;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.crosscert.sample.R;
 
/**
 * 각 ACTIVITY의 상단 바와 하단 메뉴를 가진 모든 화면의 기본이 되는 템플릿 클레스
 * 
 */
public class BasicTemp extends Activity{
  
	protected static int HOME = 1;
	protected static int MANAGEMENT = 2;
	protected static int MOVEMENT = 3;
	protected static int ISSUEANCE = 4;
	
	/**
	 * 화면에 화면 주요 내용을 표시하는 view
	 */
	public FrameLayout contentView;
		
	/**
	 * 이전 textview 
	 */
	private TextView prevText;
	
	
	/**
	 * 기본 textview : contentview의 중앙에 위치
	 */
	private TextView template_informtxt;

	/**
	 * 하단 탭바 메뉴 textview : 하단 메뉴 중앙에 위치
	 * 타앱에서 호출시 '타앱으로 돌아가기' 텍스트를 뿌려주기 위함
	 */
	private TextView btm_menu_prevapptext;
	private Context context;
	
	private boolean disableBackBtn=false;
	
	private Class callingClass;

	public FrameLayout getContentView(){
		return contentView;
	}
	
	public void setTemplateInformtxt(String str) {
		template_informtxt.setText(str);
	}
	
	public void setContentBackground(Drawable img) {
		contentView.setBackgroundDrawable(img);
	}


	/**
     * Called when the activity is first created.
     *
     * @param savedInstanceState the saved instance state
     */
	@Override 
	protected void onCreate(Bundle savedInstanceState) {
		
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		
		setContentView(R.layout.crosscert_sample_shared_basictemp);
	
		//get all the button Image views from screen 
		 
		//btm_menu_prevapptext=(TextView)findViewById(R.id.btm_menu_prevapptext);
		//btmTabView=(FrameLayout)findViewById(R.id.btm_tabback);

		//View.inflate(this, backgroundxml, (ViewGroup) findViewById(R.id.content_view));

		context=this.getBaseContext();
		//this.callingClass=MainMenu.class;
		
	}
	 
	@Override
	protected void onDestroy() { 
		super.onDestroy();
	}
}
