(function () {



    angular.addState({
        name: "analysis.cockpit",
        url: "/:date/analysis/:country",
        title: "Cockpit",
        helpText: "country.cockpit",
        restrictPath : ["$stateParams", function(stateParams) {
            return "country.{0}".Format(stateParams.country);
        }],
        views: {
            'main@app': {
                component: "cockpit"
            },
            'extrapolate@analysis.cockpit': {
                component: "cockpit.extrapolate"
            },
            'dataPreparation@analysis.cockpit': {
                component: "cockpit.dataPreparation"
            },
            'anomalyDetection@analysis.cockpit': {
                component: "cockpit.anomalyDetection"
            },
            'calculateVPD@analysis.cockpit': {
                component: "cockpit.calculateVPD"
            },
            'anomalyValidation@analysis.cockpit': {
                component: "cockpit.anomalyValidation"
            },
            'reports@analysis.cockpit': {
                component: "cockpit.reports"
            }
        },
        resolve: {

        }
    });

    angular.module("app")
        .run([
            "$transitions", function($transitions) {
                $transitions.onStart({ //TODO: CHECK IF onBefore IS BETTER
                        to: "analysis.cockpit"
                    },
                    function(trans) {
                        //console.log("cockpit entered", trans.targetState().name());
                        if (!trans.options().reload) {
                            var options = trans.options();
                            options.reload = true;
                            return trans.router.stateService
                                .target(trans.targetState().name(), trans.params(), options);
                        }

                        return trans;
                    });

            }
        ]);
})();