app.controller("NotificationsController", [
    "$scope", "driversService",
    function ($scope, driversService) {

        var el = new Everlive('EgXwDq7GEgueXESK');

        var pushSettings = {
            iOS: {
                badge: true,
                sound: true,
                alert: true
            },
            notificationCallbackIOS: function (e) {
                //logic for handling push in iOS
            },
            notificationCallbackAndroid: function (e) {
                //logic for handling push in Android
            }
        };

        var enablePushNotifications = function () {

            var currentDevice = el.push.currentDevice(false);

            // Allow the notifications and obtain a token for the device from 
            // Apple Push Notification service, Google Cloud Messaging for Android, WPNS, etc.
            // Relies on the register() method of the PhoneGap PushPlugin
            currentDevice.enableNotifications(pushSettings)
                .then(
                    function (initResult) {
                        // notifications were initialized successfully and a token is obtained
                        alert(JSON.stringify(initResult));
                        // verify the registration in Backend Services
                        return currentDevice.getRegistration();
                    },
                    function (err) {
                        // notifications cannot be initialized
                        alert(JSON.stringify(err));
                    }
                ).then(
                    function (registration) {
                        // currentDevice.getRegistration() tried to obtain the registration from the backend and it exists

                        // we may want to update the device's registration in Backend Services
                        currentDevice
                            .updateRegistration(customParameters)
                            .then(function () {
                                // the registration was successfully updated
                            }, function (err) {
                                // failed to update the registration
                                alert("fail");
                            });
                    },
                    function (err) {
                        if (err.code === 801) {
                            // currentDevice.getRegistration() returned an error 801 - there is no such device

                            //we need to register the device
                            currentDevice.register(customParameters)
                                .then(function (regData) {
                                    // the device was successfully registered
                                }, function (err) {
                                    // failed to register the device
                                });
                        } else {
                            // currentDevice.getRegistration() failed with another errorCode than 801
                            console.log(JSON.stringify(err));
                        }
                    }
                );
        };
    }]);