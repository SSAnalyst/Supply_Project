(function () {

    angular.module("app")
        .component("patientDemandValidation.detail",
        {
            bindings: {
                item: "<",
                countryPeriod: "<",
                canEdit: "<",
                comments: "<"
            },
            templateUrl: "/Analysis/patientDemandValidationDetail",
            controller: ["$stateParams", "patientDemandValidationService", "$scope", Controller]

        });

    function Controller($stateParams, patientDemandValidationService, $scope) {
        var vm = this;
        vm.update = update;
        vm.approve = approve; 

        function approve(item) {
            var newObj = {
                LimitApproved: item.LimitApproved
            };
            if (item.LimitApproved) {
                newObj.LimitRegion = item.LimitCountry || item.LimitCalc;
            }
            vm.updated = true;
            return patientDemandValidationService.update(item.MarketDemandBrickUuid, newObj).then(function() {
                if (item.LimitApproved) {
                    item.LimitRegion = newObj.LimitRegion;
                }
            });
        }

        function update(item, field, dbField) {
            vm.updated = true;
            var newItem = {};
            dbField = dbField || field;
            newItem[dbField] = item[field];
            patientDemandValidationService.update($stateParams.id, newItem);
        }

        vm.$onInit = function () {
            createChartOptions();
        }

        function createChartOptions() {
            vm.chartOptions = {
                type: "serial",
                categoryField: "Name",
                autoMarginOffset: 0,
                categoryAxis: {
                    gridPosition: "start",
                    parseDates: false
                },

                valueAxes: [
                    {
                        id: "vpd",
                        minimum: 0
                    }
                ],
                graphs: [
                    {
                        type: "column",
                        title: "Income",
                        valueField: "value",
                        fillAlphas: 1,
                        id: "vpdGraph",
                        valueAxis: "vpd",
                        colorField: "color",
                        lineThickness: 0
                    }
                ]
            }
            createGuides();
            //console.log(vm.chartOptions);
        }

        function createGuides() {
            if (vm.item.LimitRegion) {
                var guids = vm.chartOptions.guides;
                if (!guids) {
                    guids = [
                        {
                            color: "#FF4136",
                            dashLength: 0,
                            fillAlpha: 0.17,
                            fillColor: "#FF4136",
                            id: "Guide-1",
                            lineAlpha: 1,
                            lineColor: "#FF4136",
                            lineThickness: 1,
                            toAngle: 0,
                            toValue: 10000000,
                            valueAxis: "vpd"
                        }
                    ];
                    vm.chartOptions.guides = guids;
                }
                guids[0].value = vm.item.LimitRegion || 0;
            }

        }

        vm.$onDestroy = function() {
            if (vm.updated) {

                $scope.$root.$broadcast("pdv.update");
            }
        }

        $scope.$watch(function () {
            return vm.item.LimitRegion;
        },
        function (cur, prev) {
            if (cur !== prev) {

                createGuides();
                vm.item.values = patientDemandValidationService.getMonthValues(vm.item, vm.countryPeriod.PeriodId);
                $scope.$broadcast("amCharts.updateData", vm.item.values);
                $scope.$broadcast("amCharts.validateNow", false, false);
            }
        });

    }
})();