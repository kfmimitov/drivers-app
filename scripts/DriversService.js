(function () {
    var driversService = function () {
        var el = new Everlive({
            apiKey: "EgXwDq7GEgueXESK",
            scheme: "https",
            token: localStorage.getItem('access-token')
        });
        var drivers = el.data("Drivers");
        var photoToUpload = null;


        var setPhotoToUpload = function (imageData) {
            photoToUpload = imageData;
        }

        var getPhotoToUpload = function () {
            return photoToUpload;
        }

        var getLatestDrivers = function (takeItems, skipItems) {
            return getDrivers(takeItems,skipItems,"CreatedAt");
        }

        var getTopDrivers = function(takeItems,skipItems){
            return getDrivers(takeItems,skipItems,"ViewCounter");
        }

        function getDrivers(takeItems, skipItems, orderDescBy){
            if (skipItems == null || isNaN(skipItems)) {
                skipItems = 0;
            }
            var filter = new Everlive.Query();
            var expandExpr = {
                "Picture": {
                    "SingleField": "Uri"
                }
            }

            filter.where().ne("IsApproved", true);
            filter.orderDesc(orderDescBy);
            filter.expand(expandExpr);
            filter.skip(skipItems).take(takeItems);

            return drivers.get(filter)
                .then(function (data) {
                    return data.result;
                },
                function (error) {
                    console.log(JSON.stringify(error));
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

        var getDriverByLicense = function (licensePlate) {

            var filter = new Everlive.Query();
            filter.where()
                .and()
                .eq("LicensePlate", licensePlate)
                .ne("IsApproved", true)
                .done();
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

        var getIncidentById = function (searchId) {
            
            var filter = new Everlive.Query();
            filter.where().eq("Id", searchId);
            var expandExpr = {
                "Picture": {
                    "SingleField": "Uri"
                }
            }

            filter.expand(expandExpr);

            var customHeaderParams = JSON.stringify({"IncrementId" : searchId});

            return drivers.withHeaders({'X-Everlive-Custom-Parameters': customHeaderParams}).get(filter).then(function (data) {

                return data.result;
            },
             function (error) {
                 console.log(JSON.stringify(error));
             });
        }
        
        var setAccessToken = function (accessToken) {
            localStorage.setItem('access-token', accessToken);
        }

        var loginWithFacebook = function (_successCallback, _errorCallback) {
            facebookConnectPlugin.login(["email"], function (response) {
                if (response) {

                    el.Users.loginWithFacebook(response.authResponse.accessToken,
                    function (data) {
                        localStorage.setItem('access-token', data.result.access_token);
                        _successCallback(data);
                    },
                    function (error) {
                        _errorCallback(error);
                    });

                } else {
                    console.log("the user is currently not logged in");
                }
            });
        }

        var registerWithEmail = function (username, displayName, email, password, _successCallback, _errorCallback) {
            //this is a hack to workaround the invalid access token message
            el.setup.token = null;
            el.setup.tokenType = null;

            var attrs = {
                Email: email,
                DisplayName: displayName
            };

            //Registering the user with the email instead of a username
            el.Users.register(username,
                password,
                attrs,
                function (data) {
                    loginWithEmail(username, password, _successCallback, _errorCallback);
                },
                function (error) {
                    _errorCallback(error);
                });
        }

        var loginWithEmail = function (username,password,_successCallback,_errorCallback) {
            el.Users.login(username, // username
                       password, // password
                       function (data) {
                           localStorage.setItem('access-token', data.result.access_token);
                           _successCallback();
                       },
                       function (error) {
                           _errorCallback(error);
                       });
        }

        var logoutUser = function () {
            el.Users.logout(function (){
                localStorage.removeItem('access-token');
            }, function (error) {
                console.log("Failed to logout: " + error.message);
            });
        }

        var getCurrentUser = function () {
            return el.Users.currentUser();
        }
    
    return {
        getLatestDrivers: getLatestDrivers,
        getTopDrivers: getTopDrivers,
        getIncidentById : getIncidentById,
        returnValidLicensePlate: returnValidLicensePlate,
        getDriverByLicense: getDriverByLicense,
        data: data,
        uploadBase64File: uploadBase64File,
        getPhotoToUpload: getPhotoToUpload,
        setPhotoToUpload: setPhotoToUpload,
        loginWithFacebook: loginWithFacebook,
        loginWithEmail : loginWithEmail,
        registerWithEmail :  registerWithEmail,
        getCurrentUser: getCurrentUser,
        logoutUser : logoutUser
    };
}

    var app = angular.module("Rednecks");
app.factory("driversService", driversService);
})();
