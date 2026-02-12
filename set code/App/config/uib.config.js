(function() {
    
        angular.module("app").config([
        "$uibModalProvider", function ($uibModalProvider) {
            $uibModalProvider.options.templateUrl = "/app/shared/templates/modal.html";
        }
    ]);
})()