(function () {
    angular.module("app.addons")
        .directive("distinctFilter", [Directive]);

    function Directive() {
        return {
            restriction: "E",
            scope: {
                list: "=",
                field: "@",
                filter: "=",
                title: "@",
                placement: "@",
                mapping: "=?",
                hideSearch: "="
            },
            template:
                '<sup class="top-right" popover-append-to-body="true" popover-trigger="\'outsideClick \'" popover-placement="{{placement}}" uib-popover-template="\'/app/shared/templates/distinctPopover.html\'"  popover-title="{{title}}"><i ng-class="filter[field]!= undefined?$root.Icons.clearfilter:$root.Icons.filter"  ng-click></i></sup>',
            link: function (scope) {

                scope.mapping = scope.mapping || {};
                scope.filter= scope.filter || {};
                scope.placement = scope.placement || 'bottom-left';
                scope.$watch("list",
                    function (value, prev) {
                     //console.log("Distinct Filter");
                        var distinctList = {};
                        scope.list.forEach(function (item) {

                            if (!distinctList[item[scope.field]]) {
                                distinctList[item[scope.field]] = true; 
                            }
                        });

                        scope.distinctList = Object.keys(distinctList);
                    });
            }
        }
    }
})()