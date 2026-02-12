(function () {

    angular.module("app")
        .component("analysis.picker",
        {
            bindings: {
                dateList: "<",
                countryList: "<"
            },
            templateUrl: '/analysis/picker',
            controller: [analysisPickerController]

        });

    function analysisPickerController() {
      
    }


})();