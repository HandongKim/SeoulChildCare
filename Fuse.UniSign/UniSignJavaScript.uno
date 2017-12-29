using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;

namespace Fuse.UniSign
{
	[UXGlobalModule]
	public class UniSignJavaScript : NativeModule
	{
		static UniSignJavaScript _instance;
		readonly GenerateCertSessionManager _sessionManager;
		
		public UniSignJavaScript()
		{
			if(_instance != null) return;
			Resource.SetGlobalKey(_instance = this, "UniSign");
			AddMember(new NativeFunction("setLicense", (NativeCallback)SetLicense));
			AddMember(new NativeFunction("getLicenseInfo", (NativeCallback)GetLicenseInfo));
			AddMember(new NativeFunction("startGenerateCert", (NativeCallback)StartGenerateCert));
			AddMember(new NativePromise<string,object>("generateCertNum", GenerateCertNum));

			AddMember(new NativePromise<bool,object>("isPCConnected", IsPCConnected));
			// ResultConverter on NativePromise
	        AddMember(new NativePromise<Cert,Fuse.Scripting.Object>("importCert", ImportCert, ConvertCert));
			AddMember(new NativePromise<bool,object>("exportCert", ExportCert));

			AddMember(new NativeFunction("transFinalize", (NativeCallback)TransFinalize));
			AddMember(new NativeFunction("getUniqueInfo", (NativeCallback)GetUniqueInfo));
			AddMember(new NativeFunction("getUserCertificates", (NativeCallback)GetUserCertificates));
			AddMember(new NativeFunction("checkThePassword", (NativeCallback)checkThePassword));
			AddMember(new NativeFunction("getLogicSignedData", (NativeCallback)getLogicSignedData));
			AddMember(new NativeFunction("changePassword", (NativeCallback)ChangePassword));
			AddMember(new NativeFunction("removeUserCertificate", (NativeCallback)removeUserCertificate));
		//	AddMember(new NativeFunction("removeUserCertificate"),(NativeCallback)RemoveUserCertificate));

			_sessionManager = new GenerateCertSessionManager();
		}

		object SetLicense(Context context, object[] args)
		{
			var license = ((IEnumerable<object>)args).FirstOrDefault() as string;
			if (license == null)
				throw new Error("Requires license string as first argument");

			debug_log("We called set license from JS");

			API.SetLicense(license);
			return null;
		}

		object GetLicenseInfo(Context context, object[] args)
		{
			var ret = (object)API.GetLicenseInfo();
			if (ret == null)
				throw new Exception("getLicenseInfo did not return a valid string");
			return ret;
		}

		object GetUniqueInfo(Context context, object[] args)
		{
			var ret = (object)API.GetUniqueInfo();
			if (ret == null)
				throw new Exception("getUniqueInfo did not return a valid string");
			return ret;
		}	   

		object checkThePassword(Context context, object[] args) 
		{
			bool ret = false;
			
			for(int i =0; i<args.Length; i++) {
				debug_log("args["+i+"] : "+ args[i]);
			}

			if (args.Length <2) {
				return false;
			} else {
				var handle = Marshal.ToInt(args[1]);
				debug_log("args[0] : " + args[0] );
				debug_log("handle : " + handle);
				ret = API.CheckPassword(args[0] as string, handle);
				return ret;
			}
		}








		object getLogicSignedData (Context context, object[] args) 
		{
			string mSignedData = null;
			var password = args[0];
			var certIndex = Marshal.ToInt(args[1]);
			mSignedData = API.GetLogicSignedData(password as string, certIndex);
			return mSignedData;
		}





		object removeUserCertificate(Context context, object[] args) 
		{
			bool removed = false;
			var handle = Marshal.ToInt(args[0]);
			removed = API.RemoveUserCertificate(handle);
			return removed;
		}

		object ChangePassword (Context context, object[] args) 
		{
			var successful = "successful";

			if (args.Length < 3) {
				return null;
			} else {
				var handle = Marshal.ToInt(args[2]);
				API.ChangePassword(args[0] as string , args[1] as string, handle);
				return successful;
			}
		}

		class GenerateCertSessionManager
		{
			static int idCounter = 0;
			
			
			List<GenerateSessionWrapper> _sessions = new List<GenerateSessionWrapper>();
			internal int AddSession(GenerateCertSession s)
			{
				var ret = new GenerateSessionWrapper(s);
				_sessions.Add(ret);
				return ret.Id;
			}

			internal GenerateCertSession GetSession(int handle)
			{
				foreach (var s in _sessions)
				{
					if (s.Id == handle)
						return s.Session;
				}
				throw new Error("Session object is not active");
			}
		}

		class GenerateSessionWrapper
		{
			static int _idCounter = 0;
			
			public readonly GenerateCertSession Session;
			public readonly int Id;

			public GenerateSessionWrapper(GenerateCertSession s)
			{
				Session = s;
				Id = _idCounter++;
			}
		}

