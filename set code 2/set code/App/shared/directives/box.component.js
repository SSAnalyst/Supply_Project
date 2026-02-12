(function (angular) {
    angular.module("app.addons")
        .component("box",
        {
            transclude: true,
            bindings: {
                heading: "@"
            },
            template:
                '<div class="flex-container">' +
                '   <div class="flex-box">' +
                '      <div class="tilehead">' +
                '          <h1>{{$ctrl.heading}}</h1>' +
                '       </div>' +
                '       <div class="content" ng-transclude>' +
                '       </div>' +
                '   </div>' +
                '</div>'
        })

})(angular)