(function () {

    angular.module("app")
        .component("cockpit.dataPreparation",
        {
            bindings: {
                countryPeriod: "<"
            },
            templateUrl: "/Analysis/CockpitDataPreparation",
            //template: "<div>TEST</div>",
            controller: ["cockpitService", "$scope", "$stateParams", "$uibModal", "$filter", "$state",Controller]

        });

    function Controller(cockpitService, $scope, $stateParams, $uibModal, $filter, $state) {

        var vm = this;
        vm.service = cockpitService;
        vm.upload = upload;
        vm.uploading = {
            Brick: {
                loading: false,
                percent: -1
            },
            National: {
                loading: false,
                percent: -1
            }
        }
        vm.deleteNational = deleteNational;
        vm.deleteBrick = deleteBrick;

        $scope.$watch(function () {
            return vm.nationalFiles;
        }, function (file) {
            if (file) {
                vm.upload(vm.nationalFiles, "National");
            }
        });

        $scope.$watch(function () {
            return vm.brickFiles;
        }, function (file) {
            if (file) {
                vm.upload(vm.brickFiles, "Brick");
            }
        });

        function deleteNational() {
            vm.deletingNational = true; 

            cockpitService.deleteNational(vm.countryPeriod.CountryPeriodUuid)
                .then(function () {
                    vm.countryPeriod.NationalFileName = null;
                }).finally(function() {
                    vm.deletingNational = false; 
                }); 
        }

        function deleteBrick() {
            vm.deletingBrick = true; 
            cockpitService.deleteBrick(vm.countryPeriod.CountryPeriodUuid).then(function () {
                vm.countryPeriod.BrickFileName = null;
            }).finally(function() {
                vm.deletingBrick = false; 
            }); 

        }

        function dateFromPeriod(period) {
            return $filter("moment")(period, "MMM YYYY", "YYYYMM");
        }

        function upload(files, type) {
            vm.uploading[type].loading = true;
            return cockpitService
                .upload(files, type, vm.countryPeriod.CountryPeriodUuid)
                .then(function (data,b) {
                    if (data === undefined) {
                        //console.log("ERROR Uploading", data,b);
                        vm.uploading[type].loading = false;
                        vm.uploading[type].percent = -1;
                        return false;
                    }
                        
                if (data && data.existingPeriodId && data.newPeriodId) {
                    var modal = $uibModal.open({
                        animation: true,
                        controller: ["$scope", function ($scope) {
                            $scope.Title = "Confirmation";
                            $scope.Body = ("A difference in the Reference Date was detected. <br/>" +
                                "Previous Date: {0}<br/>" +
                                "New Date: {1}<br/>" +
                                "Should the previous value be overridden?").Format(dateFromPeriod(data.existingPeriodId), dateFromPeriod(data.newPeriodId));
                            $scope.Icons = "warning";
                            $scope.CloseText = "No";
                            $scope.SaveText = "Yes";
                        }]
                    });
                    modal.result.then(function (moddata) {
                        //console.log("modal", moddata);
                        if (moddata) {
                            cockpitService
                                .updateAlternatePeriod(vm.countryPeriod.CountryPeriodUuid, data.newPeriodId)
                                .then(function () {
                                    cockpitService.CountryPeriod($stateParams).then(function (d) {
                                        vm.countryPeriod = d;
                                    });
                                });
                        } else {
                            //console.log("resolved false");
                        }
                    });
                }
                if (type === "National") {
                    vm.countryPeriod.NationalFileName = "Uploaded";
                } else {
                    vm.countryPeriod.BrickFileName = "Uploaded";
                }
                vm.uploading[type].loading = false;
                vm.uploading[type].percent = -1;
                cockpitService.CountryPeriod($stateParams).then(function (d) {
                    vm.countryPeriod = d;
                });
                return data;
            },
                function (data) {
                    console.log("error", data);
                },
                function (evt) {
                    vm.uploading[type].percent = parseInt(100.0 *
                           evt.loaded / evt.total);
                    return evt;
                });

        }


    }

})();