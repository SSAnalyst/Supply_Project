(function () {
    angular.module("app.addons")
        /*
        * Filter for Displaying Percents 0.5 to 50%
        * @example {{ value | number-prefix:decimals}}
        */
        .filter('numberPrefix', [
            '$filter', function ($filter) {
                return function (input, divider, decimals) {
                  //console.log(divider)
                    return $filter('number')(parseFloat(input) / (divider||1), decimals);
                };
            }
        ]);
})()