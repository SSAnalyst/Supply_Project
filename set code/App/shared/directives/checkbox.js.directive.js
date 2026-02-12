(function() {

    angular.module("app.addons")
        .directive("checkBox", [Directive]);

    function Directive() {
        return {
            restrict: "E",
            require:"ngModel",
            scope: {
                ngModel: "=",
                ngDisabled: "=",
                checkedIcon: "=",
                uncheckedIcon:"="
            }, 
            template:
                "<i ng-class=\"ngModel? checkedIcon||$root.Icons.good : uncheckedIcon||$root.Icons.bad\" " +
                   "ng-click=\"changeValue(ngModel)\"></i>",
            link: function(scope,ele, attr, ngModelCtrl) {
                scope.$watch("ngDisabled",
                    function (value) {
                       //console.log("disabledState", value);
                        if (value) {
                            ele.addClass("ng-disabled");
                        } else {
                            ele.removeClass("ng-disabled");
                        }
                    });
                scope.changeValue = function(newValue) {
                    if (!scope.ngDisabled) {
                        ngModelCtrl.$setViewValue(newValue ? 0 : 1);
                    }
                }
            }
        }
    }

})()