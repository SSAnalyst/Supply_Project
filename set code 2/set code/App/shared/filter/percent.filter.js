(function () {
    angular.module("app.addons")
    /*
    * Filter for Displaying Percents 0.5 to 50%
    * @example {{ value | percent:decimals}}
    */
    .filter('percent', [
        '$filter', function ($filter) {
            return function (input, decimals) {

                return $filter('number')(parseFloat(input) * 100, decimals === undefined ? 2 : decimals);
            };
        }
    ]);
})()