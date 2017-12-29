//
//  USTransferMgr.h
//  UniSignLibrary
//
//  Created by 근영 최 on 13. 6. 19..
//
//

#import <Foundation/Foundation.h>

#import "OBJCCertTransfer.h"

@interface USTransferMgr : OBJCCertTransfer

+ (void) setLicense:(NSString *)license;
+ (id) getInstance:(USTransVersion)version error:(USError **)error;
/* 2017.01.24 레드마인#2237
 1. CRSKey(인증서 이동 라이선스 8자리) 잠정적 폐지

 -> 인증서 이동은 무료화 한다는 뜻.

 -> 툴킷 라이선스와 별도로 CRSKey가 존재 했던 이유는 영업적으로 인증서 이동은 별도로 판매 하려던 목적이었으나 현재까지 한번도 유료화가 거론된 적이 없었음.

 2. CRSKey 잠정적 폐지에 따른 해결 방안

 -> appKey 또는 appID에 nil일 경우 init 내부(라이브러리 안에서) 공인인증센터(unisign)의 패키지명과 CRSKey를 하드 코딩하여 init을 실행한다.

 //---------------------- 유료화시 고려---------------------------

 -> 추후 인증서 이동 유료화가 되었을 경우를 대비하여 setCertMovementLicense(String pakageName, String license);함수 를 추가하고 유료화가 되면 샘플 및 가이드에  setCertMovementLicense(String license); 실행 코드를 추가한다.

 -> setCertMovementLicense함수 내부에서는 입력된 인자 값으로 기 입력된 공인인증센터용 패키지명과 CRSKey를 대체 한다.  setCertMovementLicense를 실행하게 되면 정상적으로 발급 받은 CRSKey가 아닌경우 인증서 이동이 불가능하다. 위와 같은 이유로 툴킷 변경 없이 유료화 가능.

 //--------------------------------------------------------------
 */
- (id) init:(USTransVersion)version
      appID:(NSString *)appID
     appKey:(NSString *)appKey
       type:(USTransUserType)type
      error:(USError **)error;

- (BOOL) TRANS_Exportcert:(USCertificate *)cert error:(USError **)error;
- (BOOL) TRANS_V2_Exportcert:(USCertificate *)cert error:(USError **)error;
+ (NSString *) TRANS_V2_GetAuthnumFromURI:(NSString *)uri;

@end
