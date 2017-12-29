//
//  SampleMain.m
//  USToolkitSample
//
//  Created by jwchoi on 2016. 5. 25..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#import "SampleMain.h"
#import "MoveCert.h"
#import "USUtil.h"
#import "UST_Type.h"

@interface SampleMain ()

@property (strong, nonatomic) USToolkitMgr *toolkitMgr;
@property int moveType;
@end

@implementation SampleMain

NSString *mSignedData;

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    self.app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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

#pragma mark  action
- (IBAction)actionLincenseInfo:(id)sender {
    USError *error = nil;
    NSString    *licenseInfo = [USToolkitMgr API_GetLibLicenseInfo:&error];
    NSLog(@"licenseInfo : %@", licenseInfo);

    [self showAlert:@"licenseinfo" message:[NSString stringWithFormat:@"Please send the information to some authorized people who can issue license(s). licenseInfo : %@", licenseInfo]];
}

- (IBAction)actionInitToolkit:(id)sender {
    USError *error;
    [USToolkitMgr setLicense:self.app.TOOLKIT_LICENSE];
//    [USToolkitMgr getInstance:&error];

    if(error != nil)
    {
        NSLog(@"USToolkitMgr getInstance ERROR : %ld, %@", (long)[error code], [error description]);

        [self showAlert:@"actionInitToolkit" message:[NSString stringWithFormat:@"Initialization falied : %ld, %@", (long)[error code], [error description]]];
        return;
    }
    self.toolkitMgr = [USToolkitMgr getInstance:&error];
    [self showAlert:@"actionInitToolkit" message:@"Initialization succeeded"];
}
- (IBAction)actionCertList:(id)sender {

    NSMutableString *message = [NSMutableString new];
    NSArray *certificates = [USListMgr UserCertificates];

    if([certificates count] == 0)
    {
        [self showAlert:@"actionCertList" message:@"Cannot find the list of certificates."];
        return;
    }
    
    for (int i = 0 ; i < [certificates count]; i++)
    {
        USCertificate *cert = [certificates objectAtIndex:i];
        [message appendString:[NSString stringWithFormat:@"%@%@",[cert commonName], @"\n"]];

        self.app.mCert = cert;
    }

    [self showAlert:@"actionCertList" message:message];
}
  
