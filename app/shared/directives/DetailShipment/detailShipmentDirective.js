angular.module('appDirectives')
    .directive("detailShipment", function () {
        return {
            templateUrl: 'app/shared/directives/DetailShipment/detailShipmentDirective.html',
            restrict: "E",
            scope: {
                shipmentItem: '=',
                newShipment: '=',
                finishedShipment: '='
            },
            controller: function ($scope, $filter, Auction, User, UserAbility, $q, $http, $state, ngDialog) {
                var self = $scope;

                $scope.item = $scope.shipmentItem.item;
                $scope.ID = $scope.shipmentItem.item.ID;
                $scope.showPhotos = [];
                $scope.photos = [];
                $scope.photoReady = false;
                $scope.show = false;
                $scope.toggleDetail = function (idShipment) {
                    $scope.show = !$scope.show;
                    if ($scope.show && !$scope.newShipment && !$scope.showPhotos.length) {
                        self.showPhoto(idShipment, true);
                    }
                };

                $scope.stopShipment = function(ID) {
                    var data = {
                        id_shipment: ID
                    };
                    ngDialog.open({
                        template: 'cancel_shipment',
                        scope: $scope,
                        closeByDocument: false,
                        showClose: true,
                        closeByEscape: true,
                        appendClassName: "cancel_shipment_dialog",
                        controller: ['$scope', function($scope) {
                            // controller logic
                            $scope.ok = function() {
                                UserAbility.stopShipment(data).then(function(){
                                    $state.transitionTo($state.current, {}, {
                                        reload: true
                                    });
                                }).catch(function(error){
                                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                                });
                                $scope.closeThisDialog(true);
                            };
                            $scope.cancel = function() {
                                $scope.closeThisDialog(false);
                            };
                        }]
                    });

                };

                $scope.showPhoto = function(idShipment, firstPart) {
                    $scope.showPhotos = [];
                    $scope.firstPart = firstPart;
                    UserAbility.getPhotos(idShipment, firstPart).then(function(data){
                        for(var i = 0; i < data.length; i++) {
                            $scope.showPhotos.push(data[i]);
                        }
                        $scope.photoReady = $scope.showPhotos.length > 0;
                    }).catch(function(){
                        $scope.photoReady = false;
                    });
                    lightbox.init();
                };

                $scope.openImage = function(photo) {
                  window.open(photo);
                };

                $scope.getFreightType = function (type) {
                    return $filter('i18next')('texts.auction.freight_type.'+type);
                };
                $scope.getCity = function (address) {
                    return address.split(",")[0];
                };
            }
        };
    });
