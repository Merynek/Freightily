/**
* winAuctionController 
*
* @class winAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('winAuctionController', ['$scope', 'winAuction', function($scope, winAuction){
    $scope.setNavigationPath("home|winAuction");
    $scope.AuctionList = winAuction;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


