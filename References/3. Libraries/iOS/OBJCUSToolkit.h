//
//  OBJCUSToolkit.h
//  USXToolkit
//
//  Created by gychoi on 12. 4. 3..
//  Copyright 2012 Crosscert. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "USError.h"

@interface OBJCUSToolkit : NSObject {
}

+ (NSString *) API_GetInfo:(USError **)error;
+ (NSString *) API_GetLibLicenseInfo:(USError **)error;
+ (NSString *) API_GetAppLicenseInfo:(NSString *)appInfo error:(USError **)error;
- (id) init:(NSString *)_configDir error:(USError **)error;
- (NSString *) API_GetLastError;
- (NSInteger) API_GetLastErrorCode;
- (NSString *) API_GetLastDebugError;
- (BOOL) API_CheckLicense:(NSString *)appInfo license:(NSString *)license error:(USError **)error;
- (BOOL) API_CheckMovementLicense:(NSString *)appInfo license:(NSString *)crsKey error:(USError **)error;
- (BOOL) CRSInit:(void **)context appInfo:(NSString *)appInfo license:(NSString *)crsKey error:(USError **)error;
- (void) CRSFinish:(void **)context error:(USError **)error;

/*************************************************************************************/

- (NSData *) CRYPT_GenerateRandom:(NSInteger)randomSize error:(USError **)error;
- (void *) CRYPT_GenerateKey:(NSInteger)symmEncAlg paddingType:(NSInteger)paddingType error:(USError **)error;
- (void *) CRYPT_GenerateKeyPair:(NSInteger)pubkeyAlg error:(USError **)error;
- (void *) CRYPT_SetSymmetricKey:(NSInteger)symmEncAlg paddingType:(NSInteger)paddingType key:(NSData *)key iv:(NSData *)iv error:(USError **)error;
- (void *) CRYPT_SetAsymmetricKey:(NSInteger)asymmKeyType pubkey:(NSData *)pubkey prikey:(NSData *)prikey error:(USError **)error;
- (NSData *) CRYPT_GetKey:(void *)keyHdl keyType:(NSInteger)keyType error:(USError **)error;
- (BOOL) CRYPT_DestroyKey:(void *)keyHdl error:(USError **)error;
- (NSData *) CRYPT_Encrypt:(void *)symmKeyHdl plainData:(NSData *)plainData error:(USError **)error;
- (NSData *) CRYPT_Decrypt:(void *)symmKeyHdl encData:(NSData *)encData error:(USError **)error;
- (NSData *) CRYPT_AsymmEncrypt:(void *)asymmKeyHdl pubkeyEncMode:(NSInteger)pubkeyEncMode plainData:(NSData *)plainData error:(USError **)error;
- (NSData *) CRYPT_AsymmDecrypt:(void *)asymmKeyHdl pubkeyEncAlg:(NSInteger)pubkeyEncMode encData:(NSData *)encData error:(USError **)error;
- (NSData *) CRYPT_Sign:(void *)pubkeyHdl signAlg:(NSInteger)signAlg plainData:(NSData *)plainData error:(USError **)error;
- (BOOL) CRYPT_VerifySign:(void *)pubkeyHdl signAlg:(NSInteger)signAlg plainData:(NSData *)plainData signData:(NSData *)signData error:(USError **)error;

// MAC

- (NSData *) CRYPT_GenerateMAC:(NSInteger)MACAlg plainData:(NSData *)plainData key:(NSData *)key error:(USError **)error;
- (BOOL) CRYPT_VerifyMAC:(NSInteger)MACAlg plainData:(NSData *)plainData key:(NSData *)key MACData:(NSData *)MACData error:(USError **)error;

// HASH

- (NSData *) CRYPT_GenerateHASH:(NSInteger)hashAlg plainData:(NSData *)plainData error:(USError **)error;
- (BOOL) CRYPT_VerifyHASH:(NSInteger)hashAlg plainData:(NSData *)plainData hashData:(NSData *)hashData error:(USError **)error;

/* Certificate ------------------------------------------------------------------------- */

// ¿Œ¡ıº≠ ∫∏±‚ ¡§∫∏ »πµÊ
- (void *) CERT_Init:(NSData *)certData error:(USError **)error;
- (NSString *) CERT_GetVersion:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetSerial:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetSignatureAlgorithm:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetIssuerDN:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetCertValidityNotBefore:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetCertValidityNotAfter:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetSubjectDN:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetPublicKeyAlgorithm:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetPublicKeyInfo:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetAuthorityKeyIdentifier:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetAuthorityKeyIdentifierInfo:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetSubjectKeyIdentifier:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetSubjectAltName:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetCRLDP:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetKeyUsage:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetCertPolicy:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetCertCPS:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetCertUserNotice:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetAuthorityInformationAccess:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetOCSPAddr:(void *)certHdl error:(USError **)error;
- (NSString *) CERT_GetBasicConstraints:(void *)certHdl error:(USError **)error;
- (BOOL) CERT_GetIsCA:(void *)certHdl error:(USError **)error;
- (NSInteger) CERT_GetPathLength:(void *)certHdl error:(USError **)error;

