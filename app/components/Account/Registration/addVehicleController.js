/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('addVehicleController', ['$scope', 'Notification', '$state', '$filter', 'User', function($scope, Notification, $state, $filter, User){
      $scope.AddVehicle = function(){    
        if($scope.type && $scope.brand && $scope.capacity && $scope.size && $scope.rz){
              var data = {
                type: $scope.type,
                brand: $scope.brand,
                capacity: $scope.capacity,
                size: $scope.size,
                rz: $scope.rz
              };
              if(User.AddVehicle(data)){
              }
              else{
                Notification.error($filter('i18next')('errors.wrong_registration'));
              }
        }
        else{
          Notification.error($filter('i18next')('errors.wrong_registration'));
        }
      };
  }
]);
