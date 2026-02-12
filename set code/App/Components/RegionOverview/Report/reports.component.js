(function () {

    angular.module("app")
        .component("regionOverview.reports",
        {
            bindings: {
                list: "<",
                reports: "<",
                countryList: "<",
                brands: "<",
                currentBrand: "<",
                currentCountry: "<"
            },
            // template: '<div class="info-field"><i ng-class="$root.Icons.info"></i>&nbsp;Not yet starteds</div>',
            templateUrl: "/RegionOverview/Reports",
            controller: ["$stateParams", "dateService", "regionOverview.ReportService", Controller]

        });

    function Controller($stateParams, dateService, reportService) {

        var vm = this;

        function setMonths(date) {

            date = date || $stateParams.date;
            //console.log("dateRefresh", date); 
            vm.months = dateService.pastList($stateParams.date);
        }

        vm.$onInit = function () {
            setMonths();
            vm.Report = reportService.report($stateParams);
            //console.log("Init Reports");
            vm.countryList.forEach(function(item) {
                var isTier1 = item.Tier === 1;
                item.selected = isTier1 && item.StatusId === 600;
            });
        }
    }

})();