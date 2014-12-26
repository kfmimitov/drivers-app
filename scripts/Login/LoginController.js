(function () {
    var loginController = function ($scope, driversService, $state) {

        //check if the user is already logged in
        driversService.getCurrentUser()
            .then(function (data) {
                    if (data.result) {
                        $state.go("tabs.gallery");
                    }
                },
                function (error) {
                    console.log(JSON.stringify(error));
                });

        $scope.registerWithFacebook = function () {

            driversService.loginWithFacebook(function (response) {
                $state.go("tabs.gallery");
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }

        $scope.registerWithEmail = function () {
            $state.go("register");
        }

        $scope.loginWithEmail = function () {

        }
    }

    var app = angular.module("Rednecks");
    app.controller("LoginController", [
    "$scope", "driversService", "$state", loginController]);
})();