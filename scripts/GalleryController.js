app.controller("GalleryController", [ "$scope", "driversService",
    function ($scope, driversService) {

        $scope.loadedItemsCount = 5;
        $scope.hasMoreToLoad = true;
        
        driversService.getLatestDrivers(5).then(function (result) {
            $scope.latestDrivers = result;
            $scope.$apply();
            
        });

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
    }]);