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
            controller: function ($scope, $filter, Auction, User, UserAbility, Shipments, $q, $http) {
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

                this.showPhoto = function(idAuction, firstPart) {
                    $scope.showPhotos = [];
                    UserAbility.getPhotos(idAuction, firstPart).then(function(data){
                        for(var i = 0; i < data.length; i++) {
                            $scope.showPhotos.push("data:image/png;base64," +data[i]);
                        }
                        $scope.photoReady = true;
                    }).catch(function(data){
                        message(3, $filter('i18next')('Error with get photos from server'));
                    })
                };

                this.showMap = function(id_auction) {
                    var container = $(".map-container-"+id_auction);

                    UserAbility.getMap(id_auction).then(function(data){
                        // toggle button and map
                        container.find(".map-wrap").show();
                        container.find(".show-map").hide();
                        // show route
                        showRouteMap(data, id_auction);
                    }).catch(function(data){
                        container.parents(".map-section").hide();
                        message(3, $filter('i18next')('Error with get map from server'));
                    })
                };
                // get Invoice
                this.getInvoice = function(id_auction) {
                    Shipments.getInvoice(id_auction, true);
                };


                //for android client only
                this.checkQrCode = function(idAuction, qrCode){
                    var data = {
                        id_auction: idAuction,
                        qr_code: qrCode
                    };
                    UserAbility.checkQrCode(data).then(function(data){
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

                //only for post photos, but never use on web client
                var postPhotos = function(formData){
                    return $q(function(resolve, reject){
                        $http({
                            method: 'POST',
                            transformRequest: angular.identity,
                            data: formData,
                            headers: { 'token': window.localStorage.getItem("TOKEN"), 'Content-Type': undefined},
                            url: 'http://localhost:51246/api/data/company/files'
                        }).then(function(response) {
                            resolve(response.data);
                        }).catch(function(error){
                            reject();
                        })
                    });
                };
            }
        };
    });
