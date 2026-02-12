(function () {
    angular.module("app.addons")

     /*
    * Formats Percents: 0.5 to 50
    * @example <input data-bv-percent ng-Model="Model"/>
    */
    .directive('percent', [
        "$parse", "$filter", function ($parse, $filter) {

            return {
                require: 'ngModel',
                
                link: function (scope, element, attrs, ngModel) {
                    var percentDecimals = (attrs.percent || 2) * 1; 


                    $(element).blur(function () {
                        ngModel.$viewValue = formatter(ngModel.$modelValue);
                        ngModel.$render();
                    });


                    function formatter(value) {
                       
                            var val = value; //.replace(",", "");
                            if (isNaN(val)) {
                                return value;
                            }

                            val = parseFloat(val);
                            return $filter("number")(val * 100, percentDecimals);
                      
                    }

                    function parser(value) {
                        var val = value.replace(",", "");
                        if (isNaN(val)) {

                            return value;
                        }

                        val = parseFloat(val);
                        return (val / 100).toFixed(4);
                    }

                    ngModel.$formatters.unshift(formatter);

                    ngModel.$parsers.unshift(parser);
                }
            };
        }
    ]);

})()