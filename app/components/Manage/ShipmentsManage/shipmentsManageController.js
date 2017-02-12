/**
 * noteNewController
 *
 * @class shipmentsManageController
 * @constructor
 */

angular.module('appControllers')
    .controller('shipmentsManageController', ['$scope', 'WinAuction', 'drivers', 'assigments', 'UserAbility', 'Notification',
        function($scope, WinAuction, drivers, assigments, UserAbility, Notification){
            $scope.setNavigationPath("home|manage|my_shipments");
            $scope.myWinAuction = WinAuction;
            $scope.assigments = assigments;
            $scope.drivers = drivers;

            $scope.showDetail = function(id) {
                $scope.$broadcast("openAuctionDetail",id);
            }

        }
    ]);


