package com.crosscert.sample.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.os.Environment;
import android.view.View;

public class FileUtil {
	private static String TAG = FileUtil.class.getClass().getSimpleName();
	private static ApplicationInfo appInfo = new ApplicationInfo();
	
	public static final String BACKUP_FOLDER = appInfo.processName;
	
	public static String getBackupFolder() {
		String result = "";
		String ext = Environment.getExternalStorageState();
		if (ext.equals(Environment.MEDIA_MOUNTED)) {
			result = Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + BACKUP_FOLDER;
		} else {
			result = Environment.MEDIA_UNMOUNTED;
		}
		return result;
	}

	public static String getDownLoadFolder() {
		String result = "";
		String ext = Environment.getExternalStorageState();
		if (ext.equals(Environment.MEDIA_MOUNTED)) {
			result = Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + BACKUP_FOLDER + "/DOWNLOAD";
		} else {
			result = Environment.MEDIA_UNMOUNTED;
		}
		return result;
	}

	public static String getTextFromFile(String fileName) {
		File file = new File(fileName);

		StringBuilder text = new StringBuilder();

		try {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line;

			while ((line = br.readLine()) != null) {
				text.append(line);
				text.append('\n');
			}
		} catch (IOException e) {
			PrintLog.upLoadLog(TAG, "getTextFromFile()",e);
		}
		return text.toString();
	}
	
	public static void saveView(Activity activity, View view,  String strFilePath) {
		Bitmap bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.RGB_565);
		
		if (bitmap!= null) {
			try {
				// File f = new File("/notes");
				// f.mkdir();
				File file = new File(strFilePath);

				Canvas canvas = new Canvas(bitmap);
				view.draw(canvas);

				FileOutputStream fos = new FileOutputStream(file);

				if (fos != null) {
					bitmap.compress(Bitmap.CompressFormat.PNG, 1, fos);
					fos.close();
				}
				
				BitmapFactory.Options options = new BitmapFactory.Options();
				options.inSampleSize = 4;
				Bitmap bitmapScale = BitmapFactory.decodeFile(strFilePath, options);
//				Bitmap bitmapResize = Bitmap.createScaledBitmap(bitmapScale, 128, 64, true);

				file = new File(strFilePath);
				fos = new FileOutputStream(file);

				if (fos != null) {
					bitmapScale.compress(Bitmap.CompressFormat.PNG, 1, fos);
					fos.close();
				}
				
			} catch (Exception e) {
				PrintLog.upLoadLog(TAG, "saveView()",e);
				e.printStackTrace();
			}
			
			Bitmap bmp;
			bmp = BitmapFactory.decodeFile(strFilePath);
			
			int mWidth = bmp.getWidth();
			int mHeight = bmp.getHeight();
			int mStride = mWidth+(4-mWidth%4);   // stride 4의 배수로 맞춤
			int []mImageData = new int[mStride*mHeight];
			for(int y = 0; y <mHeight; ++y) {
				for(int x = 0; x < mWidth; ++x) {
					mImageData[y*mStride+x] = bmp.getPixel(x, y);
				}
			}
		}
	}
}
