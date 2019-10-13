/**
 * invoicesController
 *
 * @class invoicesController
 * @constructor
 */

angular.module('appControllers')
    .controller('invoicesController', ['$scope', '$filter', 'invoices', function ($scope, $filter, invoices) {
        $scope.route = "account|invoices";

        console.log(invoices);
    }
]);



