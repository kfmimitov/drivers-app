(function(){
   var notificationsController = function($scope, driversService, $state) {

        $scope.showDeleteButtons = false;
        $scope.subscribedLicenses = [];
        $scope.isValidLicense = true;

        $scope.showDeleteButtonsClicked = function () {
            if ($scope.showDeleteButtons) {
                $scope.showDeleteButtons = false;
            }
            else {
                $scope.showDeleteButtons = true;
            }
            $scope.$apply();
        }

        $scope.onSaveLicense = function (newLicense) {

            var newLicensePlate = driversService.returnValidLicensePlate(newLicense);
            if (newLicensePlate != "") {
                $scope.subscribedLicenses.push(newLicensePlate);
                $scope.$apply();
                var currentDevice = el.push.currentDevice();

                var customParameters = {
                    "LicensePlate": $scope.subscribedLicenses
                };

                currentDevice.updateRegistration(customParameters)
                              .then(function () {
                                  // the registration was successfully updated
                                  alert(newLicensePlate + " е успешно добавен в радара.");
                                  
                                  $state.go("tabs.notifications");
                                  $scope.isValidLicense = true;
                              }, function (error) {
                                  // failed to update the registration
                                  alert(JSON.stringify(error));
                              });
            }
            else {
                $scope.isValidLicense = false;
                $scope.$apply();
            }
           
        }

        $scope.removeLicense = function (index) {
            $scope.subscribedLicenses.splice(index, 1);
            $scope.$apply();
            
            var currentDevice = el.push.currentDevice();

            var customParameters = {
                "LicensePlate": $scope.subscribedLicenses
            };

            currentDevice.updateRegistration(customParameters)
                          .then(function () {
                              // the registration was successfully updated
                          }, function (error) {
                              // failed to update the registration
                              console(JSON.stringify(error));
                          });
        }

        //checking for push notifications
        var el = new Everlive('EgXwDq7GEgueXESK');
        function enablePushNotifications() {

            var pushSettings = {
                iOS: {
                    badge: true,
                    sound: true, 
                    alert: true
                },
                notificationCallbackIOS: function (e) {
                    //logic for handling push in iOS

                    if (e.foreground == 0) {
                       var params = { "incidentId" : e.customData};
                       $state.go("tabs.incident", params);
                    }
                    else {
                        alert(e.alert);
                    }
                },
                notificationCallbackAndroid: function (e) {
                    //logic for handling push in Android
                }
            };

            var currentDevice = el.push.currentDevice();

            // Allow the notifications and obtain a token for the device from 
            // Apple Push Notification service, Google Cloud Messaging for Android, WPNS, etc.
            // Relies on the register() method of the PhoneGap PushPlugin
            currentDevice.enableNotifications(pushSettings)
                .then(
                    function (initResult) {
                        // notifications were initialized successfully and a token is obtained
                        // verify the registration in Backend Services
                        return currentDevice.getRegistration();
                    },
                    function (err) {
                        // notifications cannot be initialized
                        console.log(JSON.stringify(err));
                    }
                ).then(
                    function (registration) {
                        //all good
                       
                        if (registration.result.Parameters.LicensePlate != undefined)
                        {
                            $scope.subscribedLicenses = registration.result.Parameters.LicensePlate;
                            $scope.$apply();
                        }
                    },
                    function (err) {
                        if (err.code === 801) {

                            // currentDevice.getRegistration() returned an error 801 - there is no such device
                            currentDevice.register()
                                .then(function (regData) {
                                    console.log("the device is registered for push");
                                }, function (err) {
                                    alert(JSOn.stringify(err));
                                });
                        } else {
                            // currentDevice.getRegistration() failed with another errorCode than 801
                            console.log(JSON.stringify(err));
                        }
                    }
                );
        };

        enablePushNotifications();
    }

    var app = angular.module("Rednecks");
    app.controller("NotificationsController", [
    "$scope", "driversService", "$state", notificationsController]);
})();

