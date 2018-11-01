/**
* winAuctionController 
*
* @class winAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('winAuctionController', ['$scope', 'winAuctionResponse', function($scope, winAuctionResponse){
    $scope.AuctionList = winAuctionResponse.AuctionList;
    $scope.AuctionListCount = winAuctionResponse.Count;
    $scope.route = "auction|win";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


