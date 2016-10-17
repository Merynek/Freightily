/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('loginController', ['$scope','User', 'Notification', '$http', '$filter', '$state', function($scope, User, Notification, $http, $filter, $state){
    

    if(User.isLoggedIn){
      $state.go('home');
    }

    $scope.login = function(){
      if($scope.name && $scope.password){
        User.login($scope.name, $scope.password).then(function(){
          $state.go('home');
        }).catch(function(){
          Notification.error($filter('i18next')('errors.wrong_login'));
        })
      }
    }
  }
]);



