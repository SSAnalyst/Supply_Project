(function () {
    angular.module("app")
        .component("financials.report",
            {
                bindings: {
                
                   reports:"<"
                },

                templateUrl: "/Financials/Report",
                controller: ["$stateParams", "dateService", "financials.service", Controller]

            });

    function Controller($stateParams, dateService, service) {

        var vm = this;

        vm.$onInit = function () {
            vm.$stateParams = $stateParams

        }


    }
})();