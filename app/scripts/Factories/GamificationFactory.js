(function () {
    var gamificationFactory = function ($http) {
        var el = new Everlive({
            apiKey: "EgXwDq7GEgueXESK",
            scheme: "https",
            token: localStorage.getItem('access-token')
        });

        var tags = el.data("Tags");
        var rankings = el.data("Rankings");

        var getAllTags = function () {
            var query = new Everlive.Query();
            query.select('Name', 'Value','CanSendToKAT');
            query.orderDesc('Usage');

            return tags.get(query)
                .then(function (data) {
                    return data.result;
                },
                function (error) {
                    return error;
                });
        }



        return {
            getAllTags: getAllTags
        }
    };

    var app = angular.module("Rednecks");
    app.factory("Gamification", gamificationFactory);
})();