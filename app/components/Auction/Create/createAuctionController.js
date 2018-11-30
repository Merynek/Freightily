/**
 * createAuctionController
 *
 * @class createAuctionController
 * @constructor
 */

angular.module('appControllers')
    .controller('createAuctionController', ['$scope', 'Auction', '$filter', '$state', 'templatesResponse', 'ngDialog',
        function ($scope, Auction, $filter, $state, templatesResponse, ngDialog) {
        $scope.templates = templatesResponse;
        middle_no_padding();
        $(window).resize(function () {
            if(window.innerWidth <= 900){
                middle_no_padding();
            }
        });
        var autoCompleteIsInitialized = false;

        $scope.route = "auction|add";
        $scope.auction = {};
        $scope.mapIsShown = false;
        $scope.clicked = false;
        $scope.distance = "";
        $scope.selectedTemplate = "0";

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
                    parseAddress(result, true);
                });
                $("#geoCompleteTo").geocomplete().bind("geocode:result", function(event, result) {
                    parseAddress(result, false);
                });
            }
        };

        function parseAddress(locationObj, isFromAddress) {
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

        function validateAuctionEndDate(value) {
            return new Date(value) < new Date();
        }
        function validateDeliveryDate(value, endAuctionDate) {
            return !(new Date(endAuctionDate) < new Date(value));
        }

        function addressIsSet() {
            return cityIsSet() && streetIsSet();
        }

        function addressInputsAreEmpty() {
            var geoCompleteFrom = $("#geoCompleteFrom"),
                geoCompleteTo = $("#geoCompleteTo"),
                isError = false;

            geoCompleteFrom.removeClass("input-error");
            geoCompleteTo.removeClass("input-error");
            if (!geoCompleteFrom.val()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                geoCompleteFrom.addClass("input-error");
                isError = true;
            }
            if (!geoCompleteTo.val()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                geoCompleteTo.addClass("input-error");
                isError = true;
            }

            return isError;
        }

        function endAuctionInputIsEmpty() {
            var end_auction = $("#end_auction"),
                isError = false;

            end_auction.removeClass("input-error");
            if (!end_auction.val()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                end_auction.addClass("input-error");
                isError = true;
            }

            return isError;
        }

        function deliveryInputIsEmpty() {
            var delivery = $("#delivery"),
                isError = false;

            delivery.removeClass("input-error");
            if (!delivery.val()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                delivery.addClass("input-error");
                isError = true;
            }

            return isError;
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
                price = $("#price");

            if (!isValueNumber($scope.auction.freight_weight)) {
                freight_weight.addClass("input-error");
                message(3, $filter('i18next')('errors.weight_is_number'));
                return false;
            }
            freight_weight.removeClass("input-error");

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
                addressInputsAreEmpty();
                endAuctionInputIsEmpty();
                deliveryInputIsEmpty();
                return;
            }
            if (addressInputsAreEmpty()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                return;
            }
            if (endAuctionInputIsEmpty()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                return;
            }
            if (deliveryInputIsEmpty()) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                return;
            }
            var end_auction = $("#end_auction");
            var delivery = $("#delivery");

            if (validateAuctionEndDate(end_auction.val())) {
                end_auction.addClass("input-error");
                message(3, $filter('i18next')('errors.invalid_auction_date'));
                return;
            }
            if (validateDeliveryDate(delivery.val(), end_auction.val())) {
                delivery.addClass("input-error");
                message(3, $filter('i18next')('errors.invalid_delivery_date'));
                return;
            }

            if (!numberFieldsIsValid()) {
                return;
            }
            if (!addressIsSet()) {
                return;
            }

            end_auction.removeClass("input-error");
            delivery.removeClass("input-error");

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
                    delivery: delivery.val()
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

        $scope.createTemplate = function() {
            ngDialog.open({
                template: 'modal_create_template',
                scope: $scope,
                closeByDocument: false,
                showClose: true,
                appendClassName: "create_template_dialog",
                closeByEscape: true,
                controller: ['$scope', function($scope) {
                    // controller logic
                    $scope.ok = function(template_name) {
                        if (!template_name) {
                            return;
                        }
                        var weight = $scope.auction.freight_weight;
                        var price = $scope.auction.price;
                        var data = {
                            name: template_name,
                            address_from: $scope.auction.address_from || "",
                            address_to: $scope.auction.address_to || "",
                            freight_description: $scope.auction.freight_description || "",
                            freight_type: $scope.auction.freight_type || "",
                            freight_size: $scope.auction.freight_size || "",
                            freight_weight: weight ? weight : 0,
                            load_note: $scope.auction.load_note || "",
                            unload_note: $scope.auction.unload_note || "",
                            price: price ? price : 0
                        };

                        Auction.createTemplate(data).then(function () {
                            message(1, $filter('i18next')('success.auction_template_created'));
                            $scope.closeThisDialog(false);
                        }).catch(function (error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                            $scope.closeThisDialog(false);
                        })
                    };
                    $scope.cancel = function() {
                        $scope.closeThisDialog(false);
                    };
                }]
            });
        };

        $scope.selectTemplate = function(selectedTemplateID) {
            if (selectedTemplateID === "0") {
                return;
            }
            var template = $scope.templates.find(function (tmp) {
                return tmp.ID.toString() === selectedTemplateID;
            });

            var weight = template.freight.freight_weight,
                price = template.price;

            $scope.auction.address_from = template.address_from;
            $scope.auction.address_to = template.address_to;
            $scope.auction.freight_description = template.freight.freight_description;
            $scope.auction.freight_type = template.freight.freight_type;
            $scope.auction.freight_size = template.freight.freight_size;
            $("#freight_type").val(template.freight.freight_type);
            $scope.auction.freight_weight = weight ? weight.toString(): "";
            $scope.auction.load_note = template.load_note;
            $scope.auction.unload_note = template.unload_note;
            $scope.auction.price = price ? price.toString(): "";

            setTimeout(function() {
                $("#geoCompleteFrom").trigger("geocode");
                $("#geoCompleteTo").trigger("geocode");
            }, 0);
        }
    }
    ]);
