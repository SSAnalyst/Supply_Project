(function() {
    angular.module("app")
    .directive('numberscale', [
        "$parse", "$filter", "numberscaleservice", "$rootScope", function ($parse, $filter, numberSvc, $rootScope) {

            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    function format() {
                        var viewValue = ngModel.$modelValue;
                        if (isNaN(viewValue)) {
                            return viewValue;
                        }

                        for (var i in ngModel.$formatters) {
                            viewValue = ngModel.$formatters[i](viewValue);
                        }

                        ngModel.$viewValue = viewValue;
                        ngModel.$render();
                    }

                    function formatter(value) {

                        if (isNaN(value) || value == null || value == "" || value == undefined) {
                            return value;
                        }

                        var multi = numberSvc.Current.Divider;

                        return $filter('number')(value / multi, 0);
                    }

                    function parser(value) {
                        value = value.replace(/,/g, "");
                        if (isNaN(value) || value == null || value == "" || value == undefined) {
                            return value;
                        }

                        var multi = numberSvc.Current.Divider;
                        return (parseFloat(value) * multi) + "";
                    }

                    $(element).blur(format);

                    $rootScope.$on('numberscale.changed', function (newVal, oldVal) {

                       // if (newVal && oldVal && newVal.Multiply !== oldVal.Multiply) {
                            format();
                        //}
                    });

                    ngModel.$formatters.push(formatter);
                    ngModel.$parsers.unshift(parser);

                }
            };
        }
    ]);
})()