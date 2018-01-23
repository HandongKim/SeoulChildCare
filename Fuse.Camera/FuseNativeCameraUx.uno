using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;


namespace Fuse.Native.Camera {
	[UXGlobalModule]
	public class FuseNativeCameraUX : NativeModule
	{
		static FuseNativeCameraUX _instance;

		public FuseNativeCameraUX() {
			if(_instance != null) return;
			Resource.SetGlobalKey(_instance = this, "FuseNativeCamera");
			AddMember(new NativeFunction("showCamera", (NativeCallback)showCamera));
			AddMember(new NativeFunction("getGallery", (NativeCallback)getGallery));
		}

		object showCamera(Context context, object[] args)
		{
			debug_log("show camera in UNO");

			debug_log("Context : " + context);

			//FuseNativeCameraAPI.ShowCamera();
			return null;
		}

		object getGallery(Context context, object[] args)
		{
			debug_log("get gallery in UNO");
			//return FuseNativeCameraAPI.ShowCamera();
			return null;
		}

	}
}