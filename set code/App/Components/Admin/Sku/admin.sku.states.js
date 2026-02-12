(function () {



    angular.addState({
        name: "admin.sku",
        title: "SKU Administration",
        url: "/sku",
        helpText: "admin.sku",
        restrictPath: [function () {
            return "admin.sku";
        }],
        views: {
            "main@app": {
                component: "admin.sku"
            }
        },
        resolve: {
            list: [
                "adminSkuService", function (adminSkuService) {
                    return adminSkuService.getList();
                }
            ]

        }
    });


    angular.addState({
        name: "admin.sku.detail",
        title: "Detail",
        url: "/{id}",
        restrictPath: [function () {
            return "admin.sku";
        }],
        views: {
            "side@app": {
                component: "admin.sku.detail"
            }
        },
        resolve: {
            item: [
                "adminSkuService", "$stateParams", function (adminSkuService, $stateParams) {
                    return adminSkuService.get($stateParams.id);
                }
            ]
        }
    });

})();