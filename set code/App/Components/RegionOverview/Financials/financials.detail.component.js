(function () {
    angular.module("app")
        .component("financials.detail",
            {
                bindings: {
                    volumes: "<"
                   
                },

                templateUrl: "/Financials/Details",
                controller: ["$stateParams", "dateService", "financials.service", Controller]

            });

    function Controller($stateParams, dateService, service) {

        var vm = this; 
        vm.show = "values";
        function collectInfo(name) {
            var defaults = {
                sum: 0, 
                count:0

            }
        
        }

        vm.updateDelta = function (volume,i) {
           
            return service.updateDeltaPercent($stateParams.scenarioUuid, volume).then(function (data) {
          
                vm.volumes.results[i].ExFactory = data.ExFactory;
                vm.volumes.results[i].DeltaVolume = data.DeltaVolume;
            });
        }

        vm.updatePrice = function (volume,i) {
          
            return service.updatePrice($stateParams.scenarioUuid, volume)
        }
    }
})();
