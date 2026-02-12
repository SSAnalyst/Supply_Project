(function() {

    angular.module("app.addons")
        .filter("periodName", [filter]);

    function filter() {
        
        return function(period, format) {
            format = format || "MMM YYYY";
            if (period > 201500) {
                period = period + ""; 
            }
            var newPeriod = {};
            if (angular.isString(period) && period.length === 6) {
                newPeriod.Year = period.substring(0, 4);
                newPeriod.Month = period.substring(4);
            } else {
                newPeriod = period; 
            }
            if (period && newPeriod.Year && newPeriod.Month) {
                //console.log(newPeriod)
                var date = newPeriod.Year + "-" + ("" + newPeriod.Month).padStart(2, "0") + "-01";
                //console.log(date)
                return moment(date).format(format);
            }
           //console.log(period,format, period.length);
            return "---";

        }

    }


})()