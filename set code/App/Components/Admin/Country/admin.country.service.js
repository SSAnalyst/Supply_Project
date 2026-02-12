(function (angular) {
    "use strict";
    angular.module("app")
        .factory("adminCountryService", ["$odata", Service]);

    function Service($odata) {


        var service = {
            getCountry: function(id) {
                return $odata("Country").id(id).extend("User,Brands").get().then(function(data) {
                    return data.results; 
                }); 
            },
            getCountryList: function () {
                return $odata("Country")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });

            },
            getBrandList: function () {
                return $odata("Brand")
                    .get()
                    .then(function (data) {
                        return data.results;
                    });

            },
            update: function (id, obj) {
                return $odata("AppUser").id(id).update(obj);
            },
            addBrand: function (countryId, brandId) {
            	return $odata("BrandCountry")
                    .add({
                    	CountryId: countryId,
                    	BrandUuid: brandId
                    });
            },
            removeBrand: function (countryId, brandId) {
            	return $odata("BrandCountry")
                    .delete({
                    	CountryId: countryId,
                    	BrandUuid: brandId
                    });
            }
        };

        return service;
    }

})(angular);