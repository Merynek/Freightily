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
    }
    ]);


