/**
* addDriverController
*
* @class addDriverController
* @constructor
*/

angular.module('appControllers')
  .controller('addDriverController', ['$scope', 'Notification', '$state', '$filter', 'User',
      function($scope, Notification, $state, $filter, User) {
      $scope.employee = {};
      $scope.clicked = false;
      $scope.route = "company|employee";

      $scope.AddUser = function() {
        $scope.clicked = true;

        if(!this.addUserForm.$valid) {
          return;
        }
        
        if($scope.employee.password !== $scope.employee.confirmPassword){
          message(3, $filter('i18next')('errors.passwords_not_match'));
        }
        else {
          var data = {
            username: $scope.employee.username,
            password: $scope.employee.password,
            confirmpassword: $scope.employee.confirmPassword,
            name: $scope.employee.name,
            surname: $scope.employee.surname,
            address_state: $scope.employee.address_state,
            address_street: $scope.employee.address_street,
            address_house_number: $scope.employee.address_house_number,
            psc: $scope.employee.psc,
            phone_number: $scope.employee.phone_number,
            email: $scope.employee.email
          };
          if(User.AddUser(data)) {
              message(1, $filter('i18next')('success.registration'));
              // refresh data
              setTimeout(function() {
                  $state.transitionTo('company', {}, {
                      reload: true
                  });
              }, 50);
          }
          else{
            Notification.error($filter('i18next')('errors.wrong_registration'));
          }
        }
      };
  }
]);
