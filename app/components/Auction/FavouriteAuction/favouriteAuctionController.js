/**
* favouriteAuctionController 
*
* @class favouriteAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('favouriteAuctionController', ['$scope', 'favouriteAuction', 'vehicles', '$filter', function($scope, favouriteAuction, vehicles, $filter){
    $scope.setNavigationPath("home|favouriteAuction");
    $scope.AuctionList = favouriteAuction;
    $scope.vehicles = vehicles;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


