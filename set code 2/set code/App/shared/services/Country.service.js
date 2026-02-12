(function () {


    angular.module("app.addons")
        .service("countryService", ["$odata", CountryService]);


    function CountryService($odata) {


        return {
            get: function(id) {
                return new $odata("Country").id(id).get();
            },
            list: function() {
                return new $odata("Country").get();
            }
        }


        var countryList = [
            {
                id: "AT",
                Name: "Austria",
                Status: randomIntFromInterval(1, 5) * 1000
            },
            {
                id: "BELU",
                Name: "Belgium/Luxembourg",
                Status: randomIntFromInterval(1, 5) * 1000
            },
            {
                id: "BU",
                Name: "Bulgaria",
                Status: randomIntFromInterval(1, 5) * 1000
            },
            {
                id: "CY",
                Name: "Cyprus",
                Status: randomIntFromInterval(1, 5) * 1000
            },
            {
                id: "DE",
                Name: "Germany",
                Status: randomIntFromInterval(1, 5) * 1000
            },
            {
                id: "GR",
                Name: "Greece",
                Status: randomIntFromInterval(1, 5) * 1000
            }
        ];

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
})()