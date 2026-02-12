(function () {
    angular.module("app.addons")
        .directive("fieldComment", ["fieldCommentFactory", "$state", "iconService", Comment])
        .factory("fieldCommentFactory", ["$odata","$timeout", CommentFactoryMock]);

    var template =
        '<span set-dropdown class="warning" ng-class="{innerhover:!comment.ID, hidden: !comment.ID && !editmode}">' +
        '     <span class="dropdown-toggle" data-toggle="dropdown">' +
        '         <span class="{{Icons.comment}}">' +
        '         </span>' +
        '     </span>' +
        '     <ul class="dropdown-menu" style="margin-top: 10px;">' +
        '         <li class="noClose" style="padding: 0 10px 10px;min-width: 300px;text-align:left">' +
        '             <p><strong>Comment:</strong> <p  ng-show="!editmode">{{comment.Comment}}</p><small ng-show="editmode" class="text-muted pull-right">{{comment.Comment.length || 0}}/80</small></p>' +
        '             <div class="input-group" style="width: 500px"  ng-show="editmode">' +
        '                 <input class="form-control input-sm" ng-model="comment.Comment"/>' +
        '                 <span class="input-group-btn">' +
        '                     <button class="btn btn-primary btn-sm" ng-click="saveComment()"><spinner loading="saving"/></button>' +
        '                 </span>' +
        '             </div><small class="text-muted" ng-show="comment.ChangedBy">{{comment.ChangedBy}} - {{comment.ChangedOn |date:\'MMM dd, yyyy | HH:mm\'}}</small>' +
        '         </li>' +
        '     </ul>' +
        '</span>';

    function Comment(appCommentFactory, $state, iconService) {
        return {
            restict: 'ea',
            scope: {
                screen: "@",
                field: "@",
                editmode: "="
            },
            template: template,
            link: function (scope, elem, attr) {
                scope.Icons = iconService;
                scope.saving = false;
                var screenName = scope.screen || $state.Name;
                var fieldID = scope.field || "noField";
                scope.saveComment = function () {
                    scope.saving = true; 
                    appCommentFactory
                        .save(scope.comment)
                        .then(function (comment) {
                            scope.saving = false; 
                            scope.comment = comment;
                        });
                }

                appCommentFactory
                    .get(screenName, fieldID)
                    .then(function (data) {
                        scope.comment = data;
                    });
            }
        }
    }

    function CommentFactoryMock($odata,$timeout) {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        var factory = {
            screens: {},
            get: function (ScreenId, field) {
                factory.screens[ScreenId] = factory.screens[ScreenId] || {};

                if (randomIntFromInterval(0, 100) > 97) {
                    factory.screens[ScreenId][field] = {
                        ID: randomIntFromInterval(1, 10000),
                        ScreenID: ScreenId,
                        FieldID: field,
                        Comment: "Comment for Screen: " + ScreenId + ", Field: " + field,
                        ChangedOn: new Date(),
                        ChangedBy: "User"
                    }
                } else {
                    factory.screens[ScreenId][field] = {
                        ScreenID: ScreenId,
                        FieldID: field,
                        Comment: ""
                    }
                }
                return $odata.when( factory.screens[ScreenId][field]);
            },
            save: function (Comment) {
                Comment.ID = randomIntFromInterval(0, 10000);
                Comment.ChangedOn = new Date();
                Comment.ChangedBy = "User";
                factory.screens[Comment.ScreenID][Comment.FieldID] = Comment;
                return $timeout(function() { return Comment },500);
            }

        }
        return factory;
    }


    function CommentFactory($odata) {

        var factory = {
            table: "Comment",
            screens: {},
            load: function (screen, refresh) {
                if (!refresh && factory.screens[screen]) {
                    return factory.screens[screen];
                }
                factory.screens[screen] = $odata(factory.Table)
                    .filter("ScreenID eq '" + screen + "'")
                    .get()
                    .then(function (data) {
                        var fields = {};
                        angular.forEach(data.value,
                            function (comment) {
                                fields[comment.FieldID] = comment;
                            });
                        return fields;
                    });
                return factory.screens[screen];
            },
            get: function (screen, id) {
                return factory.load(screen).then(function (data) {
                    return data.value[id] || { FieldID: id, ScreenID: screen, Comment: "" };
                });
            },
            save: function (comment) {
                if (comment.ID) {
                    return factory.update(comment).then(function () {
                        return comment;
                    });
                } else {
                    return factory.add(comment);
                }
            },
            update: function (comment) {
                return $odata(factory.Table)
                    .id(comment.ID)
                    .update({ Comment: comment.Comment })
                    .then(function () {
                        factory.load(comment.ScreenID, true);
                    }).catch(function () {

                    });
            },
            add: function (comment) {
                return $odata(factory.Table)
                    .add(comment)
                    .then(function (newcomment) {
                        factory.load(newcomment.ScreenID, true);
                        return newcomment;
                    }).catch(function () {

                    });
            },
            remove: function (comment) {
                $odata(factory.Table)
                    .id(comment.ID)
                    .delete().then(function () {
                        factory.load(comment.ScreenID, true);
                    });
            }
        }
        return factory;
    }

})();