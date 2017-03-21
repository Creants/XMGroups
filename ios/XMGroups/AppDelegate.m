/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@import GoogleMaps;
@import GooglePlaces;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [GMSServices provideAPIKey:@"AIzaSyBDFzwDTJ3-C_AAaAB1fSjFw6viPPQ1Jas"];
  [GMSPlacesClient provideAPIKey:@"AIzaSyBDFzwDTJ3-C_AAaAB1fSjFw6viPPQ1Jas"];
  
  NSURL *jsCodeLocation;
//
//
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  NSString *serverIP = @"192.168.1.8";
  NSString *jsCodeUrlString = [NSString stringWithFormat:@"http://%@:8081/index.ios.bundle?platform=ios&dev=true", serverIP];
  NSString *jsBundleUrlString = [jsCodeUrlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  jsCodeLocation = [NSURL URLWithString:jsBundleUrlString];



  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"XMGroups"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
