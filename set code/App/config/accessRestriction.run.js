(function () {

    angular.module("app").run([
        "$transitions", "user", "$q","toaster", function ($transitions, user, $q, toaster) {
            var matchCriteria = { to: function (state) { return state.restrictPath != null; } };
            var restrictFn = function (trans) {

                if (trans.dynamic()) return true;
                var restriction = trans.to().restrictPath;
                //console.log("From:", trans.from());
                if (angular.isString(restriction)) {
                    if (!user.canRead(restriction)) {
                        return reject(trans);
                    }
                    return true;
                } else {
                    var arr = angular.copy(restriction);
                    var func = arr.pop();
                    var promises = [];
                    arr.forEach(function (item) {
                        promises.push(trans.injector().getAsync(item));
                    });
                    return user.promise.then(function () {
                        return $q
                            .all(promises)
                            .then(function (data) {
                                var resolvedRestriction = func.apply(this, data);

                                if (!resolvedRestriction || !user.canRead(resolvedRestriction)) {
                                    return reject(trans); 
                                }
                                return true;
                            });
                    });

                }

            };
            $transitions.onStart(matchCriteria, restrictFn);

            function reject(trans) {
                if (trans.from().name == "") {
                    toaster.pop("error",
                        "Not Authorized",
                        "The link you followed directs to a restricted resource not shared with you");
                    return trans.router.stateService.target("regionOverview.view", {view: "matrix"});
                }; 
                return $q.reject("Not Authorized");
            }
        }
    ]);


})()