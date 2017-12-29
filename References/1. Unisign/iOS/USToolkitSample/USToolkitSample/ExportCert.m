//
//  ExportCert.m
//  USToolkitSample
//
//  Created by jwchoi on 2016. 5. 26..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#import <UIKit/UIView.h>
#import <Foundation/Foundation.h>
#import "ExportCert.h"
#import "USError.h"
#import "USCertificate.h"
#import "USUtil.h"
#import "AppDelegate.h"

@interface ExportCert ()

@property (nonatomic, retain) NSThread *threadOperation;

@property (nonatomic, strong) NSTimer *waitTimer;
@property (nonatomic, assign) int waitTimeLimit;
@property (nonatomic, assign) BOOL waitTimerEnabled;

@property (strong, nonatomic) IBOutlet UIView *topView;
@property (strong, nonatomic) IBOutlet UIView *bottomView;
@property (strong, nonatomic) IBOutlet UILabel *lbAccessLatency;


@end

@implementation ExportCert

- (void)viewDidLoad {
    [super viewDidLoad];
    self.app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    NSArray*    certAndPassword = [NSArray arrayWithObjects:self.app.mCert, @"88888888", nil];
    [NSThread detachNewThreadSelector:@selector(generateAuthnumForExport:) toTarget:self withObject:certAndPassword];
}

- (void) generateAuthnumForExport:(NSArray *)certAndPassword {
    @autoreleasepool {

        USError*    error = nil;

        USCertificate*  _cert = self.app.mCert;

        if(_cert == nil)
        {
            NSLog(@"선택된 인증서가 없습니다.");
            [self showAlert:@"알림" message:@"선택된 인증서가 없습니다. \n[인증서 키체인 저장 >> 인증서 목록]을 실행하면 인증서가 선택 됩니다."];
            return;
        }
        NSString*       password = [certAndPassword objectAtIndex:1];

        if(self.transfer == nil)
        {
//            self.transfer = [[USTransferMgr alloc] init:kUSTransV2_0
//                                                  appID:[USUtil appID]
//                                                 appKey:self.app.CERTTRANSFER_LICENSE
//                                                   type:kUSTransOwn error:&error];

            self.transfer = [[USTransferMgr alloc] init:kUSTransV2_0
                                                  appID:nil
                                                 appKey:nil
                                                   type:kUSTransOwn error:&error];

            if(nil != error)
            {
                [self.transfer TRANS_V2_Finalize];
            }
        }
        else
        {
            return;
        }

        NSString*   authnum = [self.transfer TRANS_V2_GenerateCertNum:kUSTransIOS
                                                               serial:[USUtil serial]
                                                             password:password
                                                          certificate:_cert
                                                                error:&error];

        if(nil == authnum || 13 != [authnum length] || nil != error)
        {
            [self showAlert:@"알림" message:@"승인번호 생성에 실패하였습니다."];
            NSLog(@"generateAuthnumForExport : %ld, %@",(long)[error code], [error description]);

            return;
        }

        NSLog(@"authnum : %@, %ld", authnum, (long)[error code]);
        [self performSelectorOnMainThread:@selector(displayTransferInfomation:) withObject:authnum waitUntilDone:NO];

        USTransRole role;
        NSString*   deviceUID = nil;
        NSString*   deviceName = nil;
        USTransDeviceOSType osType;

        if([self.transfer TRANS_V2_IsReceiverConnected:&role deviceUID:&deviceUID deviceName:&deviceName os:&osType error:&error])
        {
            [self exportCert:self.app.mCert];
        }
        else
        {
            [self showAlert:@"오류" message:@"인증서 이동에 실패하였습니다."];

        }
    }
    return;
}

- (void) displayTransferInfomation:(NSString *)authnum {
    if(nil == authnum || 13 != [authnum length])
    {
        return;
    }

    self.tfFirstApprovalNumber.text     = [authnum substringWithRange:NSMakeRange(0, 4)];
    self.tfSecondApprovalNumber.text    = [authnum substringWithRange:NSMakeRange(4, 4)];
    self.tfThirdApprovalNumber.text     = [authnum substringWithRange:NSMakeRange(8, 5)];

    self.countdownTimer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(countdown:) userInfo:nil repeats:YES];
    self.expireTime = 60*10;
}

- (void) countdown:(NSTimer *)aTimer {
    self.expireTime--;

    if(0 >= self.expireTime) {
        if(nil != self.transfer) {
            [self.transfer TRANS_V2_Finalize];
            self.transfer = nil;
        }

        if(nil != self.countdownTimer) {
            if([self.countdownTimer isValid]) {
                [self.countdownTimer invalidate];
            }

            self.countdownTimer = nil;
        }
    }

    NSInteger   seconds = self.expireTime % 60;
    NSInteger   minutes = (self.expireTime / 60) % 60;

    NSString    *remainTime = [NSString stringWithFormat:@"%02ld:%02ld", (long)minutes, (long)seconds];
    self.lbAccessLatency.text = remainTime;
}


- (void) exportCert:(USCertificate *)_cert {
    USError*    error = nil;

    if([self.transfer TRANS_V2_Exportcert:_cert error:&error])
    {
        [self showAlert:@"알림" message:@"인증서 이동에 성공하였습니다."];
    }
    else
    {
        [self showAlert:@"오류" message:@"인증서 이동에 실패하였습니다."];
    }

    if(nil != self.transfer)
    {
        [self.transfer TRANS_V2_Finalize];
        self.transfer = nil;
    }
}

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
@end
