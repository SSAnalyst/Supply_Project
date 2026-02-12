(function () {
    angular.module("app.addons")

    /**
     * Filter for substracting elements from Array
     * @example {{array1 |diff:array2:property}}
     */
    .filter("diff", function () {
        return function (arr1, arr2, property, property2, sim) {
            if (!arr2 || !arr1) return arr1;
            sim = !!sim;
            return arr1.filter(function (item) {
                if (property) {
                    property2 = property2 || property;
                    for (var i = 0; i < arr2.length; i++) {
                        if (item[property] == arr2[i][property2]) {
                            return sim;
                        }
                    }
                    return !sim;
                } else {
                    return arr2.indexOf(item) < 0;
                }
            });
        }
    });
})()