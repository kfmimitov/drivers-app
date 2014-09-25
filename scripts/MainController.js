app.controller("MainController", [
    "$scope", "driversService", "$location", "$anchorScroll",
    function ($scope, driversService, $location, $anchorScroll) {

        $scope.onCameraClick = function () {
            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });
        }

        function cameraSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function cameraError(message) {
            alert('Failed because: ' + message);
        }
    }]);