(function () {
    angular.module("app.addons")
        .directive("spinner", ["$odata","iconService", spinnerDirective]);

    function spinnerDirective($odata,iconService) {
        return {
            scope: {
                loading: "=?",
                show: "@"
            },
            template:
                '<i ng-class="loading || odataLoading.loading ? Icons.loading :class"></i>&nbsp;',
            restrict: "E",

            link: function (scope, elem, attrs) {
                scope.Icons = iconService;
                if (attrs.show !== undefined) {
                    scope.class = scope.show;
                } else {
                    scope.class = iconService.save;
                }

                // scope.loading = scope.loading || ;

                if (attrs.loading == undefined) {
                    scope.odataLoading = $odata.info;
                }


                var parent = elem.parent();
                if (!attrs.leaveParent && (parent[0].tagName.toLowerCase() === "button" && !hasDisabledAttribute(parent))) {

                    scope.$watchGroup(["loading", "odataLoading.loading"], function (value) {
                        var v = !!value[0] || !!value[1];

                        $(parent).prop("disabled", v);
                    });
                }

                function hasDisabledAttribute(node) {
                    var disabled = $(node).attr("ng-disabled") || $(node).attr("data-ng-disabled");
                    return !!disabled;
                }

            }
        }
    }
})()