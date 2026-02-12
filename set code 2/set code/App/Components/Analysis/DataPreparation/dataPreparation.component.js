(function () {

    angular.module("app")
        .component("preparationList",
        {
            bindings: {
                list: "<",
                skus: "<",
                countryPeriod: "<",
                canEdit: "<"
            },
            templateUrl: "/Analysis/dataPreparation",
            controller: [
                "$stateParams",
                "dataPreparationService",
                "$scope",
                "$uibModal",
                "$state",
                controller]
        });

    function controller(
        $stateParams,
        dataPreparationService,
        $scope,
        $uibModal,
        $state
    ) {
        var vm = this;
        vm.filter = filter;
        vm.Update = Update;
        vm.canFinalize = canFinalize;
        vm.finalize = finalize;
        vm.search = {};
        vm.UpdateSku = UpdateSku;
        vm.formatInput = formatInput;

        function finalize() {
            var text = "All information have been maintained. If confirmed no more changes are possible and the regional market demand manager will be informed.";
            if (vm.countryPeriod.StatusId == 110) {
                text =
                    "All information have been reviewed and adjusted if needed. If confirmed no more changes are possible.";
            }

            var modal = $uibModal.open({
                animation: true,
                controller: ["$scope", function ($scope) {
                    $scope.Title = "Confirmation";
                    $scope.Body = text;
                }]
            });

            modal.result.then(function (data) {
                if (data) {
                    vm.finalizing = true; 
                    dataPreparationService
                        .finalize(vm.countryPeriod.CountryPeriodUuid)
                        .then(function () {
                            $state.go("^", undefined, { reload: true });
                        }).finally(function() {
                            vm.finalizing = false; 
                        });
                } else {
                    console.log("resolved false");
                }
            });

        }


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
                    view = item.IsNew;
                    break;
                case "isBayer":
                    view = item.IsBayer;
                    break;
            };
            return view;
        }

        function UpdateSku(obj) {
            //console.log(obj);
            obj.BayerSkuName = obj.BayerSkuUuid.BayerSkuName;
            var newObj = { BayerSkuUuid: obj.BayerSkuUuid.BayerSkuUuid }

            if (obj.DataTypeId === 1) {
                dataPreparationService.updateBrick(obj.ItemUuid, newObj);
            } else if (obj.DataTypeId === 2) {
                dataPreparationService.updateNational(obj.ItemUuid, newObj);
            }
        }


        function formatInput($model, item) {

            if (!vm.skusById) {
                var o = {};
                vm.skus.forEach(function (item) {
                    o[item.BayerSkuUuid] = item;
                });

                vm.skusById = o;
            }

            if ($model && vm.skusById[$model] && (vm.skusById[$model].BayerSkuName != item.BayerSkuName)) {
                item.BayerSkuName = vm.skusById[$model].BayerSkuName;
            }
            return (vm.skusById[$model] || { BayerSkuName: "" }).BayerSkuName;
        }

        function Update(obj, field, dbField) {
            dbField = dbField || field;
            var newObj = {}
            newObj[dbField] = obj[field];
            if (obj.DataTypeId === 1) {
                dataPreparationService.updateBrick(obj.ItemUuid, newObj).then(successUpdate(obj, field), errorUpdate(obj, field));
            } else if (obj.DataTypeId === 2) {
                dataPreparationService.updateNational(obj.ItemUuid, newObj).then(successUpdate(obj, field), errorUpdate(obj, field));
            }
        }

        function successUpdate(item, field) {
            return function() {
                item.error = item.error || {};
                delete(item.error[field]);
            }
        }
        function errorUpdate(item, field) {
      
            return function (error) {
                console.log("error", item, field);
                item.error = item.error || {};
                item.error[field] = error; 
            }
        }

        function canFinalize() {
            if (!vm.canEdit || vm.finalizing) {
                return false;
            }

            var falseItem = vm.list.find(function (item) {
                return (item.IsBayer && !item.BayerSkuUuid) || Object.keys(item.error || {}).length > 0;
            });

            return !falseItem;
        }

        $scope.$on("dataPrepChanged",
            function () {
                //console.log("logged change");
                dataPreparationService.list(vm.countryPeriod.CountryPeriodUuid)
                    .then(function (data) {
                        vm.list = data;
                    });
            });
    }
})();