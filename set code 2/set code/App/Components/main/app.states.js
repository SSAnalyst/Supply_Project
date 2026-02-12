(function () {


    angular.addState({
        name: "app",
        //  redirectTo: "countryOverview",
        abstract:true,
        component: "app",
        resolve: {
            dateList: ["dateService", function (dateService) {
                return dateService.list().then(function(data) {
                    return data.results;
                });
            }]
        }
    });

})();