(function () {
    var usersFactory = function(){
        var el = new Everlive({
            apiKey: "EgXwDq7GEgueXESK",
            scheme: "https",
            token: localStorage.getItem('access-token')
        });

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

        var loginWithEmail = function (username, password, _successCallback, _errorCallback) {
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
            el.Users.logout(function () {
                localStorage.removeItem('access-token');
            }, function (error) {
                console.log("Failed to logout: " + error.message);
            });
        }

        var getCurrentUser = function () {
            return el.Users.currentUser();
        }

        return {
            loginWithFacebook: loginWithFacebook,
            loginWithEmail: loginWithEmail,
            registerWithEmail: registerWithEmail,
            getCurrentUser: getCurrentUser,
            logoutUser: logoutUser
        };
    }

    var app = angular.module("Rednecks");
    app.factory("Users", usersFactory);
})();