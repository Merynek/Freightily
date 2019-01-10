/**
* winAuctionController 
*
* @class winAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('winAuctionController', ['$scope', 'winAuctionResponse', 'User', '$state', '$filter',
      function($scope, winAuctionResponse, User, $state, $filter){
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


