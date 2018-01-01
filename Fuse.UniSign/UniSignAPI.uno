using Uno;
using Uno.Collections;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;
using Fuse.UniSign.Android;
using Fuse.UniSign.iOS;

namespace Fuse.UniSign
{
	/*
		ANDROID:
		- App must use standard naming convention, for example: 'com.myCompany.myApp'

	*/

	public enum TransDirection : int
	{
		Import = 0x10,
		Export = 0x20,
	}

	public abstract class GenerateCertSession
	{
		public abstract string GenerateCertNum(TransDirection direction, string uniqueInfo);
		public abstract bool IsPCConnected();
		public abstract void Finalize();
		public abstract Cert ImportCert(string androidSavePath);
		public abstract bool ExportCert(string androidSavePath, int certIndex);
	}

	public abstract class Cert
	{
		public abstract int CertIndex { get; }
		public abstract int SignatureAlgorithmTyp { get; }
		public abstract int ExpireDays { get; }
		public abstract int PublicKeyAlgorithmTyp { get; }
		public abstract int PathLengt { get; }
		public abstract string Version { get; }
		public abstract string Serial { get; }
		public abstract string SignatureAlgorithm { get; }
		public abstract string IssuerDN { get; }
		public abstract string CertValidityFrom { get; }
		public abstract string CertValidityTo { get; }
		public abstract string SubjectDN { get; }
		public abstract string PublicKeyAlgorithm { get; }
		public abstract string PublicKey { get; }
		public abstract string AuthorityKeyId { get; }
		public abstract string AuthorityKeyIdInfo { get; }
		public abstract string SubjectKeyId { get; }
		public abstract string SubjectAltName { get; }
		public abstract string CRLDP { get; }
		public abstract string KeyUsage { get; }
		public abstract string Policy { get; }
		public abstract string CPS { get; }
		public abstract string UserNotice { get; }
		public abstract string AIA { get; }
		public abstract string OCSPAddr { get; }
		public abstract string BasicConstraints { get; }
		public abstract string CommonName { get; }
		public abstract string IssuerCN { get; }
		public abstract string Organization { get; }
		public abstract string ValidityBeginDate { get; }
		public abstract string ValidityEndDate { get; }
		public abstract string ValidityPeriod { get; }
		public abstract string SubjectAltNameContents { get; }
		public abstract string PolicyHumanReadableForm { get; }
		public abstract string Sha1hashValue { get; }
		public abstract string Sha256hashValue { get; }
		public abstract string CertImageName { get; }
		public abstract string CRLDP_IP { get; }
		public abstract string CRLDP_PORT { get; }
	}

	public static class API
	{
		public static void SetLicense(string license)
		{
			if defined(ANDROID)
			{
				string error = null;
				ToolkitMgr.SetAppInfo(license, out error);
				if (error != null)
					throw new Exception("Failed to set license: " + error);
			}
			else if defined(iOS)
			{
				ToolkitMgr.SetLicense(license);
			}
			else
			{
				debug_log("Preview mode - platform not supported");
				// throw new Exception("Platform not supported");
			}
		}

		public static bool CheckPassword(string password, int certIndex) 
		{
			if defined(iOS) {
				debug_log("started");
				Certificate certificate = ListMgr.GetUserCertificateAtIndex(certIndex);
				var isCorrect = ToolkitMgr.checkThePassword(password, certificate.Handle);
				return isCorrect;	
			} else if defined(ANDROID) {
				debug_log("Android Check");
				Certificate certificate = ToolkitMgr.GetUserCertificateAtIndex(certIndex);
				debug_log("2018.01.01 certificate : "+ certificate);
				var isCorrect = ToolkitMgr.checkThePassword(password, certificate.Handle);
				return isCorrect;
			} else {
				return false;
			}
			

		}

		public static string GetLogicSignedData (string password, int certIndex)
		{
			if defined(iOS) 
			{
				debug_log("GetLogicSignedData");
				Certificate certificate = ListMgr.GetUserCertificateAtIndex(certIndex);
				var mSignedData = ToolkitMgr.getLogicSignedData(password, certificate.Handle);
				return mSignedData;
			} 
			else if defined(Android) 
			{
				debug_log("2017.12.31 GetLogicSignedData Android");
				Certificate certificate = ToolkitMgr.GetUserCertificateAtIndex(certIndex);
				debug_log("2017.12.31 certificate : "+ certificate);
				var mSignedData = ToolkitMgr.getLogicSignedData(password, certificate.Handle);
				return mSignedData;
			}else {
				return "";
			}
		}



