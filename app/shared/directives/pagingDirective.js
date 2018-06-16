angular.module('appDirectives')
    .directive("paging", function () {
        return {
            templateUrl: 'app/shared/directives/pagingDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                itemCount: '='
            },
            controller: function ($scope, User, $stateParams, $state) {
                $scope.page = $stateParams.page ? $stateParams.page : "1";
                $scope.isLast = this.itemCount < 10;

                this.minus = function () {
                    var page = (parseInt($stateParams.page));

                    if (page) {
                        $stateParams.page = page - 1;
                    } else {
                        $stateParams.page = 2;
                    }
                    redirect();
                };
                this.plus = function () {
                    debugger;
                    var page = (parseInt($stateParams.page));

                    if (page) {
                        $stateParams.page = page + 1;
                    } else {
                        $stateParams.page = 2;
                    }
                    redirect();
                };

                function redirect() {
                    $state.transitionTo($state.current.name, {
                        sort: $stateParams.sort,
                        order: $stateParams.order,
                        page: $stateParams.page
                    }, {
                        reload: true
                    });
                }

            }
        };
    });
