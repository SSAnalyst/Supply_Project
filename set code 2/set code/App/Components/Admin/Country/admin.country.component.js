(function () {
    angular
        .module("app")
        .component("admin.country", {
            bindings: {
                list: "<"
            },
            templateUrl: "/Admin/Country",
            controller: [controller]
        });

    function controller() {

    }
})()