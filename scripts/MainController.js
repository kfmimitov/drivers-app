app.controller("MainController", [
    "$scope", "driversService", "$location", "$anchorScroll",
    function ($scope, driversService, $location, $anchorScroll) {
        $scope.tasks = [
               { title: 'Collect coins' },
               { title: 'Eat mushrooms' },
               { title: 'Get high enough to grab the flag' },
               { title: 'Find the Princess' }
        ];

        function initialization() {

            $scope.registration = "CA7670PT";

        }

        $scope.onSearchUserClick = function () {

            var licenseSearch = driversService.returnValidLicensePlate($scope.registration);

            if (licenseSearch != '') {
                $scope.invalidSearch = false;
                $location.path("/driver/" + licenseSearch);
            }
            else {
                $scope.invalidSearch = true;
            }
        }

        initialization();
    }]);