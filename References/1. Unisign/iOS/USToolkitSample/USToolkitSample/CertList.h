
//
//  CertList.h
//  USToolkitSample
//
//  Created by jwchoi on 2016. 5. 30..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#ifndef CertList_h
#define CertList_h


#endif /* CertList_h */


//@class USCertInfoViewController;
#import <UIKit/UIKit.h>
#import "USCertificate.h"

@interface CertList : UIViewController <UITableViewDelegate, UITableViewDataSource, UIScrollViewDelegate>
{
//    USCertificate   *_cert;
//    USServiceType   _serviceType;
//    USServiceOption _serviceOption;

//    UITableView *listTableView; ///< 인증서 리스트를 출력하는 테이블 뷰
//    UILabel *upTableArrow;
//    UILabel *downTableArrow;
//    UILabel *messageLabel;

    NSArray*    certs;
}


@property (nonatomic, retain) IBOutlet UITableView *listTableView;
//@property US_LIST_MODE mode;
@property (nonatomic, retain) IBOutlet UILabel *upTableArrow;
@property (nonatomic, retain) IBOutlet UILabel *downTableArrow;
@property (nonatomic, retain) IBOutlet UILabel *messageLabel;

//- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil mode:(US_LIST_MODE)aMode; ///< mode를 지정하면서 초기화
//- (void) showTableArrows:(UIScrollView *)aScrollView;

@end

