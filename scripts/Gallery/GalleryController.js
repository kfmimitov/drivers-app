app.controller("GalleryController", ["$scope", "driversService",
    function ($scope, driversService) {

        var ITEMS_TO_FETCH = 10;

        function initializeView() {
            $scope.loadedItemsCount = ITEMS_TO_FETCH;
            $scope.hasMoreToLoad = true;
            $scope.searchingValue = "";

            driversService.getLatestDrivers(ITEMS_TO_FETCH).then(function (result) {
                $scope.latestDrivers = result;
                $scope.$apply();
                everliveImages.responsiveAll();
            });
        }

        $scope.loadMoreDrivers = function () {
            driversService.getLatestDrivers(ITEMS_TO_FETCH, $scope.loadedItemsCount).then(function (result) {
                if (result.length > 0) {

                    //merging the two arrays into one
                    $scope.latestDrivers.push.apply($scope.latestDrivers, result);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.loadedItemsCount += ITEMS_TO_FETCH;
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