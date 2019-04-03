/**
 * auctionListController
 *
 * @class auctionListController
 * @constructor
 */

angular.module('appControllers')
    .controller('auctionListController', ['$scope', 'AuctionListResponse', 'Auction', 'User', 'UserAbility', '$location', '$stateParams', '$filter', '$state', '$rootScope',
        function ($scope, AuctionListResponse, Auction, User, UserAbility, $location, $stateParams, $filter, $state, $rootScope) {
            $scope.route = "auction|list";
            $scope.AuctionList = AuctionListResponse.AuctionList;
            $scope.AuctionListCount = AuctionListResponse.Count;
            $scope.filter = $stateParams.sort;
            $scope.order = $stateParams.order ? $stateParams.order : "ASC";
            $scope.page = $stateParams.page ? $stateParams.page : "1";
            $scope.sorting = getSortingText();
            $scope.withFavourite = true;
            $scope.windowHasFocus = true;
            $scope.filterOpen = true;

            var maxPrice = 5000;
            var rendered = false;

            if (!checkListAuctionRunning) {
                refreshingData();
            }

            $scope.search = {
                minPrice: parseInt($stateParams.minPrice) || undefined,
                maxPrice: parseInt($stateParams.maxPrice) || undefined,
                type: $stateParams.type || "",
                address_from: $stateParams.address_from,
                address_to: $stateParams.address_to
            };

            $(window).focus(function () {
                $scope.windowHasFocus = true;
                if (!checkListAuctionRunning) {
                    refreshingData();
                }
            }).blur(function () {
                $scope.windowHasFocus = false;
            });

            $scope.makeSearch = function () {
                $state.params.minPrice = $scope.search.minPrice || undefined;
                $state.params.maxPrice = $scope.search.maxPrice === maxPrice || $scope.search.maxPrice === 0 ?
                    undefined : $scope.search.maxPrice;
                $state.params.type = $scope.search.type === "any" ? undefined : $scope.search.type;
                $state.params.address_from = $scope.search.address_from;
                $state.params.address_to = $scope.search.address_to;
                $state.params.page = undefined;

                redirect($state, $state.params);
            };

            $scope.toggleSearch = function () {
                var filter = $(".advanced-filter");

                $scope.filterOpen = !$(filter).is(":visible");
                filter.slideToggle(function () {
                    $scope.filterOpen = $(filter).is(":visible");
                    window.dispatchEvent(new Event('resize'));
                });
            };

            $scope.resetSearch = function () {
                if (!isSearching()) {
                    $scope.toggleSearch();
                    return;
                }
                $scope.search.minPrice = undefined;
                $scope.search.maxPrice = undefined;
                $scope.search.type = undefined;
                $scope.search.address_from = undefined;
                $scope.search.address_to = undefined;
                $scope.makeSearch();
            };

            $scope.afterRender = function () {
                var sliderElement;

                if (rendered) {
                    return;
                }
                rendered = true;
                sliderElement = $("#slider-price");

                sliderElement.slider({
                    min: 0,
                    max: maxPrice,
                    step: 100,
                    range: true,
                    value: [$scope.search.minPrice || 0, $scope.search.maxPrice || maxPrice],
                    formatter: function(value) {
                        if (value === maxPrice) {
                            return $filter('i18next')('texts.search.over') + value + " Kč";
                        }
                        return value + " Kč";
                    },
                    tooltip_split: true,
                    tooltip: "always"
                }).on("change", function (e) {
                    var values = e.value.newValue;

                    $scope.search.minPrice = values[0];
                    $scope.search.maxPrice = values[1];
                });

                if (!isSearching()) {
                    $(".advanced-filter").hide();
                    $scope.filterOpen = false;
                    window.dispatchEvent(new Event('resize'));
                }
            };

            function isSearching() {
                return $scope.search.minPrice ||
                    $scope.search.maxPrice ||
                    $scope.search.type ||
                    $scope.search.address_from ||
                    $scope.search.address_to;
            }

            function refreshingData() {
                checkListAuctionRunning = true;
                var route = $state.current.name;
                if (route === "auction" && $scope.windowHasFocus && $scope.AuctionList && $scope.AuctionList.length) {
                    Auction.getAuctionCache().then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            $rootScope.$broadcast('updateAuctionPrice', data[i].ID, data[i].price);
                        }
                        setTimeout(function () {
                            refreshingData();
                        }, 1000);
                    }).catch(function (error) {
                        // message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    });
                } else {
                    checkListAuctionRunning = false;
                }
            }

            function getSortingText() {
                var locText = "";

                switch ($scope.filter) {
                    case 'from':
                        locText += $filter('i18next')('texts.sorting.from.' + $scope.order);
                        break;
                    case 'to':
                        locText += $filter('i18next')('texts.sorting.to.' + $scope.order);
                        break;
                    case 'price':
                        locText += $filter('i18next')('texts.sorting.price.' + $scope.order);
                        break;
                    case 'end_auction':
                        locText += $filter('i18next')('texts.sorting.end_auction.' + $scope.order);
                        break;
                    default:
                        return $filter('i18next')('texts.sorting.end_auction.ASC');
                }

                return locText;
            }

            middle_no_padding();
            $(window).resize(function () {
                if (window.innerWidth <= 900) {
                    middle_no_padding();
                }
            });
        }
    ]);