		public static void ChangePassword(string oldPassword, string newPassword, int certIndex)
		{
			if defined(iOS) 
			{
				debug_log("ChangePassword started");
				Certificate certificate = ListMgr.GetUserCertificateAtIndex(certIndex);
				ToolkitMgr.changePassword(oldPassword, newPassword, certificate.Handle);
			}
			else if defined(Android) 
			{
				debug_log("ChangePassword started");
				Certificate certificate = ToolkitMgr.GetUserCertificateAtIndex(certIndex);
				ToolkitMgr.changePassword(oldPassword, newPassword, certificate.Handle);
			} else {

			}
		}


		public static bool RemoveUserCertificate(int certIndex) 
		{
			if defined(iOS) 
			{
				debug_log("Removed Certificate started");
				Certificate certificate = ListMgr.GetUserCertificateAtIndex(certIndex);
				return ListMgr.removeUserCertificate(certificate.Handle);

			}
			else if defined(Android) 
			{
				return false;	
			} else {
				return false;
			}
		}

		public static string GetLicenseInfo()
		{
			extern string error = null;
			extern string licenseInfo = null;
			if defined(ANDROID)
				licenseInfo = ToolkitMgr.GetLicenseInfo(out error);
			else if defined(iOS)
				licenseInfo = ToolkitMgr.TryGetLibLicenseInfo(out error);
			else
			{
				debug_log("Preview mode - platform not supported");
				return "";
			}

			if (error != null)
				throw new Exception("Failed to get license info");
			else
				return licenseInfo;
		}

		public static string GetUniqueInfo()
		{
			if defined(ANDROID)
				return Util.UniqueInfo;
			else if defined(iOS)
				return Util.Serial;
			else
				throw new Exception("Platform not supported");
		}

		public static GenerateCertSession StartGenerateCert(string license)
		{
			if defined(ANDROID)
				return new AndroidCertSession(license);
			else if defined(iOS)
				return new iOSCertSession();
			else {
				return null;
			}
		}

		public static Cert[] GetUserCertificates()
		{
			

			if defined(iOS) {
				debug_log("public static Cert[] GetUserCertificates() starts");
				var certificates = ListMgr.UserCertificates;
				debug_log("2017.12.01 certificates before length");
				
				//이거 하면 인증서가 없을 때, return 값이 null이여서 참조할 변수가 없다고 에러남
				//그래서 인증서가 없더라도, 안에 값이 없는 listCert return

				debug_log("2017.12.01 after length");

				var listCert = new List<Cert>(certificates.Length);
				foreach (var certificate in certificates)
				{
					//if (certificate != null) {
						listCert.Add(new iOSCert(certificate));
				//	}
				}
				return listCert.ToArray();

			} else if defined(ANDROID){
				debug_log("This is Android");

				//ToolkitMgr.certificates
				//var tempArray = 0;
				var certificates = ToolkitMgr.GetUserCertList;

				if (certificates.Length == 0)
				{
					return null;
				}

				var listCert = new List<Cert>(certificates.Length);
				debug_log("2017.12.08 This is after var certificates = ToolkitMgr.GetUserCertList");

				//var listCert = new List<Cert>(certificates.Length);
				foreach (var certificate in certificates)
				{
					//if (certificate != null) {
						listCert.Add(new AndroidCert(certificate));
				//	}
				}
				return listCert.ToArray();
			} else{
				debug_log("This is preview mode - no data for smartphones.");
				return null;
			}
		}







	}

	extern(ANDROID) class AndroidCertSession : GenerateCertSession
	{
		ToolkitMgr _mgr;

		public AndroidCertSession(string license)
		{
			_mgr = ToolkitMgr.Instance;
			if (!_mgr.TransInit(license))
				throw new Exception("TransInit failed!");
		}

		public override string GenerateCertNum(TransDirection direction, string uniqueInfo)
		{
			string error = null;
			var cert = _mgr.TransGenerateCertNum(direction, uniqueInfo, out error);
			if (error != null)
				throw new Exception("GenerateCertNum failed: " + error);
			else
				return cert;
		}

		public override bool IsPCConnected()
		{
			return _mgr.TransIsPCConnected();
		}

		public override void Finalize()
		{
			_mgr.TransFinalize();
		}

		public override Cert ImportCert(string androidSavePath)
		{
			string error = null;
			Certificate cert = _mgr.ImportCert(androidSavePath, out error);
			if (error != null)
				throw new Exception("Failed to import cert: " + error);
			return new AndroidCert(cert);
		}

		public override bool ExportCert(string androidSavePath, int certIndex) {

			return false;
		}



	}

