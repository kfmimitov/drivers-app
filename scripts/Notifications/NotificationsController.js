app.controller("NotificationsController", [
    "$scope", "driversService", "$state",
    function ($scope, driversService, $state) {

        $scope.showDeleteButtons = false;
        $scope.subscribedLicenses = [];
        $scope.isValidLicense = true;

        var el = new Everlive('EgXwDq7GEgueXESK');
        var currentDevice = el.push.currentDevice();

        //check if the app has existing targeted segments and load them
        currentDevice.getRegistration().then(function(registration){
            if (registration.result.Parameters.LicensePlate != undefined)
            {
                $scope.subscribedLicenses = registration.result.Parameters.LicensePlate;
                $scope.$apply();
            }
        },function(error){
                console.log(error);
        });


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
                $scope.subscribedLicenses.push(newLicense);
                $scope.$apply();
                var currentDevice = el.push.currentDevice();

                var customParameters = {
                    "LicensePlate": $scope.subscribedLicenses
                };

                currentDevice.updateRegistration(customParameters)
                              .then(function () {
                                  // the registration was successfully updated
                                  alert(newLicense + " е успешно добавен в радара.");
                                  
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

            var customParameters = {
                "LicensePlate": $scope.subscribedLicenses
            };

            currentDevice.updateRegistration(customParameters)
                          .then(function () {
                              // the registration was successfully updated
                          }, function (error) {
                              // failed to update the registration
                              alert(JSON.stringify(error));
                          });
        }
    }]);