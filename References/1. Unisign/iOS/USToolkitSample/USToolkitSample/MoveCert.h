//
//  MoveCert.h
//  FidoSample
//
//  Created by jwchoi on 2016. 4. 14..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#ifndef ImportCert_h
#define ImportCert_h


#endif /* ImportCert_h */
#import <UIKit/UIKit.h>
#import "USTransferMgr.h"
@class AppDelegate;

@interface MoveCert : UIViewController <UITextFieldDelegate>

@property (nonatomic, retain) USTransferMgr*  transfer;
@property (nonatomic, retain) IBOutlet UITextField *tfFirstApprovalNumber;
@property (nonatomic, retain) IBOutlet UITextField *tfSecondApprovalNumber;
@property (nonatomic, retain) IBOutlet UITextField *tfThirdApprovalNumber;
@property (nonatomic, retain) IBOutlet UITextField *tfAccessLatency;

@property (nonatomic, retain) IBOutlet UITextView *resultView;

@property (nonatomic, assign) IBOutlet UIButton *btCancel;
@property (nonatomic, assign) IBOutlet UIButton *btImportCert;
@property (strong, nonatomic) AppDelegate *app;

@property (nonatomic, assign) int moveType;//import : 0 , exprot : 1

@end

