/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('addUserController', ['$scope', 'Notification', '$state', '$filter', 'User', function($scope, Notification, $state, $filter, User){

      $scope.AddUser = function(){    
        if($scope.username && $scope.password && $scope.confirmPassword && $scope.name && 
          $scope.surname && $scope.address_street && $scope.address_state && $scope.address_house_number && 
          $scope.psc && $scope.phone_number && $scope.email){
            if($scope.password != $scope.confirmPassword){
              Notification.error($filter('i18next')('errors.wrong_registration'));
            }
           else{
              var data = {
                idCompany: User.ID,
                username: $scope.username,
                password: $scope.password,
                confirmpassword: $scope.confirmPassword,
                role: ($scope.driver) ? 4 : 3,
                name: $scope.name,
                surname: $scope.surname,
                address_state: $scope.address_state,
                address_street: $scope.address_street,
                address_house_number: $scope.address_house_number,
                psc: $scope.psc,
                phone_number: $scope.phone_number,
                email: $scope.email,
              };
              if($scope.driver){
                  if($scope.driver_licence){
                      data.driver_licence = $scope.driver_licence
                  }
                  else{
                      Notification.error($filter('i18next')('errors.wrong_registration'));
                  }
              }

              if(User.AddUser(data)){
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
