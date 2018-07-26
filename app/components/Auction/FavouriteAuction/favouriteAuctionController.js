/**
* favouriteAuctionController 
*
* @class favouriteAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('favouriteAuctionController', ['$scope', 'favouriteAuction',
      function($scope, favouriteAuction){
    $scope.AuctionList = favouriteAuction;
    $scope.route = "auction|favourite";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


