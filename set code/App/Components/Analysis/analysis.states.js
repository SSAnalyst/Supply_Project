(function () {


    angular.addState({
        name: "app.analysis",
        url: "",
        abstract: true,
        views: {
            "breadcrumbs@app": {
                component: "analysis.breadcrumbs"
            },
            "picker@app": {
                component: "analysis.picker"
            }
        },
        resolve: {
            countryPeriod: ["cockpitService", "$stateParams", function (cockpitService, $stateParams) {
                //console.log("resolving cockpit");
                return cockpitService.CountryPeriod($stateParams);
            }],
            countryList: ["$odata", "$stateParams", function ($odata, $stateParams) {
                //console.log("resolving country");
                return new $odata("CountryPeriodUserOverview").filter("PeriodId eq " + $stateParams.date).get().then(function (data) {
                    return data.results;
                });
            }]
        }
    });


    angular.addState({
        parent: "app.analysis",
        name: "analysis",
        url: "",
        abstract: true


    });


})();