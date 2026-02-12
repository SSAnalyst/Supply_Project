(function () {

    angular.module("app")
        .component("extrapolate",
        {
            bindings: { list: "<", canEdit: "<", countryPeriod: "<", comments: "<" },
            templateUrl: "/Analysis/extrapolate",
            controller: ["$stateParams", "extrapolateService", "$scope", "$uibModal", "$state", "numberscaleservice", Controller]

        });

    function Controller($stateParams, extrapolateService, $scope, $uibModal, $state,numberscale) {
        var vm = this;
        vm.filter = filter;
        vm.Update = update;
        vm.finalize = finalize;
        vm.canFinalize = canFinalize;
        vm.updateForecast = updateForecast;
        vm.calculate = calculate;
        vm.TargetVolume = targetvolume;
        vm.updateCorrection = updateCorrection;
        vm.numberscale = numberscale; 

        vm.tvmonth = "Fc1";
        vm.$onInit = function () {
            vm.months = extrapolateService.getMonths(vm.countryPeriod.AlternatePeriodId, vm.countryPeriod.PeriodId);
            if (vm.months[6].tvmonth) {
                vm.tvmonth = "Fc1";
            }
            if (vm.months[7].tvmonth) {
                vm.tvmonth = "Fc2";
            }
            if (vm.months[8].tvmonth) {
                vm.tvmonth = "Fc3";
            }
            if (vm.months[9].tvmonth) {
                vm.tvmonth = "Fc4";
            }
        }
        vm.approveAll = approveAll;
        function approveAll() {
            extrapolateService.approveAll(vm.countryPeriod.CountryPeriodUuid)
                .then(function () {
                    $scope.$broadcast("ex.update");
                });
        }

        $scope.$on("ex.update",
         function () {
             extrapolateService.list(vm.countryPeriod.CountryPeriodUuid)
                 .then(function (data) {
                     vm.list = data;
                 });
         });

        function updateCorrection(item) {
            item.loading = true; 
            extrapolateService
                .updateCorrection(item.ForecastUuid, item.CorrectionFactor )
                .then(function (data) {
                    item.loading = false; 
                    angular.extend(item, data);
                });
        }

        function targetvolume(item) {

            return item.TargetVolume || (item[vm.tvmonth] * (1 + parseFloat(item.OperatingTolerance)))-item.EmergencyChannelQuantity;
        }

        function filter(item) {

            var view = true;
            switch ($stateParams.view) {
                case "all":
                    view = true;
                    break;
                case "exf":
                    view = item.DataTypeId === 3; //demo
                    break;
                case "vpd":
                    view = item.DataTypeId === 1; //demo
                    break;
                case "national":
                    view = item.DataTypeId === 2; //demo
                    break;
            };
            return view;
        }

        function finalize() {
            var text =
"All target volumes are correct and the country coordinator will be informed.";
            switch (vm.countryPeriod.StatusId) {
                case 500:
                    break;
                case 510:
                    text =
                        "All target volumes are correct and proposed target volumes are urgently needed and appropriatly commented.";
                    break;
                case 520:
                    text =
                        "All target volumes are correct and proposed target volumes are urgently needed and appropriatly commented.";
                    break;

            }
            var modal = $uibModal.open({
                animation: true,
                controller: ["$scope", function ($scope) {
                    $scope.Title = "Confirmation";
                    $scope.Body = text;
                    $scope.Icons = "warning";

                }]
            });
            modal.result.then(function (data) {
                if (data) {
                    vm.finalizing = true; 
                    extrapolateService
                        .finalize(vm.countryPeriod.CountryPeriodUuid)
                        .then(function () {
                            $state.go("^", { reload: true });
                        }).finally(function() {
                            vm.finalizing = false; 
                        });
                } else {
                    console.log("resolved false");
                }
            });

        }

        function canFinalize() {
            if (!vm.canEdit || vm.finalizing) return false;
            if (vm.countryPeriod.StatusId === 510) {
                var bad = vm.list.find(function (item) {
                    return item.Proposal && !item.ProposalComment;
                });
                return !bad;
            }
            return true;
        }

        function update(item, field, dbfield) {
            dbfield = dbfield || field;
            var obj = {};
            obj[dbfield] = item[field];
            extrapolateService.update(item.ForecastUuid, obj);
        }
        function calculate() {
            extrapolateService.calculate(vm.countryPeriod.CountryPeriodUuid)
                .then(function(data) {
                    vm.list = data; 
                });
        }

        function updateForecast(forecastuuid) {
            return extrapolateService.selectSource(forecastuuid)
                .then(function() {
                    $scope.$broadcast("ex.update");
                });
        }
    }
})();