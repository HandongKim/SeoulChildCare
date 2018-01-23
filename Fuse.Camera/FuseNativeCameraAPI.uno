using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;


namespace Fuse.Native.Camera {

	public static class FuseNativeCameraAPI
	{
		public static void ShowCamera()
		{
			if defined(ANDROID)
			{
				debug_log("2018.01.22 ANDROID SHOW CAMERA WAS CALLED");
				
				AndroidCamera.Instance.ShowCamera();
				//if (error != null)
				//	throw new Exception("Failed to set license: " + error);
			}
			else if defined(iOS)
			{
				debug_log("2018.01.22 iOS SHOW CAMERA WAS CALLED");
				//return iOSCamera.ShowCamera();
			}
			else
			{
				debug_log("Preview mode - platform not supported");
				throw new Exception("Platform not supported");
			}
		}

		public static void GetGallery()
		{
			if defined(ANDROID)
			{
				debug_log("2018.01.22 ANDROID SHOW CAMERA WAS CALLED");

				AndroidCamera.Instance.ShowCamera();
				//if (error != null)
				//	throw new Exception("Failed to set license: " + error);
			}
			else if defined(iOS)
			{
				debug_log("2018.01.22 iOS SHOW CAMERA WAS CALLED");
				//return iOSCamera.ShowCamera();
			}
			else
			{
				debug_log("Preview mode - platform not supported");
				throw new Exception("Platform not supported");
			}
		}
	}
}