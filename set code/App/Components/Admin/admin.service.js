(function(angular) {
    "use strict";
    angular.module("app")
        .factory("adminService", ["$odata", Service]);

    function Service($odata) {


        var service = {
            getUserList: function() {
                return $odata("AppUser")
                    .extend("Roles,Countries")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            getUser: function(id) {
                return $odata("AppUser")
                    .id(id)
                    .extend("Roles,Countries,ADUser")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            getCountryList: function() {
                return $odata("Country")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });

            },
            getRoleList: function() {
                return $odata("Approle")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            updateUser: function(id, user) {
                return $odata().id(id).update(user);
            },
            addRole: function(userId, roleId) {
                return $odata("AppUserRole")
                    .add({
                        UserUuid: userId,
                        RoleId: roleId
                    });
            },
            removeRole: function(userId, roleId) {
                return $odata("AppUserRole")
                    .delete({
                        RoleId: roleId,
                        UserUuid: userId
                    });
            },
            addCountry: function(userId, countryId) {
                return $odata("AppUserCountry")
                    .add({
                        UserUuid: userId,
                        CountryId: countryId
                    });
            },
            removeCountry: function(userId, countryId) {
                return $odata("AppUserCountry")
                    .delete({
                        UserUuid: userId,
                        CountryId: countryId
                    });
            },
            getADUserList: function() {
                return $odata("ADUser").get();
            },
            addUser: function(cwid, email, username) {
                return $odata("AppUser")
                    .add({
                        UserCwid: cwid,
                        EmailAddress: email,
                        DisplayName: username,
                        EnableNotification: 1
                    });

            },
            update: function(id, obj) {
                return $odata("AppUser").id(id).update(obj); 
            }
        };

        return service;
    }

})(angular);