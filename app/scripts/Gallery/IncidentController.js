(function () {
    var incidentController = function ($scope, Drivers, Users, $state, $stateParams, $ionicLoading) {


        if (typeof $stateParams.incidentId != "undefined" && $stateParams.incidentId != null) {

            Drivers.getIncidentById($stateParams.incidentId).then(function (result) {
                if (result.length > 0) {

                    Users.getCurrentUser().then(function (data) {
                        $scope.driver = result[0];
                        $scope.isOwner = result[0].Owner == data.result.Id;
                        $scope.$apply();
                        everliveImages.responsiveAll();
                    }, function (error) {
                        console.log(JSON.stringify(error));
                    });

                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }

        $scope.appologize = function (incidentId, appologyText) {
            $ionicLoading.show({
                template: 'Изпращане...'
            });

            Drivers.requestApology(appologyText, incidentId).then(function (success) {
                $ionicLoading.hide();
                $state.go("tabs.gallery");
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }

    var app = angular.module("Rednecks");
    app.controller("IncidentController", [
    "$scope", "Drivers", "Users", "$state", "$stateParams", "$ionicLoading", incidentController]);
})();