/**
 * view new shipments
 *
 * @class newShipmentsView
 * @constructor
 */

angular.module('appControllers')
    .controller('newShipmentsController', ['$scope', 'newShipments', function($scope, newShipments){
        $scope.route = "shipments|new";
        $scope.newShipments = newShipments;
        middle_no_padding();
        $(window).resize(function () {
            if(window.innerWidth <= 900){
                middle_no_padding();
            }
        });
    }
]);


