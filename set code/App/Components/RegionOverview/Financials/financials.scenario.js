(function () {
    angular.module("app")
        .component("financials.scenario",
            {
                bindings: {
                    scenarios: "<"
                },

                templateUrl: "/Financials/Scenario",
                controller: ["$stateParams", "financials.service", "$scope", "numberFactory", "$rootScope", "toaster", "$state",Controller]

            });

    function Controller($stateParams, service, $scope, numberFactory, $rootScope, toaster,$state) {

        var vm = this;
        vm.formatList = numberFactory.list;

        $scope.$watch(function () {
            return vm.numberFormat;
        }, function (format) {
            if (!format) return;
            setCookie("numberFormat", numberFactory.list.indexOf(format), 365);
            $rootScope.currentPrefix = format.divider;
        })

        vm.$onInit = function () {
            var formatId = getCookie("numberFormat") || 1;

            vm.numberFormat = numberFactory.list[formatId];
        }

        vm.initializeScenario = function () {
            return service.initializeScenario($stateParams.scenarioUuid);

        }

        vm.forecastScenario = function () {
            return service.forecastScenario($stateParams.scenarioUuid);
        }

        $scope.$watch(function () {
            return vm.priceFile;
        }, function (file) {
            if (file) {
                vm.loadingPrices = true;
                service.uploadPrices($stateParams.scenarioUuid, file)
                    .then(function (data) {
                        vm.loadingPrices = false;
                        //console.log("Upload Successfull", data);
                    }).catch(function (err) {
                        vm.loadingPrices = false;
                        console.log("Upload failed. ", err)
                    });
            }
        });

        $scope.$watch(function () {
            return vm.budgetFile;
        }, function (file) {
            if (file) {
                vm.loadingBudget = true;
                service.uploadBudget($stateParams.scenarioUuid, file)
                    .then(function (data) {
                        vm.loadingBudget = false;
                        //console.log("Upload Successfull", data);
                    }).catch(function (err) {
                        vm.loadingBudget = false;
                        console.log("Upload failed. ", err)
                    });
            }
        });

        $scope.$watch(function () {
            return vm.adjustmentFile;
        }, function (file) {
            if (file) {
                vm.loadingAdjustment = true;
                service.uploadAdjustment($stateParams.scenarioUuid, file)
                    .then(function (data) {
                        vm.loadingAdjustment = false;
                        //console.log("Upload Successfull", data);
                    }).catch(function (err) {
                        vm.loadingAdjustment = false;
                        console.log("Upload failed. ", err)
                    });
            }
        });

        $scope.$watch(function () {
            return vm.allFile;
        }, function (file) {
            if (file) {
                vm.loadingAdjustment = true;
                service.uploadAll($stateParams.scenarioUuid, file)
                    .then(function (data) {
                        vm.loadingAdjustment = false;
                        //console.log("Upload Successfull", data);
                        var text = "";
                        if (data.data.Adjust) {
                            text += "Adjustment imported; "
                        }
                        if (data.data.Budget) {
                            text += "Budget imported; "
                        }
                        if (data.data.Price) {
                            text += "Prices imported; "
                        }


                        toaster.pop("info", "Success", text);
                        $state.go($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true });
                    }).catch(function (err) {
                        vm.loadingAdjustment = false;
                        console.log("Upload failed. ", err)
                        toaster.pop("error", "Upload Failed", err.Message)
                    });
            }
        });
    }
})();