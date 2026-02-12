(function () {

    angular.module("app")
        .factory("cockpitService", ["Upload", "$odata", "user", "$rootScope", Service]);


    function Service(Upload, $odata, user, $rootScope) {
        var factory = {
            upload: upload,
            CountryPeriod: CountryPeriod,
            data: [],
            cache: {
            },
            updateAlternatePeriod: updateAlternatePeriod,
            reset: reset,
            deleteBrick: deleteBrick,
            deleteNational: deleteNational
        };

        function deleteBrick(id) {
            return $odata("CountryPeriod").id(id).property("DeleteBrickData").post(); 
        }

        function deleteNational(id) {
            return $odata("CountryPeriod").id(id).property("DeleteNationalData").post(); 
        }


        function reset(countryPeriodUuid) {
            return $odata("countryPeriod").id(countryPeriodUuid).property("reset").post();
        }

        function updateAlternatePeriod(id, newPeriodId) {
            //console.log("UpdatingCountry", id, newPeriodId);
            return $odata("CountryPeriod")
                .id(id)
                .update({ AlternatePeriodId: newPeriodId });
        }

        function CountryPeriod($stateParams) {
            var cp = $odata("CountryPeriodUserOverview")
                .filter("CountryId eq " + $stateParams.country + " and PeriodId eq " + $stateParams.date)
                .get()
                .then(function (data) {
                    return user.promise.then(function (u) {
                        if ((data.results.length === 0 || !data.results[0].CountryPeriodUuid) &&
                            u.canRead("country." + $stateParams.country)) {
                            return $odata("CountryPeriod")
                                .add({
                                    CountryId: $stateParams.country,
                                    PeriodId: $stateParams.date,
                                    StatusId: 100
                                });
                        }
                        return data.results[0];
                    });

                });
            this.cache.CountryPeriod = cp;
            return cp;
        }

        function DataPrearation(countryPeriod) {

            new $odata("Upload")
                .filter("Delete eq 0 and CountryPeriodUuid eq " + countryPeriod.CountryPeriodUuid)
                .get()
                .then(function (data) {

                });


        }

        function upload(file, type, id) {
            //console.log("starting upload", file);
            if (file && !file.$error) {

                return Upload.upload({
                    url: "/_api/Import/" + type + "/" + id,
                    data: {
                        id: 1,
                        file: file
                    }
                }).then(function (resp) {
                    factory.data = resp.data;
                    return resp.data;
                }, function (err) {
                    console.log("Error", err);
                    var message = "";
                    if (err.data.ExceptionMessage) {
                        message = "\nMessage: " + err.data.ExceptionMessage;
                    }
                    $rootScope.toaster(
                        "error",
                        "The structure of the uploaded file does not match the prerequesits. Please adjust the file according to the structure defined in the templates"
                        , message);
                    return err;
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                    //console.log("progress: " + progressPercentage + "% " + evt.config.data.file.name + "\n");
                    return evt;
                });
            }
            return "";
        }

        return factory;

    }

})()