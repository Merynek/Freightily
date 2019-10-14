angular.module('appDirectives')
    .directive("m", function () {
        return {
            templateUrl: 'app/shared/directives/Menu/menuDirective.html',
            restrict: "E",
            transclude: true,
            scope: {
                param: "="
            },
            controller: function ($scope, User) {
                var route = $scope.param.route;
                $scope.aboveRoute = route.split("|")[0];
                $scope.underRoute = route.split("|")[1];
                $scope.user = User;
                User.isPaid();
            }
        };
    });
