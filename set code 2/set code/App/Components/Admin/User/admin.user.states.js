(function () {



    angular.addState({
        name: "admin.user",
        title: "User Administration",
        url: "/user",
        helpText: "admin.user",
        restrictPath: [function () {
            return "admin.user";
        }],
        views: {
            "main@app": {
                component: "admin.user"
            }
        },
        resolve: {
            users: [
                "adminUserService", function (adminUserService) {
                    return adminUserService.getUserList();
                }
            ]

        }
    });


    angular.addState({
        name: "admin.user.detail",
        title: "Detail",
        url: "/{id}",
        restrictPath: [function () {
            return "admin.user";
        }],
        views: {
            "side@app": {
                component: "admin.user.detail"
            }
        },
        resolve: {
            user: [
                "adminUserService", "$stateParams", function (adminUserService, $stateParams) {
                    return adminUserService.getUser($stateParams.id);
                }
            ],
            countries: [
                    "adminUserService", function (adminUserService) {
                        return adminUserService.getCountryList();
                    }
            ],
            roles: [
                "adminUserService", function (adminUserService) {
                    return adminUserService.getRoleList();
                }
            ]
        }
    });

})();