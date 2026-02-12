(function() {
    angular
        .module("app")
        .component("admin.country.detail",
        {
            bindings: { item: "<", brands: "<" },
            templateUrl: "/Admin/CountryDetail",
            controller: ["adminCountryService", controller]
        });

    function controller(adminCountryService) {
        var vm = this;
        vm.addBrand = addBrand;
        vm.removeBrand = removeBrand;

        function refresh() {
            return adminCountryService
                .getCountry(vm.item.CountryId)
                .then(function(data) {
                    vm.item = data;
                });
        }

        function addBrand(brand) {
            brand.loading = true;
            adminCountryService
                .addBrand(vm.item.CountryId, brand.BrandUuid)
                .then(refresh)
                .finally(function() {
                    brand.loading = false;
                });
        }

        function removeBrand(brand) {
            brand.loading = true;
            adminCountryService
                .removeBrand(vm.item.CountryId, brand.BrandUuid)
                .then(refresh);
        }
    }
})();