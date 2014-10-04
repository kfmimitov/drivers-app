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
                  templateUrl: "views/Home/tabs.home.html",
                  controller: 'HomeController'
              }
          }
      })
    .state('tabs.upload', {
        url: "/upload",
        views: {
            'home-tab': {
                templateUrl: "views/Home/tabs.upload.html",
                controller: 'UploadController'
            }
        }
    })
     .state('tabs.gallery', {
         url: "/gallery",
         views: {
             'gallery-tab': {
                 templateUrl: "views/Gallery/tabs.gallery.html",
                 controller: 'GalleryController'
             }
         }
     })
      .state('tabs.incident', {
          url: "/incidents/:incidentId",
          views: {
              'gallery-tab': {
                  templateUrl: "views/Gallery/tabs.incident.html",
                  controller: 'IncidentController'
              }
          }
      })
    .state('tabs.appologize', {
        url: "/appologize/:incidentId",
        views: {
            'gallery-tab': {
                templateUrl: "views/Gallery/tabs.appologize.html",
                controller: 'IncidentController'
            }
        }
    })
    .state('tabs.notifications', {
        url: "/notifications",
        views: {
            'notifications-tab': {
                templateUrl: "views/Notifications/tabs.notifications.html",
                controller: 'NotificationsController'
            }
        }
    });

    $urlRouterProvider.otherwise("/tab/home");
});

everliveImages.init('EgXwDq7GEgueXESK');


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
