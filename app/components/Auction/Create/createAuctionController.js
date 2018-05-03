/**
 * createAuctionController
 *
 * @class createAuctionController
 * @constructor
 */

angular.module('appControllers')
    .controller('createAuctionController', ['$scope', 'Auction', '$filter', function ($scope, Auction, $filter) {
        $scope.route = "auction|add";
        $scope.auction = {};
        $scope.mapIsShown = false;
        $scope.clicked = false;
        $scope.distance = "";
        $scope.options = {
            types: ['(cities)'],
            componentRestrictions: {country: 'FR'}
        };
        $scope.from_address = {
            name: '',
            place: '',
            components: {
                placeId: '',
                streetNumber: '',
                street: '',
                city: '',
                state: '',
                countryCode: '',
                country: '',
                postCode: '',
                district: '',
                location: {
                    lat: '',
                    long: ''
                }
            }
        };
        $scope.to_address = {
            name: '',
            place: '',
            components: {
                placeId: '',
                streetNumber: '',
                street: '',
                city: '',
                state: '',
                countryCode: '',
                country: '',
                postCode: '',
                district: '',
                location: {
                    lat: '',
                    long: ''
                }
            }
        };

        $scope.showMap = function () {
            if ($scope.auction.from && $scope.auction.to) {
                if ($scope.mapIsShown) {
                    $scope.mapIsShown = false;
                    $("#map").hide();
                    $("#distance").hide();
                } else {
                    $scope.mapIsShown = true;
                    showMap($scope.auction.from, $scope.auction.to);
                }
            } else {
                message(3, $filter('i18next')('texts.show_map_fail'));
            }
        };

        var validateDate = function (value) {
            return new Date(value) < new Date();
        };

        $scope.createAuction = function () {
            $scope.clicked = true;
            if (!this.createAuctionForm.$valid) {
                return;
            }

            var load = $("#load");
            var unload = $("#unload");
            var end_auction = $("#end_auction");

            if (validateDate(load.val())) {
                load.addClass("input-error");
                message(3, $filter('i18next')('Datum musí být vetší jak aktuální datum'));
                return;
            }
            load.removeClass("input-error");
            if (validateDate(end_auction.val())) {
                end_auction.addClass("input-error");
                message(3, $filter('i18next')('Datum musí být vetší jak aktuální datum'));
                return;
            }
            end_auction.removeClass("input-error");

            if (load && unload && end_auction) {
                var data = {
                    from_city: $scope.from_address.components.city,
                    from_street: $scope.from_address.components.street,
                    from_country: $scope.from_address.components.country,
                    from_house_number: $scope.from_address.place.address_components[1].long_name,
                    from_street_number: $scope.from_address.place.address_components[0].long_name,

                    to_city: $scope.to_address.components.city,
                    to_street: $scope.to_address.components.street,
                    to_country: $scope.to_address.components.country,
                    to_house_number: $scope.to_address.place.address_components[1].long_name,
                    to_street_number: $scope.to_address.place.address_components[0].long_name,

                    freight_description: $scope.auction.freight_description,
                    freight_type: $scope.auction.freight_type,
                    freight_size: $scope.auction.freight_size,
                    freight_weight: $scope.auction.freight_weight,
                    load: load.val(),
                    load_note: $scope.auction.load_note,
                    unload: unload.val(),
                    unload_note: $scope.auction.unload_note,
                    price: $scope.auction.price,
                    end_auction: end_auction.val(),
                    maturity: $scope.auction.maturity
                };

                Auction.create(data).then(function () {
                    message(1, $filter('i18next')('Aukce byla založena'));
                }).catch(function () {
                    Notification.error('nejde přidat');
                })
            }
            else {
                Notification.error('All inputs are required');
            }
        };
    }
    ]);
