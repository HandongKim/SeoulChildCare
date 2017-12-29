package com.fuse.unisign;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.List;
import java.util.UUID;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.net.wifi.WifiManager;
import android.os.Environment;
import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;

import android.content.res.AssetManager;
import java.util.ConcurrentModificationException;

public class Util {
	/**
	 * Device의 고유 정보(UUID, Device ID, 전화번호, Wifi 맥 어드레스)를 리턴
	 *
	 * @param 없음
	 * @return 고유 정보 중에서 유효한 값을 리턴
	 */
	public static String getUniqueInfomation(Context context) {
		String info = Secure.ANDROID_ID;

		try {
			String androidID = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);
			if(null != androidID && androidID.length() > 0) {
				info = androidID;
			}

			String uuidInfo = Util.getUUID(info.getBytes());
			if(null != uuidInfo && uuidInfo.length() > 0) {
				info = uuidInfo;
				return info;
			}

			String deviceId = Util.getDeviceID(context);
			if(null != deviceId && deviceId.length() > 0) {
				info = deviceId;
				return info;
			}

			String wifiMacAddr = Util.getWifiMacAddress(context);
			if(null != wifiMacAddr && wifiMacAddr.length() > 0) {
				info = wifiMacAddr;
				return info;
			}

			String phoneNumber = Util.getPhoneNumber(context);
			if(null != phoneNumber && phoneNumber.length() > 0) {
				info = phoneNumber;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return info;
	}

	/**
	 * UUID 정보 생성
	 *
	 * @param 초기 값
	 * @return UUID 정보
	 */
	private static String getUUID(byte[] value) {
		UUID uuid = null;

		if(null != value) {
			uuid = UUID.nameUUIDFromBytes(value);
		} else {
			uuid = UUID.randomUUID();
		}

		if(null != uuid) {
			return uuid.toString();
		} else {
			return null;
		}
	}

	/**
	 * 전화번호 정보 추출
	 *
	 * @param Context
	 * @return 전화번호
	 */
	private static String getPhoneNumber(Context context) {
		TelephonyManager tManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);

		if(null != tManager) {
			return tManager.getLine1Number();
		} else {
			return null;
		}
	}

	/**
	 * Device ID 정보 추출
	 *
	 * @param Context
	 * @return Device ID
	 */
	private static String getDeviceID(Context context) {
		TelephonyManager tManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);

		if(null != tManager) {
			return tManager.getDeviceId();
		} else {
			return null;
		}
	}

	/**
	 * Wifi Mac Address 정보 추출
	 *
	 * @param Context
	 * @return Wifi Mac Address
	 */
	private static String getWifiMacAddress(Context context) {
		WifiManager wManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);

		if(null != wManager) {
			return wManager.getConnectionInfo().getMacAddress();
		} else {
			return null;
		}
	}

	/**
	 * NPKI folder 초기화 (외부 저장장치)
	 */
	public static void initExternalNPKIStorage(android.app.Activity a) {
		AssetManager assetManager = a.getResources().getAssets();

		String rootName = "NPKI";


		try {

			File sdRoot = Environment.getExternalStorageDirectory();
			installDefaultCert(sdRoot, assetManager);

			// 삼성 Galaxy(2.2 이전) 를 위한 /sdcard/sd 처리
			// 삼성 Galaxy(2.2 이후) 를 위한 /sdcard/external_sd 처리
			File sdRootGalaxy = new File(sdRoot, "sd");
			File sdRootGalaxy2 = new File(sdRoot, "external_sd");
			File sdRootLG2X = new File(sdRoot, "_ExternalSD");
			if (sdRootLG2X.exists()) {
				installDefaultCert(sdRootLG2X, assetManager);
			}
			else if(sdRootGalaxy2.exists()) {
				installDefaultCert(sdRootGalaxy2, assetManager);
			}
			else if(sdRootGalaxy.exists()) {
				installDefaultCert(sdRootGalaxy, assetManager);
			}

		} catch (ConcurrentModificationException ce) {
//			errorMsg = "인증서 저장소를 사용할 수 없습니다";
			return;
		} catch (Throwable e) {
//			errorMsg = "오류 - " + e.toString();
			return;
		}
	}

	private static void installDefaultCert(File sdRoot, AssetManager assetManager) throws Exception {

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
					java.io.InputStream is = assetManager.open(rootName+"/"+assetCA+"/"+assetCert);
					java.io.FileOutputStream fos = new java.io.FileOutputStream(sdCert);

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
}
