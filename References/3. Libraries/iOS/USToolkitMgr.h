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

- (USCertificate *) logicIssueCert:(NSString *)refNum
                          authCode:(NSString *)authCode
                          password:(NSString *)password
                             error:(USError **)error;

- (USCertificate *) logicRenewCert:(USCertificate *)cert
                          password:(NSString *)password
                             error:(USError **)error;

- (BOOL) logicRevokeCert:(USCertificate *)cert
                password:(NSString *)password
                   error:(USError **)error;

// Deprecated
- (NSData *) logicCMSSignedData:(USCertificate *)cert
                           data:(NSData *)data
                       password:(NSString *)password
                          error:(USError **)error;

- (NSData *) logicSignedData:(USCertificate *)cert
                        data:(NSData *)data
                    password:(NSString *)password
                       error:(USError **)error;

- (NSData *) logicSignedDataNoContnetWithHash:(USCertificate *)cert
                                     password:(NSString *)password
                                     hashData:(NSData *)hashData
                                      hashAlg:(NSInteger)hashAlg
                                        error:(USError **)error;

- (BOOL) logicVerifyCert:(USCertificate *)cert
                   error:(USError **)error;

- (BOOL) isCorrectCert:(USCertificate *)cert
              password:(NSString *)password
                 error:(USError **)error;

- (USCertificate *) logicChangeCert:(USCertificate *)cert
                    currentPassword:(NSString *)password
                        newPassword:(NSString *)newPassword
                              error:(USError **)error;

- (NSData *) logicVIDR:(USCertificate *)cert
             passworkd:(NSString *)password
                 error:(USError **)error;

- (BOOL) logicVerifySSN:(USCertificate *)cert
               password:(NSString *)password
                    ssn:(NSString *)ssn
                  error:(USError **)error;

- (NSData *) cryptGenerateHashSHA256:(NSData *)data
                               error:(USError **)error;

- (NSData *) cryptSeed:(NSData *)data
                   key:(NSData *)key
                    iv:(NSData *)iv
                 error:(USError **)error;

- (NSData *) decryptSeed:(NSData *)data
                     key:(NSData *)key
                      iv:(NSData *)iv
                   error:(USError **)error;

- (NSData *) cryptRSA:(NSInteger)alg
               pubkey:(NSData *)pubkey
                 data:(NSData *)data
                error:(USError **)error;

- (NSData *) logicSignature:(USCertificate *)cert
                   password:(NSString *)password
                       data:(NSData *)data
                      error:(USError **)error;

- (NSData *) logicSignature:(USCertificate *)cert
                   password:(NSString *)password
                       data:(NSData *)data
                  algorithm:(NSInteger)alg
                      error:(USError **)error;

@end
