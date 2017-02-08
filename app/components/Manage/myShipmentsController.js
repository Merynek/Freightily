/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('myShipmentsController', ['$scope', 'myshipments', 'Notification', function($scope, myshipments, Notification){
    $scope.myshipments = myshipments;
    console.log(myshipments);
    
  }
]);


