/**
 * Controller finished shipments
 *
 * @class finishedShipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('finishedShipmentsController', ['$scope', 'finishedShipmentsResponse', function($scope, finishedShipmentsResponse){
        $scope.route = "shipments|finished";
        $scope.shipments = finishedShipmentsResponse.ShipmentList;
        $scope.shipmentsCount = finishedShipmentsResponse.Count;
        middle_no_padding();
        $(window).resize(function () {
            if(window.innerWidth <= 900){
                middle_no_padding();
            }
        });
    }
]);


