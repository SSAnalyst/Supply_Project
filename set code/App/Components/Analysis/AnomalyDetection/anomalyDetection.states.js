(function () {


    angular.addState({
        parent: "analysis.cockpit",
        name: "anomalyDetection",
        url: "/anomalyDetection?view",
        helpText: "country.200",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.200".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        params: {
            view: {
                value:"all",
                dynamic: true
            }
        },
        title: "Anomaly Detection",
        views: {
            'main@app': {
                component: "anomalyDetection"
            }
        },
        resolve: {
            list: ["anomalyDetectionService","countryPeriod", function (anomalyDetectionService,countryPeriod) {
                //console.log("resolving", countryPeriod.StatusId);

                return anomalyDetectionService.list(countryPeriod.CountryPeriodUuid);
            }],
            canEdit: ["user", "countryPeriod", function (user, countryPeriod) {
                return user.promise.then(function () {
                   

                    return  user.canWrite("country.{0}.200".Format(countryPeriod.CountryId)) && countryPeriod.StatusId === 200;
                });
            }]
        }
    });


    angular.addState({
      
        name: "anomalyDetection.detail",
        url: "/:id",
        title: "Detail",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.200".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "anomalyDetection.detail"
            }
        },
        resolve: {
            item: ["anomalyDetectionService","$stateParams", function (anomalyDetectionService,$stateParams) {
                return anomalyDetectionService.get($stateParams.id);
            }]
        }
    });

})();