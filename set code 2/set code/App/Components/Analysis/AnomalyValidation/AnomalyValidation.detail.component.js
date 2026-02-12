(function () {

    angular.module("app")
        .component("anomalyValidation.detail",
        {
            bindings: {
                item: "<", 
                permissions: "<",
                comments: "<"
            },
            templateUrl: "/Analysis/AnomalyValidationDetail",
            controller: [
                "anomalyValidationService",
                "$rootScope",
                controller]

        });

    function controller(
        anomalyValidationService,
        $rootScope
    ) {
        var vm = this;
        vm.update = update; 


        vm.$onInit = function() {
            vm.chartOptions = {
                type: "serial",
                categoryField: "Name",
                autoMarginOffset: 0,
                categoryAxis: {
                    gridPosition: "start",
                    parseDates: false,
                    labelRotation: 45,
                    autoGridCount: 0
                },
                balloon: {
                    textAlign: "right"
                },
                chartCursor: {
                    categoryBalloonEnabled: false,
                    cursorAlpha:1
                },
                valueAxes: [{
                    id: "axis",
                    showLastLabel: false
                }],
                graphs: [{
                    type: "column",
                    title: "Income",
                    valueField: "value",
                    fillAlphas: 1,
                    id: "Graph",
                    valueAxis: "axis",
                    color: "#aaaaaa",
                    fillColor: "#aaaaaa",
                    lineColor: "#aaaaaa",
                    lineThickness: 0, balloonText: "[[category]]:\n[[value]]"
                }]
            }
        }

        function update(obj, field, dbField) {
            dbField = dbField || field;
            var newObj = {}
            newObj[dbField] = obj[field];
            vm.changed = true;
            return anomalyValidationService.update(obj.MarketDemandBrickUuid, newObj);
        }

        vm.$onDestroy = function () {

            //console.log("emitting destroy");
            if (vm.changed) {
                $rootScope.$broadcast("av.update");
            }
        }
    }

})();