// ¿Œ¡ıº≠ √≥∏Æ¡§∫∏ »πµÊ
- (NSInteger) CERT_GetPublicKeyAlgorithmType:(void *)certHdl error:(USError **)error;
- (NSData *) CERT_GetPublicKey:(void *)certHdl error:(USError **)error;
- (NSInteger) CERT_GetCertValidityExpireDays:(void *)certHdl error:(USError **)error;
- (NSInteger) CERT_GetSignatureAlgorithmType:(void *)certHdl error:(USError **)error;
// CERT √≥∏Æ ¡æ∑·
- (BOOL) CERT_Finalize:(void *)certHdl error:(USError **)error;
// ¿Œ¡ıº≠ ∞À¡ı «‘ºˆ
- (BOOL) CERT_SetTrustRootCACert:(NSData *)certData error:(USError **)error;
- (BOOL) CERT_SetCACert:(NSData *)certData error:(USError **)error;
- (BOOL) CERT_VerifyCertificate:(NSInteger)certVerifyFlag cert:(NSData *)certData error:(USError **)error;
//- (BOOL) CERT_VerifyCertificateWithOCSP:(NSInteger)certVerifyFlag cert:(NSData *)certData prikeyPassword:(NSData *)prikeyPassword ocspSignCert:(NSData *)ocspSignCert ocspSignPrikey:(NSData *)ocspSignPrikey error:(USError **)error;
//- (BOOL) CERT_VerifyCertificateWithCRL:(NSInteger)certVerifyFlag cert:(NSData *)certData crlCert:(NSData *)crlCert error:(USError **)error;
// ∞≥¿Œ≈∞ √≥∏Æ
/*
- (NSData *) CERT_EncryptPrikey:(NSInteger)encAlg password:(NSString *)password prikey:(NSData *)prikey error:(USError **)error;
 */
- (NSData *) CERT_DecryptPrikey:(NSString *)password encPrikey:(NSData *)encPrikey error:(USError **)error;
- (NSData *) CERT_ChangePrikeyPassword:(NSString *)oldPassword newPassword:(NSString *)newPassword encPrikey:(NSData *)encPrikey error:(USError **)error;
// VID √≥∏Æ
- (NSData *) CERT_GetVIDRandomWithPrikey:(NSString *)password encPrikey:(NSData *)encPrikey error:(USError **)error;
- (BOOL) CERT_VerifyVID:(NSData *)cert vidRandom:(NSData *)vidRandom socialNumber:(NSString *)socialNumber error:(USError **)error;

/* PKCS#7/CMS  ------------------------------------------------------------------------- */
- (NSData *) CMS_SignedData:(NSInteger)signAlg signedDataType:(NSInteger)signedDataType password:(NSString *)password signCert:(NSData *)signCert signPrikey:(NSData *)signPrikey inputData:(NSData *)inputData error:(USError **)error;
- (NSData *) CMS_SignedDataWithSign:(NSInteger)signAlg signedDataType:(NSInteger)signedDataType signCert:(NSData *)signCert pubkeySign:(NSData *)pubkeySign inputData:(NSData *)inputData error:(USError **)error;
- (NSData *) CMS_AddSigner:(NSData *)preSignedData password:(NSString *)password signCert:(NSData *)signCert signPrikey:(NSData *)signPrikey error:(USError **)error;
- (NSData *) CMS_VerifySignedData:(NSData *)signedData error:(USError **)error;
- (NSInteger) CMS_GetCertCountWithSignedData:(NSData *)signedData error:(USError **)error;
- (NSData *) CMS_EnvelopedData:(NSInteger)encAlg kmCert:(NSData *)kmCert inputData:(NSData *)inputData error:(USError **)error;
- (NSData *) CMS_DecEnvelopedData:(NSString *)password kmCert:(NSData *)kmCert kmPrikey:(NSData *)kmPrikey envelopedData:(NSData *)envelopedData error:(USError **)error;

