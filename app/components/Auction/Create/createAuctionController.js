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

        $scope.to_city = "";
        $scope.to_street = "";
        $scope.to_house_number = "";

        $scope.from_city = "";
        $scope.from_street = "";
        $scope.from_house_number = "";


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
            if (!addressIsSet()) {
                message(3, $filter('i18next')('errors.wrong_address'));
                return;
            }
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
                message(3, $filter('i18next')('errors.wrong_address'));
            }
        };

        function validateDate(value) {
            return new Date(value) < new Date();
        }

        function addressIsSet() {
            return cityIsSet() && streetIsSet();
        }

        function cityIsSet() {
            $scope.from_city = $scope.from_address.components.city;
            $scope.to_city = $scope.to_address.components.city;

            return $scope.from_city && $scope.to_city;
        }

        function streetIsSet() {
            $scope.from_street = $scope.from_address.components.street;
            $scope.to_street = $scope.to_address.components.street;

            return $scope.from_street && $scope.to_street;
        }

        $scope.createAuction = function () {
            $scope.clicked = true;
            if (!this.createAuctionForm.$valid) {
                return;
            }
            if (!addressIsSet()) {
                message(3, $filter('i18next')('errors.wrong_address'));
                return;
            }
            var end_auction = $("#end_auction");

            if (validateDate(end_auction.val())) {
                end_auction.addClass("input-error");
                message(3, $filter('i18next')('errors.invalid_auction_date'));

                return;
            }
            end_auction.removeClass("input-error");

            if (end_auction) {
                var data = {
                    from_city: $scope.from_city,
                    from_street: $scope.from_address.place.name,

                    to_city: $scope.to_city,
                    to_street: $scope.to_address.place.name,

                    freight_description: $scope.auction.freight_description,
                    freight_type: $scope.auction.freight_type,
                    freight_size: $scope.auction.freight_size,
                    freight_weight: $scope.auction.freight_weight,
                    load_note: $scope.auction.load_note,
                    unload_note: $scope.auction.unload_note,
                    price: $scope.auction.price,
                    end_auction: end_auction.val(),
                    maturity: $scope.auction.maturity
                };

                Auction.create(data).then(function () {
                    message(1, $filter('i18next')('success.auction_created'));
                }).catch(function (error) {
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                })
            }
            else {
                message(3, $filter('i18next')('errors.set_required_inputs'));
            }
        };
    }
    ]);
