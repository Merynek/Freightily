/**
* addDriverController
*
* @class addDriverController
* @constructor
*/

angular.module('appControllers')
  .controller('addDriverController', ['$scope', '$state', '$filter', 'User',
      function($scope, $state, $filter, User) {
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
            surname: $scope.employee.surname
          };

            User.AddUser(data).then(function(){
                message(1, $filter('i18next')('success.registration'));
                // refresh data
                setTimeout(function() {
                    $state.transitionTo('company', {}, {
                        reload: true
                    });
                }, 50);
            }).catch(function(error){
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            });
        }
      };
  }
]);