	extern(ANDROID) class AndroidCert : Cert
	{
		Certificate _certificate;

		public AndroidCert(Certificate certificate)
		{
			_certificate = certificate;
		}
		
		public override int CertIndex { get { return 0; }}	// NOT IMPLEMENTED YET
		public override int SignatureAlgorithmTyp { get { return _certificate.SignatureAlgorithmTyp; } }
		public override int ExpireDays { get { return _certificate.ExpireDays; } }
		public override int PublicKeyAlgorithmTyp { get { return _certificate.PublicKeyAlgorithmTyp; } }
		public override int PathLengt { get { return _certificate.PathLengt; } }
		public override string Version { get { return _certificate.Version; } }
		public override string Serial { get { return _certificate.Serial; } }
		public override string SignatureAlgorithm { get { return _certificate.SignatureAlgorithm; } }
		public override string IssuerDN { get { return _certificate.IssuerDN; } }
		public override string CertValidityFrom { get { return _certificate.CertValidityFrom; } }
		public override string CertValidityTo { get { return _certificate.CertValidityTo; } }
		public override string SubjectDN { get { return _certificate.SubjectDN; } }
		public override string PublicKeyAlgorithm { get { return _certificate.PublicKeyAlgorithm; } }
		public override string PublicKey { get { return _certificate.PublicKey; } }
		public override string AuthorityKeyId { get { return _certificate.AuthorityKeyId; } }
		public override string AuthorityKeyIdInfo { get { return _certificate.AuthorityKeyIdInfo; } }
		public override string SubjectKeyId { get { return _certificate.SubjectKeyId; } }
		public override string SubjectAltName { get { return _certificate.SubjectAltName; } }
		public override string CRLDP { get { return _certificate.CRLDP; } }
		public override string KeyUsage { get { return _certificate.KeyUsage; } }
		public override string Policy { get { return _certificate.Policy; } }
		public override string CPS { get { return _certificate.CPS; } }
		public override string UserNotice { get { return _certificate.UserNotice; } }
		public override string AIA { get { return _certificate.AIA; } }
		public override string OCSPAddr { get { return _certificate.OCSPAddr; } }
		public override string BasicConstraints { get { return _certificate.BasicConstraints; } }
		public override string CommonName { get { return _certificate.CommonName; } }
		public override string IssuerCN { get { return _certificate.IssuerCN; } }
		public override string Organization { get { return _certificate.Organization; } }
		public override string ValidityBeginDate { get { return _certificate.ValidityBeginDate; } }
		public override string ValidityEndDate { get { return _certificate.ValidityEndDate; } }
		public override string ValidityPeriod { get { return _certificate.ValidityPeriod; } }
		public override string SubjectAltNameContents { get { return _certificate.SubjectAltNameContents; } }
		public override string PolicyHumanReadableForm { get { return _certificate.PolicyHumanReadableForm; } }
		public override string Sha1hashValue { get { return _certificate.Sha1hashValue; } }
		public override string Sha256hashValue { get { return _certificate.Sha256hashValue; } }
		public override string CertImageName { get { return _certificate.CertImageName; } }
		public override string CRLDP_IP { get { return _certificate.CRLDP_IP; } }
		public override string CRLDP_PORT { get { return _certificate.CRLDP_PORT; } }
	}

