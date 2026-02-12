(function () {

    angular.module("app")
        .component("cockpit.calculateVPD",
        {
            bindings: { countryPeriod: "<" },
            // template: '<div class="info-field"><i class="{{$root.Icons.info}}"></i>&nbsp;Not yet started</div>',
            templateUrl: "/Analysis/CockpitPDV",
            controller: ["patientDemandValidationService", Controller]

        });

    function Controller(patientDemandValidationService) {
        var vm = this;

        vm.$onInit = function () {

            patientDemandValidationService
                .list(vm.countryPeriod.BrickUploadUuid, vm.countryPeriod.PeriodId)
                .then(function (data) {
                    var skus = {};
                    var bricks = {};
                    var info = {
                        ItemCount: data.length,
                        CommentCount: 0,
                        ApprovedCount: 0,
                        SkuCount: 0,
                        BrickCount: 0
                    };
                    data.forEach(function (item) {
                        skus[item.Sku] = 1;
                        bricks[item.Brick] = 1;
                        if (item.LimitComment) {
                            info.CommentCount++;
                        }
                        if (item.LimitApproved) {
                            info.ApprovedCount++;
                        }


                    });
                    info.SkuCount = Object.keys(skus).length;
                    info.BrickCount = Object.keys(bricks).length;
                    vm.Info = info;
                });
        }
    }

})();