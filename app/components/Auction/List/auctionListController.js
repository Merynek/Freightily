/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', function($scope, AuctionList){
    $scope.AuctionList = AuctionList;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900)
      {
        middle_no_padding();
      }
    });
  }
]);


