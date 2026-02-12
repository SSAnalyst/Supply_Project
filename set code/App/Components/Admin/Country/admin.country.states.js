(function () {

    angular.addState({
        name: "admin.country",
        title: "Country Administration",
        helpText: "admin.country",
        url: "/country",
        restrictPath: [function () {
            return "admin.country";
        }],
        views: {
            "main@app": {
                component: "admin.country"
            }
        },
        resolve: {
            list: ["adminCountryService", function (adminCountryService) {
                return adminCountryService.getCountryList();
            }],
            brands: ["adminCountryService", function (adminCountryService) {
                return adminCountryService.getBrandList();
            }]
        }
    });

    angular.addState({
        name: "admin.country.detail",
        title: "Detail",
        url: "/{id}",
        restrictPath: [function () {
            return "admin.country";
        }],
        views: {
            "side@app": {
                component: "admin.country.detail"
            }
        }, resolve: {
            item: ["adminCountryService", "$stateParams", function (adminCountryService, $stateParams) {
                return adminCountryService.getCountry($stateParams.id);
            }]
        }
    });


})();