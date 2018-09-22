/**
 * createAuctionController
 *
 * @class createAuctionController
 * @constructor
 */

angular.module('appControllers')
    .controller('createAuctionController', ['$scope', 'Auction', '$filter', '$state', function ($scope, Auction, $filter, $state) {
        var autoCompleteIsInitialized = false;

        $scope.route = "auction|add";
        $scope.auction = {};
        $scope.mapIsShown = false;
        $scope.clicked = false;
        $scope.distance = "";

        $scope.full_adress_from = {
            city: "",
            street: "",
            rest: "",
            formatted_address: ""
        };
        $scope.full_adress_to = {
            city: "",
            street: "",
            rest: "",
            formatted_address: ""
        };


        $scope.bindGeoEvents = function () {
            if (!autoCompleteIsInitialized) {
                autoCompleteIsInitialized = true;
                $("#geoCompleteFrom").geocomplete().bind("geocode:result", function(event, result) {
                    parseAdress(result, true);
                });
                $("#geoCompleteTo").geocomplete().bind("geocode:result", function(event, result) {
                    parseAdress(result, false);
                });
            }
        };

        function parseAdress(locationObj, isFromAddress) {
            var components = locationObj.address_components,
                formatted_address = locationObj.formatted_address,
                street_number,
                component,
                premise,
                street,
                city,
                name,
                i;

            for (i = 0; i < components.length; i++) {
                component = components[i];
                name = component.long_name;

                // Revucka
                if (component.types.indexOf("route") > -1) {
                    street = name;
                }
                // Litovel
                if (component.types.indexOf("locality") > -1) {
                    city = name;
                } else if(component.types.indexOf("sublocality") > -1){
                    city = name;
                }
                // /16
                if (component.types.indexOf("street_number") > -1) {
                    street_number = name;
                }
                // /1204
                if (component.types.indexOf("premise") > -1) {
                    premise = name;
                }
            }
            if (isFromAddress) {
                $scope.full_adress_from.city = city || "";
                $scope.full_adress_from.street = street || "";
                $scope.full_adress_from.rest = (premise || "") + " " + (street_number || "");
                $scope.full_adress_from.formatted_address = formatted_address;
            } else {
                $scope.full_adress_to.city = city || "";
                $scope.full_adress_to.street = street || "";
                $scope.full_adress_to.rest = (premise || "") + " " + (street_number || "");
                $scope.full_adress_to.formatted_address = formatted_address;
            }
        }

        function prepareAddressForServer(addressObj) {
            var address = "";

            address += addressObj.city;
            address += ", ";
            address += addressObj.street;
            address += " ";
            address += addressObj.rest;

            return address;
        }

        $scope.showMap = function () {
            if (!addressIsSet()) {
                return;
            }
            if ($scope.mapIsShown) {
                $scope.mapIsShown = false;
                $("#map").hide();
                $("#distance").hide();
            } else {
                $scope.mapIsShown = true;
                showMap($scope.full_adress_from.formatted_address, $scope.full_adress_to.formatted_address);
            }
        };

        function validateDate(value) {
            return new Date(value) < new Date();
        }

        function addressIsSet() {
            return cityIsSet() && streetIsSet();
        }

        function cityIsSet() {
            if ($scope.full_adress_to.city && $scope.full_adress_from.city) {
                return true;
            } else {
                message(3, $filter('i18next')('errors.wrong_address_city'));
                return false;
            }
        }

        function streetIsSet() {
            if ($scope.full_adress_to.street && $scope.full_adress_from.street) {
                return true;
            } else {
                message(3, $filter('i18next')('errors.wrong_address_street'));
                return false;
            }
        }


        function numberFieldsIsValid() {
            var freight_weight = $("#freight_weight"),
                maturity = $("#maturity"),
                price = $("#price");

            if (!isValueNumber($scope.auction.freight_weight)) {
                freight_weight.addClass("input-error");
                message(3, $filter('i18next')('errors.weight_is_number'));
                return false;
            }
            freight_weight.removeClass("input-error");

            if (!isValueNumber($scope.auction.maturity)) {
                maturity.addClass("input-error");
                message(3, $filter('i18next')('errors.maturity_is_number'));
                return false;
            }
            maturity.removeClass("input-error");

            if (!isValueNumber($scope.auction.price)) {
                price.addClass("input-error");
                message(3, $filter('i18next')('errors.price_is_number'));
                return false;
            }
            price.removeClass("input-error");

            return true;
        }

        $scope.createAuction = function () {
            $scope.clicked = true;
            if (!this.createAuctionForm.$valid) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                return;
            }
            var end_auction = $("#end_auction");

            if (validateDate(end_auction.val())) {
                end_auction.addClass("input-error");
                message(3, $filter('i18next')('errors.invalid_auction_date'));
                return;
            }

            if (!numberFieldsIsValid()) {
                return;
            }
            if (!addressIsSet()) {
                return;
            }

            end_auction.removeClass("input-error");

            if (end_auction) {
                var data = {
                    address_from: prepareAddressForServer($scope.full_adress_from),
                    address_to: prepareAddressForServer($scope.full_adress_to),
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
                    $state.go('auction');
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
