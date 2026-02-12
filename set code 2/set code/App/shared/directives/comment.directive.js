(function () {

    angular.module("app.addons").directive("comment", ["$timeout","$rootScope", Directive]);


    function Directive($timeout,$root) {
        return {
            restriction: "E",
            require: "ngModel",
            scope: {
                ngModel: "=",
                ngDisabled: "=",
                template: "@",
                maxLength: "=",
                placement: "@",
                text: "@",
                options: "=?",
                mandatory: "=?"
                // ngChange:"&"
            },
            template:
                '<span class="top-right" ' +
                    'uib-popover-template="template" ' +
                    'popover-placement="{{placement}}" ' +
                    'popover-append-to-body="true" ' +
                    'popover-trigger="\'outsideClick click\'"' +
                    'popover-is-open="isOpen"' +
                    'ng-click=setFocus()>' +
                    '<i ng-class="class()" ng-click></i>' +
                '</span>',
            link: function (scope, ele, attr, ngModelCtrl) {
                scope.isOpen = false;
                scope.template = scope.template || "/app/shared/templates/commentPopover.html";
                scope.placement = scope.placement || 'top-right';
                scope.class = function () {
                  
                    return scope.ngModel ? $root.Icons.commentfill : scope.mandatory ? $root.Icons.commentMandatory:$root.Icons.commentOptional ;
                }
                scope.change = function (a) {
                    if (scope.ngDisabled) return;
                    ngModelCtrl.$setViewValue(a);
                    if (scope.options) {
                        scope.isOpen = false;
                    }
                }
                scope.setFocus = function () {
                    $timeout(function () {
                        $(".popover.in textarea").focus();
                    }, 50);
                }
            }
        }
    }
})()