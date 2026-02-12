(function() {
    angular.module("app")
        .component("analysis.breadcrumbs",
        {
            bindings: { countryPeriod: "<" },
            template:
                "<breadcrumbs></breadcrumbs>" +
                    "<h2 class='centered'>" +
                    "   <i ng-click uib-popover-template='\"navigation.html\"' popover-trigger='\"outsideClick\"' popover-placement='bottom-right' style='position:absolute;top: 50%;margin-top:-12px;right:20px;' ng-class='$root.Icons.hamburger' class='right'></i>" +
                    "</h2>" +
                    "<script type='text/ng-template' id='navigation.html'>" +
                    "   <div class='list-group'>" +
                    "       <a class='list-group-item' ui-sref-active='active' ng-show='$ctrl.countryPeriod.StatusId >= 100' ui-sref='dataPreparation'>Data Preparation</a>" +
                    "       <a class='list-group-item' ui-sref-active='active' ng-show='$ctrl.countryPeriod.StatusId >= 200' ui-sref='anomalyDetection'>Anomaly Detection</a>" +
                    "       <a class='list-group-item' ui-sref-active='active' ng-show='$ctrl.countryPeriod.StatusId >= 300' ui-sref='anomalyValidation'>Anomaly Validation</a>" +
                    "       <a class='list-group-item' ui-sref-active='active' ng-show='$ctrl.countryPeriod.StatusId >= 400' ui-sref='patientDemandValidation'>Patient Demand Validation</a>" +
                    "       <a class='list-group-item' ui-sref-active='active' ng-show='$ctrl.countryPeriod.StatusId >= 500' ui-sref='extrapolate'>Extrapolate VPD</a>" +
                    "   </div>" +
                    "</script>"
        });
})();