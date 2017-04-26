/**
* mySectionController 
*
* @class mySectionController
* @constructor
*/

angular.module('appControllers')
  .controller('mySectionController', ['$scope', function($scope){
    $scope.setNavigationPath("home|manage");
  }
]);


