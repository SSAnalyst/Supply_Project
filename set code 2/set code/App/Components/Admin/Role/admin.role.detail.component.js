(function () {
    angular.module("app")
        .component("admin.role.detail",
        {
            bindings: {
                role: "<",
                permissions: "<",

            },
            templateUrl: "/Admin/RoleDetail",
            controller: ["adminRoleService", controller]
        });

    function controller(adminRoleService) {
        var vm = this;



        vm.addCombination = addCombination;
        vm.removeCombination = removeCombination;

        vm.addPermission = addPermission;

        function addCombination(permissionId) {
            return adminRoleService.addCombination(vm.role.RoleId, permissionId).then(getRole);
        }

        function addPermission() {
            var max = vm.permissions.reduce(function(prev, next) {
                    return next.PermissionId > prev ? next.PermissionId : prev;
                },0); 
           return adminRoleService
                .addPermission(vm.newPermission, max+1)
               .then(function (data) {
                   vm.permissions.push(data);
                    return adminRoleService.addCombination(vm.role.RoleId, data.PermissionId);
                }).then(function () {
                    vm.newPermission = undefined;
                    return getRole();
                });

        }

        function getRole() {
           return adminRoleService
                .getRole(vm.role.RoleId)
                .then(function(data) {
                    vm.role = data;
                   return data; 
               });
        }

        function removeCombination(permission) {
            adminRoleService
                .removeCombination(vm.role.RoleId, permission.PermissionId)
                .then(getRole);


        }
    }
})()