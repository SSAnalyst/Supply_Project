(function () {


    angular.addState({
        parent: "analysis.cockpit",
        name: "anomalyValidation",
        url: "/AnomalyValidation?view&page",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.300".Format(countryPeriod.CountryId, countryPeriod.StatusId); //TODO:CHECK IF 300 is better value for {1}
        }],
        helpText: ["countryPeriod", function(countryPeriod) {
            return "country.{0}".Format(countryPeriod.StatusId > 320 ? "320" : countryPeriod.StatusId);
        }],
        params: {
            view: {
                value: "all",
                dynamic: true
            }, page: {
                value: "1",
                dynamic: true
            }
        },
        title: "Anomaly Validation",
        views: {
            'main@app': {
                component: "anomalyValidation"
            }
        },
        resolve: {
            list: ["anomalyValidationService", "countryPeriod", function (anomalyValidationService, countryPeriod) {
                if (countryPeriod.StatusId > 300) {
                    return anomalyValidationService.listAnomalie(countryPeriod.BrickUploadUuid, countryPeriod.PeriodId);
                }
                return anomalyValidationService.list(countryPeriod.BrickUploadUuid, countryPeriod.PeriodId);
            }],
            comments: ["anomalyValidationService", function(anomalyValidationService) {
                return anomalyValidationService.listComments();
            }],
            permissions: ["user", "countryPeriod", function (user, countryPeriod) {
                return user.promise.then(function () {
                    var permissions = {};
                    permissions.canEdit =
                        user.canWrite("country.{0}.{1}"
                            .Format(
                                countryPeriod.CountryId,
                                countryPeriod.StatusId)) &&
                        countryPeriod.StatusId >= 300 &&
                        countryPeriod.StatusId < 400;
                    permissions.canEditAnomaly = (countryPeriod.StatusId === 300 ) && permissions.canEdit;
                    permissions.canEditCountryAnomaly = (countryPeriod.StatusId === 310) && permissions.canEdit;
                    permissions.canEditComment = countryPeriod.StatusId === 310 && permissions.canEdit;
                    permissions.canEditApproved = countryPeriod.StatusId === 320 && permissions.canEdit;
                   
                    return permissions;
                });
            }]
        }
    });

    angular.addState({

        name: "anomalyValidation.detail",
        url: "/:id",
        title: "Detail",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.300".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "anomalyValidation.detail"
            }
        },
        resolve: {
            item: [
                "anomalyValidationService", "$stateParams", "countryPeriod", function (anomalyValidationService, $stateParams, countryPeriod) {
                    return anomalyValidationService.get($stateParams.id, countryPeriod.PeriodId);
                }
            ]
        }
    });

})();