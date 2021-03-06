/**
* loginController 
*
* @class loginController
* @constructor
*/

angular.module('appControllers')
  .controller('loginController', ['$scope','User', '$filter', '$state', function($scope, User, $filter, $state){
    if(User.isLoggedIn){
      $state.go('auction');
    }

    $scope.clicked = false;

    $scope.login = function() {
        $scope.clicked = true;
        if(!$scope.loginForm.$valid) {
            return;
        }
        User.login($scope.user.name, $scope.user.password).then(function(){
            if (User.isDriver()) {
                User.logout();
                $state.go('login');
                message(3, $filter('i18next')("errors.driver_cant_login"));
                return;
            }
          message(1, $filter('i18next')('success.login'));
          if (User.isAdmin()) {
              $state.go('users');
          } else {
              $state.go('auction');
          }
        }).catch(function(error){
            if (error.data) {
                error.data = JSON.parse(error.data.error_description);
            }
            message(3, $filter('i18next')(getErrorKeyByCode(error)));
        })
    };

    $scope.onkeyDown = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            $scope.login();
        }
    }
  }
]);



