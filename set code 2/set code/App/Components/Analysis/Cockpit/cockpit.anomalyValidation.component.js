(function () {

    angular.module("app")
        .component("cockpit.anomalyValidation",
        {
            bindings: {
                countryPeriod: "<"
            },
            // template: '<div class="info-field"><i ng-class="$root.Icons.info"></i>&nbsp;Not yet starteds</div>',
            templateUrl: "/Analysis/CockpitAnomalyValidation",
            controller: ["anomalyValidationService",Controller]

        });

    function Controller(anomalyValidationService) {

        var vm = this;
        vm.Info = {
            PotentialAnomalyCount: 0,
            AnomalyCount: 0,
            CommentCount: 0,
            ApprovedCount: 0,
            PreApprovedCount: 0
        }
        vm.$onInit = function() {
            anomalyValidationService.listCount(vm.countryPeriod.BrickUploadUuid)
                .then(function (data) {
                    vm.Info = data; 
                });
        }
    }

})();