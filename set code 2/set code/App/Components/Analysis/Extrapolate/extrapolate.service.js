(function () {

    var app = angular.module("app");
    app.factory("extrapolateService", ["$odata", "dateService", "$stateParams", "$filter", Service]);


    function Service($odata, dateService, $stateService, $filter) {
        return {
            list: function (countryid) {
                return $odata("ForecastOverview")
                    .filter("CountryPeriodUuid eq " + countryid)
                    .orderby("BayerSkuName")
                    .get()
                    .then(function (data) {
                        data.results = data.results.map(transform);
                        return data.results;
                    });
            },
            get: function (id) {
                return $odata("ForecastOverview")
                    .filter("ForecastUuid eq " + id)
                    .get()
                    .then(function (data) {
                        return transform(data.results[0]);
                    });
            },
            getTargetVolume: function (id) {
                return $odata("Forecast")
                    .id(id)
                    .select("TargetVolume,OperatingTolerance,Fc1,Fc2,Fc3,Fc4,EmergencyChannelQuantity")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            },
            toggleScope : function(id, scope) {
                return $odata("Forecast")
                    .id(id)
                    .property("ToggleScope")
                    .post({ InScope: scope });
            },
            update: function (id, obj) {
                return $odata("Forecast")
                    .id(id)
                    .update(obj);
            },
            getMonths: function (period, countryPeriodId) {
                var months = dateService.pastList(period, { offset: 4, months: 10 });
                var tvmonth = $filter("moment")(countryPeriodId, "MMM YY", "YYYYMM");
                months = months.map(function (item) {
                    return {
                        value: item,
                        tvmonth: item == tvmonth
                    }
                });

                return months;
            },
            listComments: function () {
                return $odata("Comment")
                    .filter("CommentTypeId eq 3")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            },
            approveAll: function (id) {
                return $odata("CountryPeriod")
                    .id(id)
                    .property("ApproveAllForecast")
                    .post();
            },
            selectSource: function (forecastid) {
                return $odata("Forecast")
                    .id(forecastid)
                    .property("SelectForecast")
                    .post();
            },
            finalize: function (id) {
                return $odata("CountryPeriod")
                    .id(id)
                    .property("FinalizeExtrapolate")
                    .post();
            },
            add: function(cpid, tv, skuid) {
                return $odata("Forecast")
                    .property("AddManual")
                    .post({
                        CountryPeriodUuid: cpid,
                        TargetVolume: tv,
                        BayerSkuUuid: skuid
                    });
            },
            updateCorrection: function(fuuid, correction) {
                return $odata("Forecast")
                    .id(fuuid)
                    .property("GenerateSingleForecast")
                    .post({ correctionFactor: correction });
            },
            calculate: function(cpid) {
                return $odata("CountryPeriod")
                    .id(cpid)
                    .property("GenerateForecast")
                    .post();
            }
        }

        function transform(item) {
            item.Sources = [];
            if (item.ForecastUuidExFactory) {
                item.Sources.push({
                    DataTypeId: 3,
                    DataTypeName: "ExFactory",
                    ForecastUuid: item.ForecastUuidExFactory
                });
            }
            if (item.ForecastUuidNational) {
                item.Sources.push({
                    DataTypeId: 2,
                    DataTypeName: "National Data",
                    ForecastUuid: item.ForecastUuidNational
                });
            }
            if (item.ForecastUuidVpd) {
                item.Sources.push({
                    DataTypeId: 1,
                    DataTypeName: "Brick Data",
                    ForecastUuid: item.ForecastUuidVpd
                });
            }
            if (item.ForecastUuidManual) {
                item.Sources.push({
                    DataTypeId: 4,
                    DataTypeName: "Manual Entry",
                    ForecastUuid: item.ForecastUuidManual
                });
            }
            return item;
        }
    }
})()