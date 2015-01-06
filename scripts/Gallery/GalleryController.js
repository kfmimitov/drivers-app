(function(){

    var galleryController = function ($scope, Drivers, $state) {


        var ITEMS_TO_FETCH = 5;
        $scope.isFiltering = false;
        $scope.isSearching = false;
        $scope.searchState = "Търси";
        $scope.filterState = "Филтър";
        $scope.activeFilter = 'latest';

        function initializeView() {
            $scope.loadedItemsCount = ITEMS_TO_FETCH;
            $scope.hasMoreToLoad = true;
            $scope.searchingValue = "";

            loadLatestDrivers();
        }

        $scope.onRefresh = function (){
            if($scope.activeFilter === "latest")
            {
                loadLatestDrivers();
            }
            else
            {
                loadTopDrivers();
            }
        }

        $scope.setFilter = function() {
            $scope.isFiltering = !$scope.isFiltering;
            if($scope.isFiltering)
            {
                $scope.filterState = "Затвори";     
            }
            else
            {
                $scope.filterState = "Филтър";
            }
        };

        $scope.setSearch = function() {
            $scope.isSearching = !$scope.isSearching;
            if($scope.isSearching)
            {
                $scope.searchState = "Затвори";     
            }
            else
            {
                $scope.searchState = "Търси";
                loadLatestDrivers();
            }
        };

        $scope.setActiveFilter = function(type) {
            $scope.activeFilter = type;
            switch(type){
                case "latest":
                    loadLatestDrivers();
                    break;
                case "top":
                    loadTopDrivers();
                    break;
            }
        };

        $scope.isActiveFilter = function(type) {
            return type === $scope.activeFilter;
        };

        $scope.loadMoreDrivers = function () {

            Drivers.getLatestDrivers(ITEMS_TO_FETCH, $scope.loadedItemsCount).then(function (result) {
                if (result.length > 0) {
                    $scope.loadedDrivers.push.apply($scope.loadedDrivers, result);
                    $scope.loadedItemsCount += ITEMS_TO_FETCH;
                    $scope.$apply();
                    everliveImages.responsiveAll();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
                else {
                    $scope.hasMoreToLoad = false;
                    $scope.$apply();
                }
            });
        }

        $scope.searchDriver = function (licensePlate) {
            var validLicense = Drivers.returnValidLicensePlate(licensePlate);

            if (validLicense != "") {
                Drivers.getDriverByLicense(validLicense).then(function (result) {
                    $scope.loadedDrivers = result;
                    $scope.$apply();
                    everliveImages.responsiveAll();
                },
                function (error) {
                    console.log(JSON.stringify(error));
                });
            }
        }
        
        function loadLatestDrivers(){
            Drivers.getLatestDrivers(ITEMS_TO_FETCH).then(function (result) {
                $scope.loadedDrivers = result;
                $scope.$apply();
                everliveImages.responsiveAll();
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function loadTopDrivers(){
             Drivers.getTopDrivers(ITEMS_TO_FETCH).then(function (result) {
                    $scope.loadedDrivers = result;
                    $scope.$apply();
                    everliveImages.responsiveAll();
                    $scope.$broadcast('scroll.refreshComplete');
            });
        }

        initializeView();
    }

    var app = angular.module("Rednecks");
    app.controller("GalleryController", ["$scope", "Drivers", "$state", galleryController]);
})();