//
//  MoveCert.m
//  FidoSample
//
//  Created by jwchoi on 2016. 4. 14..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIView.h>
#import "MoveCert.h"
#import "USError.h"
#import "USCertificate.h"
#import "USUtil.h"
#import "AppDelegate.h"
#import "HUD.h"
#import "USLoadingView.h"

//#import <FidoFramework/Fido.h>
//#import <FidoFramework/HUD.h>
//#import "Constants.h"
//#import <FidoFramework/ConstantData.h>
//#import "InputCertPassword.h"
//#import <FidoFrameWork/ResultMessage.h>

@interface MoveCert ()

@property (strong, nonatomic) IBOutlet UILabel *lbTitle;

@property (nonatomic, strong) NSTimer *waitTimer;
@property (nonatomic, assign) int waitTimeLimit;
@property (nonatomic, assign) BOOL waitTimerEnabled;
@property (strong, nonatomic) IBOutlet UILabel *lbAccessLatency;
@property (nonatomic, retain) NSThread *threadOperation;

@property (strong, nonatomic) USToolkitMgr *toolkitMgr;
@end

@implementation MoveCert

- (void)viewDidLoad {
    [super viewDidLoad];
    self.app = (AppDelegate *)[[UIApplication sharedApplication] delegate];

    NSLog(@"인증서 이동 타입 : %d", self.moveType);

    [self initAccessLatency];

    USError *error = nil;
    [USToolkitMgr setLicense:self.app.TOOLKIT_LICENSE];
    NSLog(@"self.app.TOOLKIT_LICENSE : %@", self.app.TOOLKIT_LICENSE);
    self.toolkitMgr = [USToolkitMgr getInstance:&error];

//------------ 인증서 이동 라이선스 적용 버전 ---------------------------------------
//    self.transfer = [[USTransferMgr alloc] init:kUSTransV1_0
//                                          appID:[USUtil appID]
//                                         appKey:self.app.CERTTRANSFER_LICENSE
//                                           type:kUSTransOwn
//                                          error:&error];
//---------------------------------------------------------------------------

    self.transfer = [[USTransferMgr alloc] init:kUSTransV1_0
                                          appID:nil
                                         appKey:nil
                                           type:kUSTransOwn
                                          error:&error];

    if(error != nil && 0 != [error code])
    {
        NSLog(@"[error code] : %ld",(long)[error code]);
        NSString *initResult = [NSString stringWithFormat:@"Failed to initialize the Toolkit.\n(%ld)", (long)[error code]];

        [self showAlert:@"Error" message:initResult];
        return;
    }

    NSLog(@"[USUtil serial] : %@",[USUtil serial]);
    NSString *result = nil;
    switch (self.moveType) {
        case 0:
            self.lbTitle.text = @"Import a certificate";
            result = [self.transfer TRANS_GenerateCertNum:kUSTransIOS
                                                direction:kUSTransImport
                                                   serial:[USUtil serial]
                                                    error:&error];
            break;
        case 1:
            self.lbTitle.text = @"Export a certificate";
            result = [self.transfer TRANS_GenerateCertNum:kUSTransIOS
                                                direction:kUSTransExport
                                                   serial:[USUtil serial]
                                                    error:&error];
            break;

        default:
            break;
    }


    if(nil == result || 13 != [result length])
    {

        result = [NSString stringWithFormat:@"(%ld)", (long)[error code]];
        NSLog(@"Authorization number generation failed :%@", result);
        [self showAlert:@"Error" message:result];
        return;
    }


    NSString *generateApprovalNumber = result;

    NSString *firstString  = [generateApprovalNumber substringWithRange:NSMakeRange(0,4)];
    NSString *secondString = [generateApprovalNumber substringWithRange:NSMakeRange(4,4)];
    NSString *thirdString = [generateApprovalNumber substringWithRange:NSMakeRange(8,5)];

    if(generateApprovalNumber != nil && [generateApprovalNumber length] == 13)
    {
        firstString  = [generateApprovalNumber substringWithRange:NSMakeRange(0,4)];
        secondString = [generateApprovalNumber substringWithRange:NSMakeRange(4,4)];
        thirdString = [generateApprovalNumber substringWithRange:NSMakeRange(8,5)];

        NSLog(@"firstString : %@",firstString);
        NSLog(@"secondString : %@",secondString);
        NSLog(@"thirdString : %@",thirdString);

        self.tfFirstApprovalNumber.text = firstString;
        self.tfSecondApprovalNumber.text = secondString;
        self.tfThirdApprovalNumber.text = thirdString;

        self.waitTimerEnabled = YES;

        SEL selOp = @selector(isPCconnected);
        self.threadOperation = [[NSThread alloc] initWithTarget:self selector:selOp object:nil];
        [self.threadOperation start];


    }
}


