angular.module('appDirectives')
    .directive("detailAuction", function(){
                return{
                    templateUrl: 'app/shared/directives/detailAuctionDirective.html',
                    restrict: "E",
                    bindToController: true,
                    controllerAs: 'vm',
                    scope: {
                       auctionItem: '=',
                       vehicles: '='
                    },
                    controller: function($scope, $filter, Auction, User){
                        $scope.expired = false;
                        $scope.item = this.auctionItem.item;
                        var end_auction = $scope.item.end_auction.split(" ");
                        end_auction = end_auction[0].slice(0,-4) + " " + end_auction[1].slice(0,-3);
                        $scope.item.end_auction = end_auction;
                        $scope.isFavourite = $scope.item.isFavourite;
                        $scope.history = {};
                        this.withFavourite = true;
                        $scope.withBids = true;

                        if(User.isSender() || User.isDriver()){
                            this.withFavourite = false;
                            $scope.withBids = false;
                        }   
                        if(this.vehicles){
                            this.vehicleList = this.vehicles.vehicles;
                        }

                        
                        Auction.getAuctionHistory($scope.item.ID).then(function(history){
                            $scope.history = history;
                        }).catch(function(){
                            message(3, $filter('i18next')('Chyba při nacitani historie'));
                        });

                        this.show = false;
                        this.detail = function(){
                            switch(this.show){
                                case true: this.show = false;
                                    break;
                                case false: this.show = true;
                                    break;
                            }
                        }
                        $scope.$on('timer-stopped', function (event, data){
                            console.log('Timer Stopped - data = ', data);
                            $scope.expired = true;
                            $scope.withBids = false;
                        });
                        this.bidAuction = function(bid, vehicle){  
                            if(vehicle){
                                console.log($scope.item.price - bid);
                                if(bid && (($scope.item.price - bid) >= $scope.item.min_amount)){
                                    var data = {
                                        id_auction: $scope.item.ID,
                                        amount: bid,
                                        id_vehicle: vehicle
                                    }
                                    Auction.bidAuction(data).then(function(){
                                        refreshItem($scope.item.ID);
                                        message(1, $filter('i18next')('Přihozeno'));
                                    }).catch(function(){
                                        message(3, $filter('i18next')('Nejde si to vzit'));
                                    });
                                }
                                else{
                                    message(3, $filter('i18next')('Neplatná částka'));
                                }
                            }
                            else{
                                message(3, $filter('i18next')('Nevybral jste auto'));
                            }
                        };

                        function refreshItem(id){
                            Auction.getAuctionItem(id).then(function(auctionItem){
                                $scope.item = auctionItem;
                                $scope.isFavourite = auctionItem.isFavourite;
                            }).catch(function(){
                                message(3, $filter('i18next')('Chyba při aktualizaci položky v aukci'));
                            });
                            Auction.getAuctionHistory($scope.item.ID).then(function(history){
                                $scope.history = history;
                            }).catch(function(){
                                message(3, $filter('i18next')('Chyba při nacitani historie'));
                            });
                        }

                        this.favourite = function(){    
                            if($scope.item.isFavourite){
                                Auction.deleteFromFavourite($scope.item.ID).then(function(){
                                    refreshItem($scope.item.ID);
                                }).catch(function(){
                                    message(3, $filter('i18next')('nejde aukci odebrat z oblíbených'));
                                });
                            }
                            else{
                                Auction.addToFavourite($scope.item.ID).then(function(){
                                    refreshItem($scope.item.ID);
                                }).catch(function(){
                                    message(3, $filter('i18next')('nejde si aukci pridat do oblíbených'));
                                });
                            }  
                        };
                    }
                };
});
