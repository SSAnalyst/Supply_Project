(function () {
    angular.module("app")
        .component("admin.sku",
        {
            bindings: {
                list: "<"
            },
            templateUrl: "/Admin/Sku",
            controller: ["adminSkuService", "$scope", "$state", controller]
        });

    function controller(adminSkuService, $scope, $state) {
        var vm = this;
       
    }

})()