/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', function($scope, AuctionList){
    $scope.AuctionList = AuctionList;
  }

]);


