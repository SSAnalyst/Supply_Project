(function () {


    angular.module("app.addons")
        .factory("numberFactory", [Factory]);


    function Factory() {
        var vm = {};

        vm.list = [{
            name: "Numberformat: 1",
            divider: 1
        },
        {
            name: "Numberformat: 1k",
            divider: 1000
        },
        {
            name: "Numberformat: 1m",
            divider: 1000000
            }];
        vm.current = vm.list[0]; 
        vm.setCurrent = function (id) {
            //console.log("setting format to ", id);
            vm.current = vm.list[id];
        }
        return vm;
    }
})();