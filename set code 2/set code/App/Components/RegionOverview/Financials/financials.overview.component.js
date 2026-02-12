(function () {
    angular.module("app")
        .component("financials.overview",
            {
                bindings: {
                    currentScenario: "<",
                    overviewMonths: "<"
                },

                templateUrl: "/Financials/Overview",
                controller: ["$scope", "$stateParams", "dateService", "financials.service", Controller]

            });

    function Controller($scope, $stateParams, dateService, service) {

        var vm = this;


        vm.initializeScenario = function (scenarioUuid) {
            service.initializeScenario(scenarioUuid);
        }

        vm.forecastScenario = function (scenarioUuid) {
            service.forecastScenario(scenarioUuid).then(function () {
                vm.setCurrentScenario(vm.currentScenario);
            });
        }

        vm.$onInit = function () {
            vm.$stateParams = $stateParams
            createSummary();
        }

        function createSummary() {
           //console.log("scenario",vm.currentScenario)
            vm.summary = Object.keys(vm.currentScenario.Volumes).reduce(function (accu, country) {
    //console.log("country", country)
                vm.currentScenario.Volumes[country].Volumes.forEach(function (v, i) {
                    //console.log(v, i);
                    accu.in[i] = accu.in[i] ||0;
                    accu.out[i] = accu.out[i] || 0;
                    accu.delta[i] = accu.delta[i] || 0;

                    accu.in[i] += v.DeltaVolume >= 0 ? v.DeltaVolume : 0;
                    accu.out[i] += v.DeltaVolume >= 0 ? 0 : v.DeltaVolume;
                    accu.delta[i] += v.DeltaVolume;

                })

                return accu;
            }, {in: [], out: [], delta: []})
        }


    }
})();