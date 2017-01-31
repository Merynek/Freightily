/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', 'vehicles', 'Auction', 'User', 'UserAbility', '$location', function($scope, AuctionList, vehicles, Auction, User, UserAbility, $location){
    $scope.setNavigationPath("home|auctionList");
    $scope.AuctionList = AuctionList;
    $scope.vehicles = vehicles;

    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });

    $scope.sort =  function(attribute) {

        // Auction.getAuctionList(attribute).then(function(res){
        //     $scope.AuctionList = res;
        // }).catch(function(){
        //     $scope.AuctionList = {};
        // });
        //
        // if(User.isSender() || User.isDriver())  {
        //     $scope.vehicles = {};
        // }
        // UserAbility.getVehicles().then(function(res){
        //     $scope.vehicles = res;
        // }).catch(function(){
        //     $scope.vehicles = {};
        // })
    };
  }
]);


