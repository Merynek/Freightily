(function(){       
        'use strict';
        angular.module('appServices', []);
        angular.module('appControllers', []);
        angular.module('appDirectives', []);

        angular.module('myApp', [
                'appServices', 'appControllers', 'appDirectives', 'tooltips', 'ui.router', 'ui.router.state.events',
                'ngDialog', 'restangular', 'jm.i18next', 'timer'
                ])
            .run(['$rootScope', '$state', 'User', '$stateParams', '$http', '$filter', function ($rootScope, $state, User, $stateParams, $http, $filter) {
                        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
                        
                        var LoginHandler = function(callback){
                            User.getUserForToken().then(function(response) {
                                return callback(false);
                            }).catch(function(){
                                return callback(true);
                            })
		                };

                $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                    if(error.detail.status === 401) { // Unauthorized
                        logoutUnauthorized();
                    }
                    if(error.detail.status === 400) { // Not found
                        if (toState.name === "detailAuction") {
                            message(3, $filter('i18next')("errors.auction_not_found"));
                        }
                        $state.go('empty');
                    }
                });

                $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                            if(!toState) {
                                return;
                            }

                            if(needRestartToken()) {
                                console.log("Token restarted");
                                User.refreshToken();
                            }

                            if(!User.isLoggedIn && toState.data && toState.data.role){
                                event.preventDefault();
                                LoginHandler(function(loginFailed){
                                    if(loginFailed){
                                        logoutUnauthorized();
                                    }  
                                    else{
                                        for (var i = 0; i < toState.data.role.length; i++) {
                                            if(User.role == toState.data.role[i]){
                                                transition(toState, toParams)
                                            }
                                        }
                                    }
                                   
                                });
                            }

                        });

                $state.defaultErrorHandler(function(error) {
                    // override native logging errors
                    return;
                });

                function transition(toState, toParams) {
                    $state.transitionTo(toState, toParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }

                function logoutUnauthorized() {
                    $state.go('login');
                    message(3, $filter('i18next')(getErrorKeyByCode({
                        status: 401
                    })));
                    User.logout();
                }
                }]);
}());

