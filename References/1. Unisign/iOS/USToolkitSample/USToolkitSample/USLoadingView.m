/**
 * @file USLoadingView.mm
 * @date 2010/09/12
 * @author 연종흠(jonghm@europa.snu.ac.kr)
 * @brief 로딩 인디케이터가 포함된 UIAlertView
 * @warning
 */

#import "USLoadingView.h"


@implementation USLoadingView : UIAlertView 

- (void)show{
	[super show];
	UIActivityIndicatorView *loadingIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
	loadingIndicator.center = CGPointMake(self.bounds.size.width/2.0f, self.bounds.size.height-45.0f);
	[loadingIndicator startAnimating];
	[self addSubview:loadingIndicator];
	[loadingIndicator release];
}

- (void)close {
	[self dismissWithClickedButtonIndex:0 animated:YES];
}

@end
