(function () {
    angular.module("app")
        .component("patientDemandValidation",
        {
            bindings: {
                list: "<",
                countryPeriod: "<",
                canEdit: "<",
                comments: "<"
            },
            templateUrl: "/Analysis/patientDemandValidation",
            controller: ["$stateParams", "patientDemandValidationService", "$scope", "$state", "$uibModal", Controller]

        });

    function Controller($stateParams, patientDemandValidationService, $scope, $state, $uibModal) {

        var vm = this;
        vm.filter = filter;
        vm.canFinalize = canFinalize;
        vm.finalize = finalize;
        vm.update = update;
        vm.search = {};
        vm.Skus = {};
        vm.approve = approve;

        function canFinalize() {
            if (!vm.canEdit || vm.finalizing) return false;
            if (vm.countryPeriod.StatusId === 410) {

                var bad = vm.list.find(function (item) {
                    return item.LimitCountry && item.LimitRegion !== item.LimitCountry && !item.LimitComment;
                });
                if (bad) {
                    return false;
                }
            }

            return true;
        }

        function finalize() {
            var text =
    "All monthly limits are correct. If confirmed no more changes are possible and the country coordinator will be informed.\r\n";
            switch (vm.countryPeriod.StatusId) {
                case 400:
                    break;
                case 410:
                    text =
                        "All monthly limits are correct and other monthly limits have been proposed where the original calculation was incorrect. If confirmed no more changes are possible and the regional market demand manager will be informed.";
                    break;
                case 420:
                    text =
                        "All monthly limits are correct. If monthly limits have been proposed, they are accepted and correctly documented. If confirmed no more changes are possible.";
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
                    patientDemandValidationService
                        .finalize(vm.countryPeriod.CountryPeriodUuid)
                        .then(function () {
                            vm.finalizing = false;
                            $state.go("^", { reload: true });
                        },
                            function() {
                                vm.finalizing = false;
                            });
                } else {
                    console.log("resolved false");
                }
            });


        }

        function update(item, field, dbField) {
            dbField = dbField || field;
            var newObj = {};
            newObj[dbField] = item[field];
            return patientDemandValidationService.update(item.MarketDemandBrickUuid, newObj);
        }

        function approve(item) {
            var newObj = {
                LimitApproved: item.LimitApproved
            };
            if (item.LimitApproved) {
                newObj.LimitRegion = item.LimitCountry || item.LimitCalc;
            }
            return patientDemandValidationService.update(item.MarketDemandBrickUuid, newObj).then(function () {
                if (item.LimitApproved) {
                    item.LimitRegion = newObj.LimitRegion;
                }
            });;
        }

        vm.$onInit = function () {
            createSKUs();
        }
        vm.approveAll = approveAll;
        function approveAll() {
            patientDemandValidationService.approveAll(vm.countryPeriod.CountryPeriodUuid)
                .then(function () {
                    $scope.$broadcast("pdv.update");
                });
        }

        function createSKUs() {
            var skus = {};
            vm.list.forEach(function (item) {
                skus[item.Sku] = skus[item.Sku] ||
                {
                    Sku: item.Sku,
                    Bricks: []
                };
                var s = skus[item.Sku];
                s.Bricks.push(item);
                for (var i = 1; i <= 24; i++) {
                    var unit = "Unit" + i;
                    s[unit] = s[unit] || 0;
                    var limit = item.LimitRegion;
                    s[unit] += item[unit] > parseInt(limit) && limit !== null ? parseInt(limit) : parseInt(item[unit]);
                }
            });
            vm.Skus = skus;
        }

        $scope.$watch("$ctrl.list",
            function (cur, prev) {

                if (cur !== prev) {
                    //console.log("registered change", cur, prev);
                    createSKUs();
                }
            },
            true);

        $scope.$on("pdv.update",
            function () {
                patientDemandValidationService.list(vm.countryPeriod.BrickUploadUuid, vm.countryPeriod.PeriodId)
                    .then(function (data) {
                        vm.list = data;
                        createSKUs();
                    });
            });

        function filter(item) {

            var view = true;
            switch ($stateParams.view) {
                case "all":
                    view = true;
                    break;
                case "limited":
                    view = item.LimitRegion;
                    break;
                case "notLimited":
                    view = !item.LimitCalc && !item.LimitRegion && !item.LimitCountry;
                    break;
                case "accepted":
                    view = item.LimitApproved;
                    break;
                case "notAccepted":
                    view = !item.LimitApproved;
                    break;
                case "edited":
                    view = item.LimitCalc !== item.LimitRegion || item.LimitCalc !== item.LimitCountry;
                    break;
            };
            return view;
        }
    }
})();