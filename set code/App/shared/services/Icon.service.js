(function () {

    "use strict";
    angular
        .module("app.addons")
        .service("iconService", [service]);


    function service() {
        return {
            "add": "ms-Icon ms-Icon--Add",
            "anomaly": "ms-Icon ms-Icon--CompletedSolid text-danger",
            "arrowdown": "ms-Icon ms-Icon--ChevronDown",
            "arrowleft": "ms-Icon ms-Icon--ChevronLeft",
            "arrowright": "ms-Icon ms-Icon--ChevronRight",
            "arrowright2": "ms-Icon ms-Icon--DoubleChevronRight12",
            "arrowup": "ms-Icon ms-Icon--ChevronUp",
            "bad": "ms-Icon ms-Icon--RemoveFilter  text-danger",
            "brick": "ms-Icon ms-Icon--Tiles2",
            "calendar": "ms-Icon ms-Icon--Calendar",
            "check": "ms-Icon ms-Icon--Accept",
            "clearfilter": "ms-Icon ms-Icon--ClearFilter",
            "close": "ms-Icon ms-Icon--Cancel",
            "comment": "ms-Icon ms-Icon--Message text-danger",
            "commentfill": "ms-Icon ms-Icon--MessageFill text-success",
            "commentMandatory": "ms-Icon ms-Icon--MessageFill text-danger",
            "commentOptional": "ms-Icon ms-Icon--Message text-muted",
            "country": "ms-Icon ms-Icon--Flag",
            "download": "ms-Icon ms-Icon--Subscribe",
            "error": "ms-Icon ms-Icon--Error",
            "exfactory": "ms-Icon ms-Icon--EMI",
            "expand": "ms-Icon ms-Icon--CalculatorAddition",
            "filter": "ms-Icon ms-Icon--Filter text-muted",
            "finished": "ms-Icon ms-Icon--Completed text-success", 
            "forecast": "ms-Icon ms-Icon--Market",
            "good": "ms-Icon ms-Icon--CheckboxComposite text-success",
            "ok": "ms-Icon ms-Icon--CheckboxComposite",
            "hamburger": "ms-Icon ms-Icon--GlobalNavButton",
            "help": "ms-Icon ms-Icon--Help",
            //"highrisk": "ms-Icon ms-Icon--CircleFill ",
            "highrisk": "ms-Icon ms-Icon--CircleFill ",
            //"highrisk": "ms-Icon ms-Icon--DoubleChevronUp ",
            "home": "ms-Icon ms-Icon--Home",
            "important": "ms-Icon ms-Icon--Important",
            "info": "ms-Icon ms-Icon--Info",
            "loading": "ms-Icon ms-Icon--ProgressLoopOuter glyphicon-refresh-animate",
            "location": "ms-Icon ms-Icon--POI",
            "lock": "ms-Icon ms-Icon--Lock",
            //"lowrisk": "ms-Icon ms-Icon--CircleHalfFull ",
            "lowrisk": "ms-Icon ms-Icon--Location ",
            //"lowrisk": "ms-Icon ms-Icon--ChevronUp ",
            "mail": "ms-Icon ms-Icon--Mail",
            "mediumrisk": "ms-Icon ms-Icon--TriangleSolidRight12",
            "noanomaly": "ms-Icon ms-Icon--CircleRing text-success",
            //"norisk": "ms-Icon ms-Icon--CircleRing",
            //"norisk": "ms-Icon ms-Icon--Remove",
            "norisk": "ms-Icon ms-Icon--CircleRing",
            "notstarted": "ms-Icon ms-Icon--CircleRing text-muted",
            "reduce": "ms-Icon ms-Icon--CalculatorSubtract",
            "remove": "ms-Icon ms-Icon--Delete",
            "reset": "ms-Icon ms-Icon--DisableUpdates",
            "report":"ms-Icon ms-Icon--DocumentSet",
            "save": "ms-Icon ms-Icon--DoubleChevronRight",
            "search": "ms-Icon ms-Icon--Search",
            "settings": "ms-Icon ms-Icon--Settings",
            "skipped": "ms-Icon ms-Icon--ReceiptForward text-muted",
            "started": "ms-Icon ms-Icon--Location text-primary",
            "user": "ms-Icon ms-Icon--Contact",
            "users": "ms-Icon ms-Icon--Group",
            "warning": "ms-Icon ms-Icon--Warning",
            "manual": "ms-Icon ms-Icon--Library", 
            "link": "ms-Icon ms-Icon--Link",
            "removeLink": "ms-Icon ms-Icon--RemoveLink"
           
        }
    }

})()