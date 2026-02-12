(function () {



    angular.addState({
        parent: "analysis.cockpit",
        name: "dataPreparation",
        url: "/dataPreparation?view",
        helpText: ["countryPeriod", function (countryPeriod) {
            return "country.{0}".Format(countryPeriod.StatusId > 110 ? "110" : countryPeriod.StatusId);
        }],
        restrictPath: ["countryPeriod", function (countryPeriod) {
            //console.log("pathRestriction",countryPeriod.CountryId);
            return "country.{0}.100".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        params: {
            view: {
                value: "all",
                dynamic: true
            }
        },
        title: "Data Preparation",
        views: {
            'main@app': {
                component: "preparationList"
            }
        },
        resolve: {
            list: ["dataPreparationService", "countryPeriod", function (dataPreparationService, countryPeriod) {
                
                return dataPreparationService.list(countryPeriod.CountryPeriodUuid);
            }],
            skus: ["dataPreparationService","$stateParams", function (dataPreparationService, $stateParams) {
                
                return dataPreparationService.listSkus($stateParams.country);
            }],
            canEdit: ["user", "countryPeriod", function (user, countryPeriod) {
                return user.promise.then(function () {
                    var path = "country.{0}.{1}".Format(countryPeriod.CountryId, countryPeriod.StatusId);
                    return  user.canWrite(path) && countryPeriod.StatusId < 200 ;
                });
            }]
        }
    });


    angular.addState({

        name: "dataPreparation.detail",
        url: "/Detail/:id",
        title: "Detail",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.100".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "preparation.detail"
            }
        },
        resolve: {
            item: ["dataPreparationService", "$stateParams", function (dataPreparationService, $stateParams) {
                return dataPreparationService.get($stateParams.id);
            }]
        }
    });

    angular.addState({

        name: "dataPreparation.preApprove",
        url: "/preApprove",
        title: "Pre Approve Bricks",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.100".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "preperation.preApprove"
            }
        },
        resolve: {
            bricks: ["dataPreparationService", "countryPeriod", function (dataPreparationService, countryPeriod) {
                return dataPreparationService.getPreApprove(countryPeriod.CountryPeriodUuid);
            }]
        }
    });

})();