/**
 * Controller finished shipments
 *
 * @class finishedShipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('finishedShipmentsController', ['$scope', 'finishedShipmentsResponse', 'User', '$state', '$filter',
        function($scope, finishedShipmentsResponse, User, $state, $filter){
        $scope.route = "shipments|finished";
        $scope.shipments = finishedShipmentsResponse.shipments;
        $scope.shipmentsCount = finishedShipmentsResponse.Count;
        middle_no_padding();
        $(window).resize(function () {
            if(window.innerWidth <= 900){
                middle_no_padding();
            }
        });
    }
]);


