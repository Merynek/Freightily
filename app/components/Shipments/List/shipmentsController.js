/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('shipmentsController', ['$scope', 'shipments', function($scope, shipments){
    $scope.shipments = shipments;
  }

]);


