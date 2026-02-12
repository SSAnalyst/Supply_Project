(function() {
    

    angular.module("app").run([
        "$rootScope", "$stateParams", "$state", "sidenav", "iconService", "$odata", "toaster", "user","helpService", function ($rootScope, $stateParams, $state, sidenav, iconService, $odata, toaster, user, helpService) {
            $rootScope.Icons = iconService;
            $rootScope.$sidenav = sidenav;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$state = $state;
            $rootScope.odataInfo = $odata.info;
            $rootScope.templateLoading = false;
            $rootScope.user = user;
            $rootScope.help = helpService;
            $rootScope.toaster = function (type, title, body) {
                toaster.pop(type, title, body);
            }
          
            //$rootScope.$on('$viewContentLoaded', function (event) {
            //console.log("content loaded", event);
                
            //});
        }
    ]);
})()