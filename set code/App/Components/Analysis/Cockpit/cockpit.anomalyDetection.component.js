(function () {

    angular.module("app")
        .component("cockpit.anomalyDetection",
        {
            bindings: {
                countryPeriod: "<"
            },
            templateUrl: '/Analysis/CockpitAnomalyDetection',
            controller: ["anomalyDetectionService", Controller]

        });

    function Controller(anomalyDetectionService) {
        var vm = this;
        vm.adInfo = {
            InScope: 0,
            Total: 0,
            Ok: 0,
            OkTotal: 0,
            HighRisk: 0,
            HighRiskTotal: 0,
            LowRisk: 0,
            LowRiskTotal: 0,
            NoRisk: 0,
            NoRiskTotal:0
        };
        vm.$onInit = function () {
            if (vm.countryPeriod.StatusId >= 200) {
                anomalyDetectionService.list(vm.countryPeriod.CountryPeriodUuid)
                    .then(function (data) {
                        vm.adInfo.Total = data.length;
                        data.forEach(function (item) {
                            if (item.InScope ) {
                                vm.adInfo.InScope++;
                                vm.adInfo.Ok += !!item.PreApproved;
                                vm.adInfo.HighRisk += (item.RiskId === 3 || item.RiskId === null && item.RiskIdPrev === 3);
                                vm.adInfo.LowRisk += (item.RiskId === 1 || item.RiskId === null && item.RiskIdPrev === 1);
                                vm.adInfo.NoRisk += (item.RiskId === 2 || item.RiskId === null && item.RiskIdPrev === 2);
                            }

                            vm.adInfo.OkTotal += !!item.PreApproved;
                            vm.adInfo.HighRiskTotal += (item.RiskId === 3 || item.RiskId === null && item.RiskIdPrev === 3);
                            vm.adInfo.LowRiskTotal += (item.RiskId === 1 || item.RiskId === null && item.RiskIdPrev === 1);
                            vm.adInfo.NoRiskTotal += (item.RiskId === 2 || item.RiskId === null && item.RiskIdPrev === 2);
                        });
                    });
            }


        }

    }

})();