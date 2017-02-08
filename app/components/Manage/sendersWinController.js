/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('sendersWinController', ['$scope', 'WinAuction', 'Notification', function($scope, WinAuction, Notification){
    $scope.winauction = WinAuction;

    
  }
]);


