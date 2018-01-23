using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Permissions;
using Uno.Compiler.ExportTargetInterop;
using Android;

namespace Fuse.Native.Camera {


[ForeignInclude(Language.Java,
                "android.app.Activity",
                "android.content.Intent",
                "android.net.Uri",
                "android.os.Bundle",
                "android.provider.MediaStore",
                "java.io.File",
                "android.os.Bundle",
                "android.graphics.Bitmap",
                "android.graphics.Canvas",
                "android.graphics.Paint",
                "android.graphics.ColorMatrix",
                "android.graphics.ColorMatrixColorFilter",
                "android.graphics.Bitmap.Config",
                "android.content.ContextWrapper",
                "java.io.FileOutputStream",
                "android.content.Context",
                "java.lang.Exception","android.os.Environment")]
	extern(ANDROID) class AndroidCamera
	{
		static AndroidCamera()
		{
			var permissions = new PlatformPermission[]
			{
				Permissions.Android.WRITE_EXTERNAL_STORAGE,
				Permissions.Android.CAMERA,
				Permissions.Android.READ_EXTERNAL_STORAGE
			};
			Permissions.Request(permissions).Then(OnPermissionsGranted, OnPermissionsRejected);
		}

		static void OnPermissionsGranted(PlatformPermission[] permissions)
		{
			debug_log("PREMISSIONS GRANTED!");
			InitCamera();
		}

		static void OnPermissionsRejected(Exception e)
		{
			debug_log("PREMISSIONS REJECTED: " + e.Message);
		}

		private static AndroidCamera instance;


		[Foreign(Language.Java)]
		static void InitCamera()
		@{
			
		@}

		public static AndroidCamera Instance {
			get {
				if (instance == null) {
					instance = new AndroidCamera();
				}
				return instance;
			}
		}
		//public static AndroidCamera Instance { 
		//	get { 
		//		debug_log("AndroidCamera Instance");
		//		return new AndroidCamera(); 
		//	} 
		//}

		[Foreign(Language.Java)]
		static extern(android) Java.Object nativeIntent()
		@{
			Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
			return intent;
		@} 



		[Foreign(Language.Java)]
		public void ShowCamera()
		@{
			//return showCamera();
			//카메라 호출
			debug_log("Show Camera was started");

			
            //startActivityForResult(intent,1);
           @{AndroidCamera:Of(_this).StartActivityForCamera():Call()};
           


			//android.util.Log.d("", "show camera");
			//return null;
		@}

		bool StartActivityForCamera() 
		{
			debug_log("StartActivityForCameraStartActivityForCamera");

			ActivityUtils.StartActivity(nativeIntent(), OnResult);
			return true;
		} 

		[Foreign(Language.Java)]
		extern(android) void OnResult(int resultCode, Java.Object intent, object info)
		@{
			debug_log("PREMISSIONS REJECTED: " + resultCode);
			Bundle bundle = ((Intent)intent).getExtras();
			Bitmap photo = bundle.getParcelable("data");

			Bitmap bmpGrayscale = Bitmap.createBitmap(photo.getWidth(), photo.getHeight(), Config.ARGB_8888);
	        Canvas c = new Canvas(bmpGrayscale);
	        Paint paint = new Paint();
	        ColorMatrix cm = new ColorMatrix();
	        cm.setSaturation(0);
	        ColorMatrixColorFilter f = new ColorMatrixColorFilter(cm);
	        paint.setColorFilter(f);
	        c.drawBitmap(photo, 0, 0, paint);

        	

	        String root = Environment.getExternalStorageDirectory().toString();
        	File myDir = new File(root);
        	String fname = "Image-" + "image_name"+ ".jpg";
        	myDir.mkdirs();

        	  File filefefef = new File(myDir, fname);


			ContextWrapper cw = new ContextWrapper(com.fuse.Activity.getRootActivity().getApplicationContext());
         	// path to /data/data/yourapp/app_data/imageDir
        	File directory = cw.getDir("imageDir", com.fuse.Activity.getRootActivity().MODE_PRIVATE);

        	directory = "data/app.ss.accss/imageDir";

        	// Create imageDir
        	File mypath = new File(directory,"profile.jpg");

        	FileOutputStream fos = null;
        	try {           
            	fos = new FileOutputStream(filefefef);
       	//		// Use the compress method on the BitMap object to write image to the OutputStream
            	bmpGrayscale.compress(Bitmap.CompressFormat.PNG, 100, fos);


			String strFileSize = null;
        	if (filefefef.exists() )

			{
			      long lFileSize = filefefef.length();
			     strFileSize = Long.toString(lFileSize) + " bytes";
				debug_log("strFileSize ==> " + strFileSize);
			}
        	} catch (Exception e) {
        		debug_log("ERROR OCCURRED WHILE MAKING IT GRAY");
              e.printStackTrace();
        	} finally {
            	try {
            		fos.flush();
              		fos.close();
            	} catch (Exception e) {
              		e.printStackTrace();
            	}
        	}	 
        
        	//return directory.getAbsolutePath();






		@}

	}

	


	

	extern(iOS) public class iOSCamera
	{
		[Foreign(Language.ObjC)]
		public static string ShowCamera()
		@{
			NSLog(@"ShowCamera");
			return nil;

		@}

		//public static iOSCamera TryGetInstance()
		//{
		//	debug_log("iOSCamera TryGetInstance");
		//	return new iOSCamera();
		//}
	}

}