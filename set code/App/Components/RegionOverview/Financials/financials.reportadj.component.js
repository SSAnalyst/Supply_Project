(function () {
    angular.module("app")
        .component("financials.reportadj",
            {
                bindings: {
                  
                   reports:"<"
                },

                templateUrl: "/Financials/ReportAdjusted",
                controller: ["$stateParams", "dateService", "financials.service", Controller]

            });

    function Controller($stateParams, dateService, service) {

        var vm = this;

        vm.$onInit = function () {
            vm.$stateParams = $stateParams
        }


    }
})();