/**
 * shipmentsManageController
 *
 * @class shipmentsManageController
 * @constructor
 */

angular.module('appControllers')
    .controller('shipmentsManageController', ['$scope', 'WinAuction', 'drivers', 'assigments', 'UserAbility', 'Notification', '$filter',
        function($scope, WinAuction, drivers, assigments, UserAbility, Notification, $filter){
            $scope.setNavigationPath("home|manage|my_shipments");
            $scope.myWinAuction = WinAuction;
            $scope.route = "shipments|manage";
            $scope.assigments = assigments;
            $scope.drivers = drivers;

            $scope.showDetail = function(id) {
                $scope.$broadcast("openAuctionDetail",id);
            };

            $scope.refresh = function() {
                $scope.myWinAuction = WinAuction;
                $scope.assigments = assigments;
                $scope.drivers = drivers;
            };
        }
    ]);


