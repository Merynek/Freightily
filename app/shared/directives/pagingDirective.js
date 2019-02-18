angular.module('appDirectives')
    .directive("paging", function () {
        return {
            templateUrl: 'app/shared/directives/pagingDirective.html',
            restrict: "E",
            scope: {
                itemCount: '=',
                allItemsCount: '='
            },
            controller: function ($scope, User, $stateParams, $state) {
                var COUNT_OF_ITEMS_IN_PAGE = 15;

                $scope.page = $stateParams.page ? $stateParams.page : "1";
                $scope.pagesCount = Math.ceil($scope.allItemsCount / COUNT_OF_ITEMS_IN_PAGE) || 1;
                $scope.isLastPage = (Number($scope.page) * COUNT_OF_ITEMS_IN_PAGE) >= $scope.allItemsCount;

                $scope.minus = function () {
                    var page = (parseInt($stateParams.page));

                    if (page) {
                        $stateParams.page = page - 1;
                    } else {
                        $stateParams.page = 2;
                    }
                    redirect();
                };
                $scope.plus = function () {
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
