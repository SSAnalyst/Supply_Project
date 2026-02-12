(function () {


    angular.addState({
        name: "regionOverview.reports",
        url: "/reports",
        helpText: "regionOverview.report",
        //abstract: true,
        redirectTo: "roReport({dashboard:'KPI',report:'KLM'})",
        title: "Reports",
        views: {
            'main@app': {
                component: "regionOverview.reports"
            }
        },
        resolve: {
            reports: ["regionOverview.ReportService", function (reportService) {
                return reportService.reports();
            }],
            brands: ["regionOverview.ReportService", function (reportService) {
                return reportService.brands();
            }]
        }
    });

    angular.addState({
        name: "roReport",
        parent: "regionOverview.reports",
        url: "/:dashboard/:report/?:brandUuid&:countryId",
        params: {
            Rolling: "R6",
            Supply: "Undersupply",
            Flow: "Local"
        },
        helpText: "regionOverview.report",
        views: {
            'report@regionOverview.reports': {
                component: "regionOverview.report"
            }
        }, resolve: {
            currentCountry: ["$stateParams", "countryList", function ($stateParams, countryList) {
                if (!$stateParams.countryId) {
                    var country = countryList.find(function (country) {
                        return country.StatusId === 600;
                    });
                    //console.log("c", country);
                    return country || {CountryName: "No country finished yet", CountryId: "00" };
                }
               return countryList.find(function (country) {
                    return $stateParams.countryId === country.CountryId;
                });

            }],
            currentBrand: ["$stateParams", "brands", function ($stateParams, brands) {
                if (!$stateParams.brandUuid) {
                    return brands[0];
                }
                return brands.find(function (brand) {
                    return $stateParams.brandUuid === brand.BrandUuid;
                });
            }],
            list: ["regionOverview.ReportService", "$stateParams", "currentCountry", "currentBrand", "reports", function (reportService, $stateParams, currentCountry, currentBrand, reports) {
                //console.log("currentCountry", $stateParams, reports);
                var r = reportService.report($stateParams);
                if (r.Template != "NoData") {


                    return reportService.list($stateParams.date, r.ServiceFunction,
                    {
                        brandUuid: currentBrand.BrandUuid,
                        countryId: currentCountry.CountryId
                    });
                }
                return {
                    Name: "1 Month rolling",
                    Template: "Summary"
                }
            }],
        }
    });
})();