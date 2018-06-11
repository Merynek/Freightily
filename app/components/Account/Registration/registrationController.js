/**
* registrationController 
*
* @class registrationController
* @constructor
*/

angular.module('appControllers')
  .controller('registrationController', ['$scope', '$state', '$filter', 'User', function($scope, $state, $filter, User){
      $scope.user = {
      };
      $scope.clicked = false;

      $scope.registration = function() {
        $scope.clicked = true;
        if(!$scope.user.role) {
          message(3, $filter('i18next')('errors.select_role'));
          return;
        }

        if(!this.registrationForm.$valid) {
          return;
        }
        
        if($scope.user.password !== $scope.user.confirmPassword){
          message(3, $filter('i18next')('errors.passwords_not_match'));
        }
        else{
          var data = {
            username: $scope.user.username,
            password: $scope.user.password,
            confirmpassword: $scope.user.confirmPassword,
            name: $scope.user.name,
            surname: $scope.user.surname,
            company_name: $scope.user.company_name,
            ico: $scope.user.ico,
            dic: $scope.user.dic,
            bank_account: $scope.user.bank_account,
            address_state: $scope.user.address_state,
            address_street: $scope.user.address_street,
            address_house_number: $scope.user.address_house_number,
            psc: $scope.user.psc,
            phone_number: $scope.user.phone_number,
            email: $scope.user.email
          };
          var registration = $scope.user.role === "1" ? User.registrationSender : User.registrationTransporter;

          registration(data).then(function(){
              message(1, $filter('i18next')('success.registration'));
              $state.go('login');
          }).catch(function(){
              message(1, $filter('i18next')('errors.wrong_registration'));
          })
        }
      };
  }
]);