		object StartGenerateCert(Context context, object[] args)
		{
			var license = ((IEnumerable<object>)args).FirstOrDefault() as string;
			if (license == null)
				throw new Error("Requires license string as first argument");

			var session = API.StartGenerateCert(license);

			if (session == null)
				throw new Error("Could not generate cert session");
			
			return (object)_sessionManager.AddSession(session);
		}

		object TransFinalize(Context context, object[] args)
		{
			if (args.Length != 1)
				throw new Error("transFinalize expects 0 arguments, but " + args.Length + " was supplied.");

			var handle = Marshal.ToInt(args[0]);

			var session = _sessionManager.GetSession(handle);
			session.Finalize();
			return null;
		}

		bool RemoveUserCertificate (Context context, object[] args) 
		{
			//var deleted = 
			debug_log("args value : " + args);

			return false;

		}



		object GetUserCertificates(Context context, object[] args)
		{
			var certs = API.GetUserCertificates();
			// nullable check
			if(certs == null)
			{
				return null;
			}
			var ret = context.NewArray(certs.Length);
			debug_log("[UniSignJavaScript] # of array count: " + certs.Length);
			for (int i = 0; i < certs.Length; i++)
			{
				debug_log("value i: " + i);
				var certObj = ConvertCert(context, certs[i]);
				debug_log("print certObj: " + certObj);
				ret[i] = certObj;
			}
			return ret;
		}


		
		Future<string> GenerateCertNum(object[] args)
		{
			if (args.Length != 3)
				throw new Error("genrateCertNum expects 3 arguments");
			
				var handle = Marshal.ToInt(args[0]);
				var direction = args[1] as string;
				var uniqueInfo = args[2] as string;

				if (direction == null || (direction != "Import" && direction != "Export"))
					throw new Error("Second argument to generateCertNum must be either 'Import' or 'Export'");
				if (uniqueInfo == null)
					throw new Error("Third argument to generateCertNum be a string");




				var session = _sessionManager.GetSession(handle);
				var dir = direction == "Import" ? TransDirection.Import : TransDirection.Export;

				debug_log("2017.11.30 direction : " + dir);


				var promise = new Promise<string>();

				debug_log("2017.12.30 log 1");

				new GenerateCertNumClosure(session, promise, dir, uniqueInfo);
				
				debug_log("2017.12.30 log 2");

				return promise;
		}
		
		Future<bool> IsPCConnected(object[] args)
		{
			if (args.Length != 1)
				throw new Error("isPCConnected expects 1 argument");
			
			var handle = Marshal.ToInt(args[0]);
			
			var session = _sessionManager.GetSession(handle);
			var promise = new Promise<bool>();

			new IsPCConnectedClosure(session, promise);
			return promise;
		}

		abstract class SessionClosure<T>
		{
			protected readonly GenerateCertSession _session;
			protected readonly Promise<T> _promise;
			public SessionClosure(GenerateCertSession s, Promise<T> p)
			{
				_session = s;
				_promise = p;
			}
			
			internal abstract void Run();
		}

		class GenerateCertNumClosure : SessionClosure<string>
		{
			Thread run;
			

			readonly TransDirection _direction;
			readonly string _uniqueInfo;
			public GenerateCertNumClosure(GenerateCertSession s, Promise<string> p, TransDirection dir, string uniqueInfo)
				: base(s,p)
			{
			
				debug_log("2017.12.30 log 3");

				_direction = dir;

				debug_log("2017.12.30 log 4");


				_uniqueInfo = uniqueInfo;


				debug_log("2017.12.30 log 5");

				this.run = new Thread(this.Run);
				debug_log("2017.12.30 log 6");
				run.Start();
				debug_log("2017.12.30 log 7");
			}
			
			internal override void Run()
			{
				debug_log("2017.12.30 log 8");	
				var ret = _session.GenerateCertNum(_direction, _uniqueInfo);
				debug_log("2017.12.30 log 9");
				_promise.Resolve(ret);
				debug_log("2017.12.30 log 10");
				run.Join();
			}
		}

		class IsPCConnectedClosure : SessionClosure<bool>
		{
			Thread run;

			public IsPCConnectedClosure(GenerateCertSession s, Promise<bool> p) : base(s,p) {
				this.run = new Thread(this.Run);
				run.Start();
			}
			
			internal override void Run()
			{
				var ret = _session.IsPCConnected();
				_promise.Resolve(ret);

				run.Join();
			}
		}

	    Future<Cert> ImportCert(object[] args)
	    {
	        if (args.Length != 1)
	            throw new Error("ImportCert expects 1 argument");
	        
	        var handle = Marshal.ToInt(args[0]);
	        var androidSavePath = Fuse.UniSign.StorageHelper.GetStorageDirectory();
	        
	        debug_log("ANDROID: saving cert to: '" + androidSavePath + "' (If empty, then not Android)");

	        var session = _sessionManager.GetSession(handle);

	        var promise = new Promise<Cert>();
	        new ImportCertClosure(session, promise, androidSavePath);
	        return promise;
	    }

