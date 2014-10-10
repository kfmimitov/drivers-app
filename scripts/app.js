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

function initializeAnalytics(window) {

    var productId = "309e46bd12d343ada41a7c8766dbc150"; // App unique product key

    // Make analytics available via the window.analytics variable
    // Start analytics by calling window.analytics.Start()
    var analytics = g.analytics = g.analytics || {};
    analytics.Start = function () {
        // Handy shortcuts to the analytics api
        var factory = window.plugins.EqatecAnalytics.Factory;
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        // Create the monitor instance using the unique product key for Analytics
        var settings = factory.CreateSettings(productId);
        settings.LoggingInterface = factory.CreateTraceLogger();
        factory.CreateMonitorWithSettings(settings,
		  function () {
		      console.log("Monitor created");
		      // Start the monitor inside the success-callback
		      monitor.Start(function () {
		          console.log("Monitor started");
		      });
		  },
		  function (msg) {
		      console.log("Error creating monitor: " + msg);
		  });
    }
    analytics.Stop = function () {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    }
    analytics.Monitor = function () {
        return window.plugins.EqatecAnalytics.Monitor;
    }
}

function onDeviceReady() {
    StatusBar.overlaysWebView(true);
    window.analytics.Start();
}

function onPause() {
    window.analytics.Stop();
}
function onResume() {
    window.analytics.Start();
}

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
initializeAnalytics();