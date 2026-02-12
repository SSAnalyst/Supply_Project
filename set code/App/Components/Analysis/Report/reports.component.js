(function () {

    angular.module("app")
        .component("reports",
        {
            bindings: {
                list: "<",
                reports: "<",
                countryPeriod: "<"
            },
            // template: '<div class="info-field"><i ng-class="$root.Icons.info"></i>&nbsp;Not yet starteds</div>',
            templateUrl: "/Analysis/Reports",
            controller: ["$stateParams","dateService",  Controller]

        });

    function Controller($stateParams, dateService) {

        var vm = this;
        vm.colorCodeESEP = colorCodeESEP;

        function setMonths() {
            vm.months = dateService.pastList(vm.countryPeriod.PeriodId);

        }

        function colorCodeESEP(value) {
            var abs = Math.abs(value);
            if (abs >= .2) {
                return "reportDanger";
            } else if (abs >= .1) {
                return "reportWarning";

            } else {
                return "reportOk";
            }
        }

        vm.$onInit = function () {
            setMonths();
            vm.Report = vm.reports.find(function(item) {
                return item.ServiceFunction == $stateParams.report;
            });
        }
    }

})();