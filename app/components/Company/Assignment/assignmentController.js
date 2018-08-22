/**
 * AssignmentController
 *
 * @class AssignmentController
 * @constructor
 */

angular.module('appControllers')
    .controller('assignmentController', ['$scope', 'drivers', 'shipments', 'ngDialog', 'UserAbility', '$state', '$filter',
        function($scope, drivers, shipments, ngDialog, UserAbility, $state, $filter) {
            $scope.route = "company|assignment";
            $scope.drivers = drivers;
            $scope.allShipments = shipments;
            $scope.notAssignedShipments = shipments.filter(function(shipment) {
                return shipment.driver === 0;
            });

            $scope.shipmentsForDriver = [];
            $scope.assignmentsIds = [];
            $scope.currentDriver = 0;

            $scope.open = function (id_driver) {
                $scope.currentDriver = id_driver;
                $scope.shipmentsForDriver = $scope.allShipments.filter(function(shipment) {
                   return shipment.driver === 0 || shipment.driver === id_driver;
                });

                $scope.assignmentsIds = $scope.shipmentsForDriver.filter(function(shipment) {
                   return shipment.driver !== 0;
                }).map(function(shipment) {
                    return shipment.ID;
                });

                ngDialog.open({
                    template: 'modal',
                    scope: $scope,
                    closeByDocument: false,
                    showClose: false,
                    closeByEscape: false,
                    controller: ['$scope', function($scope) {
                        // controller logic
                        $scope.ok = function() {
                            $scope.closeThisDialog(true);
                        };
                        $scope.cancel = function() {
                            $scope.closeThisDialog(false);
                        };
                        $scope.setAssignment = function(id_shipment, input) {
                            if (input.currentTarget.checked) {
                                $scope.assignmentsIds.push(id_shipment);
                            } else {
                                var index = $scope.assignmentsIds.indexOf(id_shipment);
                                if (index !== -1) {
                                    $scope.assignmentsIds.splice(index, 1);
                                }
                            }

                        }
                    }],
                    preCloseCallback: function(value) {
                        if (value) {
                            assignShipments();
                            $scope.shipmentsForDriver = [];
                            $scope.assignmentsIds = [];
                            return true;
                        }
                        $scope.shipmentsForDriver = [];
                        $scope.assignmentsIds = [];
                        return true
                    }
                });
            };

            function assignShipments() {
                var data = {
                    id_driver: $scope.currentDriver,
                    id_shipments: $scope.assignmentsIds
                };

                if ($scope.shipmentsForDriver.length === 0) {
                    return;
                }

                UserAbility.assignShipments(data).then(function(){
                    $state.transitionTo($state.current, {}, {
                        reload: true
                    });
                }).catch(function(error){
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                })
            }
        }
    ]);