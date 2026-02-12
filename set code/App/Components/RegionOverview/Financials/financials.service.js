(function () {
    angular.module("app")
        .factory("financials.service", ["$odata", "$q","Upload", Service]);

    function Service($odata, $q, Upload) {
        var service = {

            getScenarios: function (periodId) {
                return $odata("Scenario")
                    .filter("PeriodId eq " + periodId)
                    .extend("Brand")
                    .get()
                //.then(function (data) {
                //    let scenarios = data.results.reduce(function (accu, scenario) {
                //        accu[scenario.Brand.BrandName] = accu[scenario.Brand.BrandName] || []
                //        accu[scenario.Brand.BrandName].push(scenario)
                //        return accu;
                //    }, {})
                //    return scenarios
                //});

            },
            getScenario: function (scenarioUuid) {
                return $odata("Scenario").id(scenarioUuid).get()
            },
            getVolumes: function (scenarioUuid, periodId) {
                let addition = "";
                if (periodId) {
                    let d = moment(periodId, "YYYYMM");
                    d.subtract(1, "year");
                    d.month(5);
                    let start = d.format("YYYYMM");
                    addition = " and MonthId gt " + start + " and MonthId lt " + (periodId * 1 + 12);
                }
                return $odata("VolumeBase")
                    .filter("ScenarioUuid eq " + scenarioUuid + addition)
                    .orderby("CountryId,MonthId")
                    .get()
                    .then(function (data) {
                        let volumes = data.results.reduce(function (accu, volume) {
                            accu[volume.CountryName] = accu[volume.CountryName] || {
                                CountryName: volume.CountryName,
                                CountryId: volume.CountryId,
                                MissingPrice: 0,
                                MissingDelta: 0,
                                Volumes: []
                            };
                            if (volume.Price === null) {
                                accu[volume.CountryName].MissingPrice++;
                            }
                            if (volume.DeltaPercent === null) {
                                accu[volume.CountryName].MissingDelta++;
                            }
                            accu[volume.CountryName].Volumes.push(volume)
                            return accu;
                        }, {})
                        return volumes
                    })
            },
            getVolumesByCountry: function (scenarioUuid, countryId) {
                return $odata("VolumeBase")
                    .filter("ScenarioUuid eq " + scenarioUuid + " and CountryId eq " + countryId)
                    .orderby("MonthId desc")
                    .get();
            },
            getBudgetByCountry: function (scenario, countryId) {

            },
            getAdjustmentByCountry: function () {

            },
            addScenario: function (data) {
                return $odata("Scenario").add(data);
            },
            deleteScenario: function (scenarioUuid) {
                return $odata("Scenario").id(scenarioUuid).delete();
            },
            initializeScenario: function (scenarioUuid) {
                return $odata("Scenario").id(scenarioUuid).property("Initialize").post();
            },
            forecastScenario: function (scenarioUuid) {
                return $odata("Scenario").id(scenarioUuid).property("Forecast").post();
            },
            uploadPrices: function (scenarioUuid, file) {
                return Upload.upload({
                    url: "/_api/Scenario/" + scenarioUuid + "/Prices/Import",
                    data: {
                        id: 1,
                        file: file
                    }
                })
            },
            updatePrice: function (scenarioUuid, value) {
                //console.log(scenarioUuid, value)
                return $odata("Scenario").id(scenarioUuid).property("UpdatePrice").add(value);
            },
            updateDeltaPercent: function (scenarioUuid,value) {
                return $odata("Scenario").id(scenarioUuid).property("UpdateDelta").add(value);
            },
            uploadBudget: function (scenarioUuid, file) {
                return Upload.upload({
                    url: "/_api/Scenario/" + scenarioUuid+"/Budget/Import",
                    data: {
                        id: 1,
                        file: file
                    }
                })
            },
            uploadAdjustment: function (scenarioUuid, file) {
                return Upload.upload({
                    url: "/_api/Scenario/" + scenarioUuid+"/Adjustment/Import",
                    data: {
                        id: 1,
                        file: file
                    }
                })
            },
            uploadAll: function (scenarioUuid, file) {
                return Upload.upload({
                    url: "/_api/Scenario/" + scenarioUuid + "/All/Import",
                    data: {
                        id: 1,
                        file: file
                    }
                })
            },
            getReport: function (scenarioUuid) {
                var promises = [
                    $odata("Scenario").id(scenarioUuid).property("GetActYear").get(),
                    $odata("Scenario").id(scenarioUuid).property("GetActMonth").get(),
                    $odata("Scenario").id(scenarioUuid).property("GetYtd").get()
                ]
                return $q.all(promises).then(function (data) {
                    var year = data[0].sort(function (a, b) {
                        return a.CountryName > b.CountryName;
                    })
                    var month = data[1].sort(function (a, b) {
                        return a.CountryName > b.CountryName;
                    })
                    var ytd = data[2].sort(function (a, b) {
                        return a.CountryName > b.CountryName;
                    });
                    var reports = year.reduce(function (result, item, i) {
                        var cluster = item["CountryCluster"];
                        result[cluster] = result[cluster] || {
                            CountryCluster: cluster,
                            ActualYear: { Act: 0, Py: 0, Bud: 0, VsPy: 0, VsBud: 0, ActAdj: 0, PyAdj: 0, VsPyAdj: 0, VsBudAdj: 0 },
                            ActualMonth: { Act: 0, Py: 0, Bud: 0, VsPy: 0, VsBud: 0, ActAdj: 0, PyAdj: 0, VsPyAdj: 0, VsBudAdj: 0 },
                            YTD: { Act: 0, Py: 0, Bud: 0, VsPy: 0, VsBud: 0, ActAdj: 0, PyAdj: 0, VsPyAdj: 0, VsBudAdj: 0 },
                            Reports: []
                        }
                        item.VsBud = item.Act - item.Bud * 1;
                        item.VsPy = item.Act - item.Py;
                        item.VsPyAdj = (item.Act + item.ActAdj) - (item.Py + item.PyAdj);
                        item.VsBudAdj = item.Act+item.ActAdj - item.Bud *1;

                        if (month[i]) {
                            month[i].VsBud = month[i].Act - month[i].Bud * 1;
                            month[i].VsPy = month[i].Act - month[i].Py;
                            month[i].VsPyAdj = (month[i].Act + month[i].ActAdj) - (month[i].Py + item.PyAdj);
                            month[i].VsBudAdj = month[i].Act + month[i].ActAdj - month[i].Bud * 1;
                        }
                        if (ytd[i]) {
                            ytd[i].VsBud = ytd[i].Act - ytd[i].Bud * 1;
                            ytd[i].VsPy = ytd[i].Act - ytd[i].Py;
                            ytd[i].VsPyAdj = (ytd[i].Act + ytd[i].ActAdj) - (ytd[i].Py + ytd[i].PyAdj);;
                            ytd[i].VsBudAdj = ytd[i].Act + ytd[i].ActAdj - ytd[i].Bud * 1;
                        }
                        var report = {
                            ActualYear: item,
                            ActualMonth: month[i] || {},
                            YTD: ytd[i] || {}
                        };
                        var c = result[cluster];
                        c.Reports.push(report);

                        c.ActualYear.Act += report.ActualYear.Act * 1;
                        c.ActualMonth.Act += report.ActualMonth.Act * 1;
                        c.YTD.Act += report.YTD.Act * 1;

                        c.ActualYear.Py += report.ActualYear.Py * 1;
                        c.ActualMonth.Py += report.ActualMonth.Py * 1;
                        c.YTD.Py += report.YTD.Py * 1;

                        c.ActualYear.Bud += report.ActualYear.Bud * 1;
                        c.ActualMonth.Bud += report.ActualMonth.Bud * 1;
                        c.YTD.Bud += report.YTD.Bud * 1;

                        c.ActualYear.VsBud += report.ActualYear.VsBud * 1;
                        c.ActualMonth.VsBud += report.ActualMonth.VsBud * 1;
                        c.YTD.VsBud += report.YTD.VsBud * 1;

                        c.ActualYear.VsPy += report.ActualYear.VsPy * 1;
                        c.ActualMonth.VsPy += report.ActualMonth.VsPy * 1;
                        c.YTD.VsPy += report.YTD.VsPy * 1;

                        c.ActualYear.ActAdj += report.ActualYear.ActAdj * 1;
                        c.ActualMonth.ActAdj += report.ActualMonth.ActAdj * 1;
                        c.YTD.ActAdj += report.YTD.ActAdj * 1;

                        c.ActualYear.VsPyAdj += report.ActualYear.VsPyAdj * 1;
                        c.ActualMonth.VsPyAdj += report.ActualMonth.VsPyAdj * 1;
                        c.YTD.VsPyAdj += report.YTD.VsPyAdj * 1;

                        c.ActualYear.VsBudAdj += report.ActualYear.VsBudAdj * 1;
                        c.ActualMonth.VsBudAdj += report.ActualMonth.VsBudAdj * 1;
                        c.YTD.VsBudAdj += report.YTD.VsBudAdj * 1;

                        c.ActualYear.PyAdj += report.ActualYear.PyAdj * 1;
                        c.ActualMonth.PyAdj += report.ActualMonth.PyAdj * 1;
                        c.YTD.PyAdj += report.YTD.PyAdj * 1;

                        return result;
                    }, {})

                    return Object.keys(reports).map(function (key) {
                        return reports[key];
                    });
                })
            }

        };
        return service;
    }
})();