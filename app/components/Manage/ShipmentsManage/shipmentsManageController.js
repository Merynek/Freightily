/**
 * noteNewController
 *
 * @class shipmentsManageController
 * @constructor
 */

angular.module('appControllers')
    .controller('shipmentsManageController', ['$scope', 'WinAuction', 'drivers', 'assigments', 'UserAbility', 'Notification',
        function($scope, WinAuction, myFavouriteAuction, myBidsAuction, drivers, assigments, UserAbility, Notification){
            $scope.setNavigationPath("home|manage|my_shipments");
            $scope.myWinAuction = WinAuction;
            $scope.myAmountedAuction = myBidsAuction;
            $scope.assigments = assigments;

            $scope.drivers = drivers;
            $scope.assigment = function(id, driver){
                var data = {
                    id_driver : driver,
                    id_auction : id
                }
                UserAbility.assigment(data).then(function(){
                    Notification.success('Zásilka byla přidána');
                }).catch(function(){
                    Notification.error('nejde přidat');
                })
            }

        }
    ]);


