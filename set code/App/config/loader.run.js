(function () {

    angular.module("app")
        .run([
        "$transitions", "$rootScope", function ($transitions, $rootScope) {
            var viewFn = function (trans) {
                var to = trans.entering();
                //console.log("entering Loading", trans);
                var views = [];
                var global = $("[ui-view='']");
                $rootScope.templateLoading = true;
                to.forEach(function (state) {
                  //console.log("entering state", state);
                    if (!state.name == "app") {

                        global.addClass("loading-state");
                        global.append("<div class='loading'>Loading</div>");
                        views.push("");

                        return;
                    };
                    angular.forEach(state.views,
                        function (view, name) {

                            var current = name.split("@")[0];
                            if (["main", "sidenav"].indexOf(current) < 0) return;
                            views.push(current);
                            var c = $("[ui-view='" + current + "']");
                            if (c.length > 0) {
                                c.addClass("loading-state");
                                c.append("<div class='loading'>Loading</div>");
                            } else {
                                //    global.addClass("loading-state");
                                //    global.append("<div class='loading'>Loading</div>");
                            }
                        });

                });

                trans.promise.finally(function (finsih) {
                    //console.log("entering trans promis");
                    $rootScope.templateLoading = false;
                    views.forEach(function (view) {
                        $("[ui-view='" + view + "']").removeClass("loading-state");
                        $("[ui-view='" + view + "'] .loading").remove();
                    });
                });;
            }

            $transitions.onStart({}, viewFn);
           /* $transitions.onSuccess({}, function() {
                console.log("trans success");
            })
            $transitions.onFinish({}, function (item) {
                console.log("trans finishing",item);
            })
            */
        }
        ]);

})()