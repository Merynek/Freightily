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

    $scope.clicked = false;

    $scope.login = function(){
        $scope.clicked = true;
        if(!$scope.loginForm.$valid) {
            return;
        }
        User.login($scope.user.name, $scope.user.password).then(function(){
        $state.go('home');
        }).catch(function(){
            message(3,$filter('i18next')('errors.wrong_login'));
        })
    }
  }
]);



