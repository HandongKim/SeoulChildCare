using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Permissions;
using Uno.Compiler.ExportTargetInterop;
using Android;

namespace Fuse.UniSign.Fuse_UniSign
{
	
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

	extern(ANDROID) class AndroidFileDownload
	{
		static AndroidFileDownload()
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
			InitAndroidFileDownload();
		}

		static void OnPermissionsRejected(Exception e)
		{
			debug_log("PREMISSIONS REJECTED: " + e.Message);
		}

		private static AndroidFileDownload instance;


		[Foreign(Language.Java)]
		static void InitAndroidFileDownload()
		@{
			
		@}

		public static AndroidFileDownload Instance {
			get {
				if (instance == null) {
					instance = new AndroidFileDownload();
				}
				return instance;
			}
		}

		[Foreign(Language.Java)]
		static extern(android) Java.Object nativeIntent(string url)
		@{
			Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
			return intent;
		@} 
		

		[Foreign(Language.Java)]
		public void ShowDocument()
		@{
			//return showCamera();
			debug_log("Show Document was started");
          	@{AndroidCamera:Of(_this).StartActivityForDownloadFile():Call()};
           
		@}

		bool StartActivityForDownloadFile() 
		{
			debug_log("StartActivityForCameraStartActivityForCamera");
			ActivityUtils.StartActivity(nativeIntent("https://www.google.com"));
			return true;
		} 

		[Foreign(Language.Java)]
		extern(android) void OnResult(int resultCode, Java.Object intent, object info)
		@{
			debug_log("wjeifjeifje");
		@}

	}
}
