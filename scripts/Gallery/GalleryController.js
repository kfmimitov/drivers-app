app.controller("GalleryController", ["$scope", "driversService",
    function ($scope, driversService) {

        function initializeView() {
            $scope.loadedItemsCount = 5;
            $scope.hasMoreToLoad = true;
            $scope.searchingValue = "";

            driversService.getLatestDrivers(5).then(function (result) {
                $scope.latestDrivers = result;
                $scope.$apply();
                everliveImages.responsiveAll();
            });
        }

        $scope.loadMoreDrivers = function () {
            driversService.getLatestDrivers(5, $scope.loadedItemsCount).then(function (result) {
                if (result.length > 0) {

                    //merging the two arrays into one
                    $scope.latestDrivers.push.apply($scope.latestDrivers, result);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.loadedItemsCount += 5;
                }
                else {
                    $scope.hasMoreToLoad = false;
                    $scope.$apply();
                }
                everliveImages.responsiveAll();
            });
        }

        $scope.searchDriver = function (licensePlate) {
            var validLicense = driversService.returnValidLicensePlate(licensePlate);

            if (validLicense != "") {
                driversService.getDriverByLicense(validLicense).then(function (result) {
                    $scope.latestDrivers = result;
                    $scope.$apply();
                    everliveImages.responsiveAll();
                },
                function (error) {
                    console.log(JSON.stringify(error));
                });
            }
        }

        initializeView();
    }]);