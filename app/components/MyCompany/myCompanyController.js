/**
 * myCompanyController
 *
 * @class myCompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('myCompanyController', ['$scope', 'drivers', 'vehicles', 'dispatchers', 'UserAbility', 'Notification', function($scope, drivers, vehicles, dispatchers, UserAbility, Notification){
        $scope.setNavigationPath("home|manage|my_company");
        $scope.drivers = drivers;
        $scope.vehicles = vehicles;
        $scope.dispatchers = dispatchers;

        $scope.deleteVehicle = function(id_vehicle){
            var data = {
                ID : id_vehicle
            }
            UserAbility.deleteVehicle(data).then(function(){
                Notification.success('Vehicle deleted');
            }).catch(function(){
                Notification.error('nejde přidat');
            })
        }

        $scope.deleteUser = function(id_user){
            var data = {
                ID : id_user
            }
            UserAbility.deleteUser(data).then(function(){
                Notification.success('User deleted');
            }).catch(function(){
                Notification.error('nejde přidat');
            })
        }

    }
    ]);


