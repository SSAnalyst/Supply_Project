(function () {

    angular.module("app")
        .component("anomalyValidation",
        {
            bindings: {
                list: "<",
                countryPeriod: "<",
                permissions: "<",
                comments: "<"
            },
            templateUrl: "/Analysis/AnomalyValidation",
            controller: [
                "$stateParams",
                "$uibModal",
                "anomalyValidationService",
                "$scope",
                "$filter",
                "$state",
                Controller]
        });

    function Controller(
        $stateParams,
        $uibModal,
        anomalyValidationService,
        $scope,
        $filter,
        $state
    ) {
        var vm = this;
        //console.log(vm);
        vm.filter = filter;
        vm.update = update;
        vm.canFinalize = canFinalize;
        vm.finalize = finalize;
        vm.page = 1;
        vm.pageSize = 20;
        vm.pageOffset = 0;
        vm.pageChanged = pageChanged;
        vm.search = {};



        vm.$onInit = function () {
            //console.log("init");
            vm.chartOptions = {
                type: "serial",
                categoryField: "Name",
                autoMarginOffset: 0,
                categoryAxis: {
                    gridPosition: "start",
                    parseDates: false,
                    gridAlpha: 0,
                    axisAlpha: 0,
                    labelsEnabled: false,

                },
                chartCursor: {
                    categoryBalloonEnabled: false,
                    cursorAlpha: 1
                },
                balloon: {
                    textAlign: "right"
                },
                valueAxes: [{
                    id: "vpd",
                    tickLength: 0,
                    labelsEnabled: false,
                    gridAlpha: 0,
                    axisAlpha: 0

                }],
                graphs: [{
                    balloonText: "[[category]]:\n[[value]]",
                    type: "column",
                    title: "Income",
                    valueField: "value",
                    fillAlphas: 1,
                    id: "vpdGraph",
                    valueAxis: "vpd",
                    lineThickness: 0,
                    color: "#aaa",
                    fillColor: "#aaa",
                    lineColor: "#aaa"

                }]
            }
        }

        $scope.$watch(
            function () {
                return $stateParams.page;
            },
            function (a, b) {
                if (a !== vm.page) {
                    vm.page = a;
                }
                vm.pageOffset = (vm.page - 1) * vm.pageSize;
            });

        var comparer = {};
        $scope.$watch(
            function () {
                comparer.stateParams = $stateParams.view;
                for (var key in vm.search) {
                    if (vm.search.hasOwnProperty(key)) {
                        comparer["_" + key] = vm.search[key];
                    }
                }
                return comparer;
            },
            filterList,
            true);


        function filterList() {
            vm.filtered = $filter("filter")($filter("filter")(vm.list, vm.search), filter);
        }

        function pageChanged() {
            $state.go(".", { page: vm.page });
        }

        function filter(item) {
            var view = true;
            switch ($stateParams.view) {
                case "all":
                    view = true;
                    break;
                case "notAccepted":
                    view = !item.AnomalyApproved && item.AnomalyRegion;
                    break;
                case "allAnomalies":
                    view = item.AnomalyRegion;
                    break;
                case "notApproved":
                    view = !item.AnomalyApproved;
                    break;
                case "approved":
                    view = item.AnomalyApproved;
                    break;
                case "missingComment":
                    view = item.AnomalyRegion && !item.AnomalyComment;
                    break;
            };
            return view;
        }

        function canFinalize() {
            if (!vm.permissions.canEdit || vm.finalizing) {
                return false;
            }
            switch (vm.countryPeriod.StatusId) {
                case 310:
                    var bad = vm.list.some(function (item) {
                        return !item.AnomalyComment && (item.AnomalyRegion && !item.AnomalyCountry);
                    });
                    //console.log("canfinalize", bad);
                    return !bad;
                default:
                    return true;
            }
        }

        function finalize() {
            var text =
                "All relevant products / bricks have been marked as potential anomalous. If confirmed no more changes are possible and the country coordinator will be informed.";
            switch(vm.countryPeriod.StatusId) {
                case 300:
                    break;
                case 310:
                    text =
                        "All comments have been correctly entered and the products / bricks have been correctly flagged as anomalous / not anomalous. If confirmed no more changes are possible.";
                    break;
                case 320:
                    text =
                        "All comments have been correctly entered and the products / bricks have been correctly flagged as anomalous / not anomalous. If confirmed no more changes are possible.";
                    break; 

            }
            var modal = $uibModal.open({
                animation: true,
                controller: ["$scope", function ($scope) {
                    $scope.Title = "Confirmation";
                    $scope.Body = text;
                    $scope.Icons = "warning";

                }]
            });
            modal.result.then(function (data) {
                if (data) {
                    vm.finalizing = true; 
                    anomalyValidationService
                        .finalize(vm.countryPeriod.CountryPeriodUuid)
                        .then(function () {
                            $state.go("^", { reload: true });
                        }).finaly(function() {
                            vm.finalizing = false; 
                        });
                } else {
                    //console.log("resolved false");
                }
            });
        }

        function update(obj, field, dbField) {
            dbField = dbField || field;
            var newObj = {}
            newObj[dbField] = obj[field];
            vm.changed = true;
            return anomalyValidationService.update(obj.MarketDemandBrickUuid, newObj);
        }

        vm.deselectAllPotentials = deselectAllPotentials;

        function deselectAllPotentials() {
            if (vm.deselcting) return;  
            var modal = $uibModal.open({
                animation: true,
                controller: ["$scope", function ($scope) {
                    $scope.Title = "Confirmation";
                    $scope.Body = "All potential anomalies will be deselected. This process can not be undone. Do you want to proceed?";
                    $scope.Icons = "warning";

                }]
            });
            modal.result.then(function (data) {
                if (data) {
                    vm.deselecting = true; 
                    anomalyValidationService.deselectAllPotentials(vm.countryPeriod.CountryPeriodUuid)
                        .then(function () {
                            $scope.$broadcast("av.update");
                            vm.deselecting = false; 
                        });
                } else {
                    //console.log("resolved false");
                }
            });

           
        }

        vm.approveAll = approveAll;
        function approveAll() {
            anomalyValidationService.approveAll(vm.countryPeriod.CountryPeriodUuid)
                .then(function () {
                    $scope.$broadcast("av.update");
                });
        }

        $scope.$on("av.update",
            function () {
                var prom;
                if (vm.countryPeriod.StatusId > 300) {
                    prom = anomalyValidationService
                        .listAnomalie(vm.countryPeriod.BrickUploadUuid, vm.countryPeriod.PeriodId);
                } else {
                    prom = anomalyValidationService.list(vm.countryPeriod.BrickUploadUuid, vm.countryPeriod.PeriodId);
                }

                prom.then(function (data) {
                    vm.list = data;
                    filterList();
                });
            });
    }
})();