(function () {

    var app = angular.module("app");
    app.factory("patientDemandValidationService", ["$odata", "dateService", Service]);


    function Service($odata, dateService) {
        return {
            list: function (uploadId, period) {
                return $odata("MonthlyLimit")
                    .filter("UploadUuid eq " + uploadId)
                    .orderby("Sku,Brick")
                    .get()
                    .then(function (data) {
                        //console.log("list", period);
                        var months = dateService.pastList(period);
                        return data.results.map(function (item) {
                            item.values = getMonthValues(item, months);
                            item.LimitCountry = item.LimitCountry || item.LimitCalc;
                            return item;
                        });
                    });
            },
            listComment: function () {
                return $odata("Comment")
                    .filter("CommentTypeId eq 2")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });
            },
            get: function (id, period) {
                return $odata("MonthlyLimit")
                    .filter("MarketDemandBrickUuid eq " + id)
                    .get()
                    .then(function (data) {
                        //console.log("item", period);
                        var months = dateService.pastList(period);
                        var item = data.results[0];
                        item.values = getMonthValues(item, months);
                        return item;
                    });
            },
            update: function (id, obj) {
                return $odata("MarketDemandBrick")
                    .id(id)
                    .update(obj);

            },
            approveAll: function (id) {
                return $odata("CountryPeriod").id(id).property("ApproveAllLimits").post();
            },
            finalize: function (id) {
                return new $odata("CountryPeriod").id(id).property("FinalizePDV").post();
            },
            getMonthValues: getMonthValues
        }


        function getMonthValues(item, months) {
            if (angular.isNumber(months)) {
                months = dateService.pastList(months);
            }
            return [
                { Name: months[0], value: item.Unit1, color: item.LimitRegion && item.Unit1 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[1], value: item.Unit2, color: item.LimitRegion && item.Unit2 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[2], value: item.Unit3, color: item.LimitRegion && item.Unit3 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[3], value: item.Unit4, color: item.LimitRegion && item.Unit4 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[4], value: item.Unit5, color: item.LimitRegion && item.Unit5 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[5], value: item.Unit6, color: item.LimitRegion && item.Unit6 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[6], value: item.Unit7, color: item.LimitRegion && item.Unit7 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[7], value: item.Unit8, color: item.LimitRegion && item.Unit8 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[8], value: item.Unit9, color: item.LimitRegion && item.Unit9 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[9], value: item.Unit10, color: item.LimitRegion && item.Unit10 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[10], value: item.Unit11, color: item.LimitRegion && item.Unit11 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[11], value: item.Unit12, color: item.LimitRegion && item.Unit12 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[12], value: item.Unit13, color: item.LimitRegion && item.Unit13 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[13], value: item.Unit14, color: item.LimitRegion && item.Unit14 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[14], value: item.Unit15, color: item.LimitRegion && item.Unit15 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[15], value: item.Unit16, color: item.LimitRegion && item.Unit16 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[16], value: item.Unit17, color: item.LimitRegion && item.Unit17 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[17], value: item.Unit18, color: item.LimitRegion && item.Unit18 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[18], value: item.Unit19, color: item.LimitRegion && item.Unit19 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[19], value: item.Unit20, color: item.LimitRegion && item.Unit20 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[20], value: item.Unit21, color: item.LimitRegion && item.Unit21 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[21], value: item.Unit22, color: item.LimitRegion && item.Unit22 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[22], value: item.Unit23, color: item.LimitRegion && item.Unit23 > item.LimitRegion ? "#FF4136" : "#0099CC" },
                { Name: months[23], value: item.Unit24, color: item.LimitRegion && item.Unit24 > item.LimitRegion ? "#FF4136" : "#0099CC" }
            ];
        }
    }
    function newEntry(id) {
        return {
            id: id,
            Brick: "Brick" + id,
            Product: "Product_" + id,
            M01: randomIntFromInterval(0, 110),
            M02: randomIntFromInterval(0, 110),
            M03: randomIntFromInterval(0, 110),
            M04: randomIntFromInterval(0, 110),
            M05: randomIntFromInterval(0, 110),
            M06: randomIntFromInterval(0, 110),
            M07: randomIntFromInterval(0, 110),
            M08: randomIntFromInterval(0, 110),
            M09: randomIntFromInterval(0, 110),
            M10: randomIntFromInterval(0, 110),
            M11: randomIntFromInterval(0, 110),
            M12: randomIntFromInterval(0, 110),
            M13: randomIntFromInterval(0, 110),
            M14: randomIntFromInterval(0, 110),
            M15: randomIntFromInterval(0, 110),
            M16: randomIntFromInterval(0, 110),
            M17: randomIntFromInterval(0, 110),
            M18: randomIntFromInterval(0, 110),
            M19: randomIntFromInterval(0, 110),
            M20: randomIntFromInterval(0, 110),
            M21: randomIntFromInterval(0, 110),
            M22: randomIntFromInterval(0, 110),
            M23: randomIntFromInterval(0, 110),
            M24: randomIntFromInterval(0, 110),
            AcceptedMonthly: randomIntFromInterval(50, 100),
            InScope: !!randomIntFromInterval(0, 1),
            New: !!randomIntFromInterval(0, 1)
        }
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


})();