	    Future<bool> ExportCert(object[] args)
	    {
	        debug_log("ExportCert started ");
	        
	        if (args.Length != 2)
	        {
		        debug_log("ExportCert expects 2 argument");
	            throw new Error("ExportCert expects 2 argument");
	        }
	        
	        debug_log("# of argument is 2!");
	        var handle = Marshal.ToInt(args[0]);
	        var certIndex = Marshal.ToInt(args[1]);

	        debug_log("Marshaling succeeded");

	        var androidSavePath = Fuse.UniSign.StorageHelper.GetStorageDirectory();
	        
	        debug_log("ANDROID: saving cert to: '" + androidSavePath + "' (If empty, then not Android)");

	        var session = _sessionManager.GetSession(handle);

	        var promise = new Promise<bool>();
	        new ExportCertClosure(session, promise, androidSavePath, certIndex);
	        return promise;
	    }





		Fuse.Scripting.Object ConvertCert(Context context, Cert cert)
	    {
	        var certObj = context.NewObject();

	        certObj["certIndex"] = cert.CertIndex;
	        certObj["SignatureAlgorithmTyp"] = cert.SignatureAlgorithmTyp;
	        certObj["ExpireDays"] = cert.ExpireDays;
	        certObj["PublicKeyAlgorithmTyp"] = cert.PublicKeyAlgorithmTyp;
	        certObj["PathLengt"] = cert.PathLengt;
	        certObj["Version"] = cert.Version;
	        certObj["Serial"] = cert.Serial;
	        certObj["SignatureAlgorithm"] = cert.SignatureAlgorithm;
	        certObj["IssuerDN"] = cert.IssuerDN;
	        certObj["CertValidityFrom"] = cert.CertValidityFrom;
	        certObj["CertValidityTo"] = cert.CertValidityTo;
	        certObj["SubjectDN"] = cert.SubjectDN;
	        certObj["PublicKeyAlgorithm"] = cert.PublicKeyAlgorithm;
	        certObj["PublicKey"] = cert.PublicKey;
	        certObj["AuthorityKeyId"] = cert.AuthorityKeyId;
	        certObj["AuthorityKeyIdInfo"] = cert.AuthorityKeyIdInfo;
	        certObj["SubjectKeyId"] = cert.SubjectKeyId;
	        certObj["SubjectAltName"] = cert.SubjectAltName;
	        certObj["CRLDP"] = cert.CRLDP;
	        certObj["KeyUsage"] = cert.KeyUsage;
	        certObj["Policy"] = cert.Policy;
	        certObj["CPS"] = cert.CPS;
	        certObj["UserNotice"] = cert.UserNotice;
	        certObj["AIA"] = cert.AIA;
	        certObj["OCSPAddr"] = cert.OCSPAddr;
	        certObj["BasicConstraints"] = cert.BasicConstraints;
	        certObj["CommonName"] = cert.CommonName;
	        certObj["IssuerCN"] = cert.IssuerCN;
	        certObj["Organization"] = cert.Organization;
	        certObj["ValidityBeginDate"] = cert.ValidityBeginDate;
	        certObj["ValidityEndDate"] = cert.ValidityEndDate;
	        certObj["ValidityPeriod"] = cert.ValidityPeriod;
	        certObj["SubjectAltNameContents"] = cert.SubjectAltNameContents;
	        certObj["PolicyHumanReadableForm"] = cert.PolicyHumanReadableForm;
	        certObj["Sha1hashValue"] = cert.Sha1hashValue;
	        certObj["Sha256hashValue"] = cert.Sha256hashValue;
	        certObj["CertImageName"] = cert.CertImageName;
	        certObj["CRLDP_IP"] = cert.CRLDP_IP;
	        certObj["CRLDP_PORT"] = cert.CRLDP_PORT;

	        return certObj;
	    }

		class ImportCertClosure : SessionClosure<Cert>
		{
			Thread run;

			readonly string _androidSavePath;
			public ImportCertClosure(GenerateCertSession s, Promise<Cert> p, string androidSavePath)
				: base(s,p)
			{
				_androidSavePath = androidSavePath;

				this.run = new Thread(this.Run);
				run.Start();
			}
			
			internal override void Run()
			{
				var cert = _session.ImportCert(_androidSavePath);
				_promise.Resolve(cert);

				run.Join();
			}
		}

		class ExportCertClosure : SessionClosure<bool>
		{
			Thread run;

			readonly string _androidSavePath;
			readonly int _certIndex;
			public ExportCertClosure(GenerateCertSession s, Promise<bool> p, string androidSavePath, int certIndex)
				: base(s,p)
			{
				_androidSavePath = androidSavePath;
				_certIndex = certIndex;

				this.run = new Thread(this.Run);
				run.Start();
			}
			
			internal override void Run()
			{
				debug_log("Thread is ready for run");
				var result = _session.ExportCert(_androidSavePath, _certIndex);
				_promise.Resolve(result);

				run.Join();
			}
		}


	}
}

