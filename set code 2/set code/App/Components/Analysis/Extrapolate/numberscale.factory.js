(function() {
    angular.module("app")
        .factory("numberscaleservice", ["$rootScope",Service]);

    function Service($rootScope) {
        var service = {
            Formats: [
                {
                    Display: "Absolute",
                    Divider: 1
                },
                {
                    Display: "Thousands",
                    Divider: 1000
                }
            ], setCurrent: function (format) {
                if (format != service.Current) {
                    //console.log("numberscale changed");
                    service.Current = format;
                    $rootScope.$broadcast("numberscale.changed");
                }
            }
        };

        service.Current = service.Formats[0];
        return service; 
    }
})()