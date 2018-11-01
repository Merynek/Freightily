/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'driversResponse',
        function($scope, driversResponse) {
            $scope.drivers = driversResponse.drivers;
            $scope.allDriversCount = driversResponse.count;
            $scope.route = "company|overview";
            middle_no_padding();
            $(window).resize(function () {
                if(window.innerWidth <= 900){
                    middle_no_padding();
                }
            });
    }
    ]);


