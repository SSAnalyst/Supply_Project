(function () {
    angular.module("app.addons")


    /*
  * Directive for using Bootstraps Dropdown Component
  */
    .directive("setDropdown", [
        function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attr) {
                    elem.addClass("dropdown");
                    elem.find(".dropdown-toggle").dropdown();
                    elem.on("show.bs.dropdown", function (e) {
                        e.stopPropagation();
                        elem.find(".dropdown-menu");
                    });

                    elem.on("click", 'input, select, label, .noClose', function (e) {

                        if (!$(e.toElement).hasClass("doClose")) {
                            e.stopPropagation();
                        }
                    });
                }
            };
        }
    ]);

})()