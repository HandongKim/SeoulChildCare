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
                "java.io.File")]
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