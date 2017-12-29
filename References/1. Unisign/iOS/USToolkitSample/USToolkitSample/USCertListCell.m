/**
 * @file USCertListCell.mm
 * @date 2010/08/03
 * @author 송상일(danox@europa.snu.ac.kr)
 * @brief 인증서 목록에서 인증서 하나를 표시하는 셀
 * @warning 이미지뷰와 용도, 이름, 발급자, 만료일 추가 (08/04)_
 */

#import "USCertListCell.h"


@implementation USCertListCell
@synthesize certIconImageView;
@synthesize certPolicyLabel;
@synthesize certUserNameLabel;
@synthesize certIssuerLabel;
@synthesize certEndDateLabel;

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    if ((self = [super initWithStyle:style reuseIdentifier:reuseIdentifier])) {
        // Initialization code
    }
    return self;
}


- (void)setSelected:(BOOL)selected animated:(BOOL)animated {

    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (void)dealloc {
	[certIconImageView release];
	[certPolicyLabel release];
	[certUserNameLabel release];
	[certIssuerLabel release];
	[certEndDateLabel release];
    [super dealloc];
}


@end
