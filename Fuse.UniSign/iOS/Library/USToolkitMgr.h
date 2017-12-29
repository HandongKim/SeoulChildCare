//
//  USToolkitMgr.h
//  UniSignLibrary
//
//  Created by 근영 최 on 13. 6. 18..
//
//

#import <Foundation/Foundation.h>

#import "OBJCUSToolkit.h"
#import "USCertificate.h"

@interface USToolkitMgr : OBJCUSToolkit

+ (void) setLicense:(NSString *)license;
+ (id) getInstance:(USError **)error;
+ (NSString *) getApiInfo:(USError **)error;

- (NSData *) logicCMSSignedData:(USCertificate *)cert
                           data:(NSData *)data
                       password:(NSString *)password
                          error:(USError **)error;

- (NSData *) logicSignedData:(USCertificate *)cert
                        data:(NSData *)data
                    password:(NSString *)password
                       error:(USError **)error;

- (NSData *) logicSignedData:(NSData *)signCert
                  signPrikey:(NSData *)signPrikey
                        data:(NSData *)data
                    password:(NSString *)password
                       error:(USError **)error;

- (NSData *) logicSignedDataWithClientCompany:(USCertificate *)cert
                                         data:(NSData *)data
                                     password:(NSString *)password
                            clientCompanyCode:(NSData *)code
                              ranKeyForPBKDF2:(NSString *)ranKey
                                        error:(USError **)error;

- (NSData *) logicSignedDataNoContnetWithHash:(USCertificate *)cert
                                     password:(NSString *)password
                                     hashData:(NSData *)hashData
                                      hashAlg:(NSInteger)hashAlg
                                        error:(USError **)error;

- (NSData *) logicSignedDataNoContnetWithHash:(NSData *)signCert
                                   signPrikey:(NSData *)signPrikey
                                     password:(NSString *)password
                                     hashData:(NSData *)hashData
                                      hashAlg:(NSInteger)hashAlg
                                        error:(USError **)error;


- (BOOL) logicVerifyCert:(USCertificate *)cert error:(USError **)error;

- (BOOL) isCorrectCert:(USCertificate *)cert password:(NSString *)password error:(USError **)error;

-(void)logicIssueCertFor3yearsOr1years:(NSString *)refNumber authCode:(NSString *)authCode password:(NSString *)password error:(USError **)error;

- (USCertificate *) logicIssueCertWithIPandPort:(NSString *)caIp port:(int)port refNum:(NSString *)refNum authCode:(NSString *)authCode password:(NSString *)password error:(USError **)error;

- (USCertificate *) logicIssueCert:(NSString *)refNum authCode:(NSString *)authCode password:(NSString *)password error:(USError **)error;

- (USCertificate *) logicRenewCert:(USCertificate *)cert password:(NSString *)password error:(USError **)error;

- (BOOL) logicRevokeCert:(USCertificate *)cert password:(NSString *)password error:(USError **)error;

- (USCertificate *) logicChangeCert:(USCertificate *)cert currentPassword:(NSString *)password newPassword:(NSString *)newPassword error:(USError **)error;

- (NSData *) logicVIDR:(USCertificate *)cert passworkd:(NSString *)password error:(USError **)error;

- (BOOL) logicVerifySSN:(USCertificate *)cert password:(NSString *)password ssn:(NSString *)ssn error:(USError **)error;


- (NSData *) logicSignature:(USCertificate *)cert
                   password:(NSString *)password
                       data:(NSData *)data
                      error:(USError **)error;

- (NSData *) logicSignature:(USCertificate *)cert
                   password:(NSString *)password
                       data:(NSData *)data
                  algorithm:(NSInteger)alg
                      error:(USError **)error;


- (NSData *) cryptGenerateHashSHA256:(NSData *)data error:(USError **)error;

- (NSData *) cryptGenerateMacSHA256:(NSData *)data key:(NSData *)key error:(USError **)error;

- (NSData *) cryptAES128CBC:(NSData *)data
                        key:(NSData *)key
                         iv:(NSData *)iv
                      error:(USError **)error;

- (NSData *) decryptAES128CBC:(NSData *)data key:(NSData *)key iv:(NSData *)iv error:(USError **)error;


- (NSData *) cryptSeed:(NSData *)data key:(NSData *)key iv:(NSData *)iv error:(USError **)error;

- (NSData *) decryptSeed:(NSData *)data key:(NSData *)key iv:(NSData *)iv error:(USError **)error;

- (NSData *) cryptRSA:(NSInteger)alg pubkey:(NSData *)pubkey data:(NSData *)data error:(USError **)error;

- (NSData *) cryptRSA:(NSInteger)keyAlg encAlg:(NSInteger)encAlg pubkey:(NSData *)pubkey prikey:(NSData *)prikey data:(NSData *)data error:(USError **)error;

- (NSData *) cryptRSA:(NSData *)serverCert  data:(NSData *)data error:(USError **)error;


- (NSData *) certDecryptPriKey:(NSString *)password encPrikey:(NSData *)encPrikey error:(USError **)error;


-(NSData *) generateSymmetricKey:(USError **)error;

- (NSData *) certChangePrikeyPassword:(NSString *)oldPassword
                          newPassword:(NSString *)newPassword
                            encPrikey:(NSData *)encPrikey
                                error:(USError **)error;

- (NSData *) certGetVIDRandomWithPrikey:(NSString *)password encPrikey:(NSData *)encPrikey error:(USError **)error;

- (NSData *) cryptoGenerateRandom:(NSInteger)randomSize error:(USError **)error;

- (NSString *) utilBase64Encode:(NSData *)data error:(USError **)error;

- (NSData *) utilBase64Decode:(NSString *)string error:(USError **)error;

- (NSString *) utilBinToHexString:(NSData *)data error:(USError **)error;

- (NSData *) utilHexStringToBin:(NSString *)string error:(USError **)error;

- (NSData *) utilHTTPDownloadFile:(NSString *)url error:(USError **)error;

@end
