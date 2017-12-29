using Uno;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign.iOS
{
	internal class ErrorClosure
	{
		public string Error { get; private set; }
		public void OnError(string error) { Error = error; }
	}

	[extern(iOS) Require("LinkDirectory", "@('./Library':Path)")]
	[extern(iOS) Require("LinkLibrary", "USToolkitEx")]
	[extern(iOS) Require("IncludeDirectory", "@('./Library':Path)")]
	extern(iOS) public abstract class UniSignBase {}

	[extern(iOS) Require("Source.Include", "USListMgr.h")]
	extern(iOS) public class ListMgr : UniSignBase
	{
		private static Certificate[] list = null;

		public static Certificate[] UserCertificates
		{
			get
			{
				var userCertsArray = GetUserCertificates();
				var count = NSArrayHelpers.Count(userCertsArray);
				debug_log("1111 Count from NSArrayHelpers: " + count);

				var result = new Certificate[0];
				if (count == 0) {
					
				} else {
					result = new Certificate[count];
				}
				
				debug_log("22222 Count from NSArrayHelpers: " + count);

				for (var i = 0; i < count; i++) {
					result[i] = new Certificate(i, NSArrayHelpers.ObjectAtIndex(userCertsArray, i));
				}


				debug_log("3333 Count from NSArrayHelpers: " + count);
				
				ListMgr.list = result;


				debug_log("44444 Count from NSArrayHelpers: " + count);
				return result;
			}
		}

		public static Certificate GetUserCertificateAtIndex(int index)
		{
			if (list == null) { return null; }
			if (index < 0 || index >= list.Length) { return null; }
			return list[index];
		}

		[Foreign(Language.ObjC)]
		static ObjC.Object GetUserCertificates()
		@{
			NSLog(@"Objective-C There are %lu certificates", (unsigned long)[[USListMgr UserCertificates] count]);
			return [USListMgr UserCertificates];
		@}



		public static bool removeUserCertificate (ObjC.Object cert)
		{
			var removedOrNot = RemoveUserCertificate(cert);
			return removedOrNot;
		}


		[Foreign(Language.ObjC)]
		static bool RemoveUserCertificate(ObjC.Object cert)
		@{
			BOOL removed = [USListMgr remove:cert subjectDN:[cert subjectDN]];
			return removed;
		@}
				
	}

	[Require("Source.Include", "USUtil.h")]
	extern(iOS) public class Util : UniSignBase
	{
		public static string Serial { get { return GetSerial(); } }

		[Foreign(Language.ObjC)]
		static string GetSerial()
		@{
			return [USUtil serial];
		@}
	}

	[Require("Source.Include", "Foundation/Foundation.h")]
	extern(iOS) internal static class NSArrayHelpers
	{
		[Foreign(Language.ObjC)]
		public static int Count(ObjC.Object handle)
		@{
			return (int)[((NSArray*)handle) count];
		@}

		[Foreign(Language.ObjC)]
		public static ObjC.Object ObjectAtIndex(ObjC.Object handle, int index)
		@{
			return [((NSArray*)handle) objectAtIndex:index];
		@}
	}
}

