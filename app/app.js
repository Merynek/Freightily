(function(){       
        'use strict';
        angular.module('appServices', []);
        angular.module('appControllers', []);
        angular.module('appDirectives', []);

        angular.module('myApp', [
                'appServices', 'appControllers', 'appDirectives', 'ui.router', 'ui.router.state.events', 'ngDialog', 'restangular', 'jm.i18next', 'timer'
                ])
            .run(['$rootScope', '$state', 'User', '$stateParams', '$http', function ($rootScope, $state, User, $stateParams, $http) {
                        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
                        
                        var LoginHandler = function(callback){
                            User.getUserForToken().then(function(response) {
                                return callback(false);
                            }).catch(function(){
                                return callback(true);
                            })
		                };

                        var RefreshTokenHandler = function(callback){
                            User.refreshToken().then(function(response) {
                                return callback(true);
                            }).catch(function(){
                                return callback(false);
                            })
                        };

                $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                            if(!toState) {
                                return;
                            }

                            if(needRestartToken()) {
                                RefreshTokenHandler(function(refreshCorrect) {
                                    if (refreshCorrect) {

                                    }
                                })
                            }

                            if(!User.isLoggedIn && toState.data && toState.data.role){
                                event.preventDefault();
                                LoginHandler(function(loginFailed){
                                    if(loginFailed){
                                        $state.go('login');
                                    }  
                                    else{
                                        for (var i = 0; i < toState.data.role.length; i++) {
                                            if(User.role == toState.data.role[i]){
                                                $state.transitionTo(toState, toParams, {
                                                    reload: true,
                                                    inherit: false,
                                                    notify: true
                                                });
                                            }
                                        }
                                    }
                                   
                                });
                            }

                        });
                }]);
}());

