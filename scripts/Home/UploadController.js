(function(){
    var uploadController = function($scope, driversService, $state, $stateParams, $ionicLoading, $ionicModal, $http) {

        $scope.selectedPicture = "data:image/jpeg;base64," + driversService.getPhotoToUpload();
        $scope.invalidSearch = false;
        $scope.modal = null;

        $scope.newDriver = {
            Title: "",
            LicensePlate: "",
            Picture: "",
            Location : {},
            Address : ""
        };

        $scope.origin = angular.copy($scope.newDriver);

        function reset() {
            $scope.newDriver = angular.copy($scope.origin);
        }
        
        $scope.onSavePhoto = function(driver, reportKat) {

            if(reportKat){
                getAddressFromGeopoint($scope.newDriver.Location, function(data) {
                    $scope.newDriver.Address = data.results[0].formatted_address;
                    $scope.modal.show();
                },function (error){
                     $scope.modal.show();
                });
            }
            else
            {
                 uploadPhoto(driver);
            }
        }

        $scope.onConfirmAddress = function(driver){
            $scope.modal.hide();
            uploadPhoto(driver);
        }


        $scope.onCancelUpload = function(){
            $state.go("tabs.gallery");

        }

        function uploadPhoto(driver){
            var formattedLicense = driversService.returnValidLicensePlate(driver.LicensePlate);
            if (formattedLicense != "") {
                $ionicLoading.show({
                    template: 'Изпращане...'
                });

                driver.LicensePlate = formattedLicense;
                $scope.invalidSearch = false;

                var imageData = driversService.getPhotoToUpload();

                driversService.uploadBase64File(imageData, function (data) {
                    driver.Picture = data.result.Id;

                    driversService.data().create(driver, function (success) {
                        reset();
                        $ionicLoading.hide();
                        $state.go("tabs.gallery", {}, { reload: true });
                    });
                },
                function (error) {
                    alert(JSON.stringify(error));
                });
            }
            else {
                $scope.invalidSearch = true;
            }
        }

        function getCurrentLocation(){
            navigator.geolocation.getCurrentPosition(function (position){
                
                $scope.newDriver.Location = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                };

            });
        }

        $ionicModal.fromTemplateUrl('views/Home/modal.address.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) { 
            $scope.modal = modal;
        });

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        function getAddressFromGeopoint(location, onSuccess, onError){

            var urlToGoogle = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.latitude + "," + location.longitude + "&language=bg";

            $http({method: 'GET', url: urlToGoogle}).
                  success(onSuccess).
                  error(onError);
        }

        getCurrentLocation();
    }

    var app = angular.module("Rednecks");
    
    app.controller("UploadController", [
    "$scope", "driversService", "$state", "$stateParams", "$ionicLoading", "$ionicModal", "$http", uploadController]);
})();