var app = angular.module("Rednecks", ["ionic", "ngRoute"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: "views/tabs.html"
      })
      .state('tabs.camera', {
          url: "/camera",
          views: {
              'camera-tab': {
                  templateUrl: "views/Home/tabs.camera.html",
                  controller: 'CameraController'
              }
          }
      })
      .state('tabs.album', {
          url: "/album",
          views: {
              'album-tab': {
                  templateUrl: "views/Home/tabs.album.html",
                  controller: 'AlbumController'
              }
          }
      })
    .state('tabs.upload-camera', {
        url: "/upload-camera",
        views: {
            'camera-tab': {
                templateUrl: "views/Home/tabs.upload.html",
                controller: 'UploadController'
            }
        }
    })
     .state('tabs.upload-album', {
        url: "/upload-album",
        views: {
            'album-tab': {
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

    $urlRouterProvider.otherwise("/tab/gallery");
});

everliveImages.init('EgXwDq7GEgueXESK');


function onDeviceReady() {
    StatusBar.overlaysWebView(true);
}

document.addEventListener("deviceready", onDeviceReady, false);