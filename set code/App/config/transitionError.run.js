(function() {

    angular.module("app")
        .run([
            "$transitions",
            "toaster",
            "$state",
            function($transitions, toaster, $state) {


                $state.defaultErrorHandler(function(err) {
                    console.log("hmm", err);
                    // Do not log transitionTo errors
                });

                var errorFn = function(trans) {
                    var err = trans.error();
                  
                    console.log("Transition Error", err);
                    if (err.type !== 2 && err.type !== 5) {
                        toaster.pop("error", err.message, err.detail);
                    }


                    return true;
                }

                $transitions.onError({}, errorFn);
            }
        ]);
})();