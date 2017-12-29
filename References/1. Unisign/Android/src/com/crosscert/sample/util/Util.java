package com.crosscert.sample.util;

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
//import com.google.android.gms.analytics.GoogleAnalytics;
//import com.google.android.gms.analytics.HitBuilders;
//import com.google.android.gms.analytics.Tracker;

/**
 * @author gychoi
 *
 */
public class Util {
	public static final String ROOT_PATH = Environment.getExternalStorageDirectory() + "";
	public static final String ROOTING_PATH_1 = "/system/bin/su";
	public static final String ROOTING_PATH_2 = "/system/xbin/su";
	public static final String ROOTING_PATH_3 = "/system/app/SuperUser.apk";
	public static final String ROOTING_PATH_4 = "/data/data/com.noshufou.android.su";

	public static String[] RootFilesPath = new String[]{
		/*ROOT_PATH + */ROOTING_PATH_1 ,
		/*ROOT_PATH + */ROOTING_PATH_2 , 
		/*ROOT_PATH + */ROOTING_PATH_3 , 
		/*ROOT_PATH + */ROOTING_PATH_4
	};

//	private static Tracker tracker = null;

	/**
	 * 루팅된 디바이스인지 체크.
	 * 
	 * @return
	 */
	public static boolean checkRootingDevice() {
		boolean isRootingFlag = false;

		if (!isRootingFlag) {
			isRootingFlag = checkRootingFiles(RootFilesPath);
		}

		/* 의도하지 않은 팝업이 발생할 수 있으므로 주석처리 */
		try {
			Process         process = Runtime.getRuntime().exec("find / -name su");

			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			if (reader.ready() == false) {
				return false;
			}

			String      result = reader.readLine();
			if (result.contains("/su") == true) {
				isRootingFlag = true;
			}

		} catch ( Exception e) {
			isRootingFlag = false;
		}
		//*/

		return isRootingFlag;
	}

	/**
	 * 루팅 파일이 존재하는지 체크.
	 * 
	 * @param file
	 * @return
	 */
	private static boolean checkRootingFiles(String[] filePaths) {
		boolean result = false;
		File    file;

		for (String path : filePaths) {
			file = new File(path);

			if (file != null && file.exists() && file.isFile()) {
				result = true;
				break;
			} else {
				result = false;
			}
		}

		return result;
	}

	public static boolean isDebuggable() {
		return false;
	}

	/**
	 * 요청 url로부터 AppID를 추출
	 * 
	 * @param URL
	 * @return AppID 생성
	 */
	public static String getAppID(String rtnURL){
		if(rtnURL.indexOf("://")>-1){
			rtnURL = rtnURL.substring(rtnURL.indexOf("://")+3);

		}
		String[] b=rtnURL.split("/");

		return b[0]+"_ANDROID";
	}

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
			}

			String deviceId = Util.getDeviceID(context);
			if(null != deviceId && deviceId.length() > 0) {
				info = deviceId;
			}

			String wifiMacAddr = Util.getWifiMacAddress(context);
			if(null != wifiMacAddr && wifiMacAddr.length() > 0) {
				info = wifiMacAddr;
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

	public static int getDisplayHeightPixel() {
		DisplayMetrics metrics = Resources.getSystem().getDisplayMetrics();
		return metrics.heightPixels;
	}

	public static int getDisplayWidthPixel() {
		DisplayMetrics metrics = Resources.getSystem().getDisplayMetrics();
		return metrics.widthPixels;
	}

	public static int getDensityDPI() {
		DisplayMetrics metrics = Resources.getSystem().getDisplayMetrics();
		return metrics.densityDpi;
	}

	public static void getInstalledApplications(PackageManager pm) {
		List<PackageInfo> list = pm.getInstalledPackages(PackageManager.GET_ACTIVITIES);

		for (PackageInfo packageInfo : list) {
			Intent launch = pm.getLaunchIntentForPackage(packageInfo.packageName);

			if(null != launch) {
//				Log.i("installed package", "package : " + launch.getPackage());
//				Log.i("installed package", "package comp : " + launch.getComponent().getPackageName());
//				Log.i("installed package", "package class : " + launch.getComponent().getClassName());
			}
		}
	}

	public static Intent testWebBrowser(PackageManager pm, String packageName) {
		Intent  browsableIntent = pm.getLaunchIntentForPackage(packageName);
		browsableIntent.setAction("android.intent.action.VIEW");
		browsableIntent.addCategory("android.intent.category.BROWSABLE");

		return browsableIntent;
	}

//	private static Tracker getTracker(Context ctxt) {
//		if(null == Util.tracker) {
//			GoogleAnalytics analytics = GoogleAnalytics.getInstance(ctxt);
//			tracker = analytics.newTracker(ctxt.getString(R.string.ga_trackingId));
//			tracker.enableAutoActivityTracking(true);
//		}
//
//		return Util.tracker;
//	}
	
	public static void sendScreenView(Context ctxt, String screen) {
//		Util.getTracker(ctxt).setScreenName(screen);
//		Util.getTracker(ctxt).send(new HitBuilders.AppViewBuilder().build());
	}
}
