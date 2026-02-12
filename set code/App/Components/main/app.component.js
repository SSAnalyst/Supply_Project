(function () {

    angular.module("app")
        .component("app",
        {
            template:
                '<div class="flex-container">' +
                '  <div class="flex-box countryPicker" ui-view="picker"></div>' +
                '  <div class="flex-box breadcrumbs" ui-view="breadcrumbs"></div>' +
                '</div>' +
                '<div ui-view="main" class="flex-column"></div>' +
                '<div class="sidenav" ng-class="{opened:$root.$sidenav.opened}"><div  ui-view="side"></div></div>',
            controller:["sidenav",appController]

        });

    function appController(sidenav) {
        //console.log("app Initialized");
        this.$sidenav = sidenav;
        angular.element("[set-cloak]").removeAttr("set-cloak");
    }

})();