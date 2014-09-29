app.controller("HomeController", [
    "$scope", "driversService", "$state",
    function ($scope, driversService,  $state) {
   
      
        $scope.onCameraClick = function () {
            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true
            });
        }

        $scope.onSelectPhotoClicked = function () {
            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true
            });
        }


        function cameraSuccess(imageData) {

            driversService.setPhotoToUpload(imageData);
            $state.go("tabs.upload");
        }

        function cameraError(message) {
            console.log('Failed because: ' + message);
        }
    }]);