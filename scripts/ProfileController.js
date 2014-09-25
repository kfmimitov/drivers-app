app.controller("ProfileController", [
    "$scope", "driversService", "$location", "$anchorScroll", "$routeParams",
    function ($scope, driversService, $location, $anchorScroll, $routeParams) {

        function initialization() {
            $scope.newDriver = {
                Title: "",
                LicensePlate: "",
                UploadedPictures: []
            };

            $scope.licensePlate = $routeParams.licensePlate;

            driversService.data().count({ 'LicensePlate': $scope.licensePlate },
                    function (data) {

                        if (data.result > 0) {
                            $scope.isFound = true;
                            driversService.getDriversByLicense($scope.licensePlate).then(function (result) {

                                $scope.drivers = result;
                                $scope.$apply();
                            });
                        }
                        else {
                            $scope.isFound = false;
                        }
                        $scope.newDriver.LicensePlate = $scope.licensePlate;
                        $scope.$apply();
                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });

            $scope.scrollTo("focus");
        }

        $scope.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        };

        $scope.onUploadCompleted = function (e) {
            $scope.newDriver.UploadedPictures.push(e.response.Result[0].Id);
        };

        $scope.onNewDriverSubmit = function (newDriver) {

            var newArray = [];
            var newItem = { Title: "", LicensePlate: "", Picture: "" };

            for (var i = 0; i < newDriver.UploadedPictures.length; i++) {
                newItem.Title = newDriver.Title;
                newItem.LicensePlate = newDriver.LicensePlate;
                newItem.Picture = newDriver.UploadedPictures[i];
                newArray.push(newItem);
            }

            driversService.data().create(newArray, function (success) {
                driversService.getDriversByLicense(newDriver.LicensePlate).then(function (result) {
                    $scope.drivers = result;
                    $scope.isFound = true;
                    $scope.$apply();
                    $scope.scrollTo("focus");
                });

            }, function (error) {

                alert("Проблем при изпращането на файловете, моля опитайте отново!");
                console.log(error);
            });
        };

        initialization();
    }]);