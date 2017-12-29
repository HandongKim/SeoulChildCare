/*----------------------------------------------------------------------------------
 * PROJ : CrossCert Project CrossCertificattion System
 * NAME : MsgMgr
 * DESC : 기능별 패키지에 걸쳐 데이터를 저장하고 있는 싱글톤(패키징 시 사용됨)
 * AUTHOR : 김정수
 * VER : v1.0
 * 
 * ----------------------------------------------------------------------------------*/
 
package com.crosscert.sample.shared;

import com.crosscert.android.core.CertToolkitMgr;
import com.crosscert.exception.USToolkitException;

/**
 * 패키징시 패키지에 걸쳐 데이터를 저장하고 있는 싱글톤
 * 
 */
public class MsgMgr {
	/**
	 * singleton 객체 인스턴스
	 */
	private static MsgMgr instance = null;  
	
	/**
	 * 호출시 넘어온 데이터의 decoding된 byte
	 */
	private byte[] inputData;  
	/**
	 * 호출시 넘어온 데이터
	 */
	private String inputDataBase64;
	/**
	 * 서명완료된 byte 데이터
	 */
	private byte[] outputData;

	/**
	 * 리턴시 넘겨줄 데이터
	 */
	private String outputDataBase64;
	/**
	 * task 성공여부 리턴
	 */
	private boolean isProcessSuccess=false; 
	/**
	 * requestCode저장
	 */
	private int requestCode=-1;
	
	private boolean nextCallingClassActivity=false;

	/**
	 * return URL 저장
	 */
	private String returnURL=null;
	
	private MsgMgr() {	}
	
	/**
	 * 앱에서 넘겨준 데이터를 전달받고,결과 데이터를 전송할  객체 인스턴스를 받는다
	 * 
	 * @return 싱글톤 객체 인스턴스
	 */
	public static MsgMgr getInstance() {
		if(instance == null) {
			instance = new MsgMgr();
		}
		return instance; 
	}


	/**
	 * @param inputData
	 * @throws USToolkitException 
	 * @throws NullPointerException 
	 */
	public void setInputDataBase64(String inputDataBase64) throws NullPointerException,USToolkitException{
	
		this.inputDataBase64=inputDataBase64;
		this.inputData = CertToolkitMgr.getInstance().utilBase64Decode(inputDataBase64);
		
	}
	
	public void setResult(byte[] inputData) {
		this.inputData = inputData;
	}
	
	/**
	 * @param isProcessSuccess
	 */
	public void setIsProcessSuccess(boolean isProcessSuccess) {
		this.isProcessSuccess = true;
	}
	
	/**
	 * @param requestCode
	 */
	public void setRequestCode(int requestCode) {
		this.requestCode = requestCode;
	}
	
	/**
	 * @return
	 */
	public byte[] getInputData() {
		return inputData;
	}
	
	public boolean getIsProcessSuccess() {
		return isProcessSuccess;
	}
	
	/**
	 * @return
	 */
	public int getRequestCode() {
		return requestCode;
	}
	
	/**
	 * @return 
	 */
	public byte[] getOutputData() {
		return outputData;
	}
	
	
	/**
	 * @return 
	 */
	public String getOutputBase64Data() {
		return outputDataBase64;
	}



	public boolean isNextCallingClassActivity() {
		return nextCallingClassActivity;
	}

	public void setNextCallingClassActivity(boolean nextCallingClassActivity) {
		this.nextCallingClassActivity = nextCallingClassActivity;
	}

	/**
	 * @param outputData
	 * @throws USToolkitException 
	 * @throws NullPointerException 
	 */
	public void setOutputData(byte[] outputData) throws NullPointerException, USToolkitException {
		this.outputData = outputData;
		this.outputDataBase64=CertToolkitMgr.getInstance().utilBase64Encode(outputData);
	}

	public String getReturnURL() {
		return returnURL;
	}

	public void setReturnURL(String returnURL) {
		this.returnURL = returnURL;
	} 
	
	public void initValue() {
		this.setRequestCode(-1);
		this.setReturnURL(null);
		this.setNextCallingClassActivity(false);
	}

	
}
