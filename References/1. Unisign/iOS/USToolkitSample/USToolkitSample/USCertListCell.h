/**
 * @file USCertListCell.h
 * @date 2010/08/04
 * @author 송상일(danox@europa.snu.ac.kr)
 * @brief 인증서 목록에서 인증서 하나를 표시하는 셀
 * @warning 이미지뷰와 용도, 이름, 발급자, 만료일 추가 (08/04)
 */

#import <UIKit/UIKit.h>


@interface USCertListCell : UITableViewCell {
	UIImageView *certIconImageView; ///< 인증서 아이콘
	UILabel *certPolicyLabel; ///< 인증서 용도
	UILabel *certUserNameLabel; ///< 인증서 이름 라벨
	UILabel *certIssuerLabel; ///< 인증서 발급자
	UILabel *certEndDateLabel; ///< 인증서 만료일
}
@property (nonatomic, retain) IBOutlet UIImageView *certIconImageView;
@property (nonatomic, retain) IBOutlet UILabel *certPolicyLabel;
@property (nonatomic, retain) IBOutlet UILabel *certUserNameLabel;
@property (nonatomic, retain) IBOutlet UILabel *certIssuerLabel;
@property (nonatomic, retain) IBOutlet UILabel *certEndDateLabel;

@end
