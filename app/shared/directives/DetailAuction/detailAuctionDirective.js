angular.module('appDirectives')
    .directive("detailAuction", function () {
        return {
            templateUrl: 'app/shared/directives/DetailAuction/detailAuctionDirective.html',
            restrict: "E",
            scope: {
                auctionItem: '=',
                withFavourite: '=',
                canDownloadPrint: '='
            },
            controller: function ($scope, $filter, Auction, User, ngDialog) {
                var self = $scope;
                var interval;

                $scope.item = $scope.auctionItem.item;
                $scope.history = {};
                $scope.item.bidsHistory.unshift(createFirstHistoryItem());
                prepareHistory($scope.item.bidsHistory);
                $scope.expired = $scope.auctionItem.item.expired;
                $scope.win = $scope.item.last_amount_user === User.ID;
                $scope.userIsBidder = false;
                $scope.ID = $scope.auctionItem.item.ID;
                var end_auction = $scope.item.end_auction.split(" ");
                end_auction = end_auction[0].slice(0, -4) + " " + end_auction[1].slice(0, -3);
                $scope.item.end_auction = end_auction;
                $scope.isFavourite = $scope.item.isFavourite;
                $scope.withBids = true;
                $scope.user = User;
                $scope.isOwner = $scope.item.owner === User.ID;
                $scope.historyMore = false;
                $scope.showHistoryChart = false;

                function prepareHistory(history) {
                    var filtered = history.filter(function (item) {
                        return item.id_user === User.ID;
                    });

                    $scope.history = history.reverse();
                    $scope.userIsBidder = filtered.length > 0;
                }

                function createFirstHistoryItem() {
                    return {
                        user_img: $scope.item.owner.toString(),
                        id_user: $scope.item.owner,
                        amount: $scope.item.price,
                        date: $filter('i18next')("texts.auction.history_auction_first_item")
                    }
                }

                $scope.toggleDetail = function ($event) {
                    var visible = toggleDetail($($event.target).parents("detail-auction"));
                    if (visible) {
                        showChart();
                    }
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

                $scope.historyToggle = function () {
                    $scope.historyMore = !$scope.historyMore;
                };
                $scope.chartToggle = function () {
                    $scope.showHistoryChart = !$scope.showHistoryChart;
                };

                $scope.getPrintAuction = function (id) {
                    Auction.getAuctionPrint(id).then(function (data) {
                        //trick to download store a file having its URL
                        var fileURL = URL.createObjectURL(data);
                        var a = document.createElement('a');
                        a.href = fileURL;
                        a.download = 'auction-detail-' + id +'.pdf';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }).catch(function (error) {
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    });
                };

                $scope.bidAuction = function (bid) {
                    var current_price = $scope.item.current_price;

                    if (bid && !isValueNumber(bid)) {
                        message(3, $filter('i18next')('errors.bid_is_number'));
                        return;
                    }
                    if (bid >=1 && ((current_price - bid) >= 1) && (current_price !== bid)) {
                        ngDialog.open({
                            template: 'modal_bid_auction',
                            scope: $scope,
                            closeByDocument: false,
                            showClose: true,
                            appendClassName: "delete_user_dialog",
                            closeByEscape: true,
                            controller: ['$scope', function($scope) {
                                // controller logic
                                $scope.ok = function() {
                                    var data = {
                                        id_auction: $scope.ID,
                                        amount: bid
                                    };
                                    $scope.bid = bid;
                                    Auction.bidAuction(data).then(function () {
                                        refreshItem($scope.ID);
                                        message(1, $filter('i18next')('success.bid_auction'));
                                        $scope.closeThisDialog(false);
                                    }).catch(function (error) {
                                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                                        $scope.closeThisDialog(false);
                                    });
                                };
                                $scope.cancel = function() {
                                    $scope.closeThisDialog(false);
                                };
                            }]
                        });
                    }
                    else {
                        message(3, $filter('i18next')('errors.wrong_bid'));
                    }
                };

                function refreshItem(id) {
                    Auction.getAuctionItem(id).then(function (auctionItem) {
                        $scope.item = auctionItem;
                        prepareHistory($scope.item.bidsHistory);
                        var end_auction = $scope.item.end_auction.split(" ");
                        end_auction = end_auction[0].slice(0, -4) + " " + end_auction[1].slice(0, -3);
                        $scope.item.end_auction = end_auction;
                        $scope.isFavourite = $scope.item.isFavourite;
                        $scope.win = $scope.item.last_amount_user === User.ID;
                    }).catch(function (error) {
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    });
                }

                $scope.favourite = function () {
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

                $scope.getFreightType = function (type) {
                    return $filter('i18next')('texts.auction.freight_type.' + type);
                };

                $scope.getCity = function (address) {
                    return address.split(",")[0];
                };

                $scope.onkeyDown = function ($event, bid) {
                    var keyCode = $event.which || $event.keyCode;
                    if (keyCode === 13) {
                        self.bidAuction(bid)
                    }
                };

                function showChart() {
                    var el = document.getElementById('credit-chart-'+$scope.ID);

                    if (!el) {
                        return;
                    }
                    var ctx = el.getContext('2d');
                    var items = $scope.history.slice(0);
                    items.reverse();

                    var data = {
                        labels: items.map(function (history) {
                            return history.date;
                        }),
                        datasets: [
                            {
                                label: $filter('i18next')('texts.finances.charts_price'),
                                backgroundColor: "#12133d",
                                borderColor: "#12133d",
                                data: items.map(function (history) {
                                    return history.amount;
                                }),
                                fill: false,
                                cubicInterpolationMode: "monotone"
                            },
                            {
                                data: [
                                    {
                                        y: NaN,
                                        x: "placeholder"
                                    }
                                ]
                            }
                        ]
                    };

                    data.labels.push("placeholder");

                    new Chart(ctx, {
                        type: 'line',
                        data: data,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                            layout: {
                                padding: {
                                    left: 8,
                                    right: 5,
                                    top: 5,
                                    bottom: 5
                                }
                            },
                            tooltips: {
                                cornerRadius: 3,
                                bodySpacing: 7
                            },
                            legend: {
                                display: false
                            },
                            title: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    display: false
                                }],
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        callback: function(value) {
                                            return value + " Kč";
                                        },
                                        min: items.length > 1 ? computePoint(items) : 0
                                    }
                                }]
                            }
                        }
                    });
                }
            }
        }
    });