-(void) isPCconnected{
    NSLog(@"    ⏩isPCconnected");

    NSAutoreleasePool* pool = [[NSAutoreleasePool alloc] init];


    USError* error = nil;

    if ([self.transfer TRANS_IsPCConnected:&error]) {

        [self.waitTimer invalidate];

        [self performSelectorOnMainThread:@selector(showHUD)
                               withObject:nil
                            waitUntilDone:YES];

        SEL selector;
        switch (self.moveType) {
            case 0:
                selector = @selector(import);
                break;
            case 1:
                selector = @selector(export:);
                break;
            default:
                selector = nil;
                break;
        }
        [NSThread detachNewThreadSelector:selector toTarget:self withObject:nil];
    } else {
        NSLog(@"PC Connection fail");
    }
    
    [pool release];
}


-(void) import{
    NSLog(@"    ⏩import");
    NSAutoreleasePool* pool = [[NSAutoreleasePool alloc] init];

    USError *error = nil;

    USCertificate *importedCert = [self.transfer TRANS_ImportCert:&error];
    [importedCert setToolkit:self.toolkitMgr];

    // import시 에러 발생
    if (nil != error)
    {
//        _result = [error code];
        NSLog(@"%@ [%@, %d]", @"Failed to import a certificate.", [error description], (int)[error code]);
    }
    else {
        [self setCertificate:importedCert];

        [USListMgr add:self.app.mCert subjectDN:[self.app.mCert subjectDN]];
        NSLog(@"%@ [%@, %d]", @"Successfully imported a certificate.", [error description], (int)[error code]);
    }

    [pool release];
    [self performSelectorOnMainThread:@selector(onResult)
                           withObject:nil
                        waitUntilDone:YES];
    
}

-(void)export:(USLoadingView *)loadingView {
    NSAutoreleasePool* pool = [[NSAutoreleasePool alloc] init];

    USError*    error = nil;

    [self.transfer TRANS_Exportcert:self.app.mCert error:&error];

    if (nil != error)
    {
        NSLog(@"%@ [%@, %d]", @"Failed to export a certificate.", [error description], (int)[error code]);
    }
    else
    {
        NSLog(@"%@ [%@, %d]", @"Successfully exported a certificate.", [error description], (int)[error code]);
    }

    [self.transfer TRANS_Finalize];

    [pool release];

    [self performSelectorOnMainThread:@selector(onResult)
                           withObject:nil
                        waitUntilDone:YES];
}


- (void) setCertificate:(USCertificate *)certificate {
    self.app.mCert = certificate;

    NSLog(@"========Retrieved certificate information============");
    NSLog(@"%@", [self.app.mCert commonName]);
    NSLog(@"%@", [self.app.mCert certValidityTo]);
    NSLog(@"%@", [self.app.mCert certValidityFrom]);
    NSLog(@"%ld", (long)[self.app.mCert expireDays]);
    NSLog(@"%@", [self.app.mCert issuerCN]);
    NSLog(@"%@", [self.app.mCert issuerDN]);
    NSLog(@"%@", [self.app.mCert keyUsage]);
    NSLog(@"=================================");


    [self.app.mCert retain];
}


- (IBAction)actionImportCert:(id)sender {
//    [[UIApplication sharedApplication] sendAction:@selector(resignFirstResponder) to:nil from:nil forEvent:nil];
//
//    NSString*   authnum = [self userInputToAuthNum];
//
//    if(nil != authnum && 13 == [authnum length]) {
//        [NSThread detachNewThreadSelector:@selector(importCert:) toTarget:self withObject:authnum];
//    } else {
//        [self showAlert:@"오류" message:@"잘못된 승인번호 입니다."];
//
//    }
}

//- (NSString *) userInputToAuthNum {
//    NSString*   authnum = [NSString stringWithFormat:@"%@%@%@", self.tfFirstApprovalNumber.text, self.tfSecondApprovalNumber.text, self.tfThirdApprovalNumber.text];
//
//    return authnum;
//}

