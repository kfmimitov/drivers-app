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
                  controller: 'HomeController'
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
    });

    $urlRouterProvider.otherwise("/tab/home");
});

app.run(function ($rootScope, $location, $anchorScroll, $routeParams) {
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
    });
});