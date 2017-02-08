/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('mySectionController', ['$scope', function($scope){
    $scope.setNavigationPath("home|manage");
  }
]);


