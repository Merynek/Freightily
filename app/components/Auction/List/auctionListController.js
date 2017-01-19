/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', 'vehicles', function($scope, AuctionList, vehicles){
    $scope.setNavigationPath("home|auctionList");
    $scope.AuctionList = AuctionList;
    $scope.vehicles = vehicles;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }
]);


