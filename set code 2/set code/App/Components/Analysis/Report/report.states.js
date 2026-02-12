(function () {



    angular.addState({
        parent: "analysis.cockpit",
        name: "reports",
        url: "/reports?:report",
        helpText: "country.report",
        params: {
            report: {
                value: "EXFOT12M6MR"
            }
        },
        title: "Reports",
        views: {
            'main@app': {
                component: "reports"
            }
        },
        resolve: {
            list: ["reportService", "countryPeriod", "$stateParams", function (reportService, countryPeriod, $stateParams) {
                return reportService.list(countryPeriod.CountryPeriodUuid, $stateParams.report);
            }],
            reports: ["reportService", function(reportService) {
                return reportService.reports(); 
            }]
        }
    });
})();