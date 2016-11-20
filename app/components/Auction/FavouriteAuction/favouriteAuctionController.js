/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('favouriteAuctionController', ['$scope', 'favouriteAuction', 'vehicles', function($scope, favouriteAuction, vehicles){
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


