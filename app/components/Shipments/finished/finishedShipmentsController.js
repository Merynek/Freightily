/**
 * Controller finished shipments
 *
 * @class finishedShipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('finishedShipmentsController', ['$scope', 'finishedShipments', function($scope, finishedShipments){
        $scope.route = "shipments|finished";
        $scope.finishedShipments = finishedShipments;
    }
]);


