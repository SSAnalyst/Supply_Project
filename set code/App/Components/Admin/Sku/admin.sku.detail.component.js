(function () {
    angular.module("app")
        .component("admin.sku.detail",
        {
            bindings: {
                item: "<"
            },
            templateUrl: "/Admin/SkuDetail",
            controller: ["adminSkuService", controller]
        });

    function controller(adminService) {

    }
})()