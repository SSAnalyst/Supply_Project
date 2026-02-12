(function() {
    angular.module("app")
        .filter("numberscale", ["numberscaleservice", Filter]);

    function Filter(numberscaleservice) {

        function filter(number) {
            var ret = (!!number || number === 0) ? number / numberscaleservice.Current.Divider : null;

            return ret;
        }

        filter.$stateful = true;
        return filter; 
    }
})()