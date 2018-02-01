using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Net;

namespace Fuse.UniSign.Fuse_UniSign
{
	[UXGlobalModule]
	public class FileDownloadUX : NativeModule
	{
		static FileDownloadUX _instance;

		public FileDownloadUX() {
			if(_instance != null) return;
			Resource.SetGlobalKey(_instance = this, "FileDownloadUX");
			AddMember(new NativeFunction("documentDownload", (NativeCallback)documentDownload));
			AddMember(new NativeFunction("getIpAddress", (NativeCallback)getIpAddress));
			
		}


		object documentDownload(Context context, object[] args)
		{
			debug_log("FileDownload was called");
			debug_log("URL FROM JAVASCRIPT : " + args[0]);
			FileDownload.GetInstance().fileDownloadCalled(args[0] as string);
			return null;
		}

		object getIpAddress(Context context, object[] args) 
		{
			FileDownload.GetInstance().getIpAddress();
			return null;
		} 

	}
}
