(function () {

    angular.module("app.addons")
        .filter("distinct", [filter]);

    function filter() {

        return function(array, field) {
            return array.reduce(function(cur, item) {
                    if (cur.indexOf(item[field]) < 0) {
                        cur.push(item[field]);
                }
                    return cur; 
                },
                []);
        };

    }


})()