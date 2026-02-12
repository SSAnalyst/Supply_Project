(function () {


    angular.addState({
        parent: "regionOverview",
        name: "financials",
        url: "/financials",
        helpText: "financials.overview",
        restrictPath: ["$stateParams", function (stateParams) {
            return "report.financials"
        }],
        //abstract: true,
        // redirectTo: "roReport({dashboard:'KPI',report:'KLM'})",
        title: "InMarket Financials",
        views: {
            'main@app': {
                component: "financials"
            },
            "picker@app": {
                component: "financials.datePicker"
            },
        },
        resolve: {
            scenarios: ["financials.service", "$stateParams", function (financialService, $stateParams) {
                //console.log("sp", $stateParams)

                if ($stateParams.date) {
                    return financialService.getScenarios($stateParams.date).then(function (scenarios) {
                        return scenarios;
                    });
                }
            }],
            overviewMonths: ["dateService", "$stateParams", function (dateService, $stateParams) {
                return dateService.scenarioOverviewList($stateParams.date);
            }],
            brands: ["regionOverview.ReportService", function (reportService) {
                return reportService.brands();
            }]
        }
    });

    angular.addState({
      
        name: "financials.scenario",
        url: "/:scenarioUuid",
        helpText: "financials.overview",
        abstract: true,
        // redirectTo: "roReport({dashboard:'KPI',report:'KLM'})",
        title: "InMarket Financials",
        views: {
            'main@app': {
                component: "financials.scenario"
            }, 
            "breadcrumbs@app": {
                template: "<breadcrumbs></breadcrumbs>"
            }
        },
        resolve: {
           
            reports: ["financials.service", "$stateParams", function (service, $stateParams) {
                return service.getReport($stateParams.scenarioUuid);
            }]
        }
    });

    angular.addState({

        name: "financials.scenario.overview",
        url: "/overview",
        helpText: "financials.overview",
       
        // redirectTo: "roReport({dashboard:'KPI',report:'KLM'})",
        title: "Overview",
        views: {
            'scenario': {
                component: "financials.overview"
            }
        }, resolve: {
            currentScenario: ["financials.service", "$stateParams", function (service, $stateParams) {
                return service.getVolumes($stateParams.scenarioUuid, $stateParams.date).then(function (data) {
                    return { Volumes: data }
                });

            }]}

    });

    angular.addState({

        name: "financials.scenario.report",
        url: "/report",
        helpText: "financials.report",
        //abstract: true,
        // redirectTo: "roReport({dashboard:'KPI',report:'KLM'})",
        title: "Report",
        views: {
            'scenario': {
                component: "financials.report"
            }
        }

    });

    angular.addState({

        name: "financials.scenario.reportadj",
        url: "/adjustedReport",
        helpText: "financials.report",
        //abstract: true,
        // redirectTo: "roReport({dashboard:'KPI',report:'KLM'})",
        title: "Adjusted Report",
        views: {
            'scenario': {
                component: "financials.reportadj"
            }
        }

    });


    angular.addState({

        name: "financials.scenario.overview.detail",
        url: "/Details/:country",
        title: "Detail",
        views: {
            'side@app': {
                component: "financials.detail"
            }
        },
        resolve: {
            volumes: ["financials.service", "$stateParams", function (service, $stateParams) {
                return service.getVolumesByCountry($stateParams.scenarioUuid, $stateParams.country);
            }]
        }
    });
})();