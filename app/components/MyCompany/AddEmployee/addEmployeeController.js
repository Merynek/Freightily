/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('addEmployeeController', ['$scope', 'Notification', '$state', '$filter', 'User', function($scope, Notification, $state, $filter, User){
      $scope.setNavigationPath("home|manage|new_employee");
      $scope.employee = {
        driver_licence: ""
      };
      $scope.clicked = false;

      $scope.AddUser = function(){    
        $scope.clicked = true;
        if(!$scope.employee.role) {
          message(3, $filter('i18next')('errors.select_role'));
          return;
        }

        if(!$scope.addUserForm.$valid) {
          return;
        }
        
        if($scope.employee.password != $scope.employee.confirmPassword){
          message(3, $filter('i18next')('errors.passwords_not_match'));
        }

        else{
          var data = {
            idCompany: User.ID,
            username: $scope.employee.username,
            password: $scope.employee.password,
            confirmpassword: $scope.employee.confirmPassword,
            role: $scope.employee.role,
            name: $scope.employee.name,
            surname: $scope.employee.surname,
            address_state: $scope.employee.address_state,
            address_street: $scope.employee.address_street,
            address_house_number: $scope.employee.address_house_number,
            psc: $scope.employee.psc,
            phone_number: $scope.employee.phone_number,
            email: $scope.employee.email,
            driver_licence: $scope.employee.driver_licence,
          };

          console.log(data);
         /* if(User.AddUser(data)){
          }
          else{
            Notification.error($filter('i18next')('errors.wrong_registration'));
          }*/
        }
      };
  }
]);
