(function () {
    angular.module("app")
        .component("admin.user.detail",
        {
            bindings: {
                user: "<",
                countries: "<",
                roles: "<"
            },
            templateUrl: "/Admin/UserDetail",
            controller: ["adminService", controller]
        });

    function controller(adminService) {


        var vm = this;
        vm.addRole = addRole;
        vm.removeRole = removeRole;
        vm.addCountry = addCountry;
        vm.removeCountry = removeCountry;
        vm.update = update; 

        function refreshUser() {
            return adminService.getUser(vm.user.UserUuid)
                .then(function (data) {
                    vm.user = data;
                });
        }


        function addRole(role) {
            role.loading = true;
            adminService.addRole(vm.user.UserUuid, role.RoleId)
                .then(refreshUser)
                .finally(function () {
                    role.loading = false;
                });
        }

        function addCountry(country) {
            country.loading = true;
            adminService.addCountry(vm.user.UserUuid, country.CountryId)
                .then(refreshUser)
                .finally(function () {
                    country.loading = false;
                });;
        }

        function removeRole(role) {
            role.loading = true;
            adminService.removeRole(vm.user.UserUuid, role.RoleId).then(refreshUser);
        }

        function removeCountry(country) {
            country.loading = true;
            adminService.removeCountry(vm.user.UserUuid, country.CountryId).then(refreshUser);
        }

        function update(field, obj) {
            var newobj = {};
            newobj[field] = obj[field];
            return adminService.update(obj.UserUuid, newobj);
        }
    }
})()