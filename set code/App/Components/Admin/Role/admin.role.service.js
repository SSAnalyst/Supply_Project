(function (angular) {
    "use strict";
    angular.module("app")
        .factory("adminRoleService", ["$odata", Service]);

    function Service($odata) {


        var service = {
            getRoleList: function () {
                return $odata("AppRole")
                    .extend("Permissions")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            },
            getPermissionList: function() {
                return $odata("AppPermission")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            },
            getRole: function (id) {
                return $odata("AppRole")
                    .id(id)
                    .extend("Permissions")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            },
            addRole: function (roleName,roleId) {
                return $odata("AppRole")
                    .add({
                        RoleId: roleId,
                        RoleName: roleName
                    });
            },
            removeRole: function (roleId) {
                return $odata("AppRole")
                    .id(roleId)
                    .delete();
            },
            addPermission: function (permissionName, permissionId) {
                return $odata("AppPermission")
                    .add({
                        PermissionName: permissionName, 
                        PermissionId: permissionId
                    });
            },
            removePermission: function (permissionId) {
                return $odata("AppPermission")
                    .id(permissionId)
                    .delete();
            },
            addCombination: function(roleId, permissionId) {
                return $odata("AppRolePermission").add({
                    RoleId: roleId,
                    PermissionId: permissionId,

                });
            },
            removeCombination: function (roleId, permissionId) {
                return $odata("AppRolePermission")
                    .delete({
                        RoleId: roleId,
                        PermissionId: permissionId
                    });

            }
        };

        return service;
    }

})(angular);