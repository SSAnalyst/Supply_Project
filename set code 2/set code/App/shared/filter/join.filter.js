(function () {
    angular.module("app.addons")
        .filter("join", [Filter]);
    function Filter() {
        return function (arr, delimiter, field) {
            if (!arr) return "";
            delimiter = delimiter || ", ";
            if (field) {
                return arr.map(function(item) {
                        return item[field];
                    })
                    .join(delimiter);
            }
            return arr.join(delimiter);
        }
    }
})()