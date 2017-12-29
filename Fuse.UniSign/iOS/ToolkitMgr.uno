using Uno;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign.iOS
{
	[extern(iOS) Require("Source.Include", "USToolkitMgr.h")]
	[extern(iOS) Require("Source.Include", "USListMgr.h")]
	[extern(iOS) Require("Source.Include", "USError.h")]
	[extern(iOS) Require("Source.Include", "USUtil.h")]
	extern(iOS) public class ToolkitMgr : UniSignBase
	{
		[Foreign(Language.ObjC)]
		public static void SetLicense(string license)
		@{
			[USToolkitMgr setLicense:license];
		@}

		public static string TryGetLibLicenseInfo(out string error)
		{
			var errorClosure = new ErrorClosure();
			var licenseInfo = GetLibLicenseInfo(errorClosure.OnError);
			if (errorClosure.Error != null)
			{
				error = errorClosure.Error;
				return null;
			}
			else
			{
				error = null;
				return licenseInfo;
			}
		}

		public static ToolkitMgr TryGetInstance(out string error)
		{
			var errorClosure = new ErrorClosure();
			var instance = GetInstance(errorClosure.OnError);
			if (errorClosure.Error != null)
			{
				error = errorClosure.Error;
				return null;
			}
			else
			{
				error = null;
				return new ToolkitMgr(instance);
			}
		}


		/*
			비밀번호 확인 로직
		*/
		public static bool checkThePassword (string password, ObjC.Object cert) 
		{
			var isPasswordCorrect = CheckThePassword(password, cert);
			return isPasswordCorrect;
		}


		[Foreign(Language.ObjC)]
		static bool CheckThePassword (string password, ObjC.Object cert)
		@{
			NSError *error;
			USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];
			NSData  *data = nil;
    					
    		//NSString *test = @"BASE64_WORD";
    		NSString *test = @"imgg";
    		data = [test dataUsingEncoding:NSUTF8StringEncoding];
    		BOOL ret = [toolkit isCorrectCert:cert password:password error:&error]; 
    		return ret;
		@}


		/*
			전자서명 값 가져오는 로직
		*/

		public static string getLogicSignedData (string password, ObjC.Object cert)
		{
			var mSignedData = GetLogicSignedData(password, cert);
			return mSignedData;
		}



		[Foreign(Language.ObjC)]
		static string GetLogicSignedData (string password, ObjC.Object cert) 
		@{
			USError *error = nil;
    		USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];
			NSData  *data = nil;

    		NSString *test = @"imgg";
    		data = [test dataUsingEncoding:NSUTF8StringEncoding];
    		NSData *ret = [toolkit logicSignedData:cert data:data password:password error:&error];
		    NSString *mSignedData = [NSString base64Encode:ret error:&error];
		    return mSignedData;
		@}




		/*
			비밀번호 변경 로직
		*/
		public static void changePassword(string oldPassword, string newPassword, ObjC.Object cert) 
		{
			ChangePassword(oldPassword, newPassword, cert);
		}

		[Foreign(Language.ObjC)]
		static void ChangePassword (string oldPassword, string newPassword, ObjC.Object cert) 
		@{
			NSError *error;
			USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];
			USCertificate *certificate = [toolkit logicChangeCert:cert currentPassword:oldPassword newPassword:newPassword error:&error];

			NSString *msg;
			if(nil == error)
    		{
        		//[USListMgr add:cert subjectDN:certificate.subjectDN];
        		msg = @"비밀번호가 변경되었습니다.";
    		} 
    		else
    		{
        		msg = [NSString stringWithFormat:@"비밀번호 변경에 실패했습니다.\n(%ld)", (long)[error code]];
        		msg =@"비밀번호 변경에 실패했습니다.";
    		}

    		NSLog(@"%@", msg);
		@}

		public ObjC.Object Handle { get { return _handle; } }

		ObjC.Object _handle;

		ToolkitMgr(ObjC.Object handle)
		{
			_handle = handle;
		}

		[Foreign(Language.ObjC)]
		static ObjC.Object GetInstance(Action<string> onError)
		@{
			NSError* error;
			USToolkitMgr* instance = [USToolkitMgr getInstance:&error];
			if (error != nil) {
				onError([NSString stringWithFormat:@"%@", error]);
				return nil;
			} else {
				return instance;
			}
		@}

		[Foreign(Language.ObjC)]
		static string GetLibLicenseInfo(Action<string> onError)
		@{
			NSError* error;
			NSString* licenseInfo = [USToolkitMgr API_GetLibLicenseInfo:&error];
			NSLog(@"2017.12.25 licenseInfo : %@", licenseInfo );

			if (error != nil) {
				onError([NSString stringWithFormat:@"%@", error]);
				return nil;
			} else {
				return licenseInfo;
			}
		@}

	}
}