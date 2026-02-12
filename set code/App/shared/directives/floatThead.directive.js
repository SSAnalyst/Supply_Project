(function () {
    angular.module("app.addons")
    /*
     * Creates a Floating Header styled Table
     * @example
     * <table float-thead="ObjectToWatch">...</table>
     * @param ObjectToWatch {String | Array<String>} Object to be Watched for size changes
     * @requires floatTHead.js jQuery Library
     */
    .directive("floatThead", [
        "$timeout", function ($timeout) {
            return {
                scope:{floatThead:"="},
                link: function (scope, elem, attr) {
                    $(elem).wrap("<div class='wrap'></div>");
                    $(elem)
                        .floatThead({
                            position: 'auto',
                            scrollContainer: function ($table) {
                                // $(elem).wrap("<div class='wrap' style='height:200px;'></div>")
                                return $table.closest('.wrap');
                            }
                        });
                    scope.$watch("floatThead", function (next,prev) {
                        $(".table").floatThead("reflow");
                        $timeout(function () {
                            //console.log("reflow");
                                $(".table").floatThead("reflow");
                            },
                            100);


                    }, true);
                }
            };
        }
    ]);

})()