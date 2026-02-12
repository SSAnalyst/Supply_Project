(function () {


    angular.module("app.addons")
        .service("dateService", ["$odata", "$filter", Service]);


    function Service($odata, $filter) {
        var defaultOptions = {
            offset: 0,
            format: "MMM YY",
            months: 24,
            parse: "YYYYMM"
        };

        return {
            list: function () {
                return new $odata("Period")
                .id("List")
                    .orderby("PeriodId desc")
                    .get()
                    .then(function (dates) {
                        dates.results = dates.map(function (date) {
                            date.Name = $filter("periodName")(date);
                            return date;
                        });
                        return dates;
                    });


            },
            scenarioOverviewList: function (period,options) {
                var opt = {};
                angular.merge(opt, defaultOptions, options); 
                var d = moment(period, opt.parse);
                d.subtract(1, "year"); 
                d.month(6);
                let list = [];
                for (var i = 0; i < 18; i++) {

                    list.push(d.format(opt.format));
                    d.add(1, "months");
                }
                return list
            },
            pastList: function (period,options) {
                var list = [];
                var opt = {};
                angular.merge(opt, defaultOptions, options); 
                var d = moment(period, opt.parse);
                if (opt.offset) {
                    d.add(opt.offset, "months");
                }
                for (var i = 0; i < opt.months; i++) {
                   
                    list.push(d.format(opt.format));
                    d.subtract(1, "months");
                }
                return list.reverse();
            }
        }

    }

})()