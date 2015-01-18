(function () {
    var uploadController = function ($scope, Drivers, Reports, Gamification, $state, $stateParams, $ionicLoading, $ionicModal, $http) {

        $scope.selectedPicture = "data:image/jpeg;base64," + Drivers.getPhotoToUpload();
        $scope.invalidSearch = false;
        $scope.modal = null;
        $scope.tagsCloud = null;
        $scope.canSendReportToKat = false;

        $scope.newDriver = {
            Title: "",
            LicensePlate: "",
            Picture: "",
            Location: {},
            Address: "",
            SelectedTags: {},
            CheckinValue: 0
        };

        $scope.newReport = {
            Name: "",
            Address: "",
            Phone: "",
            Email: ""
        }

        $scope.origin = angular.copy($scope.newDriver);

        function initializeView() {
            getCurrentLocation();
            Gamification.getAllTags().then(function (data) {
                $scope.tagsCloud = data;
                $scope.$apply();
            }, function (error) {
                console.log(JSON.stringify(error));
            })
        }

        function reset() {
            $scope.newDriver = angular.copy($scope.origin);
        }

        $scope.$watch("newDriver.SelectedTags",
              function (newValue, oldValue) {
                  if (newValue) {
                      var itemsInCriteria = 0;
                      for (var i = 0; i < newValue.length; i++) {
                          if (newValue[i].CanSendToKAT) {
                              itemsInCriteria++;
                          }
                      }
                      $scope.canSendReportToKat = itemsInCriteria > 0;
                      $scope.$apply();
                  }
              }
             );

        $scope.onSavePhoto = function (driver, reportKat) {
            if (reportKat) {
                $ionicLoading.show({
                    template: 'Търсене на адрес...'
                });

                setTimeout(function () {
                    $ionicLoading.hide();
                    $scope.modal.show();
                }, 5000);

                try {
                    getAddressFromGeopoint($scope.newDriver.Location, function (data) {
                        $scope.newReport.Address = data.results[0].formatted_address;
                        $ionicLoading.hide();
                        $scope.modal.show();
                    }, function (error) {
                        $ionicLoading.hide();
                        $scope.modal.show();
                    });
                }
                catch (error) {
                    $ionicLoading.hide();
                    $scope.modal.show();
                }
            }
            else {
                uploadPhoto(driver);
            }
        }

        $scope.onConfirmAddress = function (driver, report) {
            $scope.modal.hide();
            uploadPhoto(driver, report);
        }


        $scope.onCancelUpload = function () {
            $state.go("tabs.gallery", {}, { reload: true });
        }

        function uploadPhoto(driver, report) {

            var formattedLicense = Drivers.returnValidLicensePlate(driver.LicensePlate);
            if (formattedLicense != "") {
                $ionicLoading.show({
                    template: 'Изпращане...'
                });

                driver.LicensePlate = formattedLicense;
                $scope.invalidSearch = false;

                var imageData = Drivers.getPhotoToUpload();

                Drivers.uploadBase64File(imageData, function (data) {
                    driver.Picture = data.result.Id;

                    var calculatedScore = 0;
                    var arrayForIds = [];
                    for (var i = 0; i < driver.SelectedTags.length; i++) {
                        calculatedScore += driver.SelectedTags[i].Value;
                        arrayForIds.push(driver.SelectedTags[i].Id);
                    }

                    driver.SelectedTags = arrayForIds;
                    driver.CheckinValue = calculatedScore;
                    //adding extra 300 points for subtmitting the item to KAT
                    if (report)
                    {
                        driver.CheckinValue += 500;
                    }

                    Drivers.data().create(driver, function (success) {

                        if (report) {
                            report.DriverId = success.result.Id;

                            Reports.create(report).then(function (success) {
                                reset();
                                $ionicLoading.hide();
                                $state.go("tabs.gallery", {}, { reload: true });
                            }, function (error) {
                                $ionicLoading.hide();
                                navigator.notification.alert("Проблем с качването на снимката, моля опитайте отново!");
                                console.log(JSON.stringify(error));
                            });
                        }
                        else {
                            reset();
                            $ionicLoading.hide();
                            $state.go("tabs.gallery", {}, { reload: true });
                        }

                    }, function (error) {
                        $ionicLoading.hide();
                        navigator.notification.alert("Проблем с качването на снимката, моля опитайте отново!");
                        console.log(JSON.stringify(error));
                    });
                },
                function (error) {
                    console.log(JSON.stringify(error));
                });
            }
            else {
                $scope.invalidSearch = true;
            }
        }

        function getCurrentLocation() {
            navigator.geolocation.getCurrentPosition(function (position) {

                $scope.newDriver.Location = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                };

            });
        }

        $ionicModal.fromTemplateUrl('views/Home/modal.address.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        function getAddressFromGeopoint(location, onSuccess, onError) {

            var urlToGoogle = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.latitude + "," + location.longitude + "&language=bg";

            $http({ method: 'GET', url: urlToGoogle }).
                  success(onSuccess).
                  error(onError);
        }

        initializeView();


    }

    var app = angular.module("Rednecks");

    app.controller("UploadController", [
    "$scope", "Drivers", "Reports", "Gamification", "$state", "$stateParams", "$ionicLoading", "$ionicModal", "$http", uploadController]);
})();