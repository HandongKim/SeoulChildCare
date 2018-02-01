using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;
using Uno.Net;

namespace Fuse.UniSign.Fuse_UniSign
{
	public class FileDownload
	{
		private static FileDownload instance = new FileDownload();

		


		public static FileDownload GetInstance() 
		{
			if (instance == null) {
				instance = new FileDownload();
			}

			return instance;
		}


		public void fileDownloadCalled(string url)  
		{
			if defined(ANDROID) 
			{
				debug_log("This is Android");
				

				var temp = AndroidFileDownload.Instance;
				temp.StartActivityForDownloadFile(url);
			} else if defined(iOS) 
			{
				debug_log("This is iOS");
				openDocument(url);
			}
			
		}

		public void getIpAddress()  
		{
			

			debug_log("getIpAddress");
			
			
		}




















		[Foreign(Language.ObjC)]
		static void openDocument(string url) 
		@{
			NSString *fileName = @"";
			NSString *myPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
			NSString *filePath = [NSString stringWithFormat:@"%@/%@", myPath, fileName];
			NSLog(@"This is temp : %@", filePath);
			NSLog(@"This is native log");
			NSLog(@"URL : %@", url);
			UIApplication *application = [UIApplication sharedApplication];
			NSURL *URL = [NSURL URLWithString:url];
			[application openURL:URL];

		@}



		[Foreign(Language.Java)]
		static void openDocumentAndroid(string url) 
		@{

		@}

	}
}
