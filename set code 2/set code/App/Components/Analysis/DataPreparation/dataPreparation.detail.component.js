(function () {

    angular.module("app")
        .component("preparation.detail",
        {
            bindings: {
                item: "<",
                skus: "<",
                canEdit:"<"
            },
            templateUrl: "/Analysis/dataPreparationDetail",
            controller: ["$rootScope", "dataPreparationService", Controller]
        });

    function Controller($rootScope, dataPreparationService) {
        //console.log("Init Detail");
        var vm = this;
        vm.Update = Update;
        vm.changed = false;
        vm.UpdateSku = UpdateSku;
        vm.formatInput = formatInput;
        vm.approve = approve;

        function approve(item) {
            var newObj = {
                LimitRegion: item.LimitCountry || item.LimitCalc,
                LimitApproved: item.LimitApproved
            };
            return patientDemandValidationService.update(item.MarketDemandBrickUuid, newObj);
        }

        function Update(obj, field) {
            var newObj = {}
            newObj[field] = obj[field];
            vm.changed = true;
            if (obj.DataTypeId == 1) {
                dataPreparationService.updateBrick(obj.ItemUuid, newObj);
            } else if (obj.DataTypeId == 2) {
                dataPreparationService.updateNational(obj.ItemUuid, newObj);
            }
        }

        function UpdateSku(obj) {
         
            var newObj = { BayerSkuUuid: obj.BayerSkuUuid.BayerSkuUuid }

            if (obj.DataTypeId === 1) {
                dataPreparationService.updateBrick(obj.ItemUuid, newObj);
            } else if (obj.DataTypeId === 2) {
                dataPreparationService.updateNational(obj.ItemUuid, newObj);
            }
        }


        function formatInput($model) {

            if (!vm.skusById) {
                var o = {};
                vm.skus.forEach(function (item) {
                    o[item.BayerSkuUuid] = item;
                });

                vm.skusById = o;
            }

            return (vm.skusById[$model] || { BayerSkuName: $model }).BayerSkuName;
        }

        vm.$onDestroy = function () {

            console.log("emitting destroy");
            if (vm.changed) {
                $rootScope.$broadcast("dataPrepChanged");
            }
        }

    }



})();