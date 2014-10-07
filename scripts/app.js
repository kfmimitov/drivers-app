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
    })
     .state('tabs.trackLicense', {
         url: "/track-license",
         views: {
             'notifications-tab': {
                 templateUrl: "views/Notifications/tabs.trackLicense.html",
                 controller: 'NotificationsController'
             }
         }
     });

    $urlRouterProvider.otherwise("/tab/home");
});

everliveImages.init('EgXwDq7GEgueXESK');

function onDeviceReady() {
    //ionic.Platform.fullScreen();
    StatusBar.overlaysWebView( true );
    //StatusBar.backgroundColorByName("red");
}

document.addEventListener("deviceready", onDeviceReady, false);