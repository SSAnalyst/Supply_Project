(function () {

    angular.module("app.addons")
        .directive("riskPicker", [Directive]);


    function Directive() {
        return {
            restirct: "E",
            require: "ngModel",
            scope: {
               ngModel: "=",
               ngDisabled:"="
            },
            template:
                "<div class='risk-picker'>" +
                    "<span uib-tooltip='No Risk' ng-click='change(2)' class='no-risk' ng-class='{active:ngModel==2}'><i ng-class='$root.Icons.norisk'></i></span>" +
                    "<span uib-tooltip='Low Risk' ng-click='change(1)' class='low-risk' ng-class='{active:ngModel==1}'><i ng-class='$root.Icons.lowrisk'></i></span>" +
                    "<span uib-tooltip='High Risk' ng-click='change(3)' class='high-risk' ng-class='{active:ngModel==3}'><i ng-class='$root.Icons.highrisk'></i></span>" +
                "</div>",

            link: function (scope,ele,attr,ngModelCtrl) {
                scope.change = function (value) {
                    if (scope.ngDisabled) return; 
                    ngModelCtrl.$setViewValue(value); 
                }

                scope.Risk = {
                    1: "Low Risk",
                    2: "No Risk",
                    3: "High Risk"
                }
            }

        }

    }
    //"<i ng-class=\"{' {{$root.Icons.lowrisk}}': value==1, ' {{$root.Icons.mediumrisk}}': value==2 , ' {{$root.Icons.highrisk}}': value==3}\"></i> {{Risk[value] || 'Please Choose' }}",
})()