using Uno;
using Uno.Threading;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign.iOS
{
	[extern(iOS) Require("Source.Include", "USCertificate.h")]
	[extern(iOS) Require("Source.Include", "USToolkitMgr.h")]
	extern(iOS) public class Certificate : UniSignBase
	{
		private int certIndex;
		ObjC.Object _handle;

		internal Certificate(int certIndex, ObjC.Object handle)
		{
			this.certIndex = certIndex;
			_handle = handle;
		}

		public void SetToolkit(ToolkitMgr toolkitMgr)
		{
			SetToolkit(_handle, toolkitMgr.Handle);
		}

		public ObjC.Object Handle { get { return this._handle; }}
		public int CertIndex { get { return this.certIndex; } }
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

		[Foreign(Language.ObjC)]
		static void SetToolkit(ObjC.Object certHandle, ObjC.Object toolkitHandle)
		@{
			[(USCertificate*)certHandle setToolkit:(USToolkitMgr*)toolkitHandle];
		@}

		[Foreign(Language.ObjC)]
		static int GetSignatureAlgorithmTyp(ObjC.Object handle)
		@{
			return [(USCertificate*)handle signatureAlgorithmType];
		@}

		[Foreign(Language.ObjC)]
		static int GetExpireDays(ObjC.Object handle)
		@{
			return [(USCertificate*)handle expireDays];
		@}

		[Foreign(Language.ObjC)]
		static int GetPublicKeyAlgorithmTyp(ObjC.Object handle)
		@{
			return [(USCertificate*)handle publicKeyAlgorithmType];
		@}

		[Foreign(Language.ObjC)]
		static int GetPathLengt(ObjC.Object handle)
		@{
			return [(USCertificate*)handle pathLength];
		@}

		[Foreign(Language.ObjC)]
		static string GetVersion(ObjC.Object handle)
		@{
			return [(USCertificate*)handle version];
		@}

		[Foreign(Language.ObjC)]
		static string GetSerial(ObjC.Object handle)
		@{
			return [(USCertificate*)handle serial];
		@}

		[Foreign(Language.ObjC)]
		static string GetSignatureAlgorithm(ObjC.Object handle)
		@{
			return [(USCertificate*)handle signatureAlgorithm];
		@}

		[Foreign(Language.ObjC)]
		static string GetIssuerDN(ObjC.Object handle)
		@{
			return [(USCertificate*)handle issuerDN];
		@}

		[Foreign(Language.ObjC)]
		static string GetCertValidityFrom(ObjC.Object handle)
		@{
			return [(USCertificate*)handle certValidityFrom];
		@}

		[Foreign(Language.ObjC)]
		static string GetCertValidityTo(ObjC.Object handle)
		@{
			return [(USCertificate*)handle certValidityTo];
		@}

		[Foreign(Language.ObjC)]
		static string GetSubjectDN(ObjC.Object handle)
		@{
			return [(USCertificate*)handle subjectDN];
		@}

		[Foreign(Language.ObjC)]
		static string GetPublicKeyAlgorithm(ObjC.Object handle)
		@{
			return [(USCertificate*)handle publicKeyAlgorithm];
		@}

		[Foreign(Language.ObjC)]
		static string GetPublicKey(ObjC.Object handle)
		@{
			return [(USCertificate*)handle publicKey];
		@}

		[Foreign(Language.ObjC)]
		static string GetAuthorityKeyId(ObjC.Object handle)
		@{
			return [(USCertificate*)handle authorityKeyId];
		@}

		[Foreign(Language.ObjC)]
		static string GetAuthorityKeyIdInfo(ObjC.Object handle)
		@{
			return [(USCertificate*)handle authorityKeyIdInfo];
		@}

		[Foreign(Language.ObjC)]
		static string GetSubjectKeyId(ObjC.Object handle)
		@{
			return [(USCertificate*)handle subjectKeyId];
		@}

		[Foreign(Language.ObjC)]
		static string GetSubjectAltName(ObjC.Object handle)
		@{
			return [(USCertificate*)handle subjectAltName];
		@}

		[Foreign(Language.ObjC)]
		static string GetCRLDP(ObjC.Object handle)
		@{
			return [(USCertificate*)handle CRLDP];
		@}

		[Foreign(Language.ObjC)]
		static string GetKeyUsage(ObjC.Object handle)
		@{
			return [(USCertificate*)handle keyUsage];
		@}

		[Foreign(Language.ObjC)]
		static string GetPolicy(ObjC.Object handle)
		@{
			return [(USCertificate*)handle policy];
		@}

		[Foreign(Language.ObjC)]
		static string GetCPS(ObjC.Object handle)
		@{
			return [(USCertificate*)handle CPS];
		@}

		[Foreign(Language.ObjC)]
		static string GetUserNotice(ObjC.Object handle)
		@{
			return [(USCertificate*)handle userNotice];
		@}

		[Foreign(Language.ObjC)]
		static string GetAIA(ObjC.Object handle)
		@{
			return [(USCertificate*)handle AIA];
		@}

		[Foreign(Language.ObjC)]
		static string GetOCSPAddr(ObjC.Object handle)
		@{
			return [(USCertificate*)handle OCSPAddr];
		@}

		[Foreign(Language.ObjC)]
		static string GetBasicConstraints(ObjC.Object handle)
		@{
			return [(USCertificate*)handle basicConstraints];
		@}

		[Foreign(Language.ObjC)]
		static string GetCommonName(ObjC.Object handle)
		@{
			return [(USCertificate*)handle commonName];
		@}

		[Foreign(Language.ObjC)]
		static string GetIssuerCN(ObjC.Object handle)
		@{
			return [(USCertificate*)handle issuerCN];
		@}

		[Foreign(Language.ObjC)]
		static string GetOrganization(ObjC.Object handle)
		@{
			return [(USCertificate*)handle organization];
		@}

		[Foreign(Language.ObjC)]
		static string GetValidityBeginDate(ObjC.Object handle)
		@{
			return [(USCertificate*)handle validityBeginDate];
		@}

		[Foreign(Language.ObjC)]
		static string GetValidityEndDate(ObjC.Object handle)
		@{
			return [(USCertificate*)handle validityEndDate];
		@}

		[Foreign(Language.ObjC)]
		static string GetValidityPeriod(ObjC.Object handle)
		@{
			return [(USCertificate*)handle validityPeriod];
		@}

		[Foreign(Language.ObjC)]
		static string GetSubjectAltNameContents(ObjC.Object handle)
		@{
			return [(USCertificate*)handle subjectAltNameContents];
		@}

		[Foreign(Language.ObjC)]
		static string GetPolicyHumanReadableForm(ObjC.Object handle)
		@{
			return [(USCertificate*)handle policyHumanReadableForm];
		@}

		[Foreign(Language.ObjC)]
		static string GetSha1hashValue(ObjC.Object handle)
		@{
			return [(USCertificate*)handle sha1hashValue];
		@}

		[Foreign(Language.ObjC)]
		static string GetSha256hashValue(ObjC.Object handle)
		@{
			return [(USCertificate*)handle sha256hashValue];
		@}

		[Foreign(Language.ObjC)]
		static string GetCertImageName(ObjC.Object handle)
		@{
			return [(USCertificate*)handle certImageName];
		@}

		[Foreign(Language.ObjC)]
		static string GetCRLDP_IP(ObjC.Object handle)
		@{
			return [(USCertificate*)handle CRLDP_IP];
		@}

		[Foreign(Language.ObjC)]
		static string GetCRLDP_PORT(ObjC.Object handle)
		@{
			return [(USCertificate*)handle CRLDP_PORT];
		@}
	}
}