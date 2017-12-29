//
//  CertList.m
//  USToolkitSample
//
//  Created by jwchoi on 2016. 5. 30..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CertList.h"
#import "USListMgr.h"
#import "USCertListCell.h"
#import "RowCertList.h"
#import "USError.h"
#import "USToolkitMgr.h"
#import "MoveCert.h"


@implementation CertList

@synthesize listTableView;
//@synthesize mode;
@synthesize upTableArrow;
@synthesize downTableArrow;
@synthesize messageLabel;


- (void)viewDidLoad {
    [super viewDidLoad];

    self.listTableView.rowHeight = 90;
    
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    // 네비게이션 이미지 변경

    if(nil != certs) {
        [certs release];
    }

//    if(kUSServiceRenew == _serviceType || kUSServiceDisuse == _serviceType) {
//        certs = [[self getCertOfCrossCert] retain];
//    } else {
//        certs = [[USListMgr UserCertificates] retain];
//    }

    certs = [[USListMgr UserCertificates] retain];
    NSLog(@"certs count : %lu", (unsigned long)[certs count]);

    [[certs objectAtIndex:0] issuerCN];
//    [self showTableArrows:listTableView];

    [listTableView reloadData];
    if([listTableView numberOfRowsInSection:0]==0) {
        messageLabel.text = @"인증서가 존재하지 않습니다.";
        messageLabel.hidden = NO;
        listTableView.hidden = YES;
    }
    else {
        messageLabel.hidden = YES;
        listTableView.hidden = NO;
    }
}


- (void)viewDidUnload {
    self.upTableArrow = nil;
    self.downTableArrow = nil;
    self.listTableView = nil;
    [super viewDidUnload];
}

- (void)dealloc {
    [listTableView release];
    [upTableArrow release];
    [downTableArrow release];
    [messageLabel release];
    [super dealloc];
}

- (NSArray *) getCertOfCrossCert {
    NSArray *allusers = [USListMgr UserCertificates];
    NSMutableArray  *crosscerts = [NSMutableArray array];

    for(USCertificate   *cert in allusers) {
        if([cert.organization hasPrefix:@"CrossCert"]) {
            [crosscerts addObject:cert];
        }
    }

    return crosscerts;
}


#pragma mark Table Data Source Methods

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {

    return [certs count];
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {

    static NSString *simpleTableIdentifier = @"SimpleTableCell";

    //    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];
    RowCertList *cell = (RowCertList *)[tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];

    if (cell == nil) {
        //        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:simpleTableIdentifier];
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"RowCertList" owner:self options:nil];
        cell = (RowCertList *)[nib objectAtIndex:0];
    }

    cell.imageView.image = [UIImage imageNamed:@"UniSign_Cert_Icon_1.png"];
    cell.imageView.transform = CGAffineTransformScale(CGAffineTransformIdentity, .8, .8);

    USCertificate *cert = (USCertificate *)[certs objectAtIndex:[indexPath row]];
//    NSArray *arrDN = [[[viewCertificates objectAtIndex:indexPath.row] subjectDN] componentsSeparatedByString:@","];
//    NSArray *arrCN = [[arrDN objectAtIndex:0] componentsSeparatedByString:@"="];
//    NSString *cn = [arrCN objectAtIndex:1];
    cell.lbCommonName.text = [cert issuerCN];
    cell.lbKeyUsage.text = [cert keyUsage];
    cell.lbValidityBeginDate.text = [cert validityBeginDate];
    cell.lbValidityEndDate.text = [cert validityEndDate];



    [tableView setSeparatorInset:UIEdgeInsetsZero];




//    USCertListCell* cell = (USCertListCell *)[tableView dequeueReusableCellWithIdentifier:USCertListCellIdentifier];
//    if (cell == nil) {
//        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"USCertListCell" owner:self options:nil];
//
//        for (id oneObject in nib)
//            if ([oneObject isKindOfClass:[USCertListCell class]])
//                cell = (USCertListCell *)oneObject;
//    }
//
//    USCertificate *cert = (USCertificate *)[certs objectAtIndex:[indexPath row]];
//    cell.certPolicyLabel.text = cert.policyHumanReadableForm;
//    cell.certUserNameLabel.text = cert.commonName;
//    cell.certIssuerLabel.text = cert.organization;
//    cell.certEndDateLabel.text = cert.validityEndDate;
//    cell.certIconImageView.image = [UIImage imageNamed:cert.certImageName];

    return cell;
}

