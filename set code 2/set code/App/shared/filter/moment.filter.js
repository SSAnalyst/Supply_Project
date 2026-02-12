(function() {


    angular.module("app.addons")
        .filter("moment", [filter]);

    function filter() {
        return function (value, format, parse) {
            if (!value) return "";
            format = format || "MM.dd.YYYY";
            var d = moment(value, parse);
            return d.format(format);
        }

    }
})()