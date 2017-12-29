package com.crosscert.sample.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import android.os.Environment;
import android.util.Log;

public class PrintLog {
	private final static String TAG = PrintLog.class.getSimpleName();
	public static final int LOG_LEVEL = PrintLog.DEBUG;
	public static final String LOG_FILE_NAME = "log_";
	public static final String LOG_FILE_EXT = ".txt";
	public static final int ERROR = 1;
	public static final int WARN = 2;
	public static final int INFO = 3;		
	public static final int DEBUG = 4;
	public static final int VERBOSE = 5;


	public static void upLoadLog(final String tag, final String str, final Exception exp) {
		final StringBuffer sb = new StringBuffer();
		final StackTraceElement[] message = exp.getStackTrace();
		sb.append(":::::::"+FormatUtil.formyyyyMMddHHmmNoSeparator(new Date())+":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"+"\r\n");
		sb.append(str+"\r\n");
		for (int i = 0; i < message.length; i++) {
			sb.append(message[i]);
			sb.append("\r\n");
		
		}
		sb.append(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"+"\r\n");
		Log.e(tag,  sb.toString());
		createLogFile(sb.toString());
		exp.printStackTrace();
	}

	public static void upLoadStateLog(final String tag, final String str) {
		final StringBuffer sb = new StringBuffer();
		sb.append(FormatUtil.formyyyyMMddHHmmNoSeparator(new Date()) + " : ");
		sb.append(str + "\r\n");
		createLogFile(sb.toString());
	}
	

	public static int v(final String tag, final String msg) {
		int ret = -1;
		if (LOG_LEVEL >= VERBOSE) {
			ret = Log.v(tag, msg);
		}
		return ret;
	}

	public static int v(final String tag, final String msg, final Throwable tr) {
		int ret = -1;
		if (LOG_LEVEL >= VERBOSE) {
			ret = Log.v(tag, msg, tr);
		}
		return ret;
	}

	public static int d(final String tag, final String msg) {
		int ret = -1;
		if (LOG_LEVEL >= DEBUG) {
			ret = Log.d(tag, msg);
		}
		return ret;
	}

	public static int m(final String tag, final String msg) {
		int ret = -1;
		if (LOG_LEVEL >= DEBUG) {
			StringBuffer sb = new StringBuffer();
			int size = msg.getBytes().length + 14;
			for (int i = 0; i < size; i++) {
				sb.append("#");
			}
			Log.d(tag, sb.toString());
			ret = Log.d(tag, "####   " + msg + "   ####");
			Log.d(tag, sb.toString());
		}
		return ret;
	}

	public static int d(final String tag, final String msg, final Throwable tr) {
		int ret = -1;
		if (LOG_LEVEL >= DEBUG) {
			ret = Log.d(tag, msg, tr);
		}
		return ret;
	}

	public static int i(final String tag, final String msg) {
		int ret = -1;
		if (LOG_LEVEL >= INFO) {
			StringBuffer sb = new StringBuffer();
			int size = msg.getBytes().length + 14;
			for (int i = 0; i < size; i++) {
				sb.append("#");
			}
			Log.i(tag, sb.toString());
			ret = Log.i(tag, "####   " + msg + "   ####");
			Log.i(tag, sb.toString());
		}

		return ret;
	}

	public static int i(final String tag, final String msg, final Throwable tr) {
		int ret = -1;
		if (LOG_LEVEL >= INFO) {
			StringBuffer sb = new StringBuffer();
			int size = msg.getBytes().length + 14;
			for (int i = 0; i < size; i++) {
				sb.append("#");
			}
			Log.i(tag, sb.toString());
			ret = Log.i(tag, "####   " + msg + "   ####");
			Log.i(tag, sb.toString());
		}
		return ret;
	}

	public static int w(final String tag, final String msg) {
		int ret = -1;
		if (LOG_LEVEL >= WARN) {
			ret = Log.w(tag, msg);
		}
		return ret;
	}

	public static int w(final String tag, final String msg, final Throwable tr) {
		int ret = -1;
		if (LOG_LEVEL >= WARN) {
			ret = Log.w(tag, msg, tr);
		}
		return ret;
	}

	public static int w(final String tag, final Throwable tr) {
		int ret = -1;
		if (LOG_LEVEL >= WARN) {
			ret = Log.w(tag, tr);
		}
		return ret;
	}

	public static int e(final String tag, final String msg) {
		int ret = -1;
		if (LOG_LEVEL >= ERROR) {
			ret = Log.e(tag, msg);
		}
		return ret;
	}

	public static int e(final String tag, final String msg, final Throwable tr) {
		int ret = -1;
		if (LOG_LEVEL >= ERROR) {
			ret = Log.e(tag, msg, tr);
		}
		return ret;
	}

	public static void createLogFile(String log) {
		try {
			String backupLogFilename = "";
			backupLogFilename = LOG_FILE_NAME+FormatUtil.formyyyyMMddHyphen(new Date())+LOG_FILE_EXT;

			File sd = Environment.getExternalStorageDirectory();
			File data = Environment.getDataDirectory();
			boolean isAccessSDcard = false;

			isAccessSDcard = sd.canWrite();

			if (isAccessSDcard) {

				File backupDrectory = new File( com.crosscert.sample.util.FileUtil.getBackupFolder());
				if (!backupDrectory.exists()) {
					backupDrectory.mkdirs();
				}

				File backupLog = new File(com.crosscert.sample.util.FileUtil.getBackupFolder(), backupLogFilename);
				if (!backupLog.exists()) {
					backupLog.createNewFile();
				}

				if (backupLog.isFile()) {
					if(backupLog.canWrite()){
						BufferedWriter out = new BufferedWriter(new FileWriter(backupLog, true));
						PrintWriter printWriter = new PrintWriter(out,true);
						printWriter.println(log);
//						PrintLog.w(TAG,"log : "+log);
						printWriter.flush();
						printWriter.close();
					}
				}
			}

		} catch (IOException e) {
//			PrintLog.upLoadLog(TAG, "createLogFile", e);
		}
	}

}
