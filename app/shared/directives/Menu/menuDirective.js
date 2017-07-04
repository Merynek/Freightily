angular.module('appDirectives')
    .directive("m", function () {
        return {
            templateUrl: 'app/shared/directives/Menu/menuDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            transclude: true,
            scope: {
                param: '='
            },
            controller: function ($scope) {
                var route = this.param.route;
                $scope.aboveRoute = route.split("|")[0];
                $scope.underRoute = route.split("|")[1];
            }
        };
    });
