using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Permissions;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.Native.Camera {

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

		[Foreign(Language.Java)]
		static void InitCamera()
		@{
			
		@}

		//public static AndroidCamera Instance { 
		//	get { 
		//		debug_log("AndroidCamera Instance");
		//		return new AndroidCamera(); 
		//	} 
		//}

		[Foreign(Language.Java)]
		public static string ShowCamera()
		@{
			//return showCamera();
			android.util.Log.d("", "show camera");
			return null;
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