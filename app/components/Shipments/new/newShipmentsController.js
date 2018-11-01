/**
 * view new shipments
 *
 * @class newShipmentsView
 * @constructor
 */

angular.module('appControllers')
    .controller('newShipmentsController', ['$scope', 'newShipmentsResponse', function($scope, newShipmentsResponse){
        $scope.route = "shipments|new";
        $scope.shipments = newShipmentsResponse.ShipmentList;
        $scope.shipmentsCount = newShipmentsResponse.Count;
        middle_no_padding();
        $(window).resize(function () {
            if(window.innerWidth <= 900){
                middle_no_padding();
            }
        });
    }
]);


