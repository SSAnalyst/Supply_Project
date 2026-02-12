(function () {
    angular.module("app.addons")
        .directive("number", ["$filter","numberFactory", filter]);

    function filter ($filter) {
        var FLOAT_REGEXP_1 = /^-?\d{1,3}(\.\d{3})*(\,\d{0,2})?$/; //Numbers like: 1.123,56
        var FLOAT_REGEXP_2 = /^-?\d{1,3}(,\d{3})*(\.\d{0,2})?$/; //Numbers like: 1,123.56
        var FLOAT_REGEXP_3 = /^-?\d+(\.\d{0,2})?$/; //Numbers like: 1123.56
        var FLOAT_REGEXP_4 = /^-?\d+(\,\d{0,2})?$/; //Numbers like: 1123,56

        return {
            require: "ngModel",
            restrict: "A",
            scope: {number:"<"},
            link: function (scope, elem, attrs, ctrl) {
               

                function parser(viewValue) {
                    if (viewValue===undefined || viewValue === "" || viewValue === null) {
                        ctrl.$setValidity("number", true);
                        return null;
                    }
                    if (FLOAT_REGEXP_1.test(viewValue)) {
                   
                        ctrl.$setValidity("number", true);
                        return parseFloat(viewValue.replace(".", "").replace(",", ".")).toFixed(scope.number);
                    } else if (FLOAT_REGEXP_2.test(viewValue)) {
                        ctrl.$setValidity("number", true);
                    
                        return parseFloat(viewValue.replace(",", "")).toFixed(scope.number);
                    } else if (FLOAT_REGEXP_3.test(viewValue)) {
                        ctrl.$setValidity("number", true);
                     
                        return parseFloat(viewValue).toFixed(scope.number);
                    } else if (FLOAT_REGEXP_4.test(viewValue)) {
                        ctrl.$setValidity("number", true);
                   
                        return parseFloat(viewValue.replace(",", ".")).toFixed(scope.number);
                    } else {
                        ctrl.$setValidity("number", false);
                     
                        return undefined;
                    }
                }

                function format(modelValue) {
                
                    scope.number = scope.number || 0;
                    return $filter("number")(parseFloat(modelValue), scope.number*1);
                }
                ctrl.$parsers.unshift(parser);
                ctrl.$formatters.unshift(format);
                elem.blur(function () {
                 //console.log("blured", scope.ngModel, ctrl);
                    ctrl.$viewValue = format(ctrl.$modelValue);
                    ctrl.$render();
                });
            }
        };
    }
})();