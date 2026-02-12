(function () {
    angular.module("app.addons")
    /*
    * Filter for Displaying Percents 0.5 to 50%
    * @example {{ value | percent:decimals}}
    */
    .filter('sum', [
        '$filter', function ($filter) {
            return function (input, path, decimals, divider) {
                divider = divider || 1;
                var number = input.reduce(function (result, item) {
                    var num = Object.getByPath(item,path) * 1
                    result += num;
                    return result;
                }, 0);
                return $filter('number')(parseFloat(number) / divider, decimals);
            };
        }
    ]);
})()