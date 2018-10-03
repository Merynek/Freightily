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
      middle_no_padding();
      $(window).resize(function () {
          if(window.innerWidth <= 900){
              middle_no_padding();
          }
      });

      $scope.AddUser = function() {
        $scope.clicked = true;

        if(!this.addUserForm.$valid) {
          message(3, $filter('i18next')('errors.set_all_inputs'));
          return;
        }
        if($scope.employee.password !== $scope.employee.confirmPassword) {
          message(3, $filter('i18next')('errors.passwords_not_match'));
        }
        else {
          var data = {
            username: $scope.employee.username,
            email: $scope.employee.email,
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
