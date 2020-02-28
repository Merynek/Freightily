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

                $scope.changeMaster1 = "asda";

                $scope.page = $stateParams.page ? $stateParams.page : "1";
                $scope.pagesCount = Math.ceil($scope.allItemsCount / COUNT_OF_ITEMS_IN_PAGE) || 1;
                $scope.isLastPage = (Number($scope.page) * COUNT_OF_ITEMS_IN_PAGE) >= $scope.allItemsCount;

                $scope.first = function () {
                    $stateParams.page = undefined;

                    redirect($state, $stateParams);
                };
                $scope.minus = function () {
                    var page = (parseInt($stateParams.page));

                    if (page) {
                        $stateParams.page = page === 2 ? undefined : page - 1;
                    }

                    redirect($state, $stateParams);
                };
                $scope.plus = function () {
                    var page = (parseInt($stateParams.page));

                    if (page) {
                        $stateParams.page = page + 1;
                    } else {
                        $stateParams.page = 2;
                    }
                    redirect($state, $stateParams);
                };
                $scope.last = function () {
                    $stateParams.page = $scope.pagesCount;

                    redirect($state, $stateParams);
                };
            }
        };
    });
