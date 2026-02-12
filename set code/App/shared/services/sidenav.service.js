(function() {

    angular.module("app.addons")
        .factory("sidenav", ["$transitions",Service]);


    function Service($transitions) {
        //console.log("sidenavservice");
        var service = {
            opened:false , 
            show: function(width) {

                width = width || "500px";
                //console.log("called Sidenav with width", width, angular.element(".sidenav"));
                this.opened = true;
               // var side = angular.element(".sidenav");
                //if (side && side.length >= 1) {
                 //   side[0].style.width = width;
                  
               // }
            },
            hide: function() {
                //console.log("called close Sidenav with ", angular.element(".sidenav"));
                this.opened = false;
             //   var side = angular.element(".sidenav");
             //   if (side && side.length >= 1) {
                //    side[0].style.width = "0px";
                 

             //   }
            }
        }
        $transitions.onStart({ },
            function(trans) {
                var state = trans.to();
               
                if (state.name.indexOf("detail") > -1|| state.views["side@app"]) {
                    service.show();
                } else {
                    service.hide();
                }
            });
       

        return service;

    }
})()