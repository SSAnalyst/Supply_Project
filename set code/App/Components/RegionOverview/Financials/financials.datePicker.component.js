(function () {

    angular.module("app")
        .component("financials.datePicker",
            {
                bindings: {
                    dateList: "<"
                },
                templateUrl: '/Financials/DatePicker',
                controller: [Controller]

            });

    function Controller() {
        var vm = this;
        //vm.currentDate = $stateParams.date;
    }


})();