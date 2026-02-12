(function () {
    angular.module("app.addons").factory("user", ["$odata", UserService]);
    function UserService($odata) {

      /*  var permissions = {
            Administrator: {
                read: {
                    allow: ["admin.*"]
                },
                write: {
                    allow: ["admin.*"]
                }
            },
            RegionalMarketDemandManager: {
                read: {
                    allow: ["country.*"]
                },
                write: {
                    allow: ["country.*.110|200|300|320|400|420|500|520|reset"]
                }
            },
            CountryCoordinator: {
                read: {
                    allow: ["country.#Country.*"]
                },
                write: {
                    allow: ["country.#Country.100|310|410|510"]
                }
            },
            RegionalMarketDemandAnalyst: {
                read: {
                    allow: ["country.*.*"]
                }, write: {
                    allow: []
                }
            }
        }*/

        var service = {
            Permissions: {
                read: {},
                write: {}
            },
            Cache: {
                read: {},
                write: {}
            },
            User: {},
            canRead: function (resource) {
                var res = hasPermission("read", resource);
                return res;
            },
            canWrite: function (resource) {
                return hasPermission("write", resource);
            },
            hasPermission: hasPermission,
            promise: $odata("CurrentUser")
                .extend("Countries,Roles/Permissions")
                .get()
                .then(function (data) {
                    service.allow = [];
                    service.deny = [];
                    var item = data.results;
                    service.Countries = item.Countries.map(function (country) {
                        return country.CountryId;
                    }).join("|");

                    item.Roles.forEach(function (role) {
                      
                        var permset = role.Permissions;

                        permset.forEach(function (rule) {
                            var permission = rule.PermissionName;
                            var operation = permission.substr(0, permission.indexOf("."));
                            permission = permission.replace(operation + ".", "");
                            var segments = permission.replace(/#Country/, service.Countries).split(".");
                            setPermissionRecursive(service.Permissions[operation], segments, operation);
                        });

                        /*permset.write.allow.forEach(function (rule) {
                            var segments = rule.replace(/#Country/, service.Countries).split(".");
                            setPermissionRecursive(service.Permissions.write, segments, "write");
                        });*/

                    });
                    //console.log("Permissions", service.Permissions);
                    service.User = item;
                    return service;
                }),
            updateNotification: function () {
                return $odata("AppUser")
                    .id(service.User.UserUuid)
                    .update({ EnableNotification: !service.User.EnableNotification ? 0 : 1 })
                    .then(function () {
                        // service.User.EnableNotification = !service.User.EnableNotification;
                    });
            }
        };

        function setPermissionRecursive(curbranch, segments, operation) {
            curbranch.permissions = curbranch.permissions || [];

            curbranch.permissions.push(segments);

        }

        function hasPermission(operation, resource) {
            if (service.Cache[operation][resource] === true || service.Cache[operation][resource] === false) {
                //console.log("Authorized from Cache: ", service.Cache[operation][resource])
                return service.Cache[operation][resource];
            }
            //console.log(operation, resource); 
            var perms = service.Permissions[operation].permissions;
            var res = resource.split(".");
            //console.log("Starting auth: ", operation, resource);
            if (!perms) return false; 
            for (var j = 0; j < perms.length; j++) {
                var auth = 0;
                var length = perms[j].length > res.length ? res.length : perms[j].length;
                for (var i = 0; i < length; i++) {

                    if (perms[j][i] && perms[j][i].indexOf(res[i]) >= 0 || perms[j][i] === "*") {
                        auth++;
                        //console.log("checked", perms[j][i], res[i]);
                    } else {
                        //console.log("failed", perms[j][i], res[i]);
                    }

                }
                if (auth === length) {
                    //console.log("User authenticated for: ", operation, res.join("."), "by Rule: ", perms[j].join("."));
                    service.Cache[operation][resource] = true;
                    return true;
                }

            }
            //console.log("No auth for ", operation, res.join("."));
            service.Cache[operation][resource] = false;
            return false;
        }

        return service;
    }
})();