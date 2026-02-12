(function () {

    var app = angular.module("app");
    app.factory("anomalyValidationService", ["$timeout", "$odata", "dateService", Service]);



    function Service($timeout, $odata, dateService) {

        return {
            list: function (id, period) {
                return $odata("AnomalyValidation")
                    .filter("Manufacturer eq 'Bayer' and UploadUuid eq " + id)
                    .orderby("Brick,Sku")
                    .get()
                    .then(function (data) {
                        if (period) {
                            var months = dateService.pastList(period);
                            return data.results.map(function (item) {
                                item.AnomalyRegion = item
                                    .AnomalyRegion ===
                                    null
                                    ? item.AnomalyCalc
                                    : item.AnomalyRegion;
                                item.values = getMonthValues(item, months);
                                return item;
                            });
                        }
                        return data.results;
                    });
            },
            listComments: function () {
                return $odata("Comment")
                    .filter("CommentTypeId eq 1")
                    .get()
                    .then(function(data) {
                        return data.results;
                    });
            },
            listCount: function (id) {
                return $odata("AnomalyValidation")
                    .filter("Manufacturer eq 'Bayer' and UploadUuid eq " + id)
                    .select("AnomalyRegion,AnomalyComment,AnomalyApproved,AnomalyCalc")
                    .get()
                    .then(function (data) {
                        var Info = {
                            PotentialAnomalyCount: 0,
                            AnomalyCount: 0,
                            CommentCount: 0,
                            ApprovedCount: 0,
                            PreApprovedCount: 0
                        };

                        Info.Total = data.results.length;
                        data.results.forEach(function (item) {
                            if (item.AnomalyCalc) {
                                Info.PotentialAnomalyCount++;
                            }
                            if (item.AnomalyRegion ) {
                                Info.AnomalyCount++;
                            }
                            if (item.AnomalyComment && item.AnomalyComment !== "Pre Approved") {
                                Info.CommentCount++;
                            }
                            if (item.AnomalyApproved && item.AnomalyComment !== "Pre Approved") {
                                Info.ApprovedCount++;
                            }
                            if (item.AnomalyComment === "Pre Approved") {
                                Info.PreApprovedCount++;
                            }

                        });
                        return Info;
                    });
            },
            listAnomalie: function (id, period) {
                return $odata("AnomalyValidation")
                    .filter("Manufacturer eq 'Bayer' and AnomalyRegion eq true and UploadUuid eq " + id)
                    .orderby("Brick", "Sku")
                    .get()
                    .then(function (data) {
                        var months = dateService.pastList(period);
                        return data.results.map(function (item) {
                            item.AnomalyRegion = item.AnomalyRegion === null ? item.AnomalyCalc : item.AnomalyRegion;
                            item.values = getMonthValues(item, months);
                            return item;
                        });
                    });
            },
            get: function (id, period) {
                return $odata("AnomalyValidation")
                    .filter("MarketDemandBrickUuid eq " + id)
                    .get()
                    .then(function (data) {
                        var months = dateService.pastList(period);
                        var item = data.results[0];
                        item.values = getMonthValues(item, months);
                        return item;
                    });
            },
            update: function (id, obj) {
                return $odata("MarketDemandBrick").id(id).update(obj);
            },
            approveAll: function(id) {
                return $odata("CountryPeriod").id(id).property("ApproveAllAnomalies").post();
            },
            deselectAllPotentials: function(id) {
                return $odata("CountryPeriod").id(id).property("DeselectAllPotentials").post();
            },
            finalize: function (id) {
                return $odata("CountryPeriod").id(id).property("FinalizeAnomalyValidation").post();
            }
        }
    }



    function getMonthValues(item, months) {

        return [
              { Name: months[0], value: item.Unit1 },
              { Name: months[1], value: item.Unit2 },
              { Name: months[2], value: item.Unit3 },
              { Name: months[3], value: item.Unit4 },
              { Name: months[4], value: item.Unit5 },
              { Name: months[5], value: item.Unit6 },
              { Name: months[6], value: item.Unit7 },
              { Name: months[7], value: item.Unit8 },
              { Name: months[8], value: item.Unit9 },
              { Name: months[9], value: item.Unit10 },
              { Name: months[10], value: item.Unit11 },
              { Name: months[11], value: item.Unit12 },
              { Name: months[12], value: item.Unit13 },
              { Name: months[13], value: item.Unit14 },
              { Name: months[14], value: item.Unit15 },
              { Name: months[15], value: item.Unit16 },
              { Name: months[16], value: item.Unit17 },
              { Name: months[17], value: item.Unit18 },
              { Name: months[18], value: item.Unit19 },
              { Name: months[19], value: item.Unit20 },
              { Name: months[20], value: item.Unit21 },
              { Name: months[21], value: item.Unit22 },
              { Name: months[22], value: item.Unit23 },
              { Name: months[23], value: item.Unit24 }
        ];
    }

    function newEntry(id) {
        var o = {
            id: id,
            Anomalie: !!randomIntFromInterval(0, 1),
            Brick: "Brick_" + id,
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
            MATUnits: randomIntFromInterval(0, 10),
            C1: randomIntFromInterval(0, 100),
            C2: randomIntFromInterval(0, 100),
            C3: randomIntFromInterval(0, 100),
            C4: randomIntFromInterval(0, 100),
            MATValues: randomIntFromInterval(0, 100),
            Comment: " Comment " + id,
            Approved: !!randomIntFromInterval(0, 1)


        }

        o.values = [
            { Name: '', value: o.M01 },
            { Name: '', value: o.M02 },
            { Name: '', value: o.M03 },
            { Name: '', value: o.M04 },
            { Name: '', value: o.M05 },
            { Name: '', value: o.M06 },
            { Name: '', value: o.M07 },
            { Name: '', value: o.M08 },
            { Name: '', value: o.M09 },
            { Name: '', value: o.M10 },
            { Name: '', value: o.M11 },
            { Name: '', value: o.M12 },
            { Name: '', value: o.M13 },
            { Name: '', value: o.M14 },
            { Name: '', value: o.M15 },
            { Name: '', value: o.M16 },
            { Name: '', value: o.M17 },
            { Name: '', value: o.M18 },
            { Name: '', value: o.M19 },
            { Name: '', value: o.M20 },
            { Name: '', value: o.M21 },
            { Name: '', value: o.M22 },
            { Name: '', value: o.M23 },
            { Name: '', value: o.M24 }
        ];
        return o;
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


})()