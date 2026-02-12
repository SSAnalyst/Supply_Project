(function () {
    "use strict";
    angular.module("app.addons")
        .factory("$odata", ["$http", "$q","toaster", $odata]);


    function $odata($http, $q, toaster) {
        var webservice = $OdataService;
        webservice.promises = [];
        webservice.all = all;
        webservice.when = $q.when;
        webservice.reject = $q.reject;
        webservice.info = {
            loading: 0,
            saving: 0,
            updating: 0,
            deleting: 0,
            adding: 0,
            error: []
        };

        webservice.config = {
            headers: { Accept: 'application/json' },
            idPrefix: "(", 
            idSuffix: ")",
            url: "/_api/"
        }


        webservice.default = {
          
        };

        function all(promises) {
            promises = promises || webservice.promises;
            return $q.all(promises);
        }

        function $OdataService(entity, parent) {
            var _this = {};
            _this.Entity = entity;
            _this.Parent = parent;
            _this.Key = undefined;

            _this.get = getEntity;
            _this.add = addEntity;
            _this.post = doPost;
            _this.update = updateEntity;
            _this.delete = deleteEntity;
            _this.link = linkEntity;
            _this.unlink = unlinkEntity;
            _this.id = id;
            _this.properties = {};

            _this.property= function(entity) {
                
                    return new $OdataService(entity, _this);
                
            }

            _this.extend = function (extend) {
                _this.properties.$extend = extend;
                return _this;
            }

            _this.select = function (select) {
                _this.properties.$select = select;
                return _this;
            }
            _this.filter = function (filter) {
                _this.properties.$filter = filter;
                return _this;
            }
            _this.orderby = function (orderBy) {
                _this.properties.$orderby = orderBy;
                return _this;
            }
            _this.top = function (top) {
                _this.properties.$top = top;
                return _this;
            }

            _this.skip = function (skip) {
                _this.properties.$skip = skip;
                return _this;

            }


            function id(id) {
                _this.Key = id;
                return _this;
            }

            
            function getEntityName() {

                var e = _this.Entity;
                if (_this.Key) {
                    e += webservice.config.idPrefix + _this.Key + webservice.config.idSuffix;
                }
                var p = _this;
                while (p.Parent) {
                    p = p.Parent;
                    e = p.Entity + (p.Key?(webservice.config.idPrefix + p.Key + webservice.config.idSuffix):"") + "/" + e;
                }
                return e;
            }

            function getUrl(props) {
                props = props ||{};
                return webservice.config.url + getEntityName() + getProperties(props);
            }

            function getProperties(props) {
                props = props || {};
                angular.extend(props, _this.properties);
                var string = [];
                angular.forEach(props,
                    function (value, key) {
                        string.push(key + "=" + value);
                    });
                return "?" + string.join("&");
            }

            function catchError(data, data1) {
                webservice.info.error.push(data);
                toaster.pop("error", "Webservice Error", "Error while executing "+ getUrl());
            }

            function finalEvent(event) {

                return function () {
                    event.forEach(function (e) {
                        webservice.info[e]--;
                    });
                }
            }


            function doCall(method, properties, body, loader) {
                var url = getUrl(properties|| {});
                var config = {
                    method: method,
                    url: url,
                    data: body,
                    headers: {
                        "Content-Type":"application/json"
                    }
                };
                angular.extend(config, webservice.default);
                var promise = $http(config, body).then(function (data) { return data.data });
                loader.forEach(function (item) {
                    webservice.info[item]++;
                });
                
                promise.finally(finalEvent(loader));
                promise.catch(catchError);
                webservice.promises.push(promise);
                return promise;

            }

            function getEntity(properties) {
                return doCall("GET", properties, undefined, ["loading"]);
            }

            function doPost(prop, body) {
                return doCall("POST", prop, body,["loading", "saving", "adding"]);
            }

            function addEntity(obj) {
                return doCall("POST", {}, obj, ["loading", "saving", "adding"]);
            }

            function updateEntity(obj) {
                return doCall("PATCH", {}, obj, ["loading", "saving", "updating"]);
            }

            function deleteEntity(obj) {
                return doCall("DELETE", {}, obj, ["loading", "saving", "deleting"]);
            }




            function linkEntity(target, targetId) {
                var body = { url: getUrl() + target + "(" + targetId + ")" };
                _this.Entity = _this.Entity + "/$links/" + target;
                return doCall("POST", {}, body, ["loading", "saving", "linking"]);
            }

            function unlinkEntity(target, targetId) {
                _this.Entity = _this.Entity + "/$links/" + target + "(" + targetId + ")";
                return doCall("DELETE", {}, undefined, ["loading", "saving", "unlinking"]);
            }

            return _this;
        }

        return webservice;

    }


})()