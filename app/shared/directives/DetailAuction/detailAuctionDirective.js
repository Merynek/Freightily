angular.module('appDirectives')
    .directive("detailAuction", function () {
        return {
            templateUrl: 'app/shared/directives/DetailAuction/detailAuctionDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                auctionItem: '=',
                withFavourite: '='
            },
            controller: function ($scope, $filter, Auction, User) {
                var self = this;
                $scope.withFavourite = this.withFavourite;
                $scope.item = this.auctionItem.item;
                $scope.expired = this.auctionItem.item.expired;
                $scope.win = $scope.item.last_amount_user === User.ID;
                $scope.userIsBidder = false;
                $scope.ID = this.auctionItem.item.ID;
                var end_auction = $scope.item.end_auction.split(" ");
                end_auction = end_auction[0].slice(0, -4) + " " + end_auction[1].slice(0, -3);
                $scope.item.end_auction = end_auction;
                $scope.isFavourite = $scope.item.isFavourite;
                $scope.history = {};
                $scope.withBids = true;
                $scope.user = User;
                if (User.isSender() || User.isDriver()) {
                    $scope.withBids = false;
                }
                $scope.historyMore = false;

                var afterHistoryLoad = function (history) {
                    var filtered = history.filter(function (item) {
                        return item.id_user === User.ID;
                    });

                    $scope.history = history.reverse();
                    $scope.userIsBidder = filtered.length > 0;
                };


                Auction.getAuctionHistory($scope.ID).then(afterHistoryLoad).catch(function (error) {
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                });

                $scope.show = false;
                $scope.toggleDetail = function () {
                    $scope.show = !$scope.show;
                };

                $scope.$on("openAuctionDetail", function (evt, id) {
                    $scope.show = id === $scope.ID;
                });

                $scope.$on("updateAuctionPrice", function (evt, id, price) {
                    $scope.priceUpdated = false;
                    if (id === $scope.ID) {
                        $scope.refreshPrice(price);
                    }
                });

                $scope.$on('timer-stopped', function (event, data) {
                    if ($scope.expired) {
                        return;
                    }
                    console.log("Auction end");
                    $scope.expired = true;
                    $scope.win = $scope.item.last_amount_user === User.ID;
                    setTimeout(function () {
                        refreshItem($scope.ID)
                    }, 100);
                });

                $scope.refreshPrice = function (price) {
                    if ($scope.item.current_price !== price) {
                        $scope.priceUpdated = true;
                        $scope.item.current_price = price;
                        refreshItem($scope.ID);
                    }
                };

                this.historyToggle = function () {
                    $scope.historyMore = !$scope.historyMore;
                };

                this.bidAuction = function (bid) {
                    var current_price = $scope.item.current_price;

                    if (bid && !isValueNumber(bid)) {
                        message(3, $filter('i18next')('errors.bid_is_number'));
                        return;
                    }
                    if (bid >=1 && ((current_price - bid) >= 1) && (current_price !== bid)) {
                        var data = {
                            id_auction: $scope.ID,
                            amount: bid
                        };
                        Auction.bidAuction(data).then(function () {
                            refreshItem($scope.ID);
                            message(1, $filter('i18next')('success.bid_auction'));
                        }).catch(function (error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                        });
                    }
                    else {
                        message(3, $filter('i18next')('errors.wrong_bid'));
                    }
                };

                function refreshItem(id) {
                    Auction.getAuctionItem(id).then(function (auctionItem) {
                        $scope.item = auctionItem;
                        var end_auction = $scope.item.end_auction.split(" ");
                        end_auction = end_auction[0].slice(0, -4) + " " + end_auction[1].slice(0, -3);
                        $scope.item.end_auction = end_auction;
                        $scope.isFavourite = auctionItem.isFavourite;
                        $scope.win = $scope.item.last_amount_user === User.ID;
                    }).catch(function (error) {
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    });
                    Auction.getAuctionHistory($scope.ID).then(afterHistoryLoad).catch(function (error) {
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    });
                }

                this.favourite = function () {
                    if ($scope.item.isFavourite) {
                        Auction.deleteFromFavourite($scope.ID).then(function () {
                            refreshItem($scope.ID);
                        }).catch(function (error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                        });
                    }
                    else {
                        Auction.addToFavourite($scope.ID).then(function () {
                            refreshItem($scope.ID);
                        }).catch(function (error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                        });
                    }
                };

                this.getFreightType = function (type) {
                    return $filter('i18next')('texts.auction.freight_type.' + type);
                };

                this.getCity = function (address) {
                    return address.split(",")[0];
                };

                $scope.onkeyDown = function ($event, bid) {
                    var keyCode = $event.which || $event.keyCode;
                    if (keyCode === 13) {
                        self.bidAuction(bid)
                    }
                }
            }
        }
    });
