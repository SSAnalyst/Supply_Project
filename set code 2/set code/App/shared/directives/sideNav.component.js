(function (angular) {

    angular.module("app.addons")
        .component("sideNav",
        {
            bindings: {
                heading: "@"
            },
            transclude: true,
            template:
            '<h1 class="top">' +
            '   {{$ctrl.heading}}' +
            '   <a class="closebtn" ui-sref="^"><i ng-class="$root.Icons.close"></i></a>' +
            '</h1 >' +
            '<div class="content" ng-transclude></div>'
        })

})(angular)