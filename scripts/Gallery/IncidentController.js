(function(){
    var incidentController = function ($scope, Drivers, $state, $stateParams, $ionicLoading) {

        if (typeof $stateParams.incidentId != "undefined" && $stateParams.incidentId != null) {

            Drivers.getIncidentById($stateParams.incidentId).then(function (result) {
                if (result.length > 0) {
                    $scope.driver = result[0];
                    $scope.$apply();
                    everliveImages.responsiveAll();
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }

        $scope.appologize = function (incidentId, appologyText) {
            $ionicLoading.show({
                template: 'Изпращане...'
            });

            Drivers.data().updateSingle({ Id: incidentId, 'AppologyText': appologyText, "HasAppology" : true },
                    function (data) {
                        $ionicLoading.hide();
                        $state.go("tabs.gallery");
                    },
                    function (error) {
                        console.log(JSON.stringify(error));
                    });
        }
    }

    var app = angular.module("Rednecks");
    app.controller("IncidentController", [
    "$scope", "Drivers", "$state", "$stateParams", "$ionicLoading", incidentController]);
})();