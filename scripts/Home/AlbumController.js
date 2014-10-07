app.controller("AlbumController", [
    "$scope", "driversService", "$state",
    function ($scope, driversService,  $state) {

        function onSelectPhotoClicked() {
            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true
            });
        }

        function cameraSuccess(imageData) {

            driversService.setPhotoToUpload(imageData);
            $state.go("tabs.upload-album");
        }

        function cameraError(message) {
            console.log('Failed because: ' + message);
            $state.go("tabs.gallery");
        }

        onSelectPhotoClicked();
    }]);