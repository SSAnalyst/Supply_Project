(function () {


    angular.addState({
        parent: "analysis.cockpit",
        name: "extrapolate",
        url: "/extrapolate/?view",
        helpText: ["countryPeriod", function (countryPeriod) {
            return "country.{0}".Format(countryPeriod.StatusId > 520 ? "520" : countryPeriod.StatusId);
        }],
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.500".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        params: {
            view: {
                value: "all",
                dynamic: true
            }
        },
        title: "Target Volume Extrapolation ",
        views: {
            'main@app': {
                component: "extrapolate"
            }
        },
        resolve: {
            list: ["extrapolateService","countryPeriod", function (extrapolate,countryPeriod) {
                //console.log("resolving");
                return extrapolate.list(countryPeriod.CountryPeriodUuid);
            }],
            comments: ["extrapolateService", function (extrapolateService) {
                return extrapolateService.listComments();
            }],
            canEdit: ["user", "countryPeriod", function (user, countryPeriod) {
                return user.promise.then(function () {
                    return user
                        .canWrite("country.{0}.{1}".Format(countryPeriod.CountryId,countryPeriod.StatusId ))
                        && countryPeriod.StatusId >= 500 && countryPeriod.StatusId <= 520;
                });
            }]
        }
    });

    angular.addState({

        name: "extrapolate.detail",
        url: "/:id",
        title: "Detail",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.500".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "extrapolate.detail"
            }
        },
        resolve: {
            item: [
                "extrapolateService", "$stateParams", function (extrapolateService, $stateParams) {
                    return extrapolateService.get($stateParams.id);
                }
            ]
        }
    });

    angular.addState({

        name: "extrapolate.new",
        url: "/new",
        title: "New",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.{1}".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "extrapolate.new"
            }
        }, resolve: {
            skus: ["dataPreparationService", "$stateParams", function (dataPreparationService, $stateParams) {
                //console.log($stateParams)
                return dataPreparationService.listSkus($stateParams.country);
            }]
        }
    });

})();