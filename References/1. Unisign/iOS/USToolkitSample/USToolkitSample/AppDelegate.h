//
//  AppDelegate.h
//  USToolkitSample
//
//  Created by jwchoi on 2016. 5. 25..
//  Copyright © 2016년 jwchoi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>
#import "USToolkitMgr.h"
#import "USListMgr.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

@property (readonly, strong, nonatomic) NSManagedObjectContext *managedObjectContext;
@property (readonly, strong, nonatomic) NSManagedObjectModel *managedObjectModel;
@property (readonly, strong, nonatomic) NSPersistentStoreCoordinator *persistentStoreCoordinator;

@property (strong, nonatomic) NSString *TOOLKIT_LICENSE;
@property (strong, nonatomic) NSString *CERTTRANSFER_LICENSE;
@property (strong, nonatomic) USCertificate *mCert;


- (void)saveContext;
- (NSURL *)applicationDocumentsDirectory;


@end

