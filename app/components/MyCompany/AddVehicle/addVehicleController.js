/**
* addVehicleController
*
* @class addVehicleController
* @constructor
*/

angular.module('appControllers')
  .controller('addVehicleController', ['$scope', '$filter', 'User', function($scope, $filter, User){
      $scope.setNavigationPath("home|manage|new_vehicle");
      $scope.vehicle = {
      };
      $scope.clicked = false;
      $scope.route = "company|vehicle";

      $scope.AddVehicle = function(){
          $scope.clicked = true;
          if(!this.vehicleForm.$valid) {
              return;
          }
          var data = {
            type: $scope.vehicle.type,
            brand: $scope.vehicle.brand,
            capacity: $scope.vehicle.capacity,
            size: $scope.vehicle.size,
            rz: $scope.vehicle.rz
          };
          if(User.AddVehicle(data)){
              message(1, $filter('i18next')('success.add_vehicle'));
          }
          else{
              message(3, $filter('i18next')('errors.add_vehicle'));
          }
      };
  }
]);
