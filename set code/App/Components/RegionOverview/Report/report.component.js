(function () {

    angular.module("app")
        .component("regionOverview.report",
        {
            bindings: {
                list: "<",
                reports: "<",
                countryList: "<",
                brands: "<",
                currentBrand: "<",
                currentCountry: "<"
            },
            // template: '<div class="info-field"><i ng-class="$root.Icons.info"></i>&nbsp;Not yet starteds</div>',
            templateUrl: "/RegionOverview/Report",
            controller: ["$stateParams", "dateService", "regionOverview.ReportService", Controller]

        });

    function Controller($stateParams, dateService, reportService) {

        var vm = this;
        vm.colorCodeESEP = colorCodeESEP;

        function setMonths() {
            //console.log("update months");
            if ($stateParams.countryId) {
                vm.countryList.forEach(function(country) {
                    if (country.CountryId === $stateParams.countryId) {
                        //console.log("months for", country);
                        vm.months = dateService.pastList(country.AlternatePeriodId);
                    }
                });
                return;
            }
            vm.months = dateService.pastList($stateParams.date);
        }

        function setSupplyMonth() {
            vm.supplyMonths = dateService.pastList($stateParams.date);
        }

        function manipulation(key) {
           
            switch (key) {
                //case "Summary":
                case "EmergencyChannel":
                    return prepareSummary;
                default:
                    return function () {
                    
                        return vm.list;
                    }
            }
        }

        function prepareSummary() {

            var products = {};
            vm.list.forEach(function (item) {
                products[item.Label] = products[item.Label] || { Name: item.Label };
                products[item.Label][item.Country] = item;
            });
            vm.products = products;
        }


        function colorCodeESEP(value) {
            var abs = Math.abs(value);
            if (abs >= .15) {
                return "reportDanger";
            } else if (abs >= .07) {
                return "reportWarning";

            } else if (abs >= 0) {
                return "reportOk";
            }
            return "";
        }

        vm.chartOptions = {
            "type": "serial",
            "categoryField": "PeriodId",
            "autoMarginOffset": 40,
            "marginLeft": 30,
            "marginRight": 60,
            "marginTop": 60,
            "sequencedAnimation": false,
            "categoryAxis": {
                "gridPosition": "start",
                "startOnAxis": true,
                "gridColor": "#FFFFFF",
                "minorTickLength": 1,
                "parseDates": false
            },
            "graphs": [
                {

                    "bullet": "triangleUp",
                    "bulletBorderColor": "#FF0000",
                    "bulletColor": "#FF4136",
                    "bulletSize": 10,
                    "id": "InFlow",
                    "labelText": "[[value]]",
                    "lineColor": "#0099CC",
                    "lineThickness": 3,
                    "title": "In Flow",
                    "valueField": "InFlow"
                },
                {

                    "bullet": "round",
                    "bulletSize": 10,
                    "id": "OutFlow",
                    "labelText": "[[value]]",
                    "lineColor": "#2ECC40",
                    "lineThickness": 3,
                    "title": "Out Flow",
                    "valueField": "OutFlow"
                }
            ],
            "legend": {
                "enabled": true,
                "labelWidth": 1,
                "useGraphSettings": true
            },
            "valueAxes": [
                {
                    "id": "ValueAxis-2",
                    "axisThickness": 0,
                    "gridThickness": 0,
                    "labelOffset": 1,
                    "labelsEnabled": false,
                    "offset": 1,
                    "showFirstLabel": false,
                    "tickLength": 1
                }
            ]
        }
        var tier1 = ["Germany", "Great Britain", "Spain", "Czechia", "France", "Poland", "Netherland"];

        vm.$onInit = function () {
            setMonths();
            setSupplyMonth();
            vm.Report = reportService.report($stateParams);
            manipulation(vm.Report.Template)();

        }
    }

})();