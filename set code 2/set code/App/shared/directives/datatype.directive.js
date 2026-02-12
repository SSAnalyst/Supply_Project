(function() {


    angular.module("app.addons")
        .directive("datatype", ["iconService", directive]);

    function directive(iconService) {
        return {
            scope: {
                type: "="
            },
            template: "<i ng-class='class' uib-tooltip='{{tooltip}}'></i>",
            link: function(scope, ele, attr) {
                
                switch(scope.type) {
                    case 1:
                        scope.class = iconService.brick;
                        scope.tooltip = "Brick Data"; 
                        break;
                    case 2:
                        scope.class = iconService.country;
                        scope.tooltip = "National Data";
                        break;

                    case 3:
                        scope.class = iconService.exfactory;
                        scope.tooltip = "ExFactory Data";
                        break;
                    case 4:
                        scope.class = iconService.user;
                        scope.tooltip = "Manual Data";
                        break;
                }

            }
        }
    }
})()