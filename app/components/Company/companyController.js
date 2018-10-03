/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'drivers',
        function($scope, drivers) {
            $scope.drivers = drivers;
            $scope.route = "company|overview";
            middle_no_padding();
            $(window).resize(function () {
                if(window.innerWidth <= 900){
                    middle_no_padding();
                }
            });
    }
    ]);


