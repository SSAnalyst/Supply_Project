(function () {



    angular.addState({
        name: "admin.role",
        title: "Role Administration",
        url: "/role",
        helpText: "admin.user",
        restrictPath: [function () {
            return "admin.role";
        }],
        views: {
            "main@app": {
                component: "admin.role"
            }
        },
        resolve: {
            roles: [
                "adminRoleService", function (adminRoleService) {
                    return adminRoleService.getRoleList();
                }
            ]

        }
    });


    angular.addState({
        name: "admin.role.detail",
        title: "Detail",
        url: "/{id}",
        restrictPath: [function () {
            return "admin.role";
        }],
        views: {
            "side@app": {
                component: "admin.role.detail"
            }
        },
        resolve: {
            role: [
                "adminRoleService", "$stateParams", function (adminRoleService, $stateParams) {
                    return adminRoleService.getRole($stateParams.id);
                }
            ],
            permissions: [
                "adminRoleService", function (adminRoleService) {
                    return adminRoleService.getPermissionList();
                    }
            ]
        }
    });

})();