(function(){
    var cameraController = function($scope, Drivers,  $state) {

        function onCameraClick () {
            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: true
            });
        }

        function cameraSuccess(imageData) {

            Drivers.setPhotoToUpload(imageData);
            $state.go("tabs.upload-camera");
        }

        function cameraError(message) {
            console.log('Failed because: ' + message);
            $state.go("tabs.gallery");
        }

        onCameraClick();
    }

    var app = angular.module("Rednecks");
    app.controller("CameraController", [
    "$scope", "Drivers", "$state", cameraController]);
})();