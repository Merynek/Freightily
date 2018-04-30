/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'drivers', 'UserAbility', 'Notification',
        function($scope, drivers, UserAbility, Notification){
        $scope.drivers = drivers;
        $scope.route = "company|overview";

        $scope.deleteUser = function(id_user){
            var data = {
                ID : id_user
            };
            UserAbility.deleteUser(data).then(function(){
                Notification.success('User deleted');
            }).catch(function(){
                Notification.error('nejde smazat');
            })
        }

    }
    ]);


