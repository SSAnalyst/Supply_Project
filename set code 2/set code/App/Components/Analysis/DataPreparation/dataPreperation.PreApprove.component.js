(function() {
    angular.module("app")
        .component("preperation.preApprove",
        {
            bindings: {
                countryPeriod: "<",
                bricks: "<",
                canEdit: "<"
            },
            templateUrl: "/Analysis/PreApprove",
            controller: ["dataPreparationService", controller]
        });

    function controller(dataPreperationService) {


        var vm = this;
        vm.update = update; 

        function update(field, obj) {
            var newObj = {};
            newObj[field] = obj[field];

            dataPreperationService.updatePreApprove(obj.PreApprovedBrickUuid, newObj);
        }
    }

})();