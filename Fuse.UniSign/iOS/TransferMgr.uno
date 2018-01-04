using Uno;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign.iOS
{
	[extern(iOS) Require("Source.Include", "USTransferMgr.h")]
	[extern(iOS) Require("Source.Include", "USToolkitMgr.h")]
	[extern(iOS) Require("Source.Include", "USListMgr.h")]
	[extern(iOS) Require("Source.Include", "USCertificate.h")]


	extern(iOS) public class TransferMgr : UniSignBase

	{

		ObjC.Object _handle;

		TransferMgr(ObjC.Object handle) {
			_handle = handle;
		}

		public static TransferMgr TryCreate(out string error) {
			var errorClosure = new ErrorClosure();
			var handle = Init(errorClosure.OnError);
			if (errorClosure.Error != null) {
				error = errorClosure.Error;
				return null;
			} else {
				error = null;
				return new TransferMgr(handle);
			}
		}




		public bool IsPCConnected(out string error) {
			var errorClosure = new ErrorClosure();
			var isConnected = IsPCConnected(_handle, errorClosure.OnError);
			error = errorClosure.Error;
			return isConnected;
		}

		[Foreign(Language.ObjC)]
		static bool IsPCConnected(ObjC.Object handle, Action<string> onError)
		@{
			NSError* error;
			if ([((USTransferMgr*)handle) TRANS_IsPCConnected:&error]) {
				return true;
			} else {
				onError([NSString stringWithFormat:@"%@", error]);
				return false;
			}
		@}










		public Certificate ImportCert(out string error) {

			debug_log("2017.11.28 Process NO 2");
			error = null;


			var _toolkitMgr = ToolkitMgr.TryGetInstance(out error);
			if (error != null) {
				debug_log("Failed to get instance: " + error);
				return null;
			} else {
				debug_log("Got instance!");
			}

			debug_log("2018.01.04 ah.. shit");



			var errorClosure = new ErrorClosure();
			var importedCert = ImportCert(_handle, _toolkitMgr.Handle, errorClosure.OnError);
			if (errorClosure.Error != null) {
				error = errorClosure.Error;
				return null;
			} else {
				error = null;
				// NOTE THAT THE INDEX VALUE 0 IS NOT IMPORTANT
				return new Certificate(0, importedCert);
			}
		}

		public bool ExportCert(out string error, ObjC.Object cert) 
		{
			error = null;
			bool exportedOrNot = false;

			var _toolkitMgr = ToolkitMgr.TryGetInstance(out error);
			if (error != null) {
				debug_log("Failed to get instance: " + error);
				return false;
			} else {
				debug_log("Got instance!");
			}

			var errorClosure = new ErrorClosure();
			exportedOrNot = ExportCert(_handle, _toolkitMgr.Handle, errorClosure.OnError, cert);

			if (errorClosure.Error != null) {
				error = errorClosure.Error;
				return false;
			} else {
				error = null;
				// NOTE THAT THE INDEX VALUE 0 IS NOT IMPORTANT
				return exportedOrNot;
			}

		}



		[Foreign(Language.ObjC)]
		static ObjC.Object ImportCert(ObjC.Object handle, ObjC.Object toolkitMgr, Action<string> onError)
		@{

			NSLog(@"2017.11.28 Process No 1");

			USError* error = nil;
			USCertificate* importedCert = [((USTransferMgr*)handle) TRANS_ImportCert:&error];
			if (error != nil) {
				onError([NSString stringWithFormat:@"%@", error]);
				return nil;
			} else {
			    [importedCert setToolkit:(USToolkitMgr*)toolkitMgr];
			   	BOOL isAdded = [USListMgr add:importedCert subjectDN:[importedCert subjectDN]];
			  	NSLog(@"🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶 importedCert was added : %d", isAdded);
				return importedCert;
			}
		@}




		




		//2017.11.29 인증서 내보내기 소스 시작 (주석처리)
		[Foreign(Language.ObjC)]
		static bool ExportCert(ObjC.Object handle, ObjC.Object toolkitMgr, Action<string> onError, ObjC.Object cert)
		@{

			USError *error = nil;
    		
    		BOOL exportedOrNot = NO;

    		exportedOrNot = [((USTransferMgr*)handle) TRANS_Exportcert:cert error:&error];
    
		    if (nil != error)
    		{
        		NSLog(@"%@ [%@, %d]", @"인증서 내보내기 실패하였습니다.", [error description], (int)[error code]);
    		}
    		else
    		{
        		NSLog(@"%@ [%@, %d]", @"인증서 내보내기에 성공하였습니다.", [error description], (int)[error code]);
    		}
			
			return exportedOrNot;
		@}
		//2017.11.29 인증서 내보내기 소스 시작 (주석처리)
		





		public string TryGenerateCertNum(TransDirection direction, string serial, out string error) {
			var dir = TransDirectionToInt(direction);
			var errorClosure = new ErrorClosure();
			var certNum = GenerateCertNum(_handle, dir, serial, errorClosure.OnError);
			if (errorClosure.Error != null) {
				error = errorClosure.Error;
				return null;
			} else {
				error = null;
				return certNum;
			}
		}

		int TransDirectionToInt(TransDirection direction) {
			switch (direction) {
				case TransDirection.Import:
					return extern<int>"kUSTransImport";

				case TransDirection.Export:
					return extern<int>"kUSTransExport";

				default:
					throw new Exception("Unexpected direction: " + direction);
			}
		}

		/*
		[Foreign(Language.ObjC)]
		static string GenerateExportCertNum(ObjC.Object handle, int direction, string serial, int certIndex, Action<string> onError) 
		@{
			NSError *error;
			NSString* result = [((USTransferMgr*)handle) TRANS_GenerateCertNum:kUSTransIOS
				direction:(USTransDirection)direction
				serial:serial
				error:&error];
			if (error != nil) {
				onError([NSString stringWithFormat:@"%@", error]);
				return nil;
			} else {
				return result;
			}


		@}
		*/



		[Foreign(Language.ObjC)]
		static string GenerateCertNum(ObjC.Object handle, int direction, string serial, Action<string> onError)
		@{
			NSError* error;

			

			NSString* result = [((USTransferMgr*)handle) TRANS_GenerateCertNum:kUSTransIOS
				direction:(USTransDirection)direction
				serial:serial
				error:&error];
			if (error != nil) {
				onError([NSString stringWithFormat:@"%@", error]);
				return nil;
			} else {
				return result;
			}
		@}


		[Foreign(Language.ObjC)]
		static ObjC.Object Init(Action<string> onError)
		@{
			NSError* error;
			USTransferMgr* mgr = [[USTransferMgr alloc] init:kUSTransV1_0 appID:nil appKey:nil type:kUSTransOwn error:&error];
			if (error != nil) {
				onError([NSString stringWithFormat:@"%@", error]);
				return nil;
			} else {
				return mgr;
			}
		@}
	}
}