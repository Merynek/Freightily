/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('createdAuctionController', ['$scope', 'createdAuction', '$filter', function($scope, createdAuction, $filter){
    $scope.setNavigationPath("home|createdAuction");
    $scope.AuctionList = createdAuction;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);

