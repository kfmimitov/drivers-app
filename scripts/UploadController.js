app.controller("UploadController", [
    "$scope", "driversService", "$state", "$stateParams",
    function ($scope, driversService, $state, $stateParams) {

        $scope.selectedPicture = "data:image/jpeg;base64," + driversService.getPhotoToUpload();

        $scope.newDriver = {
            Title: "",
            LicensePlate: "",
            Picture: ""
        };

        $scope.onSavePhoto = function (driver) {
            var imageData = driversService.getPhotoToUpload();

            //driversService.uploadBase64File(imageData).then(function (result) {
            //    driver.Picture = result;

            //    driversService.data().create(driver, function (success) {
            //        alert("Yes");
            //    });
            //});
        };
    }]);