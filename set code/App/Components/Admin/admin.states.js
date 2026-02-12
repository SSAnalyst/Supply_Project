(function () {
    angular.addState({
        name: "admin",
        parent: "app",
        url: "/admin",
        helpText: "admin.select",
       restrictPath: [function () {
           return "admin";
       }],
        title: "Administration",
        //restrictPath: "admin",
        views: {
            "main@app": {
                component: "admin"

            },
            "breadcrumbs@app": {
                component: "breadcrumbs"
            },

            "picker@app": {
                component: "admin.picker"
            }
        }
    });
})();