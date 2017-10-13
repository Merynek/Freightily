/**
 * viewShipmentsController
 *
 * @class viewSchipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('viewShipmentsController', ['$scope', 'actualShipments', 'pastShipments', 'notStartedShipments', '$http', '$q', '$filter', 'UserAbility', 'Shipments',
        function($scope, actualShipments, pastShipments, notStartedShipments, $http, $q, $filter, UserAbility, Shipments){
        $scope.setNavigationPath("home|manage|view_shipments");

        $scope.actualShipments = actualShipments;
        $scope.pastShipments = pastShipments;
        $scope.notStartedShipments = notStartedShipments;
        $scope.photos = [];
        $scope.route = "shipments|overview";
    }
    ]);


