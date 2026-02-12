(function () {

    angular.module("app")
        .component("cockpit",
        {
            bindings: {
                country: "<",
                countryPeriod: "<"
            },
            templateUrl: "/Analysis",
            controller: ["toaster","$uibModal","cockpitService","$state",Controller]

        });

    function Controller(toaster, $uibModal, cockpitService, $state) {
        var vm = this; 
        vm.title = "cockpit";

        vm.$onInit = function () {
       
        }

        vm.reset = function () {
            var modal = $uibModal.open({
                animation: true,
                controller: ["$scope", function ($scope) {
                    $scope.Title = "Confirmation";
                    $scope.Body = "Are you sure that you want to Reset the Status?";
                    $scope.Icons = "warning";

                }]
            });

            modal.result.then(function (data) {
                if (data) {
                    cockpitService
                        .reset(vm.countryPeriod.CountryPeriodUuid)
                        .then(function () {
                            $state.reload();
                        });
                } else {
                    //console.log("resolved false");
                }
            });
        }
    }

})();