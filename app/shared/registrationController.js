/**
* registrationController 
*
* @class registrationController
* @constructor
*/

angular.module('appControllers')
  .controller('registrationController', ['$scope', 'Notification', '$state', '$filter', 'User', function($scope, Notification, $state, $filter, User){

      $scope.registration = function(){    
        if($scope.username && $scope.password && $scope.confirmPassword && $scope.contact_person_name && 
          $scope.contact_person_surname && $scope.company_name && $scope.ico && $scope.dic && $scope.bank_account && 
          $scope.address_street && $scope.address_state && $scope.address_house_number && $scope.psc && $scope.phone_number && 
          $scope.email){
            if($scope.password != $scope.confirmPassword){
              Notification.error($filter('i18next')('errors.wrong_registration'));
            }
           else{
              var data = {
                username: $scope.username,
                password: $scope.password,
                confirmpassword: $scope.confirmPassword,
                role: ($scope.transporter) ? 2 : 1,
                contact_person_name: $scope.contact_person_name,
                contact_person_surname: $scope.contact_person_surname,
                company_name: $scope.company_name,
                ico: $scope.ico,
                dic: $scope.dic,
                bank_account: $scope.bank_account,
                address_state: $scope.address_state,
                address_street: $scope.address_street,
                address_house_number: $scope.address_house_number,
                psc: $scope.psc,
                phone_number: $scope.phone_number,
                email: $scope.email
              };
              if($scope.transporter){
                data.have_drivers = ($scope.have_drivers) ? "true" : "false";
              }
              if(User.registration(data)){
                $state.go('login');
              }
              else{
                Notification.error($filter('i18next')('errors.wrong_registration'));
              }
            }
        }
        else{
          Notification.error($filter('i18next')('errors.wrong_registration'));
        }
      };
  }
]);
