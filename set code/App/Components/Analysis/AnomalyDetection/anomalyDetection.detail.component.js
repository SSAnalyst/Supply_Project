(function () {

    angular.module("app")
        .component("anomalyDetection.detail",
        {
            bindings: {
                item: "<",
                canEdit: "<"
            },
            templateUrl: "/Analysis/anomalyDetectionDetail",
            controller: ["anomalyDetectionService", "$rootScope", Controller]

        });

    function Controller(anomalyDetectionService, $rootScope) {
        var vm = this;
        vm.Update = Update;
        vm.changed = false; 

        function Update(obj, field, dbField) {
            dbField = dbField || field;
            var newObj = {}
            newObj[dbField] = obj[field];
            vm.changed = true;
            return anomalyDetectionService.update(obj.MarketDemandSkuUuid, newObj);
        }

        vm.$onDestroy = function () {

            //console.log("emitting destroy");
            if (vm.changed) {
                $rootScope.$broadcast("dataPrepChanged");
            }
        }
   
    }



})();