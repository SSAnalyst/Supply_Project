(function(angular) {
    "use strict";
    angular.module("app")
        .factory("adminSkuService", ["$odata", Service]);

    function Service($odata) {


        var service = {
            getList: function() {
                return $odata("BayerSku")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            get: function(id) {
                return $odata("BayerSku")
                    .id(id)
                  
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            update: function(id, obj) {
                return $odata("BayerSku").id(id).update(obj);
            }
        };

        return service;
    }

})(angular);