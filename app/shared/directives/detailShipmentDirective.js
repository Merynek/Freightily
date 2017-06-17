angular.module('appDirectives')
    .directive("detailShipment", function () {
        return {
            templateUrl: 'app/shared/directives/detailShipmentDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                shipmentItem: '='
            },
            controller: function ($scope, $filter, Auction, User, UserAbility) {
                $scope.item = this.shipmentItem.item;
                $scope.ID = this.shipmentItem.item.ID;
                $scope.photos = [];
                $scope.photoReady = false;
                $scope.show = false;
                $scope.toggleDetail = function () {
                    $scope.show = !$scope.show;
                };

                this.showPhoto = function(idAuction, firstPart) {
                    $scope.photos = [];
                    UserAbility.getPhotos(idAuction, firstPart).then(function(data){
                        for(var i = 0; i < data.length; i++) {
                            $scope.photos.push("data:image/png;base64," +data[i]);
                        }
                        $scope.photoReady = true;
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with get photos from server'));
                    })
                }

                this.showMap = function(id_auction) {
                    UserAbility.getMap(id_auction).then(function(data){
                        showRouteMap(data);
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with get map from server'));
                    })
                }


                //for android client only
                this.checkQrCode = function(idAuction, qrCode){
                    var data = {
                        id_auction: idAuction,
                        qr_code: qrCode
                    };
                    UserAbility.checkQrCode(data).then(function(data){
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with get map from server'));
                    })
                };
                 //for android client only
                this.postGPS = function(idAuction){
                    var data = {
                        id_auction: idAuction,
                        route: "49.7003929,17.0867981"
                    };
                    UserAbility.postGPS(data).then(function(data){
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with get map from server'));
                    })
                };
            }
        };
    });
