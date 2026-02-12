(function () {

    angular.module("app.addons")
        .component("breadcrumbs",
        {
            bindings: {
                home: "@",
            },
            template:
                "<h2 class='centered'>" +
                    "<span>" +
                        "<small><a ui-sref='{{$ctrl.homestate}}'><i ng-class='$root.Icons.home'></i></a></small> " +
                        "<small><i class='{{$root.Icons.arrowright}}'></i></small> " +
                    "</span>" +
                    "<span ng-repeat='s in $ctrl.chain'>" +
                        "<a ui-sref='{{s.name}}' >{{s.title||s.name}}</a>" +
                        "<small><i class='{{$root.Icons.arrowright}}' ng-show='!$last'></i></small> " +
                    "</span>" +
                "</h2> ",
            controller: ["$transitions","$state",breadcrumbsController]

        });

    function breadcrumbsController($transitions,$state) {
        var vm = this;
    
      
        getStateChain();
        $transitions.onSuccess({},getStateChain);

        vm.$onInit = function () {
         
            vm.homestate = vm.home || 'regionOverview.view({ date: $root.$stateParams.date })'
        }
        function getStateChain(tran) {
            vm.chain = [];
            var curStateName = ".";
            var curState = {};
           
            
            do {
          
                curState = $state.get(curStateName);
                if (curState && !curState.abstract) {
                    vm.chain.unshift(curState);
                } else if(!curState) {
                    return;
                }
            } while ((curStateName = getParentstate(curState)))


        }

        function getParentstate(state) {
            var parent = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];

            return parent; 
        }


    }


})();