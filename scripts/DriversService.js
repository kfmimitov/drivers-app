(function () {

    var driversService = function ($http) {
        var el = new Everlive("EgXwDq7GEgueXESK");
        var drivers = el.data("Drivers");
        var photoToUpload = null;


        var setPhotoToUpload = function (imageData) {
            photoToUpload = imageData;
        }

        var getPhotoToUpload = function () {
            return photoToUpload;
        }

        var getLatestDrivers = function (limit) {
            var filter = new Everlive.Query();
            var expandExpr = {
                "Picture": {
                    "SingleField": "Uri"
                }
            }

            filter.expand(expandExpr);
            filter.take(limit);

            return drivers.get(filter)
                .then(function (data) {
                    return data.result;
                },
                function (error) {
                    alert(JSON.stringify(error));
                });
        }

        var data = function () {
            return drivers;
        }

        var uploadBase64File = function (payload, onSuccess, onError) {
            var file = {
                "Filename": "image.jpeg",
                "ContentType": "image/jpeg",
                "base64": payload
            };

            el.Files.create(file, onSuccess, onError);
        }

        var getDriversByLicense = function (licensePlate) {

            var filter = new Everlive.Query();
            filter.where().eq("LicensePlate", licensePlate);
            var expandExpr = {
                "Picture": {
                    "SingleField": "Uri"
                }
            }

            filter.expand(expandExpr);

            return drivers.get(filter).then(function (data) {

                return data.result;
            },
             function (error) {
                 console.log(JSON.stringify(error));
             });
        };

        var returnValidLicensePlate = function (registration) {
            if (typeof registration != "undefined" && registration != '') {

                //remove whitespaces
                registration = registration.replace(/ /g, '');

                //set capitalization
                registration = registration.toUpperCase();

                //check for regular license plate e.g.: CA 1212 CA
                var pattern = new RegExp(/\b\w[A-Z]?\d{4}\w[A-Z]\b/);

                if (pattern.test(registration)) {
                    return registration;
                }
                else {
                    //check for license plate e.g. CA 232323
                    pattern = new RegExp(/\b\w{1}[A-Z]?\d{6}/);
                    if (pattern.test(registration)) {
                        return registration;
                    }
                    else {
                        return "";
                    }
                }
            }
            else {
                return "";
            }
        };

        return {
            getLatestDrivers: getLatestDrivers,
            returnValidLicensePlate: returnValidLicensePlate,
            getDriversByLicense: getDriversByLicense,
            data: data,
            uploadBase64File: uploadBase64File,
            getPhotoToUpload: getPhotoToUpload,
            setPhotoToUpload: setPhotoToUpload
        };
    }

    var app = angular.module("Rednecks");
    app.factory("driversService", driversService);
})();
