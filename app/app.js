(function(){       
        'use strict';
        angular.module('appServices', []);
        angular.module('appControllers', []);
        angular.module('appDirectives', []);
        
        angular.module('myApp', [
                'appServices', 'appControllers', 'appDirectives', 'ui.router', 'restangular', 'ui-notification', 'jm.i18next', 'vsGoogleAutocomplete', 'timer'
                ])
                
                .config(function(NotificationProvider){
                	 NotificationProvider.setOptions({
                            delay: 3000,
                            startTop: 20,
                            startRight: 10,
                            verticalSpacing: 20,
                            horizontalSpacing: 20,
                            positionX: 'center',
                            positionY: 'top'
                        });
                
                }).run(['$rootScope', '$state', 'User', '$stateParams', function ($rootScope, $state, User, $stateParams) {
                        var LoginHandler = function(callback){
                            var token = window.localStorage.getItem("TOKEN");

                            User.getUserForToken(token).then(function(response) { 
                                return callback(false);
                            }).catch(function(){
                                return callback(true);
                            })
		                };        

                        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                            if(!toState) {
                                return;
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

