(function () {

    angular.module("app")
        .component("cockpit.extrapolate",
        {
            bindings: {
                countryPeriod: "<"
            },
            //template: '<div class="info-field"><i class="{{$root.Icons.info}}"></i>&nbsp;Not yet started</div>',
            templateUrl: "/Analysis/CockpitExtrapolate",
            controller: ["extrapolateService", Controller]

        });

    function Controller(extrapolateService) {
        var vm = this; 

        vm.$onInit = function() {
            getCountList();
        }

        function getCountList() {
            extrapolateService.list(vm.countryPeriod.CountryPeriodUuid)
                .then(function(data) {
                    var info = {
                        ItemCount: data.length,
                        ApprovedCount: data.filter(function(item) {
                                return item.FcApproved;
                            })
                            .length
                    }
                    vm.Info = info; 
                });
        }
    }

})();