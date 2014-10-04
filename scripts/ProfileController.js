app.controller("ProfileController", [
    "$scope", "driversService", "$state", "$stateParams",
    function ($scope, driversService, $state, $stateParams) {

        if ($stateParams.selectedLicense != undefined && $stateParams.selectedLicense != null) {
           
            driversService.getDriverByLicense($stateParams.selectedLicense).then(function (result) {
                $scope.driver = result[0];
                $scope.$apply();
                everliveImages.responsiveAll();
               
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
         
    }]);