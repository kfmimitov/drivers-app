app.controller("IncidentController", [
    "$scope", "driversService", "$state", "$stateParams",
    function ($scope, driversService, $state, $stateParams) {
       
        if ($stateParams.incidentId != undefined && $stateParams.incidentId != null) {
           
            driversService.getIncidentById($stateParams.incidentId).then(function (result) {
                if (result.length > 0) {
                    $scope.driver = result[0];
                    $scope.$apply();
                    everliveImages.responsiveAll();
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }]);