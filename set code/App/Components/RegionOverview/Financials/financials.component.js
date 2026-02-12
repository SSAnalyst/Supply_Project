(function () {
    angular.module("app")
        .component("financials",
            {
                bindings: {
                    scenarios: "<",
                    countryList: "<",
                    brands: "<",
                    currentPeriod: "<",
                    overviewMonths: "<"
                },

                templateUrl: "/Financials",
                controller: ["$stateParams", "$state", "financials.service", Controller]

            });

    function Controller($stateParams, $state, service) {

        var vm = this;
        vm.deleting = {};
        vm.addScenario = function () {
            var newScenarioUuid;
            var newScenario
            vm.addingScenario = true;
            vm.infoText = "Creating Scenario."
            return service.addScenario(vm.newScenario).then(function (data) {
                newScenarioUuid = data.ScenarioUuid;
                newScenario = data; 
                
                vm.infoText = "Initializing Data."
                return service.initializeScenario(data.ScenarioUuid);
            }).then(function (data) {
                vm.infoText = "Forecasting Scenario."
                return service.forecastScenario(newScenarioUuid);
            }).then(function (data) {
                vm.addingScenario = false;
                vm.infoText = undefined;
                vm.scenarios.results.push(newScenario);
                return $state.go("financials.scenario.overview", { scenarioUuid: newScenarioUuid })
             }).catch(function (err) {
                vm.addingScenario = false;
                vm.infoText = undefined;
             });
        }

        vm.deleteScenario = function (scenarioUuid) {
            if (vm.deleting[scenarioUuid]) return;
            vm.deleting[scenarioUuid] = true;
            service.deleteScenario(scenarioUuid)
                .then(function () {
                    var item = vm.scenarios.results.find(function (item) {
                        return item.ScenarioUuid === scenarioUuid;
                    });
                    if (item) {
                        vm.scenarios.results.splice(vm.scenarios.results.indexOf(item), 1);
                    }
                }).finally(function () {
                vm.deleting[scenarioUuid] = false;
            })
        }
         
        vm.$onInit = function () {
            vm.currentPeriod = $stateParams.date;
            vm.newScenario = {
                StatusId: 100,
                Version: "",
                BrandUuid: "9F535B59226DCDCDE10000000ACD4213",
                PeriodId: vm.currentPeriod
            };

            if ($stateParams.scenarioUuid) {
                //console.log("found uuid", $stateParams.scenarioUuid)
                vm.scenario = vm.scenarios.results.find(function (scenario) {
                    return scenario.ScenarioUuid === $stateParams.scenarioUuid;
                });
            }
        }
    }
})();