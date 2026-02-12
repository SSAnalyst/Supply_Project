(function () {

    angular.module("app")
        .component("extrapolate.detail",
        {
            bindings: { item: "<", countryPeriod: "<", canEdit: "<" , comments: "<"},
            templateUrl: "/Analysis/extrapolateDetail",
            controller: ["$stateParams", "extrapolateService", "$rootScope","$state", Controller]

        });

    function Controller($stateParams, extrapolateService, $rootScope, $state) {
        var vm = this;
        vm.item = {};
        vm.months = [];
        vm.update = update;
        vm.updateForecast = updateForecast;
      
        vm.TargetVolume = targetvolume;
        vm.updateCorrection = updateCorrection;
        vm.toggleScope = toggleScope;

        vm.tvmonth = "Fc1";
     
        vm.$onInit = function () {
            // setMonths();
             setChartOptions();
            load($stateParams.id)
                .then(function (data) {
                    vm.item = data;
                    setMonths();
                });
        }

        vm.$onDestroy = function () {
            if (vm.changed) {
                $rootScope.$broadcast("ex.update");
            }
        }

        function toggleScope() {
            vm.changed = true;
            return extrapolateService.toggleScope(vm.item.ForecastUuid, !!vm.item.InScope);
        }

        function update(item, field, dbfield) {
            dbfield = dbfield || field;
            var obj = {};
            obj[dbfield] = item[field];
            vm.changed = true;
            extrapolateService.update(item.ForecastUuid, obj);
        }

        function setMonths() {
            vm.months = extrapolateService
                .getMonths(vm.countryPeriod.AlternatePeriodId, vm.countryPeriod.PeriodId)
                .map(function (item, i) {

                    var month = {
                        Name: item.value
                    };
                    if (i < 6) {

                        month.Value = vm.item["Unit" + (i + 19)] || 0;
                        month.Color = "#cccccc";

                    } else {
                        month.Value = vm.item["Fc" + (i - 5)];

                        if (item.tvmonth) {
                            month.Color = "#0099CC";
                        } else {
                            month.Color = "#d9edf7";
                        }
                    }

                    return month;
                });
            $rootScope.$broadcast("amCharts.updateData", vm.months);
            //console.log(vm.months);
            if (vm.months[6].tvmonth) {
                vm.tvmonth = "Fc1";
            }
            if (vm.months[7].tvmonth) {
                vm.tvmonth = "Fc2";
            }
            if (vm.months[8].tvmonth) {
                vm.tvmonth = "Fc3";
            }
            if (vm.months[9].tvmonth) {
                vm.tvmonth = "Fc4";
            }

        }

        function setChartOptions() {
            vm.chartOptions = {
                type: "serial",
                categoryField: "Name",
                autoMarginOffset: 0,
                categoryAxis: {
                    gridPosition: "start",
                    parseDates: false,
                    labelFrequency: 2
                },
                valueAxes: [
                    {
                        id: "vpd"
                    }
                ],
                graphs: [
                    {
                        type: "column",
                        title: "Income",
                        valueField: "Value",
                        fillAlphas: 0.8,
                        id: "vpdGraph",
                        valueAxis: "vpd",
                        colorField: "Color",
                        lineThickness: 0
                    }
                ]
            }
        }

        function updateCorrection(item) {
            vm.changed = true;
            extrapolateService
                .updateCorrection(item.ForecastUuid, item.CorrectionFactor)
                .then(function(data) {
                    angular.extend(vm.item, data);
                });

        }

        function targetvolume(item) {
            return item.TargetVolume || (item[vm.tvmonth] * (1 + parseFloat(item.OperatingTolerance))) - item.EmergencyChannelQuantity;
        }

        function updateForecast(forecastuuid) {
            vm.changed = true;
            return extrapolateService.selectSource(forecastuuid)
                .then(function () {
                    $state.go(".", { id: forecastuuid });
                });
        }


        function load(forecastuuid) {
            return extrapolateService.get(forecastuuid)
                 .then(function (data) {
                     if (data.ForecastUuid == $stateParams.id) {
                         data.Forecasts = [];
                         var forecasts = [
                         { Name: "Exfactory Data",Field: "ForecastUuidExFactory" },
                         { Name: "Manual Entry", Field: "ForecastUuidManual" },
                         { Name: "National Data", Field: "ForecastUuidNational" },
                         { Name: "Brick Data", Field: "ForecastUuidVpd" }
                         ];

                         forecasts.forEach(function (item) {
                             
                             if (data[item.Field] && data["ForecastUuid"] !== data[item.Field]) {
                                 extrapolateService.getTargetVolume(data[item.Field])
                                     .then(function (forecast) {
                                         forecast.DataTypeName = item.Name;
                                         data.Forecasts.push(forecast);
                                     });
                             }
                         });
                     }
                     return data;
                 });
        }
    }
})();