(function () {

    angular.module("app")
        .component("analysisComponent",
        {
            templateUrl: "/Set/Analysis",
            controller: [AnalysisController]

        });

    function AnalysisController() {
        var vm = this;
        vm.title = 'test';
    }

   


})();