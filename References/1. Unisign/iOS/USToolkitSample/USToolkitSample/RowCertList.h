//
//  RowCertList.h
//  FidoSample
//
//  Created by jwchoi on 2016. 5. 4..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#ifndef RowCertList_h
#define RowCertList_h


#endif /* RowCertList_h */
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface RowCertList : UITableViewCell {


}

@property (nonatomic, retain) IBOutlet UIImageView *ivCert;
@property (nonatomic, retain) IBOutlet UILabel *lbCommonName;
@property (nonatomic, retain) IBOutlet UILabel *lbKeyUsage;
@property (nonatomic, retain) IBOutlet UILabel *lbValidityBeginDate;
@property (nonatomic, retain) IBOutlet UILabel *lbValidityEndDate;

@end


