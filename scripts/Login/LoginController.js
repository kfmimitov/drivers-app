(function () {
    var loginController = function ($scope, Users, $state, $ionicModal) {

        $scope.modalRegister = null;
        $scope.modalLogin = null;

        //check if the user is already logged in
        Users.getCurrentUser()
        .then(function (data) {
            if (data.result) {
                $state.go("tabs.gallery");
            }
        },
            function (error) {
                console.log(JSON.stringify(error));
            });

        $scope.registerWithFacebook = function () {

            Users.loginWithFacebook(function (response) {
                $state.go("tabs.gallery");
            }, function (error) {
                showLoginError(error.code);
                console.log(JSON.stringify(error));
            });
        }

        $scope.register = function (newUser) {
            Users.logoutUser();
            Users.registerWithEmail(newUser.Username,
                                                newUser.DisplayName,
                                                newUser.Email,
                                                newUser.Password,
                                                function (success) {

                                                    $scope.modalRegister.hide();
                                                    $state.go("tabs.gallery");

                                                }, function (error) {
                                                    
                                                    showLoginError(error.code);
                                                    console.log(JSON.stringify(error));
                                                    $scope.$apply();
                                                });
        }

        $scope.loginWithEmail = function (existingUser) {
            Users.loginWithEmail(existingUser.Username, existingUser.Password, function (success) {
                $scope.modalLogin.hide();
                $state.go("tabs.gallery");
            }, function (error) {
                showLoginError(error.code);
            });
        }

        function showLoginError(errorCode) {
            switch (errorCode) {
                case 207:
                    //wrong email
                    navigator.notification.alert("Въведеният емайл е невалиден. Моля, използвайте въведете валиден емайл.");
                    break;
                case 201:
                    //existing username
                    navigator.notification.alert("Въведеното потребителско име е вече регистрирано. Моля, използвайте друго потребителско име.");
                    break;
                case 205:
                    //existing username
                    navigator.notification.alert("Невалидно име или парола. Моля, опитайте отново.");
                    break;
                case 211:
                    //existing email
                    navigator.notification.alert("Въведеният емайл е вече регистриран. Моля, използвайте друг емайл.");
                    break;
            }
        }

        $ionicModal.fromTemplateUrl('views/Login/modal.register.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalRegister = modal;
        });

        $ionicModal.fromTemplateUrl('views/Login/modal.login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalLogin = modal;
        });

        $scope.$on('$destroy', function () {
            $scope.modalRegister.remove();
            $scope.modalLogin.remove();
        });
    }

    var app = angular.module("Rednecks");
    app.controller("LoginController", [
    "$scope", "Users", "$state", "$ionicModal", loginController]);
})();