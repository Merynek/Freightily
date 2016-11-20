/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('myCreatedAuctionController', ['$scope', 'createdAuction', function($scope, createdAuction){
    $scope.AuctionList = createdAuction;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }

]);


