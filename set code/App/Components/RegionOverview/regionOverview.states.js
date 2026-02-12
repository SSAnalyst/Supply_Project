(function () {

    angular.addState({
        parent: "app",
        name: "regionOverview",
        //  url: "",
        abstract: true,
        helpText: "regionOverview.matrix",
        views: {
            "picker@app": {
                component: "regionOverview.datePicker"
            },
            "breadcrumbs@app": {
                component: "regionOverview.viewPicker"
            }
        },
        url: "/{date:[0-9]{6}}",
        params: {
            date: {
                value: ["$odata", function ($odata) {
                    var d = moment().add(1, "month").format("YYYYMM");
                    return d; 
                }]
            }
        },
        resolve: {
            countryList: ["$odata", "$stateParams", function ($odata, $stateParams) {
                //console.log("resolving country");
                return $odata("CountryPeriodUserOverview")
                    .filter("PeriodId eq " + $stateParams.date)
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            }]
        }

    });



    angular.addState({
        name: "regionOverview.view",
        url: "?view",
        helpText: "regionOverview.matrix",
        params: {
            view: {
                value: "matrix"
            }
        },
        views: {
            "main@app": {
                component: "regionOverview"
            }
        }
    });

})();