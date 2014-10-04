var app = angular.module("Rednecks", ["ionic", "ngRoute"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: "views/tabs.html"
      })
      .state('tabs.home', {
          url: "/home",
          views: {
              'home-tab': {
                  templateUrl: "views/tabs.home.html",
                  controller: 'HomeController'
              }
          }
      })
    .state('tabs.upload', {
        url: "/upload",
        views: {
            'home-tab': {
                templateUrl: "views/tabs.upload.html",
                controller: 'UploadController'
            }
        }
    })
     .state('tabs.gallery', {
         url: "/gallery",
         views: {
             'gallery-tab': {
                 templateUrl: "views/tabs.gallery.html",
                 controller: 'GalleryController'
             }
         }
     })
    .state('tabs.settings', {
        url: "/settings",
        views: {
            'settings-tab': {
                templateUrl: "views/tabs.settings.html",
                controller: 'HomeController'
            }
        }
    })
      .state('tabs.details', {
          url: "/details/:selectedLicense",
          views: {
              'gallery-tab': {
                  templateUrl: "views/tabs.details.html",
                  controller: 'ProfileController'
              }
          }
      });

    $urlRouterProvider.otherwise("/tab/home");
});

everliveImages.init('EgXwDq7GEgueXESK');

//var el = new Everlive('EgXwDq7GEgueXESK');

//var pushSettings = {
//    iOS: {
//        badge: true,
//        sound: true,
//        alert: true
//    },
//    notificationCallbackIOS: function (e) {
//        //logic for handling push in iOS
//    },
//    notificationCallbackAndroid: function (e) {
//        //logic for handling push in Android
//    }
//};

//var enablePushNotifications = function () {

//    var currentDevice = el.push.currentDevice(false);

//    // Allow the notifications and obtain a token for the device from 
//    // Apple Push Notification service, Google Cloud Messaging for Android, WPNS, etc.
//    // Relies on the register() method of the PhoneGap PushPlugin
//    currentDevice.enableNotifications(pushSettings)
//        .then(
//            function (initResult) {
//                // notifications were initialized successfully and a token is obtained
//                alert(JSON.stringify(initResult));
//                // verify the registration in Backend Services
//                return currentDevice.getRegistration();
//            },
//            function (err) {
//                // notifications cannot be initialized
//                alert(JSON.stringify(err));
//            }
//        ).then(
//            function (registration) {
//                // currentDevice.getRegistration() tried to obtain the registration from the backend and it exists

//                // we may want to update the device's registration in Backend Services
//                currentDevice
//                    .updateRegistration(customParameters)
//                    .then(function () {
//                        // the registration was successfully updated
//                    }, function (err) {
//                        // failed to update the registration
//                        alert("fail");
//                    });
//            },
//            function (err) {
//                if (err.code === 801) {
//                    // currentDevice.getRegistration() returned an error 801 - there is no such device

//                    //we need to register the device
//                    currentDevice.register(customParameters)
//                        .then(function (regData) {
//                            // the device was successfully registered
//                        }, function (err) {
//                            // failed to register the device
//                        });
//                } else {
//                    // currentDevice.getRegistration() failed with another errorCode than 801
//                }
//            }
//        );
//};

//function initApplication() {
//    document.addEventListener('deviceready', function () {

//        //app.receivedEvent('deviceready');

//        enablePushNotifications();

//    }, false);
//}

//initApplication();


//function initPushwoosh() {

//    var pushNotification = window.plugins.pushNotification;

//    //set push notification callback before we initialize the plugin
//    document.addEventListener('push-notification', function (event) {
//        //get the notification payload
//        var notification = event.notification;

//        //display alert to the user for example
//        alert(notification.aps.alert);

//        //clear the app badge
//        pushNotification.setApplicationIconBadgeNumber(0);
//    });

//    //initialize the plugin
//    pushNotification.onDeviceReady({ pw_appid: "2177E-9794D" });

//    //register for pushes
//    pushNotification.registerDevice(
//        function (status) {
//            var deviceToken = status['deviceToken'];
//            console.warn('registerDevice: ' + deviceToken);
//        },
//        function (status) {
//            console.warn('failed to register : ' + JSON.stringify(status));
//            alert(JSON.stringify(['failed to register ', status]));
//        }
//    );

//    //reset badges on app start
//    pushNotification.setApplicationIconBadgeNumber(0);
//}

//function initApplication() {
//    document.addEventListener('deviceready', function () {

//        //app.receivedEvent('deviceready');

//        initPushwoosh();

//    }, false);
//}

//initApplication();
