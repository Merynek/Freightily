/**
* bidsAuctionController 
*
* @class bidsAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('bidsAuctionController', ['$scope', 'bidsAuction', function($scope, bidsAuction){
    $scope.AuctionList = bidsAuction;
    $scope.route = "auction|bids";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


