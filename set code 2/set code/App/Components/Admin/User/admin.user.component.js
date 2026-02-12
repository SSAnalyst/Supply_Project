(function () {
    angular.module("app")
        .component("admin.user",
        {
            bindings: {
                users: "<",
                countries: "<",
                roles: "<"
            },
            templateUrl: "/Admin/User",
            controller: ["adminService", "$scope", "$state", controller]
        });

    function controller(adminService, $scope, $state) {
        var vm = this;
        vm.adUser = [];
        vm.getADUser = getAdUser;

        function getAdUser() {
            adminService.getADUserList().then(function (data) {
                vm.adUser = data;
            });
        }

        getAdUser();

        $scope.$watch("$ctrl.newUser",
            function (cur, prev) {
                //console.log(cur, prev);
                if (cur === prev || !cur || !angular.isObject(cur)) return;
                var user = vm.users.find(function (item) {
                    return cur.LoginName === item.UserCwid;
                });
                if (user) {
                    $state.go("admin.user.detail", { id: user.UserUuid });
                } else {
                    adminService
                        .addUser(cur.LoginName, cur.Email, cur.Title)
                        .then(function (data) {
                            $state.go("admin.user.detail", { id: data.UserUuid });
                            adminService
                                .getUser()
                                .then(function (data) {
                                    vm.users = data;
                                });
                        });
                }
            });
    }

})()