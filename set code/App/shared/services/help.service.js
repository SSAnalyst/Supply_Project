(function() {

    "use strict";
    angular
        .module("app.addons")
        .service("helpService", ["$sce",service]);


    function service($sce) {
        return {
            "current": "noText",
            "noText": "No Help Text",
            "regionOverview.matrix":"This matrix provides an overview about the current steps of the ESEP process in the different countries that you are responsible for.",
            "admin.select": "In this section user and masterdata can be maintained.",
            "admin.user": "In this section the user authorizations can be managed.",
            "admin.country": "In ths section the brands can be assigned per country.",
            "admin.sku": "In this section the precalculated SKUs can be adjusted, if needed.",
            "country.cockpit": "This dashboards provides a detailed overview about the current steps of the ESEP process in one specific country that you are responsible for.",
            "country.100": "Assign the Bayer Product ('Bayerr SKU') to the SKU provided by the local data vendor for all products which are manufactured by BayerFurther Producs must be marked as in our out of scope. Products that are marked out of scope are not further processed, but even for them a Bayer Product must be assigned. The Emergency channel quantity must be maintained in case the product has been sold via the emergency channels. After all information has been maintained, Submit must be selected to initate the check by the regional market demand managers.",
            "country.110": "Adjust in Scope / Out of Scope settings of SKUs proposed by the country coordinator if needed.",
            "country.200": "Validate Brick data provided by the country and mark the risk class of the product.",
            "country.300": "Check for each product / brick if the product must be analyzed in detail by the country. Therefore prdocust must be marketed as potential anomalous",
            "country.310": "Mark products as anomalous and select comment. ",
            "country.320": "Validate comments and anomalies and approve them if feasible.",
            "country.400": "Validate pre-calculated monthly limits and submit if ok.",
            "country.410": "Validate pre-calculated monthly limits. Change of monthly limit can be proposed. If this is done, a comment must be entered.",
            "country.420": "Validate proposed monthly limit. If ok, submit to initiate next step.",
            "country.500": "Select source data and validate proposed target volume by region. By default brick data is taken if available, otherwise national data, otherwise ex-factory sales.",
            "country.510": "Validate calculated target volume and enter proposal if more SKUs are needed. This must be commented accordingly.",
            "country.520": "Check proposed target volume. If ok, mark all records as ok and click on submit.",
            "regionOverview.report":"View Reports.",
            "output": function () {
                var trusted = this[this.current]; 
                if (typeof trusted === "string") {
                    trusted = $sce.trustAsHtml(this[this.current] +
                        "<br/><br/><a href='http://sp-coll-bbs.bayer-ag.com/sites/030690/execute/msasupport/System%20documentation/SET/User%20Manual/SET%20User%20Manual.pptx?Web=1'><span class='ms-Icon ms-Icon--Library'></span> User Manual</a>");
                    this[this.current] = trusted; 
                    //console.log("returning trusted help", this.current, trusted); 
                } 
               
                return trusted;
            }
        }
    }
})();