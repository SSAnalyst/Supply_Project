(function () {
    angular.module("app.addons")
        .filter("find", [Filter]);

    function Filter() {
        return function (array, filter, field) {

            if (!angular.isArray(array)) return {};
            if (field) {
                var erg = array.find(function (item) {

                 return item[field] == filter;
                });
                return erg;
            }
            var erg =  array.find(function (item) {
                var test = true;
                for (var key in filter) {
                    if (filter.hasOwnProperty(key)) {
                        test = test && item[key] == filter[key];
                    }
                }
                return test;
            });
           
            return erg; 
        }
    }

})()