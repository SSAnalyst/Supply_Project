(function() {
    angular.module("app.addons")
        .directive("statusIcon", [Directive]);

    function Directive() {
        return {
            restrict: "E",
            scope: {
                target: "=",
                status: "=",
                offset: "=?",
                skipped: "=?"
            },
            template:
                '<i ng-class="{' +
                    '\'{{$root.Icons.finished}}\': status > target+offset && !skipped,' +
                    '\'{{$root.Icons.started}}\':status >= target && status<target+offset,' +
                    '\'{{$root.Icons.notstarted}}\': status < target, ' +
                    '\'{{$root.Icons.skipped}}\': skipped && status > target }">' +
                '</i>',
            link: function(scope) {
                scope.offset = scope.offset || 99;
                scope.skipped = scope.skipped || false;
            }
        }
    }

})();