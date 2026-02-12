(function () {

    angular.module("app")
        .component("regionOverview.viewPicker",
        {
            templateUrl: '/RegionOverview/ViewPicker',
            controller: ["$stateParams","$state", Controller]

        });

    function Controller($stateParams, $state) {

        var vm = this; 
        vm.views = {
            country: {
                id: "country",
                state: "regionOverview.view",
                params: { view: "country" },
                Name: "Region overview by country"
            },
            task: {
                id: "task",
                state: "regionOverview.view",
                params: { view: "task" },
                Name: "Region Overview by task"
            },
            matrix: {
                id: "matrix",
                state: "regionOverview.view",
                params: { view: "matrix" },
                Name: "Region overview matrix"
            },
            reports: {
                id: "reports",
                state: "roReport",
                params: {
                    dashboard: "Summary",
                    report: "EmergencyChannel",
                    version: "R6"
                },
                Name: "Reports"
            },
            financials: {
                id: "financials",
                state: "financials",
                params: {
                    dashboard: "Summary",
                    report: "Summary",
                    version: "R6"
                },
                Name: "InMarket Financials"
            }

        };
        vm.$onInit = function () {
            //console.log($state.current, $stateParams)
            vm.date = $stateParams.date;

            if ($state.current.name.indexOf("financials") === 0) {
                vm.selectView(vm.views.financials);
            }else if ($stateParams.view) {
                vm.selectView(vm.views[$stateParams.view]);
            } else {
                vm.selectView(vm.views.reports);
            }
        }
        vm.selectView = function(view) {
            vm.currentView = view;
            vm.showPopover = false; 
        }
    }


})();