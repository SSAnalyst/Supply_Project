(function () {

    var app = angular.module("app");
    app.factory("dataPreparationService", ["$timeout", "$odata", Service]);



    function Service($timeout, $odata) {
        var length = randomIntFromInterval(5, 10);

        var list = [];
        for (var i = 1; i < length; i++) {
            list.push(newEntry(i));
        }
        return {
            listSkus: function (countryId) {
                return $odata("BayerSku").id(countryId).property("ByCountry").get().then(function (data) {
                    return data;
                });

            },
            list: function (id) {

                return $odata("MarketDemandOverview")
                    .filter("CountryPeriodUuid eq " + id)
                    .orderby("IsBayer desc,Sku asc")
                    .get().then(function (data) {
                        return data.results.map(transformItem);
                    });
            },
            get: function (id) {
                return $odata("MarketDemandOverview")
                    .filter("ItemUuid eq " + id)
                    .get()
                    .then(function (data) {
                        return transformItem(data.results[0]);
                    });
            },
            updateBrick: function (id, obj) {
                return $odata("MarketDemandSku").id(id).update(obj);
            },
            updateNational: function (id, obj) {
                return $odata("MarketDemandNational").id(id).update(obj);
            },
            finalize: function (id) {
                return $odata("CountryPeriod").id(id).property("FinalizeDataPreparation").post();
            },
            getPreApprove: function (id) {
                return $odata("PreApprovedBrick")
                    .filter("CountryPeriodUuid eq " + id)
                    .orderby("Brick")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            updatePreApprove: function (id, obj) {
                return $odata("PreApprovedBrick").id(id).update(obj);
            }
        }
    }

    function transformItem(item) {
        item.BayerSkuUuid = item.BayerSkuUuid !== null ? item.BayerSkuUuid : item.BayerSkuUuidPrev;
        item.InScope = item.InScope !== null ? item.InScope : item.InScopePrev;
        return item;
    }

    function newEntry(id) {
        return {
            id: id,
            Type: !!randomIntFromInterval(0, 1),
            SKU: "SKU_" + id,
            Product: "Product_" + id,
            InScope: !!randomIntFromInterval(0, 1),
            EmergencyChannelQuantity: randomIntFromInterval(0, 10),
            UnitsMAT: randomIntFromInterval(0, 100),
            ValuesMAT: randomIntFromInterval(0, 100),
            STUnitsMAT: randomIntFromInterval(0, 100),
            PercentST: randomIntFromInterval(0, 100),
            UDSTop5: randomIntFromInterval(0, 100),
            SalesTop5Bricks: randomIntFromInterval(0, 100),
            Risk: ["None", "Low", "Medium", "High"][randomIntFromInterval(0, 3)],
            OK: !!randomIntFromInterval(0, 1),
            New: !!randomIntFromInterval(0, 1)

        }

    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

})()