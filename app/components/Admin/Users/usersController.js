/**
 * UsersController
 *
 * @class UsersController
 * @constructor
 */

angular.module('appControllers')
    .controller('usersController', ['$scope', 'users', 'User', '$filter', '$state', 'Admin',
    function($scope, users, User, $filter, $state, Admin) {
        $scope.users = users;
        $scope.route = "admin|users";

        function getUser(id) {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].ID === id) {
                    return $scope.users[i];
                }
            }
        }

        $scope.BanUser = function(id_user) {
            var ban = getUser(id_user).banned ? 0 : 1;

            Admin.BanUser(id_user, ban).then(function() {
                message(1, $filter('i18next')('success.ban_user'));
                // refresh data
                setTimeout(function() {
                    $state.transitionTo($state.current, {}, {
                        reload: true
                    });
                }, 50);
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };

        $scope.DeleteUser = function(id_user) {
            var del = getUser(id_user).deleted ? 0 : 1;

            Admin.DeleteUser(id_user, del).then(function() {
                message(1, $filter('i18next')('success.delete_user'));
                // refresh data
                setTimeout(function() {
                    $state.transitionTo($state.current, {}, {
                        reload: true
                    });
                }, 50);
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };

        $scope.VerifyUser = function(id_user) {
            var verify = getUser(id_user).verified ? 0 : 1;

            Admin.VerifyUser(id_user, verify).then(function() {
                message(1, $filter('i18next')('success.verify_user'));
                // refresh data
                setTimeout(function() {
                    $state.transitionTo($state.current, {}, {
                        reload: true
                    });
                }, 50);
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };

        $scope.AddShipment = function(id_transporter) {
            Admin.NewShipmentFromAdmin(id_transporter).then(function() {
                message(1, $filter('i18next')('success.shipment_added'));
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };

        $scope.GetAuctionCache = function() {
            Admin.getAuctionCache().then(function(data) {
                console.log(data);
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };
    }
]);


