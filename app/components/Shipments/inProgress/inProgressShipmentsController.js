/**
 * Controller shipments in progress
 *
 * @class inProgressShipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('inProgressShipmentsController', ['$scope', 'inProgressShipments', function($scope, inProgressShipments){
        $scope.route = "shipments|in_progress";
        $scope.inProgressShipments = inProgressShipments;
    }
]);


