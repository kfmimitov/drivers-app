app.controller("UploadController", [
    "$scope", "driversService", "$state", "$stateParams", "$ionicLoading",
    function ($scope, driversService, $state, $stateParams, $ionicLoading) {

        $scope.selectedPicture = "data:image/jpeg;base64," + driversService.getPhotoToUpload();
        $scope.invalidSearch = false;

        $scope.newDriver = {
            Title: "",
            LicensePlate: "",
            Picture: ""
        };

        $scope.origin = angular.copy($scope.newDriver);

        function reset() {
            $scope.newDriver = angular.copy($scope.origin);
        }
        
        $scope.onSavePhoto = function (driver) {

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
        };

        $scope.onCancelUpload = function(){
            $state.go("tabs.gallery");
        }    
    }]);