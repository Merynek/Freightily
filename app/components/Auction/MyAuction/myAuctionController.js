/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('myAuctionController', ['$scope', 'WinAuction', 'myFavouriteAuction', 'myBidsAuction', 'drivers', 'assigments', 'UserAbility', 'Notification', 
  function($scope, WinAuction, myFavouriteAuction, myBidsAuction, drivers, assigments, UserAbility, Notification){

    $scope.myWinAuction = WinAuction;
    $scope.myFavouriteAuction = myFavouriteAuction;
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


