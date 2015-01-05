(function () {
    var loginController = function ($scope, driversService, $state, $ionicModal) {

        $scope.modal = null;

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
            $scope.modal.show();
        }

        $scope.register = function (newUser) {
            driversService.logoutUser();
            driversService.registerWithEmail(newUser.Username,
                                                newUser.DisplayName,
                                                newUser.Email,
                                                newUser.Password,
                                                function (success) {

                                                    $scope.modal.hide();
                                                    $state.go("tabs.gallery");

                                                }, function (error) {

                                                    alert(JSON.stringify(error));
                                                    switch (error.code) {
                                                        case 207:
                                                            $scope.wrongEmail = true;
                                                            break;
                                                        case 201:
                                                            $scope.existingUsername = true;
                                                            break;
                                                        case 211:
                                                            $scope.existingEmail = true;
                                                            break;
                                                    }
                                                    $scope.$apply();
                                                });
        }

        $scope.loginWithEmail = function () {

        }

        $ionicModal.fromTemplateUrl('views/Login/modal.register.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
    }

    var app = angular.module("Rednecks");
    app.controller("LoginController", [
    "$scope", "driversService", "$state", "$ionicModal", loginController]);
})();