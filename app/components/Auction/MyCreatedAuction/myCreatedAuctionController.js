/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('myCreatedAuctionController', ['$scope', 'createdAuction', function($scope, createdAuction){
    $scope.auction = createdAuction;
  }

]);


