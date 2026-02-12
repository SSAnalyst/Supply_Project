(function () {
    angular.module("app")
        .config(['$urlRouterProvider', function ($urlRouterProvider) {


            $urlRouterProvider.when("/{date}/reports", "/{date}/reports/KPI/KLM/");
            $urlRouterProvider.otherwise("/");

          
        }]);


    angular.addState = function (state) {
        angular.module("app")
            .config(["$stateProvider", function ($stateProvider) {
                $stateProvider.state(state);
            }]);
    }
})()