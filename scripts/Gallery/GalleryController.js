(function(){

    var galleryController = function ($scope, driversService, $state) {

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

            driversService.getLatestDrivers(ITEMS_TO_FETCH, $scope.loadedItemsCount).then(function (result) {
                everliveImages.responsiveAll();
                if (result.length > 0) {

                    $scope.loadedDrivers.push.apply($scope.loadedDrivers, result);
                    $scope.loadedItemsCount += ITEMS_TO_FETCH;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
                else {
                    $scope.hasMoreToLoad = false;
                    $scope.$apply();
                }
            });
        }

        $scope.searchDriver = function (licensePlate) {
            var validLicense = driversService.returnValidLicensePlate(licensePlate);

            if (validLicense != "") {
                driversService.getDriverByLicense(validLicense).then(function (result) {
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
            driversService.getLatestDrivers(ITEMS_TO_FETCH).then(function (result) {
                $scope.loadedDrivers = result;
                $scope.$apply();
                everliveImages.responsiveAll();
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function loadTopDrivers(){
             driversService.getTopDrivers(ITEMS_TO_FETCH).then(function (result) {
                    $scope.loadedDrivers = result;
                    $scope.$apply();
                    everliveImages.responsiveAll();
                    $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function enablePushNotifications() {

            var el = new Everlive('EgXwDq7GEgueXESK');
            var pushSettings = {
                iOS: {
                    badge: true,
                    sound: true, 
                    alert: true
                },
                notificationCallbackIOS: handlePushNotifications,
                notificationCallbackAndroid: handlePushNotifications
            };

            var currentDevice = el.push.currentDevice();

            // Allow the notifications and obtain a token for the device from 
            // Apple Push Notification service, Google Cloud Messaging for Android, WPNS, etc.
            // Relies on the register() method of the PhoneGap PushPlugin
            currentDevice.enableNotifications(pushSettings)
                .then(
                    function (initResult) {
                        // notifications were initialized successfully and a token is obtained
                        // verify the registration in Backend Services
                        return currentDevice.getRegistration();
                    },
                    function (err) {
                        // notifications cannot be initialized
                        console.log("Notifications cannot be initialized: " + JSON.stringify(err));
                    }
                ).then(
                    function (registration) {
                        //all good
                    },
                    function (err) {
                        if (err.code === 801) {

                            // currentDevice.getRegistration() returned an error 801 - there is no such device
                            currentDevice.register()
                                .then(function (regData) {
                                    console.log("the device is registered for push");
                                }, function (err) {
                                    alert(JSOn.stringify(err));
                                });
                        } else {
                            // currentDevice.getRegistration() failed with another errorCode than 801
                            console.log(JSON.stringify(err));
                        }
                    }
                );
        };

        function handlePushNotifications(payload)
        {
            if(typeof payload.IncidentId != "undefined" && payload.IncidentId != null)
            { 
                if (payload.foreground == 1) {
                    //alert(payload.alert);
                    navigator.notification.alert(payload.alert, function(){
                        $state.go("tabs.incident", { 
                            "incidentId" : payload.IncidentId
                        });
                    },"Съобщение от радара");
                } else {
                        $state.go("tabs.incident", { 
                            "incidentId" : payload.IncidentId
                        });
                }
            }
        }
        
        enablePushNotifications();
        initializeView();
    }

    var app = angular.module("Rednecks");
    app.controller("GalleryController", ["$scope", "driversService", "$state", galleryController]);
})();