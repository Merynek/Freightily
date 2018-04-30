angular.module('appDirectives')
    .directive("detailShipment", function () {
        return {
            templateUrl: 'app/shared/directives/detailShipmentDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                shipmentItem: '=',
                finished: '='
            },
            controller: function ($scope, $filter, Auction, User, UserAbility) {
                $scope.item = this.shipmentItem.item;
                $scope.finished = this.finished;
                $scope.ID = this.shipmentItem.item.ID;
                $scope.showPhotos = [];
                $scope.photos = [];
                $scope.photoReady = false;
                $scope.show = false;
                $scope.toggleDetail = function () {
                    $scope.show = !$scope.show;
                };
                $scope.mapIsDisplayed = false;

                this.showPhoto = function(idAuction, firstPart) {
                    $scope.showPhotos = [];
                    UserAbility.getPhotos(idAuction, firstPart).then(function(data){
                        for(var i = 0; i < data.length; i++) {
                            $scope.showPhotos.push(data[i]);
                        }
                        $scope.photoReady = $scope.showPhotos.length > 0;
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with get photos from server'));
                        $scope.photoReady = false;
                    })
                };

                this.showMap = function(id_auction) {
                    var container = $(".map-container-"+id_auction);

                    if(!$scope.mapIsDisplayed) {
                        UserAbility.getMap(id_auction).then(function(data){
                            // toggle button and map
                            $scope.mapIsDisplayed = true;
                            container.find(".map-wrap").show();
                            // show route
                            showRouteMap(data, id_auction);
                        }).catch(function(data){
                            $scope.mapIsDisplayed = false;
                            container.find(".map-wrap").hide();
                            message(3, $filter('i18next')('Error with get map from server'));
                        })
                    } else {
                        $scope.mapIsDisplayed = false;
                        container.find(".map-wrap").hide();
                    }
                };

                //for android client only
                this.checkCode = function(idAuction, qrCode){
                    var data = {
                        id_auction: idAuction,
                        qr_code: qrCode
                    };
                    UserAbility.checkCode(data).then(function(data){
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with QR'));
                    })
                };
                 //for android client only
                this.postGPS = function(idAuction){
                    var data = {
                        id_auction: idAuction,
                        route: "49.7103929,17.1867981"
                    };
                    UserAbility.postGPS(data).then(function(data){
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with GPS'));
                    })
                };

                //for android client only
                //only for post photos, but never use on web client
                this.uploadPhoto = function upload(id, photos)
                {
                    var formData = new FormData();
                    formData.append("id_auction", id);
                    angular.forEach(photos, function (photo) {
                        formData.append(photo.name, photo);
                    });

                    postPhotos(formData).then(function(){
                        message(1, $filter('i18next')('Upload OK!'));
                    }).catch(function(){
                        message(3, $filter('i18next')('Upload FAIL!'));
                    })
                };
            }
        };
    });
