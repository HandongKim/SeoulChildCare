//
//  ExportCert.h
//  USToolkitSample
//
//  Created by jwchoi on 2016. 5. 26..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#ifndef ExportCert_h
#define ExportCert_h


#endif /* ExportCert_h */
#import <UIKit/UIKit.h>
#import "USTransferMgr.h"
@class AppDelegate;

@interface ExportCert : UIViewController <UITextFieldDelegate>

@property (nonatomic, retain) USTransferMgr*  transfer;
@property (nonatomic, retain) IBOutlet UITextField *tfFirstApprovalNumber;
@property (nonatomic, retain) IBOutlet UITextField *tfSecondApprovalNumber;
@property (nonatomic, retain) IBOutlet UITextField *tfThirdApprovalNumber;
@property (nonatomic, retain) IBOutlet UITextView *resultView;

@property (nonatomic, assign) IBOutlet UIButton *btCancel;
@property (nonatomic, assign) IBOutlet UIButton *btImportCert;
@property (strong, nonatomic) AppDelegate *app;

@property (nonatomic, assign) NSInteger  expireTime;
@property (nonatomic, assign) NSTimer *countdownTimer;

@end

