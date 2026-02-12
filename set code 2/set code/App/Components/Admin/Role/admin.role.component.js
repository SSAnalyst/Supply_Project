(function () {
    angular.module("app")
        .component("admin.role",
        {
            bindings: {
                roles: "<"
            },
            templateUrl: "/Admin/Role",
            controller: ["adminRoleService", "$scope", "$state", controller]
        });

    function controller(adminRoleService, $scope, $state) {
        var vm = this;
        vm.adUser = [];
        vm.addRole = addRole;

        function addRole() {
            var max = vm.roles.reduce(function(prev, next) {
                return next.RoleId > prev ? next.RoleId : prev; 
                },0);
            adminRoleService.addRole(vm.newRole, max+1).then(function(data) {
                vm.roles.push(data);
                vm.newRole = undefined;
            });
        }
    }

})()