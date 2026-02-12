(function () {

    angular.module("app")
        .component("extrapolate.new",
        {
            bindings: {canEdit: "<", countryPeriod:"<", skus: "<" },
            templateUrl: "/Analysis/ExtrapolateNew",
            controller: ["$stateParams", "extrapolateService","$rootScope","$state", Controller]

        });

    function Controller($stateParams, extrapolateService, $rootScope, $state) {
        var vm = this;
        vm.add = add;
        vm.formatInput = formatInput;
        vm.item = {}; 


        vm.$onDestroy = function () {
            if (vm.changed) {
                $rootScope.$broadcast("ex.update");
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

            return (vm.skusById[$model] || { BayerSkuName: "" }).BayerSkuName;
        }

        function add(item, field, dbfield) {
            vm.changed = true;
            extrapolateService.add(vm.countryPeriod.CountryPeriodUuid, vm.item.TargetVolume, vm.item.BayerSkuUuid).then(function() {
                $state.go("^");

            });
        }

    }
})();