(function()
{
angular.module("app").run([
"$odata", function ($odata) {
    $odata.config.idPrefix = "/";
    $odata.config.idSuffix = "";
}
]);

})()