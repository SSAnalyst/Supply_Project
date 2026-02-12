(function () {

    angular.module("app").run([
    "$transitions", "helpService","$q", function ($transitions, helpService,$q) {
        var matchCriteria = {};
        //console.log("helpInitinit", $transitions);
        var restrictFn = function (trans) {
            //console.log("helpInit", helpText);
            if (trans.dynamic()) return;
            var helpText = trans.to().helpText;
            //console.log("helpInit", helpText);
            if (angular.isString(helpText)) {
                helpService.current = helpText;


            } else if (angular.isArray(helpText)) {
                var arr = angular.copy(helpText);
                var func = arr.pop();
                var promises = [];
                arr.forEach(function (item) {
                    promises.push(trans.injector().getAsync(item));
                });
                $q
                    .all(promises)
                    .then(function (data) {
                        helpService.current = func.apply(this, data);
                    });

            } else {
                helpService.current = "noText";
            }
        }
        $transitions.onStart(matchCriteria, restrictFn);

    }
    ]);

})()