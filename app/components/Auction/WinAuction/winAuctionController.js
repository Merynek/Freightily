/**
* winAuctionController 
*
* @class winAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('winAuctionController', ['$scope', 'winAuction', function($scope, winAuction){
    $scope.setNavigationPath("home|win_auction");
    $scope.AuctionList = winAuction;
    $scope.route = "auction|win";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