	extern(iOS) class iOSCertSession : GenerateCertSession
	{

		TransferMgr _mgr;

		public iOSCertSession()
		{
			string error = null;
			_mgr = TransferMgr.TryCreate(out error);
			if (error != null)
				throw new Exception("Failed to create TransferMgr: " + error);
		}

		public override string GenerateCertNum(TransDirection direction, string uniqueInfo)
		{
			string error = null;
			var cert = _mgr.TryGenerateCertNum(direction, uniqueInfo, out error);
			if (error != null)
				throw new Exception("GenerateCertNum failed: " + error);
			return cert;
		}

		public override void Finalize()
		{
			// Nothing to finalize on iOS
		}

		public override bool IsPCConnected()
		{
			string error = null;
			var isConnected = _mgr.IsPCConnected(out error);
			if (error != null)
				throw new Exception("IsPCConnected failed: " + error);
			return isConnected;
		}

		public override Cert ImportCert(string androidSavePath)
		{
			string error = null;
			var certificate = _mgr.ImportCert(out error);
			if (error != null)
				throw new Exception("Failed to import cert: " + error);
			return new iOSCert(certificate);
		}

		public override bool ExportCert(string androidSavePath, int certIndex)
		{
			string error = null;
			debug_log("[API] ExportCert: certIndex is: " + certIndex);
			Certificate certificate = ListMgr.GetUserCertificateAtIndex(certIndex);
			debug_log("[API] ExportCert is ready to call actual manager");
			bool isExported = _mgr.ExportCert(out error, (ObjC.Object) certificate.Handle);

			return isExported;
		}
		





	}

	extern(iOS) public class iOSCert : Cert
	{
		Certificate _certificate;

		public iOSCert(Certificate certificate)
		{
			_certificate = certificate;
		}

		public override int CertIndex { get { return _certificate.CertIndex; }}
		public override int SignatureAlgorithmTyp { get { return _certificate.SignatureAlgorithmTyp; } }
		public override int ExpireDays { get { return _certificate.ExpireDays; } }
		public override int PublicKeyAlgorithmTyp { get { return _certificate.PublicKeyAlgorithmTyp; } }
		public override int PathLengt { get { return _certificate.PathLengt; } }
		public override string Version { get { return _certificate.Version; } }
		public override string Serial { get { return _certificate.Serial; } }
		public override string SignatureAlgorithm { get { return _certificate.SignatureAlgorithm; } }
		public override string IssuerDN { get { return _certificate.IssuerDN; } }
		public override string CertValidityFrom { get { return _certificate.CertValidityFrom; } }
		public override string CertValidityTo { get { return _certificate.CertValidityTo; } }
		public override string SubjectDN { get { return _certificate.SubjectDN; } }
		public override string PublicKeyAlgorithm { get { return _certificate.PublicKeyAlgorithm; } }
		public override string PublicKey { get { return _certificate.PublicKey; } }
		public override string AuthorityKeyId { get { return _certificate.AuthorityKeyId; } }
		public override string AuthorityKeyIdInfo { get { return _certificate.AuthorityKeyIdInfo; } }
		public override string SubjectKeyId { get { return _certificate.SubjectKeyId; } }
		public override string SubjectAltName { get { return _certificate.SubjectAltName; } }
		public override string CRLDP { get { return _certificate.CRLDP; } }
		public override string KeyUsage { get { return _certificate.KeyUsage; } }
		public override string Policy { get { return _certificate.Policy; } }
		public override string CPS { get { return _certificate.CPS; } }
		public override string UserNotice { get { return _certificate.UserNotice; } }
		public override string AIA { get { return _certificate.AIA; } }
		public override string OCSPAddr { get { return _certificate.OCSPAddr; } }
		public override string BasicConstraints { get { return _certificate.BasicConstraints; } }
		public override string CommonName { get { return _certificate.CommonName; } }
		public override string IssuerCN { get { return _certificate.IssuerCN; } }
		public override string Organization { get { return _certificate.Organization; } }
		public override string ValidityBeginDate { get { return _certificate.ValidityBeginDate; } }
		public override string ValidityEndDate { get { return _certificate.ValidityEndDate; } }
		public override string ValidityPeriod { get { return _certificate.ValidityPeriod; } }
		public override string SubjectAltNameContents { get { return _certificate.SubjectAltNameContents; } }
		public override string PolicyHumanReadableForm { get { return _certificate.PolicyHumanReadableForm; } }
		public override string Sha1hashValue { get { return _certificate.Sha1hashValue; } }
		public override string Sha256hashValue { get { return _certificate.Sha256hashValue; } }
		public override string CertImageName { get { return _certificate.CertImageName; } }
		public override string CRLDP_IP { get { return _certificate.CRLDP_IP; } }
		public override string CRLDP_PORT { get { return _certificate.CRLDP_PORT; } }

	}
}

