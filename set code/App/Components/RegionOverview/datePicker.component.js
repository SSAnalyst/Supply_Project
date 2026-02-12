(function () {

    angular.module("app")
        .component("regionOverview.datePicker",
        {
            bindings: {
                dateList: "<",
                test: "<"
            },
            templateUrl: '/RegionOverview/DatePicker',
            controller:[Controller]

        });

    function Controller() {
        var vm = this;
        //vm.currentDate = $stateParams.date;
    }


})();