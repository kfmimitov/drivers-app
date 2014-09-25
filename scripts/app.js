var app = angular.module("Rednecks", ["ionic","ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/Drivers.html",
            controller: "MainController"
        })
        .when("/driver/:licensePlate",{
            templateUrl: "views/Profile.html",
            controller: "ProfileController"
        })
        .otherwise({ redirectTo: "/" });
});

app.run(function ($rootScope, $location, $anchorScroll, $routeParams) {
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
    });
});