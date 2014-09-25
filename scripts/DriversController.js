app.controller("DriversController", [ "$scope", "driversService",

    function ($scope, driversService) {

        driversService.getLatestDrivers(10).then(function (result) {
            $scope.latestDrivers = result;
            $scope.$apply();
        });

    }]);