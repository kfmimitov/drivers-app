var app = angular.module("Rednecks", ["ionic"]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
       // if (window.cordova && window.cordova.plugins.Keyboard) {
         //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //}
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // override a few defaults of the native transitions plugin
        //window.plugins.nativepagetransitions.globalOptions.duration = 500;
        //window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 10;
        //window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 64;
        //window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 48;
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
          url: "/login",
          controller: "LoginController",
          templateUrl: "views/Login/login.html"
      })
      .state('tabs', {
          url: "/tabs",
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

    $urlRouterProvider.otherwise("/login");
});

everliveImages.init('EgXwDq7GEgueXESK');

function initializeAnalytics(window) {

    var productId = "309e46bd12d343ada41a7c8766dbc150"; // App unique product key

    // Make analytics available via the window.analytics variable
    // Start analytics by calling window.analytics.Start()
    var analytics = window.analytics = window.analytics || {};
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
    // existing code goes here
}
function onResume() {
    window.analytics.Start();
    // existing code goes here
}

initializeAnalytics(window);
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);