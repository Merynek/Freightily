/**
 * shipmentController
 *
 * @class shipmentController
 * @constructor
 */

angular.module('appControllers')
    .controller('shipmentController', ['$scope', 'shipments', '$filter', function($scope, shipments){
        $scope.setNavigationPath("home|my_shipments");
        $scope.vehicles = shipments;
        $scope.route = "shipments|my";
        middle_no_padding();
        $(window).resize(function () {
            if(window.innerWidth <= 900){
                middle_no_padding();
            }
        });
    }

    ]);


