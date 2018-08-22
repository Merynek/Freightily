angular.module('appDirectives')
    .directive("detailShipment", function () {
        return {
            templateUrl: 'app/shared/directives/detailShipmentDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                shipmentItem: '=',
                newShipment: '=',
                finishedShipment: '='
            },
            controller: function ($scope, $filter, Auction, User, UserAbility, $q, $http, $state) {
                $scope.item = this.shipmentItem.item;
                $scope.newShipment = this.newShipment;
                $scope.finishedShipment = this.finishedShipment;
                $scope.ID = this.shipmentItem.item.ID;
                $scope.showPhotos = [];
                $scope.photos = [];
                $scope.photoReady = false;
                $scope.show = false;
                $scope.toggleDetail = function () {
                    $scope.show = !$scope.show;
                };

                this.stopShipment = function(ID) {
                    var data = {
                        id_shipment: ID
                    };

                    if (window.confirm($filter('i18next')("warnings.stop_shipment"))) {
                        UserAbility.stopShipment(data).then(function(){
                            $state.transitionTo($state.current, {}, {
                                reload: true
                            });
                        }).catch(function(error){
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                        })
                    }
                };

                this.showPhoto = function(idShipment, firstPart) {
                    $scope.showPhotos = [];
                    UserAbility.getPhotos(idShipment, firstPart).then(function(data){
                        for(var i = 0; i < data.length; i++) {
                            $scope.showPhotos.push(data[i]);
                        }
                        $scope.photoReady = $scope.showPhotos.length > 0;
                    }).catch(function(error){
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                        $scope.photoReady = false;
                    })
                };

                this.openImage = function(photo) {
                  window.open(photo);
                };

                this.getFreightType = function (type) {
                    return $filter('i18next')('texts.auction.freight_type.'+type);
                };
                this.getCity = function (address) {
                    return address.split(",")[0];
                };
            }
        };
    });
