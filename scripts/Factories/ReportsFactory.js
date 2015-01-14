(function () {
    var reportsFactory = function () {
        var el = new Everlive({
            apiKey: "EgXwDq7GEgueXESK",
            scheme: "https",
            token: localStorage.getItem('access-token')
        });
        var reports = el.data("Reports");

        var create = function (newReport) {

            return reports.create(newReport).then(function (data) {
                return data;
            }, function (error) {
                return error;
            });
        }

        return {
            create : create
        };
    }

    var app = angular.module("Rednecks");
    app.factory("Reports", reportsFactory);
})();