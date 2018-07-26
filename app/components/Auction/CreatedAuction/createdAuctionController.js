/**
* createdAuctionController 
*
* @class createdAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('createdAuctionController', ['$scope', 'createdAuction', function($scope, createdAuction){
    $scope.AuctionList = createdAuction;
    $scope.route = "auction|created";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


