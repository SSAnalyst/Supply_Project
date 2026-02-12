(function () {
    angular.module("app.addons")

    /*
 * Directive for using Bootstraos PopOver Component
 * Example: <span set-popover c-content="#mycontent">i</span>
 * <div id="mycontent>The Content</div>
 */
    .directive("setPopover", ["$interpolate",
        function ($interpolate) {

            return {
                restrict: 'A',
                link: function (scope, elem, attr) {
                    var content = $(attr.cContent).html();
                  
                    $(elem).popover({
                        html: true,
                        container: attr.container || '',
                        trigger: attr.trigger || 'hover',
                        placement: attr.placement || 'auto right',

                        content: $interpolate(content)(scope)
                    });
                }
            };
        }
    ]);


})()