// ∫∏æ»≈‰≈´ ¿ÃøÎΩ√ ∫∏æ»≈‰≈´ø°º≠ ∫π»£»≠«“ ∞¯∞≥≈∞∑Œ æœ»£»≠µ» ≈∞ »πµÊ
- (NSData *) CMS_GetPubEncryptKeyWithEnvelopedData:(NSData *)envelopedData error:(USError **)error;
// ∫∏æ»≈‰≈´ ø°º≠ »πµÊ«— ≈∞∏¶ ¿ÃøÎ«œø© ∫π»£»≠
- (NSData *) CMS_DecEnvelopedDataWithEncryptKey:(NSData *)envelopedData key:(void *)symmKeyHdl error:(USError **)error;
- (NSData *) CMS_SignedAndEnvelopedData:(NSInteger)signAlg encAlg:(NSInteger)encAlg kmCert:(NSData *)kmCert password:(NSString *)password signCert:(NSData *)signCert signPrikey:(NSData *)signPrikey inputData:(NSData *)inputData error:(USError **)error;
- (NSData *) CMS_DecSignedAndEnvelopedData:(NSData *)signedAndEnvelopedData password:(NSString *)password kmCert:(NSData *)kmCert kmEncPrikey:(NSData *)kmEncPrikey error:(USError **)error;
- (NSData *) CMS_EncryptedData:(NSInteger)encAlg password:(NSString *)password plainData:(NSData *)plainData error:(USError **)error;
- (NSData *) CMS_DecEncryptedData:(NSString *)password encryptedData:(NSData *)encryptedData error:(USError **)error;
/* CMP  ------------------------------------------------------------------------- */
- (NSDictionary *) CMP_IssueCertificate:(NSString *)CAIP CAPort:(NSInteger)CAPort refNumber:(NSString *)refNumber authCode:(NSString *)authCode encPrikeyAlg:(NSInteger)encPrikeyAlg password:(NSString *)password error:(USError **)error;
- (NSMutableDictionary *) CMP_UpdateCertificate:(NSString *)CAIP CAPort:(NSInteger)CAPort password:(NSString *)password oldSignCert:(NSData *)oldSignCert oldSignEncPrikey:(NSData *)oldSignEncPrikey error:(USError **)error;
- (BOOL) CMP_RevokeCertificate:(NSString *)CAIP CAPort:(NSInteger)CAPort password:(NSString *)password signCert:(NSData *)signCert signEncPrikey:(NSData *)signEncPrikey kmCert:(NSData *)kmCert revokeReason:(NSInteger)revokeReason error:(USError **)error;
/* PKCS  ------------------------------------------------------------------------- */
// PKCS#5 - KDF
- (NSData *) PKCS5_PBKDF:(NSInteger)KDFMode password:(NSString *)password salt:(NSData *)salt iterCount:(NSInteger)iterCount kdfLen:(NSInteger)kdfLen error:(USError **)error;
/* PKCS#12 */
- (NSData *) PKCS12_MakePFX:(NSInteger)encAlg pfxMode:(NSInteger)pfxMode pfxPassword:(NSString *)pfxPassword certPassword:(NSString *)certPassword signCert:(NSData *)signCert signEncPrikey:(NSData *)signEncPrikey kmCert:(NSData *)kmCert kmEncPrikey:(NSData *)kmEncPrikey error:(USError **)error;
- (NSDictionary *) PKCS12_GetCertWithPFX:(NSString *)pfxPassword certPassword:(NSString *)certPassword pfx:(NSData *)pfx error:(USError **)error;
- (NSData *) PKCS12_MakePFX_ENCPKCS8:(NSInteger)encAlg pfxPassword:(NSData *)pfxPassword signCert:(NSData *)signCert signEncPrikey:(NSData *)signEncPrikey kmCert:(NSData *)kmCert kmEncPrikey:(NSData *)kmEncPrikey error:(USError **)error;
- (NSDictionary *) PKCS12_GetCertWithPFX_ENCPKCS8:(NSData *)pfxPassword pfx:(NSData *)pfx error:(USError **)error;
/* TSA  ------------------------------------------------------------------------- */
- (NSData *) TSA_RequestTSAToken:(NSInteger)TSAOption hashAlg:(NSInteger)hashAlg TSAIPAddr:(NSString *)TSAIPAddr TSAPort:(NSInteger)TSAPort plainData:(NSData *)plainData error:(USError **)error;
- (NSData *) TSA_RequestSignTSAToken:(NSInteger)TSAOption hashAlg:(NSInteger)hashAlg TSAIPAddr:(NSString *)TSAIPAddr TSAPort:(NSInteger)TSAPort password:(NSString *)password signCert:(NSData *)signCert signEncPrikey:(NSData *)signEncPrikey plainData:(NSData *)plainData error:(USError **)error;
- (BOOL) TSA_VerifyTSAToken:(NSString *)TSAIPAddr TSAPort:(NSInteger)TSAPort plainData:(NSData *)plainData error:(USError **)error;


/* Util ------------------------------------------------------------------------- */

- (NSData *) UTIL_ReadFile:(NSString *)filename error:(USError **)error;
- (BOOL) UTIL_WriteFile:(NSString *)filename data:(NSData *)data error:(USError **)error;
- (BOOL) UTIL_RemoveFile:(NSString *)filename error:(USError **)error;
//Bin2Str
//- (NSString *) UTIL_Base64Encode:(NSData *)data error:(USError **)error;
//- (NSData *) UTIL_Base64Decode:(NSString *)string error:(USError **)error;
//- (NSString *) UTIL_BinToHexString:(NSData *)data error:(USError **)error;
//- (NSData *) UTIL_HexStringToBin:(NSString *)string error:(USError **)error;
//- (NSData *) UTIL_HTTPDownloadFile:(NSString *)url error:(USError **)error;
//LDAP
- (NSData *) UTIL_GetDataFromLDAP:(NSString *)LDAPIPAddr LDAPPort:(NSInteger)LDAPPort searchType:(NSInteger)searchType searchStr:(NSString *)searchStr error:(USError **)error;

@end