-(IBAction)actionCerInfo:(id)sender{


    NSLog(@"Cert DN : %@\n", [self.app.mCert subjectDN]);
    NSLog(@"Expiry Date : %@\n", [self.app.mCert validityPeriod]);
    NSLog(@"Cert Key Usage : %@\n", [self.app.mCert keyUsage]);

    USError *error;
    BOOL ret = [self.toolkitMgr CERT_VerifyCertificate:UST_CERT_VERIFY_CRL cert:[self.app.mCert dataForType:kUSSignCert] error:&error];
    NSLog(@"Cert verification : %@", ret?@"YES":@"NO");
    NSMutableString *info = [NSMutableString new];
    [info appendString:[NSString stringWithFormat:@"%@ : %@\n",@"Certificate validation: ", ret?@"Valid.":@"NOT Valid."]];
    [info appendString:[NSString stringWithFormat:@"%@ : %@\n",@"subjectDN", [self.app.mCert subjectDN]]];
    [info appendString:[NSString stringWithFormat:@"%@ : %@\n",@"validityPeriod", [self.app.mCert validityPeriod]]];
    [info appendString:[NSString stringWithFormat:@"%@ : %@\n",@"keyUsage", [self.app.mCert keyUsage]]];

    UIAlertController * alert=   [UIAlertController
                                  alertControllerWithTitle:@"Certificate information"
                                  message:info
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

- (IBAction)actionSaveCertInKeychain:(id)sender {
    NSLog(@"▶️actionSaveCertInKeychain");
    USError *error = nil;
    [USToolkitMgr setLicense:self.app.TOOLKIT_LICENSE];
    self.toolkitMgr = [USToolkitMgr getInstance:&error];

    if(self.toolkitMgr == nil)
    {
        NSLog(@"toolkit is nil");
        return;
    }


    //비번 88888888
    NSData* signCert = [NSData base64Decode:@"MIIFoDCCBIigAwIBAgICVrIwDQYJKoZIhvcNAQELBQAwUzELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRkwFwYDVQQDDBBDcm9zc0NlcnRUZXN0Q0EyMB4XDTEyMDcyNDA1MDkwMFoXDTEzMDcyNDE0NTk1OVowTDELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRIwEAYDVQQDDAlUZXN0IFBBTjEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAfDv7MTFvQ0q2QYirGBdajyM4H3n4kuTgCQABKXhaMT0SY/+zD8xn8lt0r0oreGuAqPmGwpFi5Rfmv1WPS8v9hX655Yg1S+59M/UriEi6PYESKdH6rhwZpP/V5OofNjgRUqxZunx6htTMKY9zleUuS1ymPsxjvylVttobfo0T8QKSNwPr9CcQXiMS+uTeQoF1uv4z5RZWVnpE3vtfzgRy+TQ5c9cToSua/XurSjMfn17Ze3+4fMfo3vGU/KxjBvIjS86CvPugjLTsyjFKVcG56l0EN11TZGBr5CABl/hUmqxbcpdkN066WJAwk/BsjWdgk3h6K0357f6VJv+Mm773AgMBAAGjggKDMIICfzCBkwYDVR0jBIGLMIGIgBQS095hufkygYNWNXfsuJrVX+HaLqFtpGswaTELMAkGA1UEBhMCS1IxDTALBgNVBAoMBEtJU0ExLjAsBgNVBAsMJUtvcmVhIENlcnRpZmljYXRpb24gQXV0aG9yaXR5IENlbnRyYWwxGzAZBgNVBAMMEktpc2EgVGVzdCBSb290Q0EgNYIBBDAdBgNVHQ4EFgQUhnGHncq5lMbTGjmdKbEJD0S/OHowDgYDVR0PAQH/BAQDAgbAMH8GA1UdIAEB/wR1MHMwcQYKKoMajJpEBQQBATBjMC0GCCsGAQUFBwIBFiFodHRwOi8vZ2NhLmNyb3NzY2VydC5jb20vY3BzLmh0bWwwMgYIKwYBBQUHAgIwJh4kx3QAIMd4yZ3BHLKUACDRTMKk0rgAIMd4yZ3BHMeFssiy5AAuMGgGA1UdEQRhMF+gXQYJKoMajJpECgEBoFAwTgwJVGVzdCBQQU4xMEEwPwYKKoMajJpECgEBATAxMAsGCWCGSAFlAwQCAaAiBCA0WxlTeulybnajQamWy843aKDAF36JkTCzteWwYldXZzCBgAYDVR0fBHkwdzB1oHOgcYZvbGRhcDovL3Rlc3RkaXIuY3Jvc3NjZXJ0LmNvbTozODkvY249czFkcDZwNSxvdT1jcmxkcCxvdT1BY2NyZWRpdGVkQ0Esbz1Dcm9zc0NlcnQsYz1LUj9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0MEoGCCsGAQUFBwEBBD4wPDA6BggrBgEFBQcwAYYuaHR0cDovL3Rlc3RvY3NwLmNyb3NzY2VydC5jb206MTQyMDMvT0NTUFNlcnZlcjANBgkqhkiG9w0BAQsFAAOCAQEAJG9PSINfSX/JyxngewoGesF/R3eEodmNtZBAfvV7Wdd/mzebEuZgDWcq+T86t/mmkFkMdMjQpyR02cMq5vLfi1y3oaWWc6vPd7pL3UC0AWh1M6G4rxjPy24tT0YhmPuzy/K5QSVVrRhBTTFPm32HNbf7q+hhuBSHZXRzwZEFW6xxVm12KpZGqdIxTBH7TmLly1Isg0vOC698huOKPgnkRLlOc+bTjXlEnlOGDkuNf5hx2OLL9vJPHTXXFhfijZadOuQc3E5lRIlME/fQRQZRf94j2kcrukt7N0raf2Wm499t7lGxLEw5EpIYKckZUvvcS1eB6mgpwsLIWZQDP7AR0g==" error:&error];
    NSData* signPrikey = [NSData base64Decode:@"MIIFEDAaBggqgxqMmkQBDzAOBAhcaeRLWp1aNQICBAAEggTwRh4cxB7WzeKSl3M4NPGrciOIwBappjVumZgcLQ4GtTMYvVZSufqxdVOgM5E/nNtw+wJvdXQYXwY+9ALItGSlbPFL3MeOMfbxRL3U8OTL4JYGrVjseLfHgz3GcGXZdsnPESoQhYJm4fsrVV1RcKMHqAf3BfTx+R6O3tNKJpauQACKBCjiwQtAf5B6vbEVnyHC8W+ROlvyfHSI30AvwZpGyBtSpHPn8pgPH4WLXcrypNqh3LL+P6zBYK3ef6JngihV8qY4wbjZZY6imrWQCz9r+sQ4nnwRuQF9M2VtGCvh9WOaItaBAmud53yinZGsVCV2oATu+PgXLkQQhJl5wusyU1HmnGd4+rf2GWtjB8fX8M+H6MWQA2PvO++OZ+iWlg5CyxRE2FDtS+7Ivql1sP8skCcr29pp5j+HTgTk6xqbsQqk0asMV3xFwpSR7jiVL73IE4WTn2HVb0jH/kEAXH1c4LB/mMmYltcqIdOUj7wFZs4vR1t5jym35s49jMnpGF/VLSkeS/iu/lLxdy4HWhwTx4ND6bFMa6OoNMjFJxXeGU81GGvLzbXBJ69cpAyD7XheNU8y4VfnHUrJys8azp+Qjr6ezEEKM/YjczgAflr8i3MePY7FEtWoteTKtajo3U1djt1IQP2i62AMKsCdmFz/9gHg6s4v1kxpJBsmHeSfQSff1ddh0MpkeVvF6QZFThpe3JCT0cUL4gcbrNEhmM3EYgLVzem3DrkmYn7bz6LSseAZuT/yXUyDP52rOK+6HhSN9yQx7yiYsXcOPQcAkHRVni6MkTG6vK3DVohkDmm/sILl3oQh5ki5Z+w2oK0YP0pgq83AsIOVjuH3FgDb8NzbHJwfFnz0MZOLCArexQC/6sii/EXcucPr3pdJL2NEGpZeQ/Qs2oH0xwGi4goXJf5m4fVmT5BO93J9EJq19YzwQQCbb7vg3FRPd14piX8s+4XJ8cmd1jZ7vhIcTtrTgLvGSbIap4hqGSxnlBSddB+CRhntgJqSuOV1XeYczIl1hrcbm1YOjthavBnUU8qp6DWmdxluYW7NWTG6SBMmZoRrWBI2S/ojfF0dVbEAYC0OOqNWzAvJz2RcZB3PVk96rNGgrTIY1C3/BpRfVhXTS4gY9+1Ypq3wkeDgLgwTFdB4SraxWIBmtr+CkcvvCMBEzUvT/rDcWvq53KEEdzMNcayoYUbmgIDvXq4B5+9o6hM5G7RqyizdRriuui0rbtU/wgnGJzTW3p2VYg5dINam6XAqXetLSN0Q9TiBDbtMF3bBPTuZmRGlymEjNxxtvqPrYY+eapdzKuagwpomtOSbGtQteTNPTEKpgQAkkqs2xLorpBpv/1sulaX1dv3rPlQYyoPC8PwmwMVuS5SMMp+xc6uJrAFV14hZSWg9mG+N6pmVb1Y4tl77p5dsjWY/1mmkjqiMoyhurVF8h4AV2RtLiIIp+1CzBleJkS+FWWn7E9njthIgy1UM0fhvoSRF1bRm8WZro5ivhEx2a4p1+X958MxM2BqHPigHjYku810o1GRw9Ix80iZJWsVHmC6dkVYz+syzwNPKkDfJhFhrzjiMY7AdrnIv1zva94pB1BV6AimbwyxaXBlZli5aLlpuuaB/Dn2thzDgyKG4tZifNB9lFJprhLuR9bfjYjrJl2Zwpwxbfr6vib8nET5sNUtysOAKRgdwqw==" error:&error];
    NSData* kmCert = [NSData base64Decode:@"MIIFoDCCBIigAwIBAgICVrMwDQYJKoZIhvcNAQELBQAwUzELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRkwFwYDVQQDDBBDcm9zc0NlcnRUZXN0Q0EyMB4XDTEyMDcyNDA1MDkwMFoXDTEzMDcyNDE0NTk1OVowTDELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRIwEAYDVQQDDAlUZXN0IFBBTjEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDKz8vk85JOg5umDgGr/rh1sA/I5G4DlcoboecCA8WM+Jo/eoBPQo6XxRFKQAOZpD1C3Sz0uKFTWJm8WCoCIDrhU8La9q98qwmtunw2g+zoFm6aayUVd3raSp8FDokQCSQGFPz+j8pbPS2kbdu3StVTjJ+q4WJEOX8fyidBTk0x3RO2tDvk5D0+XSJoixTlvaK8RcweQ1EJxj6Dfb6kHIBpHdRJAXRm9xYnBiMdpHRBDQuoRd0MXadcDwoeqWpo60wiGxaCp6CRn1qLEHlNS0e0DX1maBHLtU5IZ2X4119TNPkoVyIqWTCyUG3Vn1Bo5LBMhSSHPeUQ2u01FyKg+t1bAgMBAAGjggKDMIICfzCBkwYDVR0jBIGLMIGIgBQS095hufkygYNWNXfsuJrVX+HaLqFtpGswaTELMAkGA1UEBhMCS1IxDTALBgNVBAoMBEtJU0ExLjAsBgNVBAsMJUtvcmVhIENlcnRpZmljYXRpb24gQXV0aG9yaXR5IENlbnRyYWwxGzAZBgNVBAMMEktpc2EgVGVzdCBSb290Q0EgNYIBBDAdBgNVHQ4EFgQUYZ7asItYRbRsh2vRJYIOgcmP67UwDgYDVR0PAQH/BAQDAgUgMH8GA1UdIAEB/wR1MHMwcQYKKoMajJpEBQQBATBjMC0GCCsGAQUFBwIBFiFodHRwOi8vZ2NhLmNyb3NzY2VydC5jb20vY3BzLmh0bWwwMgYIKwYBBQUHAgIwJh4kx3QAIMd4yZ3BHLKUACDRTMKk0rgAIMd4yZ3BHMeFssiy5AAuMGgGA1UdEQRhMF+gXQYJKoMajJpECgEBoFAwTgwJVGVzdCBQQU4xMEEwPwYKKoMajJpECgEBATAxMAsGCWCGSAFlAwQCAaAiBCA0WxlTeulybnajQamWy843aKDAF36JkTCzteWwYldXZzCBgAYDVR0fBHkwdzB1oHOgcYZvbGRhcDovL3Rlc3RkaXIuY3Jvc3NjZXJ0LmNvbTozODkvY249czFkcDZwNSxvdT1jcmxkcCxvdT1BY2NyZWRpdGVkQ0Esbz1Dcm9zc0NlcnQsYz1LUj9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0MEoGCCsGAQUFBwEBBD4wPDA6BggrBgEFBQcwAYYuaHR0cDovL3Rlc3RvY3NwLmNyb3NzY2VydC5jb206MTQyMDMvT0NTUFNlcnZlcjANBgkqhkiG9w0BAQsFAAOCAQEAJHAdOXI4YqW1i1cRNmrY7ttpCp7MIPTSH4vYReikN1vE30ECvcAXbS0hx3j+j81xMNs3o85uaFZmgkMRJZqgP6zJYr1Ni0E8qnqAvIpisq/mt/0ZCzHgGTdVxSDmgPrhO7l3v3brKXfM5tata2/gYHLoVjMB6r5GHn6AMIxYlADGPfP/M8qq1a8TZUniJG8exMBfC24a1m9O6u8iGzIxsF2nLrBZRH5opO2IdhONdcQK+P5zX4W9er79twNTjDrhKvVjHndu7IGrClGaApTD+TyRYlO8uc4TOxCGPNnSGgxyazROBP7Z7yojymHAKLWqWQvR3/ldCLk8u4cMV8QNXQ==" error:&error];
    NSData* kmPrikey = [NSData base64Decode:@"MIIFEDAaBggqgxqMmkQBDzAOBAhQuFVOGIFMcQICBAAEggTwgLJl6pRcrfXuLOu50E1XTF+qMKQhrKZ98J2cNMNWvF5kCrqKwzRSk5+hxePkAetdDUFN2XR9lxWpzgx1YUph9rrdbz3y14VcxpZtDHasaEmsFmuoAJmAak8v6KpSm2+6M93+nBgZyR/ehj0KhBpv0ufuQUtKWApPQVdPkyfzSZIR7AJnwnq03VjAglwdv6whdzOT5iB0lncqAY1Re6N4OlvfuUWVmEzMsx7ubKuk/YqjtICXDF5h78WHlXe1eaOHJRw02LNLYBry7cozBjoDudhvNLu0fw19KiZ6nt1aqI+oPbd5olDYa80NHqVnAyOviMbHT/8axaZsUrFrR4tEEEvzacEigbhsFJci4aES9kQbBPuD67hsYI7RzuFiCUfBH4P/U2m9E5WBnqS5QUqRW1M5PSCX0xWh9tKlBCLE/eWdG7rDkj4Zgh4rPkg5E467WymEIynHJwenQyd+XHKM/+ZbGlom17llhzXAFpLqvKi3nBy+wYcUX22daO7aBkHIB4k1te2XEtQ7tElhlSYlpYvierE9AzRlMJGYCAl2hRVJhwX+frchCMixp+SQcZzK0UCdZhC7RGHac+oaiOeCCWljM1vcb7PiXi45y3WAa4BpkCe1FEDQ2A0MN9P80oGwKuYOyD230J/X4voWHxGhfAQSGQL3IMkU4wG3+BslUuhSVQaQBXp0zAea68bqVNj/zFoIlT4J5tJg0Ru7dnVb8JoUv2rSKfNVsT2dbnyLsFgtD2oW6DmftFoxNo3BcvbGxBbghx3p2Rzo5jBUVCpoQO/LhnOXZjsgL5b3qtvZ/4L0zWhDtvvgbRdZWY+me2CUnX5HhHXmPIzMpOXaQWA650bQLNj8PvTTJB8mkX2fiBJqxfsAmpbXUpDz3fssFImWsRG7C+DRwkmeT294SVEN3g31GOxV9rIT5K7TZ3JDHB0dlrdqtbd0r4bCJXlh+KPWd9qfuXG5JshI61KgiLi51MjkAjx1wPwHggAPLZnnc/YWSKdc794/gp6r+SROxACDBWxKjW9JzW8RBKuLSFXBcHgDNtO5/sdc6WgARm5Ez+BKg5jWtxpL8+DL+eUMRXWbAtMn9eTuVDtBk3g5/clFQuD4Q/aNPq3+gEb9pxkB71/TnQk3A/3HJwaYU6ulN3GLCeu1TkDkw4RAXmNNjBc98SjijCZz0DGlzU/zl81KfX/HjCx4fgj1XizFOwsUvbUsu85fIzaAyFYcY7Xeec+gp70HxJI47X0E9eaHz3Hxwk9pzpBiOYVviFBLc8b3QXQlnTTMLPTHdRbmAf3hvIM8HRNDwbR+U0ncCghWz91pm3aMSP+Zejc+BW1kUSq3dlfffiDNbloLVNXWIfLJdpJDEidIjy0vEgrMJ6BXPmwQhiwdGfauqMa6KuHvPBO9NLKjUMAghFl/RKwI+dUF7CHh7/KBYnztlHVoonuyxBroOlHC4E1EhxcsianMsuU7le8wcSQDCeh9Nhqi4x0SVxqXBpjT2Df6/MqQwJVIGB0KFHyZAANnkpwef7YspWXyfmfLU3blRRY5lZ5V20i56iR5AZZezkr0zLvfQeS3zkxjpmS2CkYHrn3MkeVOmuElf4yqcv+geD+VCU8SRR2uQHfBlHUJUq5IU/yB0KUQ41nD4yUmwsFMzIaZiBF67nkaF6jcde4jszeR2hSihZ2XnpcCNQ==" error:&error];

    USCertificate   *cert = [[USCertificate alloc] initWithSignCert:signCert signPrikey:signPrikey kmCert:kmCert kmPrikey:kmPrikey];
    [cert setToolkit:self.toolkitMgr];

    [USListMgr add:cert subjectDN:[cert subjectDN]];
    NSArray *arr = [USListMgr AllCertificates];
    NSLog(@"AllCertificates count : %ld",(unsigned long)[arr count]);
}


-(IBAction)actionRemoveCer:(id)sender{


    BOOL ret = [USListMgr remove:self.app.mCert subjectDN:[self.app.mCert subjectDN]];

    NSString *message = [NSString new];

    if(ret)
    {
        message = @"Certificate deletion succeeded";
    }
    else
    {
        message = @"Certificate deletion failed";
    }
    UIAlertController * alert=   [UIAlertController
                                  alertControllerWithTitle:@"Notice"
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

-(IBAction)actionGetRValue:(id)sender{

    USError *error = nil;
    USToolkitMgr    *toolkit = [USToolkitMgr getInstance:&error];

    NSData    *vidR = [toolkit CERT_GetVIDRandomWithPrikey:@"88888888" encPrikey:[self.app.mCert dataForType:kUSSignPrikey] error:&error];
    NSString    *vidRString = [NSString binToHexString:vidR error:&error];
    UIAlertController * alert=   [UIAlertController
                                  alertControllerWithTitle:@"Check your authority"
                                  message:vidRString
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

-(IBAction)actionChangePassword:(id)sender{

    NSString* oldPwd = @"88888888";
    NSString* newPwd = @"00000000";

    USError *error = nil;
    USToolkitMgr    *toolkit = [USToolkitMgr getInstance:&error];
    USCertificate   *cert = [toolkit logicChangeCert:self.app.mCert currentPassword:oldPwd newPassword:newPwd error:&error];

    NSString *msg;
    if(nil == error)
    {
        [USListMgr add:cert subjectDN:cert.subjectDN];
        msg = @"Password is successfully changed.";
    }
    else
    {
        msg = [NSString stringWithFormat:@"Password change failed.\n(%ld)", (long)[error code]];
    }
    [self showAlert:@"Password change" message:msg];
}

/**
 라온 시큐어 보안키패드 사용 하였을 경우에 사용되는 전자서명 함수
 */
- (IBAction)actionSignedDataForRaonsecure:(id)sender {
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    if(toolkit == nil)
    {
        NSLog(@"toolkit is nil");
        return;
    }

    if(self.app.mCert == nil)
    {
        NSLog(@"cert is nil");
        return;
    }

    NSData  *data = nil;

    // 원문
    NSString *test = @"test1234";
    data = [test dataUsingEncoding:NSUTF8StringEncoding];

    // 보안 키패드를 통해 입력 받은 암호화된 비밀번호
    NSString *password = @"1157ef2f4aa218a9be60819dae0b251e";

    NSData *retTest = [toolkit logicSignedDataWithClientCompany:self.app.mCert
                                                           data:data
                                                       password:password
                                              clientCompanyCode:0
                                                ranKeyForPBKDF2:@"acc4af609fad57f1cd87"
                                                          error:&error];

    NSString *testSignedData = [NSString base64Encode:retTest error:&error];

    [self showAlert:@"라온시큐어 PKCS#7 전자서명" message:[NSString stringWithFormat:@"%@", mSignedData]];
    NSLog(@"라온시큐어 전자서명 : %@",testSignedData);
}


- (IBAction)actionSignedData:(id)sender {
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    if(toolkit == nil)
    {
        NSLog(@"toolkit is nil");
        return;
    }

    if(self.app.mCert == nil)
    {
        NSLog(@"cert is nil");
        return;
    }

    NSData  *data = nil;

    NSString *test = @"test1234";
    data = [test dataUsingEncoding:NSUTF8StringEncoding];

//    NSString *password = @"88888888";
    NSString *password = @"12qwaszx";
    NSData *ret = [toolkit logicSignedData:self.app.mCert
                                      data:data
                                  password:password
                                     error:&error];

    mSignedData = [NSString base64Encode:ret error:&error];

    NSLog(@"PKCS#7 전자서명 : %@", mSignedData);
    [self showAlert:@"PKCS#7 전자서명" message:[NSString stringWithFormat:@"%@", mSignedData]];

}

- (IBAction)actionSignedDataVerify:(id)sender {
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    if(nil == toolkit) {
        NSLog(@"toolkit is nil");
        return;
    }

    if(nil == mSignedData) {
        NSLog(@"cert is nil");
        return;
    }

    NSData  *data = [NSData base64Decode:mSignedData error:&error];
    NSData  *ret = [toolkit CMS_VerifySignedData:data error:&error];
    NSString    *retString = [[NSString alloc] initWithData:ret encoding:NSUTF8StringEncoding];

    NSLog(@"verify p7 : %@", retString);
    [self showAlert:@"verify p7" message:[NSString stringWithFormat:@"%@", retString]];
}
/**
 @brief 
 PKCS#1서명
 */
- (IBAction)actionSignature:(id)sender {
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    if(toolkit == nil) {
        NSLog(@"toolkit is nil");
        return;
    }

    if(self.app.mCert == nil) {
        NSLog(@"cert is nil");
        return;
    }

    NSData  *data = nil;

    NSString    *test = @"test1234";
    data = [test dataUsingEncoding:NSUTF8StringEncoding];

    NSString    *password = @"88888888";

    // USC_ALG_SIGN_SHA1WithRSA_PKCS    : 1112
    // USC_ALG_SIGN_SHA256WithRSA_PSS   : 1123
    NSInteger   alg = USC_ALG_SIGN_SHA1WithRSA_PKCS;
    NSData  *ret = [toolkit logicSignature:self.app.mCert password:password data:data algorithm:alg error:&error];
    NSString *retString = [NSString base64Encode:ret error:&error];
    NSLog(@"signature : %@", retString);
}

- (IBAction)actionEnvelopedData:(id)sender {
    NSLog(@"actionEnvelopedData");

    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    if(toolkit == nil)
    {
        NSLog(@"toolkit is nil");
        return;
    }

    NSData  *data = nil;

    NSString    *test = @"test1234";
    data = [test dataUsingEncoding:NSUTF8StringEncoding];

     NSData* kmCert = [NSData base64Decode:@"MIIFoDCCBIigAwIBAgICVrMwDQYJKoZIhvcNAQELBQAwUzELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRkwFwYDVQQDDBBDcm9zc0NlcnRUZXN0Q0EyMB4XDTEyMDcyNDA1MDkwMFoXDTEzMDcyNDE0NTk1OVowTDELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRIwEAYDVQQDDAlUZXN0IFBBTjEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDKz8vk85JOg5umDgGr/rh1sA/I5G4DlcoboecCA8WM+Jo/eoBPQo6XxRFKQAOZpD1C3Sz0uKFTWJm8WCoCIDrhU8La9q98qwmtunw2g+zoFm6aayUVd3raSp8FDokQCSQGFPz+j8pbPS2kbdu3StVTjJ+q4WJEOX8fyidBTk0x3RO2tDvk5D0+XSJoixTlvaK8RcweQ1EJxj6Dfb6kHIBpHdRJAXRm9xYnBiMdpHRBDQuoRd0MXadcDwoeqWpo60wiGxaCp6CRn1qLEHlNS0e0DX1maBHLtU5IZ2X4119TNPkoVyIqWTCyUG3Vn1Bo5LBMhSSHPeUQ2u01FyKg+t1bAgMBAAGjggKDMIICfzCBkwYDVR0jBIGLMIGIgBQS095hufkygYNWNXfsuJrVX+HaLqFtpGswaTELMAkGA1UEBhMCS1IxDTALBgNVBAoMBEtJU0ExLjAsBgNVBAsMJUtvcmVhIENlcnRpZmljYXRpb24gQXV0aG9yaXR5IENlbnRyYWwxGzAZBgNVBAMMEktpc2EgVGVzdCBSb290Q0EgNYIBBDAdBgNVHQ4EFgQUYZ7asItYRbRsh2vRJYIOgcmP67UwDgYDVR0PAQH/BAQDAgUgMH8GA1UdIAEB/wR1MHMwcQYKKoMajJpEBQQBATBjMC0GCCsGAQUFBwIBFiFodHRwOi8vZ2NhLmNyb3NzY2VydC5jb20vY3BzLmh0bWwwMgYIKwYBBQUHAgIwJh4kx3QAIMd4yZ3BHLKUACDRTMKk0rgAIMd4yZ3BHMeFssiy5AAuMGgGA1UdEQRhMF+gXQYJKoMajJpECgEBoFAwTgwJVGVzdCBQQU4xMEEwPwYKKoMajJpECgEBATAxMAsGCWCGSAFlAwQCAaAiBCA0WxlTeulybnajQamWy843aKDAF36JkTCzteWwYldXZzCBgAYDVR0fBHkwdzB1oHOgcYZvbGRhcDovL3Rlc3RkaXIuY3Jvc3NjZXJ0LmNvbTozODkvY249czFkcDZwNSxvdT1jcmxkcCxvdT1BY2NyZWRpdGVkQ0Esbz1Dcm9zc0NlcnQsYz1LUj9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0MEoGCCsGAQUFBwEBBD4wPDA6BggrBgEFBQcwAYYuaHR0cDovL3Rlc3RvY3NwLmNyb3NzY2VydC5jb206MTQyMDMvT0NTUFNlcnZlcjANBgkqhkiG9w0BAQsFAAOCAQEAJHAdOXI4YqW1i1cRNmrY7ttpCp7MIPTSH4vYReikN1vE30ECvcAXbS0hx3j+j81xMNs3o85uaFZmgkMRJZqgP6zJYr1Ni0E8qnqAvIpisq/mt/0ZCzHgGTdVxSDmgPrhO7l3v3brKXfM5tata2/gYHLoVjMB6r5GHn6AMIxYlADGPfP/M8qq1a8TZUniJG8exMBfC24a1m9O6u8iGzIxsF2nLrBZRH5opO2IdhONdcQK+P5zX4W9er79twNTjDrhKvVjHndu7IGrClGaApTD+TyRYlO8uc4TOxCGPNnSGgxyazROBP7Z7yojymHAKLWqWQvR3/ldCLk8u4cMV8QNXQ==" error:&error];


    NSInteger   alg = USC_ALG_SYMMENC_SEED_CBC;
    NSData  *ret = [toolkit CMS_EnvelopedData:alg kmCert:kmCert inputData:data error:&error];
    NSString *retString = [NSString base64Encode:ret error:&error];
    NSLog(@"EnvelopedData : %@", retString);

}


- (IBAction)actionImportCert:(id)sender {
    self.moveType = 0;
}

- (IBAction)actionExportCert:(id)sender {
    self.moveType = 1;
}

- (IBAction)actionEnvelopByRSA:(id)sender {
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    NSData  *data = [@"data test" dataUsingEncoding:NSUTF8StringEncoding];

    NSString    *pubkeyString = [self.app.mCert publicKey];
    NSData  *pubkey = [NSData hexStringToBin:pubkeyString error:&error];

    NSData  *ret = [toolkit cryptRSA:USC_ALG_ASYMM_RSA1024 pubkey:pubkey data:data error:&error];

    NSLog(@"ret : %@", ret);

}
- (IBAction)actionEnvelopBySEED:(id)sender {
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];

    NSData  *data = [@"data test" dataUsingEncoding:NSUTF8StringEncoding];
    NSLog(@"data : %@", data);
    NSData  *key =  [toolkit CRYPT_GenerateRandom:16 error:&error];
    NSData  *iv = [toolkit CRYPT_GenerateRandom:16 error:&error];

    NSData  *resultEnc = [toolkit cryptSeed:data key:key iv:iv error:&error];

    NSLog(@"ret : %@", resultEnc);

    NSData  *resultDec = [toolkit decryptSeed:resultEnc key:key iv:iv error:&error];


    NSString *orign= [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    [self showAlert:@"SEED Encryption" message:[NSString stringWithFormat:@"Plaintext : data test\n Plaintext (HEX) : %@\nEncrypted : %@\nDecrypted : %@\nDecrypted Text : %@", data, resultEnc, resultDec, orign]];
}

- (IBAction)actionInitCertList:(id)sender {
    BOOL ret = [USListMgr clear];
    if(ret)
    {
        NSLog(@"all cert clear : success");
    }
    else {
        NSLog(@"all cert clear : fail");
    }

}
- (IBAction)actionVerifyVID:(id)sender {
    NSLog(@"▶️actionVerifyVID");
    USError *error = nil;
    USToolkitMgr *toolkit = [USToolkitMgr getInstance:&error];
    if(toolkit == nil)
    {
        [self showAlert:@"User validation" message:@"Toolkit has not been initialized."];
        return;
    }

    if(self.app.mCert == nil)
    {
        [self showAlert:@"User validation" message:@"No selected certificate."];
        return;
    }

    NSString *pw = @"avirexu12@";// 테스트 인증서 비밀번호
    NSData  *vidR = [toolkit CERT_GetVIDRandomWithPrikey:pw encPrikey:[self.app.mCert dataForType:kUSSignPrikey] error:&error];
    // 인증서 사용자 주민등록번호 또는 사업자 번호
    NSString *sID = @"3481820005096";// 테스트 인증서 주민번호

    BOOL    ret = [toolkit CERT_VerifyVID:[self.app.mCert dataForType:kUSSignCert] vidRandom:vidR socialNumber:sID error:&error];

    if(ret && nil == error)
    {
        [self showAlert:@"User validation" message:@"Succeeded."];
    }
    else
    {
        [self showAlert:@"User validation" message:[NSString stringWithFormat:@"Failed.\n(%ld)", (long)[error code]]];
    }

}



#pragma mark seque
- (IBAction)actionExitToSampleMain:(UIStoryboardSegue *)segue{
    NSLog(@"FidoSample> back from : %@", [segue.sourceViewController class]);


    if ([segue.sourceViewController isKindOfClass:[MoveCert class]])
    {
    }
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([[segue identifier] isEqualToString:@"goToMoveCert"])
    {
        MoveCert *moveCert = [segue destinationViewController];
        moveCert.moveType = self.moveType;

    }
    
}

@end
