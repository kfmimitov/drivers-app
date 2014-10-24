(function(){
   var notificationsController = function($scope, driversService, $state) {

        $scope.showDeleteButtons = false;
        $scope.subscribedLicenses = [];
        $scope.isValidLicense = true;
        var el = new Everlive('EgXwDq7GEgueXESK');
        var _currentDevice = el.push.currentDevice();

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

                var customParameters = {
                    "LicensePlate": $scope.subscribedLicenses
                };

                _currentDevice.updateRegistration(customParameters)
                              .then(function () {
                                  // the registration was successfully updated

                                  navigator.notification.alert(newLicensePlate + " е успешно добавен в радара.", function(){
                                    $state.go("tabs.notifications");
                                    $scope.isValidLicense = true;
                                  },"Радар");
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

            var customParameters = {
                "LicensePlate": $scope.subscribedLicenses
            };

            _currentDevice.updateRegistration(customParameters)
                          .then(function () {
                              // the registration was successfully updated
                          }, function (error) {
                              // failed to update the registration
                              console.log(JSON.stringify(error));
                          });
        }

        function handlePushNotificationsIos(payload)
        {
            if(typeof payload.IncidentId != "undefined" && payload.IncidentId != null)
            { 
                if (payload.foreground == 1) {
                    //alert(payload.alert);
                    navigator.notification.alert(payload.alert, function(){
                        $state.go("tabs.incident", { 
                            "incidentId" : payload.IncidentId
                        });
                    },"Съобщение от радара");
                } else {
                        $state.go("tabs.incident", { 
                            "incidentId" : payload.IncidentId
                        });
                }
            }
        }
 
        function handlePushNotificationsAndroid(payload)
        {
            if(typeof payload.payload.IncidentId != "undefined" && payload.payload.IncidentId != null)
            { 
                if (payload.foreground == 1) {
                    //alert(payload.alert);
                    navigator.notification.alert(payload.payload.message, function(){
                        $state.go("tabs.incident", { 
                            "incidentId" : payload.payload.IncidentId
                        });
                    },payload.payload.title);
                } else {
                        $state.go("tabs.incident", { 
                            "incidentId" : payload.payload.IncidentId
                        });
                }
            }
        }

        function enablePushNotifications() {

            var pushSettings = {
                iOS: {
                    badge: true,
                    sound: true, 
                    alert: true
                },
                android:{
                    senderID: '203821457130'
                },
                notificationCallbackIOS: handlePushNotificationsIos,
                notificationCallbackAndroid: handlePushNotificationsAndroid
            };
            
            // Allow the notifications and obtain a token for the device from 
            // Apple Push Notification service, Google Cloud Messaging for Android, WPNS, etc.
            // Relies on the register() method of the PhoneGap PushPlugin
            _currentDevice.enableNotifications(pushSettings)
                .then(
                    function (initResult) {
                        // notifications were initialized successfully and a token is obtained
                        // verify the registration in Backend Services
                        return _currentDevice.getRegistration();
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
                            _currentDevice.register()
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

