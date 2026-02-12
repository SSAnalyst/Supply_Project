(function () {



    angular.addState({
        parent: "analysis.cockpit",
        name: "patientDemandValidation",
        url: "/PatientDemandValidation?view",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.400".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        helpText:  ["countryPeriod", function(countryPeriod) {
            return "country.{0}".Format(countryPeriod.StatusId > 420 ? "420" : countryPeriod.StatusId);
        }],
        params: {
            view: {
                value: "all",
                dynamic: true
            }
        },
        title: "Patient Demand Validation",
        views: {
            'main@app': {
                component: "patientDemandValidation"
            }
        },
        resolve: {
            list: ["patientDemandValidationService", "countryPeriod", function (patientDemandValidationService, countryPeriod) {
                //console.log("resolving");
                return patientDemandValidationService.list(countryPeriod.BrickUploadUuid, countryPeriod.PeriodId);
            }],
            canEdit: ["user", "countryPeriod", function (user, countryPeriod) {
                return user.promise.then(function() {
                    return user
                        .canWrite("country.{0}.{1}".Format(countryPeriod.CountryId, countryPeriod.StatusId))
                        && countryPeriod.StatusId>=400 && countryPeriod.StatusId < 500;
                });
            }],
            comments: ["patientDemandValidationService", function(patientDemandValidationService) {
                return patientDemandValidationService.listComment(); 
            }]
        }
    });


    angular.addState({

        name: "patientDemandValidation.detail",
        url: "/:id",
        title: "Detail",
        restrictPath: ["countryPeriod", function (countryPeriod) {
            return "country.{0}.400".Format(countryPeriod.CountryId, countryPeriod.StatusId);
        }],
        views: {
            'side@app': {
                component: "patientDemandValidation.detail"
            }
        },
        resolve: {
            item: [
                "patientDemandValidationService", "$stateParams", "countryPeriod", function (patientDemandValidationService, $stateParams, countryPeriod) {
                    return patientDemandValidationService.get($stateParams.id, countryPeriod.PeriodId);
                }
            ]
        }
    });

})();