/**
 * noteNewController
 *
 * @class viewSchipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('viewShipmentsController', ['$scope', 'actualShipments', 'pastShipments', function($scope, actualShipments, pastShipments){
        $scope.setNavigationPath("home|manage|view_shipments");
        }
    ]);


