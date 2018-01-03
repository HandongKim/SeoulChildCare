using Uno;
using Uno.Permissions;
using Uno.Array;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign.Android
{
	internal class ErrorClosure
	{
		public string Error { get; private set; }
		public void OnError(string error) { Error = error; }
	}

    [Require("AndroidManifest.Permission", "android.permission.WRITE_EXTERNAL_STORAGE")]
	[Require("AndroidManifest.Permission", "android.permission.INTERNET")]
	[Require("AndroidManifest.Permission", "android.permission.READ_PHONE_STATE")]
	[Require("AndroidManifest.Permission", "android.permission.RESTART_PACKAGES")]
	[Require("AndroidManifest.Permission", "android.permission.ACCESS_WIFI_STATE")]
	[Require("LinkDirectory", "@('./Library/armeabi':Path)")]
	[Require("JNI.SharedLibrary", "@('./Library/armeabi/libUSToolkit.so':Path)")]
	[Require("JNI.SharedLibrary", "@('./Library/armeabi/libCertTransfer.so':Path)")]
	[ForeignInclude(Language.Java, "com.crosscert.androidustk",
		"com.crosscert.android.core.Cert",
		"com.crosscert.android.core.CertListMgr",
		"com.crosscert.android.core.CertToolkitMgr",
		"com.crosscert.android.core.CertUtil",
		"com.crosscert.exception.USToolkitException",)]
	extern(ANDROID) public abstract class UniSignBase { }

	[ForeignInclude(Language.Java, 
		"com.crosscert.android.core.CertToolkitMgr", 
		"com.crosscert.android.core.CertListMgr", 
		"com.crosscert.android.core.CertUtil", 
		"java.util.ArrayList", 
		"java.util.Collection", 
		"android.content.Intent", 
		"android.content.res.AssetManager",
		"java.io.File",
		"android.os.SystemClock",
		"android.os.Environment")]
	extern(ANDROID) public class ToolkitMgr : UniSignBase
	{

		private static Certificate[] androidList = null;

		static ToolkitMgr()
		{
			var permissions = new PlatformPermission[]
			{
				Permissions.Android.WRITE_EXTERNAL_STORAGE,
				Permissions.Android.INTERNET,
				Permissions.Android.READ_PHONE_STATE,
				Permissions.Android.RESTART_PACKAGES,
				Permissions.Android.ACCESS_WIFI_STATE
			};
			Permissions.Request(permissions).Then(OnPermissionsGranted, OnPermissionsRejected);
		}

		static void OnPermissionsGranted(PlatformPermission[] permissions)
		{
			debug_log("PREMISSIONS GRANTED!");
			InitCertListMgr();
		}

		static void OnPermissionsRejected(Exception e)
		{
			debug_log("PREMISSIONS REJECTED: " + e.Message);
		}

		[Foreign(Language.Java)]
		static void InitCertListMgr()
		@{
			try {
				CertListMgr.getInstance().initCertList();
				SystemClock.sleep(1000);
			} catch (Exception e) {
				android.util.Log.d("@(Activity.Package).@(Activity.Name).GetRootActivity().getPackageName()", "initCertList failed: " + e.getMessage());
			}
		@}

		public static ToolkitMgr Instance { get { return new ToolkitMgr(GetInstance()); } }

		Java.Object _handle;

		ToolkitMgr(Java.Object handle)
		{
			_handle = handle;
		}

		public bool TransInit(string licenseKey) { return TransInit(_handle, licenseKey); }

		public string TransGenerateCertNum(TransDirection direction, string uniqueInfo, out string error)
		{
			var certNum = TransGenerateCertNum(_handle, (int)direction, uniqueInfo);
			if (certNum.Length == 13 && certNum[0] >= '0' && certNum[0] <= '9')
			{
				error = null;
				return certNum;
			}
			else
			{
				error = certNum;
				return null;
			}
		}

		[Foreign(Language.Java)]
		static bool TransInit(Java.Object handle, string licenseKey)
		@{
			return ((CertToolkitMgr)handle).transInit(@(Activity.Package).@(Activity.Name).GetRootActivity().getPackageName(), licenseKey, false);
		@}

		[Foreign(Language.Java)]
		static string TransGenerateCertNum(Java.Object handle, int direction, string uniqueInfo)
		@{
			return ((CertToolkitMgr)handle).transGenerateCertNum(uniqueInfo, direction);
		@}

		public bool TransIsPCConnected() { return TransIsPCConnected(_handle); }

		[Foreign(Language.Java)]
		static bool TransIsPCConnected(Java.Object handle)
		@{
			debug_log("Getting is pc connected");
			boolean ret = ((CertToolkitMgr)handle).transIsPCConnected();
			debug_log("Trans pc connected is: " + ret);
			return ret;
		@}

		public void TransFinalize() { TransFinalize(_handle); }

		[Foreign(Language.Java)]
		static void TransFinalize(Java.Object handle)
		@{
			((CertToolkitMgr)handle).transFinalize();
		@}

		public static void SetAppInfo(string license, out string error)
		{
			var ec = new ErrorClosure();
			SetAppInfo(license, ec.OnError);
			error = ec.Error;
		}

		public static string GetLicenseInfo(out string error)
		{
			var ec = new ErrorClosure();
			var licenseInfo = GetLicenseInfo(ec.OnError);
			error = ec.Error;
			return licenseInfo;
		}

		public Certificate ImportCert(string storageFilePath, out string error)
		{
			var ec = new ErrorClosure();
			var cert = ImportCert(_handle, storageFilePath, ec.OnError);
			error = ec.Error;
			return error == null ? new Certificate(cert) : null;
		}

		[Foreign(Language.Java)]
		static Java.Object ImportCert(Java.Object handle, string storageFilePath, Action<string> onError)
		@{
			CertToolkitMgr mgr = (CertToolkitMgr)handle;
			if (!mgr.transImportCert())
			{
				onError.run("Failed to import cert");
				return null;
			}

			//File sdRoot = Environment.getExternalStorageDirectory();

			//System.out.println("sdRoot : " + sdRoot);

			

			System.out.println("storageFilePath : "+ storageFilePath);

			String storage = Environment.getExternalStorageDirectory().getAbsolutePath();



			byte[] signCert = mgr.transGetSignCert();
			byte[] signPriKey = mgr.transGetSignPriKey();
			byte[] kMCert = mgr.transGetKmCert();
			byte[] kMPriKey = mgr.transGetKmPriKey();
			try {
				return CertListMgr.getInstance().addUserCert(storage, signCert, signPriKey, kMCert, kMPriKey);
			} catch(Exception e) {
				onError.run(e.getMessage());
				return null;
			}
		@}

		[Foreign(Language.Java)]
		static Java.Object GetInstance()
		@{
			return CertToolkitMgr.getInstance();
		@}

		[Foreign(Language.Java)]
		static void SetAppInfo(string license, Action<string> onError)
		@{
			try {
				CertToolkitMgr.SetAppInfo(@(Activity.Package).@(Activity.Name).GetRootActivity(), license);

				com.fuse.unisign.Util.initExternalNPKIStorage(@(Activity.Package).@(Activity.Name).GetRootActivity());
				
			} catch (Exception e) {
				onError.run(e.getMessage());
			}
		@}

		[Foreign(Language.Java)]
		static string GetLicenseInfo(Action<string> onError)
		@{
			String licenseInfo = null;
			try {


				licenseInfo = CertToolkitMgr.GetLicenseInfo();

				System.out.println("2017.12.29 : " + licenseInfo);
			} catch (Exception e) {
				onError.run(e.getMessage());
			}
			return licenseInfo;
		@}



		
		public static Certificate[] GetUserCertList
		{
			get
			{
				debug_log("public static Cert[] GetUserCertList started");
				var userCertsArray = GetCertList();
				debug_log("typeof userCertsArray : " + userCertsArray);
				var count = ArrayHelpers.Count(userCertsArray);
				debug_log("1111 Count from NSArrayHelpers: " + count);
				var result = new Certificate[0];
				if (count == 0) {
				} else {
					result = new Certificate[count];
				}
				debug_log("22222 Count from NSArrayHelpers: " + count);
				for (var i = 0; i < count; i++) {
					result[i] = new Certificate(i, ArrayHelpers.ObjectAtIndex(userCertsArray, i));
				}
				ToolkitMgr.androidList = result;
				debug_log("3333 Count from NSArrayHelpers: " + count);
				debug_log("44444 Count from NSArrayHelpers: " + count);
				return result;
			}
		}


		[Foreign(Language.Java)]
		static Java.Object GetCertList() 
		@{	
			System.out.println("CertListMgr.getInstance().getUserCertList().size() : " + CertListMgr.getInstance().getUserCertList().size());
			try {
				CertListMgr.getInstance().initCertList();

			} catch (Exception e) {
			}
			
        	return CertListMgr.getInstance().getUserCertList();
		@}

		public static Certificate GetUserCertificateAtIndex(int index)
		{
			if (androidList == null) { return null; }
			if (index < 0 || index >= androidList.Length) { return null; }
			return androidList[index];
		}


		


		public static bool checkThePassword (string password, Java.Object certificate) 
		{
			
			//debug_log("2018.01.01 type of certificate : " + typeof(cert));

			
			return CheckThePassword(password, certificate);
		}


		[Foreign(Language.Java)]
		static bool CheckThePassword (string password, Java.Object certificate)
		@{
			boolean ret = false;

			String data="imss";

			byte[] inputData = data.getBytes();
                // 서명 결과 데이터 : Base64 문자열로 인코딩 된다.
             String inputbase64 = "NOT YET TESTED";

			// 인증서 비밀번호
            try {
				byte[] resultData = CertToolkitMgr.getInstance().logicCMSSignedData((com.crosscert.android.core.Cert)certificate, inputData, password.getBytes());
				inputbase64 = CertToolkitMgr.getInstance().utilBase64Encode(resultData);
            } catch (Exception e) {

			}


			System.out.println("inputbase64 : " + inputbase64);

			if (inputbase64.equals("NOT YET TESTED")) {

				System.out.println("ret is false");

				ret = false;
			}else {
				System.out.println("ret is true");				
				ret = true;
			}

    		return ret;
		@}







		public static void changePassword(string oldPassword, string newPassword, Java.Object cert) 
		{
			ChangePassword(oldPassword, newPassword, cert);
		}

		[Foreign(Language.Java)]
		static void ChangePassword (string oldPassword, string newPassword, Java.Object cert) 
		@{

			//String errorMsg = CertToolkitMgr.getInstance().logicChangeCertPW((Cert)cert , oldPassword, newPassword);
           //  if (errorMsg != null) {
			//	System.out.println("입력오류");
		//	} else {
			//	System.out.println("비밀번호 변경 성공");
		//	}
		@}





		public static string getLogicSignedData(string password, Java.Object certificate) {
			return GetLogicSignedData(password, certificate);
		}

		[Foreign(Language.Java)]
		static string GetLogicSignedData(string password, Java.Object certificate) 
		@{

			String data="imss";

			byte[] inputData = data.getBytes();
                // 서명 결과 데이터 : Base64 문자열로 인코딩 된다.
             String inputbase64 = "";

			// 인증서 비밀번호
            try {
				byte[] resultData = CertToolkitMgr.getInstance().logicCMSSignedData((com.crosscert.android.core.Cert)certificate, inputData, password.getBytes());
				inputbase64 = CertToolkitMgr.getInstance().utilBase64Encode(resultData);
            } catch (Exception e) {

			}
			return inputbase64;
		@}


		
		extern(ANDROID) internal static class ArrayHelpers
		{
			

			[Foreign(Language.Java)]
			public static int Count(Java.Object handle)
			@{
			
				System.out.println("handle.toString() : " + handle.toString());
				ArrayList<Object> myList = new ArrayList<Object>((Collection<?>) handle);
				if (null != myList)
                 {
                          					//do something with your list
                 }
                        
                 return myList.size();


			@}

			
			[Foreign(Language.Java)]
			public static Java.Object ObjectAtIndex(Java.Object handle, int index)
			@{
				ArrayList<Object> myList = new ArrayList<Object>((Collection<?>) handle);

				return myList.get(index);
			@}
			
			

		}
	}










	[ForeignInclude(Language.Java, "com.crosscert.android.core.Cert", "com.crosscert.android.core.CertUtil", "com.crosscert.android.core.CertToolkitMgr")]
	extern(ANDROID) public class Certificate : UniSignBase
	{
		private int _certIndex;
		Java.Object _handle;

		internal Certificate(int certIndex, Java.Object handle)
		{
			_certIndex = certIndex;
			_handle = handle;
		}


		internal Certificate(Java.Object handle)
		{
			_handle = handle;
		}

		public Java.Object Handle { get { return this._handle; }}
		public int CertIndex {get {return this._certIndex;}}
		public int SignatureAlgorithmTyp { get { return GetSignatureAlgorithmTyp(_handle); } }
		public int ExpireDays { get { return GetExpireDays(_handle); } }
		public int PublicKeyAlgorithmTyp { get { return GetPublicKeyAlgorithmTyp(_handle); } }
		public int PathLengt { get { return GetPathLengt(_handle); } }
		public string Version { get { return GetVersion(_handle); } }
		public string Serial { get { return GetSerial(_handle); } }
		public string SignatureAlgorithm { get { return GetSignatureAlgorithm(_handle); } }
		public string IssuerDN { get { return GetIssuerDN(_handle); } }
		public string CertValidityFrom { get { return GetCertValidityFrom(_handle); } }
		public string CertValidityTo { get { return GetCertValidityTo(_handle); } }
		public string SubjectDN { get { return GetSubjectDN(_handle); } }
		public string PublicKeyAlgorithm { get { return GetPublicKeyAlgorithm(_handle); } }
		public string PublicKey { get { return GetPublicKey(_handle); } }
		public string AuthorityKeyId { get { return GetAuthorityKeyId(_handle); } }
		public string AuthorityKeyIdInfo { get { return GetAuthorityKeyIdInfo(_handle); } }
		public string SubjectKeyId { get { return GetSubjectKeyId(_handle); } }
		public string SubjectAltName { get { return GetSubjectAltName(_handle); } }
		public string CRLDP { get { return GetCRLDP(_handle); } }
		public string KeyUsage { get { return GetKeyUsage(_handle); } }
		public string Policy { get { return GetPolicy(_handle); } }
		public string CPS { get { return GetCPS(_handle); } }
		public string UserNotice { get { return GetUserNotice(_handle); } }
		public string AIA { get { return GetAIA(_handle); } }
		public string OCSPAddr { get { return GetOCSPAddr(_handle); } }
		public string BasicConstraints { get { return GetBasicConstraints(_handle); } }
		public string CommonName { get { return GetCommonName(_handle); } }
		public string IssuerCN { get { return GetIssuerCN(_handle); } }
		public string Organization { get { return GetOrganization(_handle); } }
		public string ValidityBeginDate { get { return GetValidityBeginDate(_handle); } }
		public string ValidityEndDate { get { return GetValidityEndDate(_handle); } }
		public string ValidityPeriod { get { return GetValidityPeriod(_handle); } }
		public string SubjectAltNameContents { get { return GetSubjectAltNameContents(_handle); } }
		public string PolicyHumanReadableForm { get { return GetPolicyHumanReadableForm(_handle); } }
		public string Sha1hashValue { get { return GetSha1hashValue(_handle); } }
		public string Sha256hashValue { get { return GetSha256hashValue(_handle); } }
		public string CertImageName { get { return GetCertImageName(_handle); } }
		public string CRLDP_IP { get { return GetCRLDP_IP(_handle); } }
		public string CRLDP_PORT { get { return GetCRLDP_PORT(_handle); } }
		

		[Foreign(Language.Java)]
		static int GetSignatureAlgorithmTyp(Java.Object handle)
		@{
			return ((Cert)handle).getSignAlgType();
		@}

		[Foreign(Language.Java)]
		static int GetExpireDays(Java.Object handle)
		@{
			return 0;
		@}

		[Foreign(Language.Java)]
		static int GetPublicKeyAlgorithmTyp(Java.Object handle)
		@{
			return ((Cert)handle).getPubkeyAlgType();
		@}

		[Foreign(Language.Java)]
		static int GetPathLengt(Java.Object handle)
		@{
			return ((Cert)handle).getFilePath().length();
		@}

		[Foreign(Language.Java)]
		static string GetVersion(Java.Object handle)
		@{
			return ((Cert)handle).getVersion();
		@}

		[Foreign(Language.Java)]
		static string GetSerial(Java.Object handle)
		@{
			return ((Cert)handle).getSerial();
		@}

		[Foreign(Language.Java)]
		static string GetSignatureAlgorithm(Java.Object handle)
		@{
			return ((Cert)handle).getSignatureAlgorithm();
		@}

		[Foreign(Language.Java)]
		static string GetIssuerDN(Java.Object handle)
		@{
			return ((Cert)handle).getIssuerDN();
		@}

		[Foreign(Language.Java)]
		static string GetCertValidityFrom(Java.Object handle)
		@{
			return ((Cert)handle).getCertValidityNotBefore();
		@}

		[Foreign(Language.Java)]
		static string GetCertValidityTo(Java.Object handle)
		@{
			return ((Cert)handle).getCertValidityNotAfter();
		@}

		[Foreign(Language.Java)]
		static string GetSubjectDN(Java.Object handle)
		@{
			return ((Cert)handle).getSubjectDN();
		@}

		[Foreign(Language.Java)]
		static string GetPublicKeyAlgorithm(Java.Object handle)
		@{
			return ((Cert)handle).getPublicKeyAlgorithm();
		@}

		[Foreign(Language.Java)]
		static string GetPublicKey(Java.Object handle)
		@{
			return ((Cert)handle).getPublicKeyInfo();
		@}

		[Foreign(Language.Java)]
		static string GetAuthorityKeyId(Java.Object handle)
		@{
			return ((Cert)handle).getAuthorityKeyIdentifier();
		@}

		[Foreign(Language.Java)]
		static string GetAuthorityKeyIdInfo(Java.Object handle)
		@{
			return ((Cert)handle).getAuthorityKeyIdentifierInfo();
		@}

		[Foreign(Language.Java)]
		static string GetSubjectKeyId(Java.Object handle)
		@{
			return ((Cert)handle).getSubjectKeyIdentifier();
		@}

		[Foreign(Language.Java)]
		static string GetSubjectAltName(Java.Object handle)
		@{
			return ((Cert)handle).getSubjectAltName();
		@}

		[Foreign(Language.Java)]
		static string GetCRLDP(Java.Object handle)
		@{
			return ((Cert)handle).getCRLDP();
		@}

		[Foreign(Language.Java)]
		static string GetKeyUsage(Java.Object handle)
		@{
			return ((Cert)handle).getKeyUsage();
		@}

		[Foreign(Language.Java)]
		static string GetPolicy(Java.Object handle)
		@{
			return ((Cert)handle).getCertPolicy();
		@}

		[Foreign(Language.Java)]
		static string GetCPS(Java.Object handle)
		@{
			return ((Cert)handle).getCertCPS();
		@}

		[Foreign(Language.Java)]
		static string GetUserNotice(Java.Object handle)
		@{
			return ((Cert)handle).getCertUserNotice();
		@}

		[Foreign(Language.Java)]
		static string GetAIA(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetOCSPAddr(Java.Object handle)
		@{
			return ((Cert)handle).getOCSPAddr();
		@}

		[Foreign(Language.Java)]
		static string GetBasicConstraints(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetCommonName(Java.Object handle)
		@{
			
			//String commonName = ((Cert)handle).getSubjectDN();

			//String [] words = commonName.split("=");
			//String temp = words[1];

			//words = temp.split(",");
			//commonName = words[0];

			//System.out.println("commonName : " + commonName);


			//return commonName;
			return CertUtil.parseDN(((Cert)handle).getSubjectDN(), "cn");
		@}

		[Foreign(Language.Java)]
		static string GetPolicyHumanReadableForm(Java.Object handle)
		@{
			return CertUtil.getCertPolicyString(((Cert)handle).getCertPolicy());
		@}




		[Foreign(Language.Java)]
		static string GetIssuerCN(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetOrganization(Java.Object handle)
		@{
			return CertUtil.parseDN(((Cert)handle).getSubjectDN(), "o");
		@}

		[Foreign(Language.Java)]
		static string GetValidityBeginDate(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetValidityEndDate(Java.Object handle)
		@{
			//return  CertUtil.getDate((Cert)handle).getCertValidityNotAfter());

			return CertUtil.getDate(((Cert)handle).getCertValidityNotAfter());

		@}

		[Foreign(Language.Java)]
		static string GetValidityPeriod(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetSubjectAltNameContents(Java.Object handle)
		@{
			return "";
		@}

		

		[Foreign(Language.Java)]
		static string GetSha1hashValue(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetSha256hashValue(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetCertImageName(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetCRLDP_IP(Java.Object handle)
		@{
			return "";
		@}

		[Foreign(Language.Java)]
		static string GetCRLDP_PORT(Java.Object handle)
		@{
			return "";
		@}

	}

	extern(ANDROID) public class Util : UniSignBase
	{
		public static string UniqueInfo { get { return GetUniqueInformation(); } }

		[Foreign(Language.Java)]
		static string GetUniqueInformation()
		@{
			return com.fuse.unisign.Util.getUniqueInfomation(@(Activity.Package).@(Activity.Name).GetRootActivity());
		@}
	}
}
