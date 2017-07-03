angular.module('appDirectives')
    .directive("menu", function () {
        return {
            templateUrl: 'app/shared/directives/Menu/menuDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                param: '='
            },
            controller: function ($scope) {
                $scope.routePath = this.param.route;
            }
        };
    });
