(function () {

    angular.module("app")
        .component("regionOverview",
        {
            bindings: { countryList: '<' },
            templateUrl: ["$stateParams",function($stateParams) {
                var root = "/RegionOverview/";
                return root + $stateParams.view + "View";
            }],
            controller: [Controller]

        });

    function Controller() {
        var vm = this;
        vm.taskFilter = taskFilter;
        function taskFilter(statusId) {
            return function (item) {
                return item.StatusId >= statusId
                    && item.StatusId < statusId + 100;
            }
        }
    }
})();