#pragma mark Table Delegate Methods
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {

    USError *error = nil;
    USToolkitMgr *toolkitMgr = [USToolkitMgr getInstance:&error];

    USCertificate *cert = (USCertificate *)[certs objectAtIndex:[indexPath row]];

    NSString    *password = @"avirexu12@";

    BOOL ret = [toolkitMgr isCorrectCert:cert password:password error:&error];

    NSLog(@"‼️인증서 내보내기전 비밀번호 확인");

    if(NO == ret)
    {
        NSLog(@"비밀번호가 잘못되었습니다.");
        return ;
    }
    else
    {
        NSLog(@"올바른 비밀번호");
        [self performSegueWithIdentifier:@"goToMoveCertFromCertList" sender:nil];
    }




    //NSLog(@"didSelectRowAtIndexPath : %@",indexPath);
//    if (kUSServiceOptionExportByOllehCertificate == [self getServiceOption]) {
//        [self handleExportKTCert:[indexPath row]];
//        return;
//    }
//
//    USDefaultViewController *childController = nil;
//
//    switch ([self getServiceType]) {
//        case kUSServiceManage:
//            childController = [[USCertInfoViewController alloc] initWithNibName:@"USCertInfoViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        case kUSServiceExport:
//            if(kUSServiceOptionExportByOllehCertificate == _serviceOption) {
//                [self handleExportKTCert:[indexPath row]];
//                return;
//            } else {
//                childController = [[USExportPwdViewController alloc] initWithNibName:@"USExportPwdViewController" bundle:nil];
//                [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            }
//            break;
//        case kUSServiceRenew:
//            childController = [[USRenewPwdViewController alloc] initWithNibName:@"USRenewPwdViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        case kUSServiceDisuse:
//            childController = [[USRemovePwdViewController alloc] initWithNibName:@"USRemovePwdViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        case kUSServiceESign:
//            childController = [[USSignPwdViewController alloc] initWithNibName:@"USSignPwdViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        case kUSServiceEtax:
//            NSLog(@"USCertListViewController kuSserviceEtax");
//            childController = [[USSignPwdViewController alloc] initWithNibName:@"USSignPwdViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        case kUSServiceVidr:
//            childController = [[USSignPwdViewController alloc] initWithNibName:@"USSignPwdViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        case kUSServiceBackupLoad:
//            childController = [[USBackupSelectCertViewController alloc] initWithNibName:@"USBackupSelectCertViewController" bundle:nil];
//            [childController setServiceType:_serviceType serviceOption:_serviceOption];
//            break;
//        default:
//            childController = [[USCertInfoViewController alloc] initWithNibName:@"USCertInfoViewController" bundle:nil];
//            [childController setServiceType:kUSServiceManage serviceOption:kUSServiceOptionDefault];
//            break;
//    }
//
//    if(nil != childController) {
//        [childController setCertificate:[certs objectAtIndex:[indexPath row]]];
//
//        [self.navigationController pushViewController:childController animated:YES];
//        [childController release];
//    }
}

- (void)scrollViewDidScroll:(UIScrollView *)aScrollView {

}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)aScrollView {

}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([[segue identifier] isEqualToString:@"goToMoveCertFromCertList"])
    {
        MoveCert *moveCert = [segue destinationViewController];
        moveCert.moveType = 1;

    }
    
}



@end