//- (void) importCert:(NSString *)authnum {
//    @autoreleasepool {
//
//        USError*    error = nil;
//        USCertificate*  cert = nil;
//
//        if(nil == self.transfer)
//        {
//
//            
//            self.transfer = [[USTransferMgr alloc] init:kUSTransV2_0 appID:[USUtil appID] appKey:self.app.CERTTRANSFER_LICENSE type:kUSTransOwn error:&error];
//        }
//
//        if([self.transfer TRANS_V2_SendReceiverInfo:[USUtil serial] deviceName:[USUtil deviceName] os:kUSTransIOS connectKey:authnum authType:kUSTransQRCode error:&error])
//        {
//            cert = [self.transfer TRANS_V2_ImportCert:&error];
//            if(nil != cert ) {
//                [self showAlert:@"알림" message:@"인증서 이동에 성공하였습니다."];
//            }
//
//            [cert setToolkit:[USToolkitMgr getInstance:&error]];
//            [USListMgr add:cert subjectDN:[cert subjectDN]];
//
//            if(nil != self.transfer) {
//                [self.transfer TRANS_V2_Finalize];
//                self.transfer = nil;
//            }
//        }
//        else
//        {
//            NSLog(@"importCert errror : %ld, %@",[error code], [error description]);
//            [self showAlert:@"오류" message:@"인증서 이동에 실패하였습니다."];
//
//            if(nil != self.transfer) {
//                [self.transfer TRANS_V2_Finalize];
//                self.transfer = nil;
//            }
//        }
//        
//        [self displayResult:cert error:error];
//        
//    }
//}

-(void)initAccessLatency{
    self.waitTimeLimit = 599;
    self.waitTimerEnabled = NO;
    self.waitTimer = [[NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(onWaitTimer:)
                                                     userInfo:nil repeats:YES] retain];
}

- (void) onWaitTimer:(NSTimer *)aTimer {
    if (self.waitTimerEnabled) {
        if (self.waitTimeLimit < 0) {
            [self.navigationController popToRootViewControllerAnimated:YES];
        } else {
            int minute = self.waitTimeLimit / 60;
            int second = self.waitTimeLimit % 60;
            self.lbAccessLatency.text = [NSString stringWithFormat:@"Access Latency %d:%02d", minute, second];
            if(minute == 0 && second == 0){

            }
        }
        self.waitTimeLimit--;
    }
}

//- (void) displayResult:(USCertificate *)cert error:(USError *)error {
//    if(nil != error) {
//        [self.resultView performSelectorOnMainThread:@selector(setText:) withObject:[NSString stringWithFormat:@"Error[%ld] : %@", (long)[error code], [error userInfo]] waitUntilDone:NO];
//    } else if(nil != cert){
//        [self.resultView performSelectorOnMainThread:@selector(setText:) withObject:[cert description] waitUntilDone:NO];
//    }
//
//    unsigned char*  signCert = [cert binaryForType:kUSSignCert];
//    int signCertLen = [cert lengthForType:kUSSignCert];
//
//    unsigned char*  signPrikey = [cert binaryForType:kUSSignPrikey];
//    int signPrikeyLen = [cert lengthForType:kUSSignPrikey];
//
//    unsigned char*  kmCert = [cert binaryForType:kUSKMCert];
//    int kmCertLen = [cert lengthForType:kUSKMCert];
//
//    unsigned char*  kmPrikey = [cert binaryForType:kUSKMPrikey];
//    int kmPrikeyLen = [cert lengthForType:kUSKMPrikey];
//}


- (void)showAlert:(NSString *)title message:(NSString *)message{
    UIAlertController * alert=   [UIAlertController
                                  alertControllerWithTitle:title
                                  message:message
                                  preferredStyle:UIAlertControllerStyleAlert];

    UIAlertAction* ok = [UIAlertAction
                         actionWithTitle:@"ok"
                         style:UIAlertActionStyleDefault
                         handler:^(UIAlertAction * action)
                         {
                         }];

    [alert addAction:ok];

    [self presentViewController:alert animated:YES completion:nil];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {

}

-(void)onResult{

    [self hidHUD];

    [self performSegueWithIdentifier:@"backToMainFromMoveCert" sender:nil];
    

}
- (void)showHUD{
    [HUD showUIBlockingIndicatorWithText:@"Certificate is transferring. \n Please wait for a while.\n"];
}

- (void) hidHUD{
    [HUD hideUIBlockingIndicator];
}
@end
