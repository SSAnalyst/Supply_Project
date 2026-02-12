(function () {
    angular.module("app.addons")
        .filter("limit", [filter]);

    function filter() {
        return function (item, limit) {
            return limit!== null && item > limit ? limit : item;
        }
    }
})()