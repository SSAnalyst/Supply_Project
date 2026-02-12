(function () {

    angular.module("app")
        .component("anomalyDetection",
        {
            bindings: {
                list: "<",
                countryPeriod: "<",
                canEdit: "<"
            },
            templateUrl: "/Analysis/anomalyDetection",
            controller: ["$stateParams", "anomalyDetectionService", "$uibModal", "$scope", "$state", controller]

        });

    function controller($stateParams, anomalyDetectionService, $uibModal, $scope, $state) {
        var vm = this;
        vm.filter = filter;

        vm.finalize = finalize;
        vm.canFinalize = canFinalize;
        vm.Update = Update;

        function filter(item) {

            var view = true;
            switch ($stateParams.view) {
                case "all":
                    view = true;
                    break;
                case "inScope":
                    view = item.InScope;
                    break;
                case "outScope":
                    view = !item.InScope;
                    break;
                case "new":
                    view = !item.RiskIdPrev;
                    break;
                case "isBayer":
                    view = !!item.BayerSkuUuid;
                    break;
                case "noRisk":
                    view = item.RiskId === 2 && item.InScope;
                    break;
                case "lowRisk":
                    view = item.RiskId === 1 && item.InScope;
                    break;
                case "highRisk":
                    view = item.RiskId === 3 && item.InScope;
                    break;
                case "withRisk":
                    view = (item.RiskId === 3 || item.RiskId === 1) && item.InScope;
                    break;

            };
            return view;
        }

        function canFinalize() {
            if (!vm.canEdit || vm.finalizing) return false; 
            var not = vm.list.find(function (item) {
                return item.RiskId === null &&  item.InScope;
            });

            return !not;
        }

        function finalize() {

            var modal = $uibModal.open({
                animation: true,
                controller: ["$scope", function ($scope) {
                    $scope.Title = "Confirmation";
                    $scope.Body = "All information have been reviewed. If confirmed no more changes are possible.";

                }]
            });

            modal.result.then(function (data) {
                if (data) {
                    vm.finalizing = true; 
                    return anomalyDetectionService
                         .finalize(vm.countryPeriod.CountryPeriodUuid)
                         .then(function () {

                             return $state.go("^", undefined, { reload: true });
                         }).finalize(function() { vm.finalizing = false;  });
                }
            });

        }

        function Update(obj, field, dbField) {

            dbField = dbField || field;
            var newObj = {}
            newObj[dbField] = obj[field];
            return anomalyDetectionService.update(obj.MarketDemandSkuUuid, newObj);
        }


        $scope.$on("dataPrepChanged",
          function () {

              anomalyDetectionService.list(vm.countryPeriod.CountryPeriodUuid)
                  .then(function (data) {
                      //console.log(data);
                      vm.list = data;
                  });
          });

    }



})();