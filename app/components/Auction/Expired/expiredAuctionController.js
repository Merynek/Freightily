/**
* expiredAuctionController 
*
* @class expiredAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('expiredAuctionController', ['$scope', 'expiredAuctionResponse', 'User', '$state', '$filter',
      function($scope, expiredAuctionResponse) {
    $scope.AuctionList = expiredAuctionResponse.AuctionList;
    $scope.AuctionListCount = expiredAuctionResponse.Count;
    $scope.route = "auction|expired";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });

  }

]);


