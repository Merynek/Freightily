/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'driversResponse', 'User', '$state', '$filter',
        function($scope, driversResponse, User, $state, $filter) {
            checkError(driversResponse.Error);
            var mySelf = driversResponse.drivers.find(function(driver) {
                return driver.ID === User.ID;
            });

            $scope.drivers = driversResponse.drivers.filter(function( driver ) {
                return driver.ID !== User.ID;
            });
            $scope.drivers.unshift(mySelf);

            $scope.allDriversCount = driversResponse.count;
            $scope.route = "company|overview";
            middle_no_padding();
            $(window).resize(function () {
                if(window.innerWidth <= 900){
                    middle_no_padding();
                }
            });

            function checkError(error) {
                if (error && error.status === 401) {
                    User.logout();
                    $state.go('login');
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                }
            }
    }
    ]);


