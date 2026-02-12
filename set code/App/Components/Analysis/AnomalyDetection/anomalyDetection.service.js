(function() {

    var app = angular.module("app");
    app.factory("anomalyDetectionService", ["$odata","cockpitService",Service]);



    function Service($odata,cockpitService) {
        var length = randomIntFromInterval(5, 10);

        var list = [];
        for (var i = 1; i < length; i++) {
            list.push(newEntry(i));
        }
        return {
            list: function(id) {
                return new $odata("MarketDemandSkuOverview")
                    .filter("CountryPeriodUuid eq " + id)
                    .orderby("Sku")
                    .get()
                    .then(function(data) {
                        return data.results.map(transformItem);
                    });
            },
          
            get: function(id) {
                return new $odata("MarketDemandSkuOverview").filter("MarketDemandSkuUuid eq " + id)
                    .get()
                    .then(function(data) {
                        return transformItem(data.results[0]);
                    });
            },
            update: function(id, obj) {
                return new $odata("MarketDemandSku").id(id).update(obj);
            },
            finalize: function(id) {
                return new $odata("CountryPeriod").id(id).property("FinalizeAnomalyDetection").post();
            }
        }
    }


    function transformItem(item) {
       // item.InScopeRegion = item.InScopeRegion === null ? item.InScopeCountry : item.InScopeRegion;
        item.RiskId = item.RiskId === null ? item.RiskIdPrev : item.RiskId;
        item.PreApproved = item.PreApproved === null ? item.PreApprovedPrev : item.PreApproved;


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