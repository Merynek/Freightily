/**
 * createAuctionController
 *
 * @class createAuctionController
 * @constructor
 */

angular.module('appControllers')
    .controller('createAuctionController', ['$scope', '$timeout', 'Auction', '$filter', '$state', 'templatesResponse', 'ngDialog', 'User', function ($scope, $timeout, Auction, $filter, $state, templatesResponse, ngDialog, User) {
        checkError(templatesResponse.Error);
        $scope.templates = [getNoValueTemplate()].concat(templatesResponse);
        $scope.selectedTemplate = $scope.templates.find(function (t) {
            return t.ID === 0;
        });

        middle_no_padding();
        $(window).resize(function () {
            if (window.innerWidth <= 900) {
                middle_no_padding();
            }
        });

        var deliveryDate = null;
        var auctionEndDate = null;

        // after render
        $timeout(function () {
            var accordion = $( ".accordion" ),
                dateDelivery = $('.datetimepickerDelivery'),
                dateAuction = $('.datetimepicker1'),
                interval,
                onAccordionChange;

            dateAuction.datetimepicker({
                inline: true,
                sideBySide: true,
                useCurrent: false,
                minDate: new Date(),
                format: "YYYY/MM/DD HH:mm",
                timeZone: "Europe/Prague",
                locale: "cs"
            }).on("dp.change", function (e) {
                if (e.date) {
                    auctionEndDate = e.date.format("YYYY/MM/DD HH:mm");
                    dateDelivery.data("DateTimePicker").minDate(e.date);
                }
            });
            dateDelivery.datetimepicker({
                inline: true,
                sideBySide: true,
                useCurrent: false,
                minDate: new Date(),
                format: "YYYY/MM/DD HH:mm",
                timeZone: "Europe/Prague",
                locale: "cs"
            }).on("dp.change", function (e) {
                if (e.date) {
                    deliveryDate = e.date.format("YYYY/MM/DD HH:mm");
                }
            });

            onAccordionChange = function () {
                clearInterval(interval);
                interval = setInterval(function () {
                    window.dispatchEvent(new Event('resize'));
                }, 20);
                setTimeout(function () {
                    clearInterval(interval);
                }, 300);
            };
            accordion.accordion();

            accordion.bind("accordion.open", onAccordionChange);
            accordion.bind("accordion.close", onAccordionChange);
        }, 15);

        $scope.route = "auction|add";
        $scope.auction = {
            freight_type: ""
        };
        $scope.mapIsShown = false;
        $scope.clicked = false;
        $scope.distance = "";

        $scope.full_adress_from = {
            city: "",
            street: "",
            rest: "",
            state: "cs"
        };
        $scope.full_adress_to = {
            city: "",
            street: "",
            rest: "",
            state: "cs"
        };

        function checkError(error) {
            if (error && error.status === 401) {
                User.logout();
                $state.go('login');
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            }
        }

        function prepareAddressForServer(addressObj) {
            var address = "";

            address += addressObj.city;
            address += ", ";
            address += addressObj.street;
            address += " ";
            address += addressObj.rest;
            address += ", ";
            address += $filter('i18next')('texts.auction.state.' + addressObj.state);

            return address;
        }

        /**
         * @param {number} part
         */
        $scope.goToPart = function (part) {
            if (validatePart(true)) {
                $("#acc-part-" + part).click();
            } else {
                message(3, $filter('i18next')('errors.set_all_inputs'));
            }
            afterValidate();
        };

        /**
         * @param {boolean} openOnly
         * @returns {boolean}
         */
        function validatePart(openOnly) {
            var inputs = openOnly ? $(".accordion.open .required") : $(".accordion .required"),
                valid = true;

            inputs.removeClass("input-error");

            inputs.each(function (i, input) {
                var $input = $(input);

                if (!$input.val()) {
                    $input.addClass("input-error");
                    valid = false;
                }
            });

            return valid;
        }

        function afterValidate() {
            var invalidInputs = $(".auction-add-page .input-error, .auction-add-page .text-error");

            $(".accordion h3.red").removeClass("red");

            invalidInputs.each(function (i, input) {
                var $input = $(input),
                    parent = $input.parents(".accordion");

                parent.find("h3[data-control]").addClass("red");
            });
        }

        function validateAuctionEndDate(value) {
            return new Date(value) < new Date();
        }

        function validateDeliveryDate(value, endAuctionDate) {
            return !(new Date(endAuctionDate) < new Date(value));
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

        function removeErrorClasses() {
            $(".input-error").removeClass("input-error");
            $(".text-error").removeClass("text-error");
        }

        $scope.createAuction = function () {
            var end_auction = $("#end_auction");
            var delivery = $("#delivery");

            $scope.clicked = true;
            end_auction.removeClass("text-error");
            delivery.removeClass("text-error");

            if (!validatePart(false)) {
                message(3, $filter('i18next')('errors.set_all_inputs'));
                afterValidate();
                return;
            }
            if (validateAuctionEndDate(auctionEndDate)) {
                end_auction.addClass("text-error");
                message(3, $filter('i18next')('errors.invalid_auction_date'));
                afterValidate();
                return;
            }
            if (validateDeliveryDate(deliveryDate, auctionEndDate)) {
                delivery.addClass("text-error");
                message(3, $filter('i18next')('errors.invalid_delivery_date'));
                afterValidate();
                return;
            }

            if (!numberFieldsIsValid()) {
                afterValidate();
                return;
            }

            if (end_auction) {
                var data = {
                    address_from: prepareAddressForServer($scope.full_adress_from),
                    address_to: prepareAddressForServer($scope.full_adress_to),
                    freight_description: $scope.auction.freight_description,
                    freight_type: $scope.auction.freight_type,
                    freight_size: $scope.auction.freight_size,
                    freight_weight: $scope.auction.freight_weight,
                    load_note: $scope.auction.load_note || "",
                    unload_note: $scope.auction.unload_note || "",
                    price: $scope.auction.price,
                    end_auction: auctionEndDate,
                    delivery: deliveryDate
                };

                Auction.create(data).then(function () {
                    message(1, $filter('i18next')('success.auction_created'));
                    $state.go('auction');
                }).catch(function (error) {
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                });
            }
            else {
                message(3, $filter('i18next')('errors.set_required_inputs'));
            }
        };

        $scope.deleteTemplate = function (selectedTemplate) {
            if (selectedTemplate.ID === 0) {
                return;
            }
            ngDialog.open({
                template: 'modal_delete_auction',
                scope: $scope,
                closeByDocument: false,
                showClose: true,
                appendClassName: "delete_user_dialog",
                closeByEscape: true,
                controller: ['$scope', function ($scope) {
                    // controller logic
                    $scope.ok = function () {
                        Auction.deleteTemplate(selectedTemplate.ID).then(function () {
                            message(1, $filter('i18next')('success.auction_template_delete'));
                            var index = $scope.templates.map(function (t) {
                                    return t.ID;
                                }).indexOf(selectedTemplate.ID),
                                selectElement = $("#select-template-combo");

                            if (index !== -1) {
                                $scope.templates.splice(index, 1);
                            }
                            setTimeout(function () {
                                selectElement.val(0);
                                selectElement.trigger("change");
                            }, 0);

                            $scope.closeThisDialog(false);
                        }).catch(function (error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                            $scope.closeThisDialog(false);
                        });
                    };
                    $scope.cancel = function () {
                        $scope.closeThisDialog(false);
                    };
                }]
            });
        };

        $scope.createTemplate = function () {
            ngDialog.open({
                template: 'modal_create_template',
                scope: $scope,
                closeByDocument: false,
                showClose: true,
                appendClassName: "create_template_dialog",
                closeByEscape: true,
                controller: ['$scope', function ($scope) {
                    // controller logic
                    $scope.ok = function (template_name) {
                        if (!template_name) {
                            return;
                        }
                        var weight = $scope.auction.freight_weight;
                        var data = {
                            name: template_name,
                            address_from: JSON.stringify($scope.full_adress_from),
                            address_to: JSON.stringify($scope.full_adress_to),
                            freight_description: $scope.auction.freight_description || "",
                            freight_type: $scope.auction.freight_type || "",
                            freight_size: $scope.auction.freight_size || "",
                            freight_weight: weight ? weight : 0,
                            load_note: $scope.auction.load_note || "",
                            unload_note: $scope.auction.unload_note || ""
                        };

                        Auction.createTemplate(data).then(function () {
                            message(1, $filter('i18next')('success.auction_template_created'));
                            Auction.getTemplates().then(function (data) {
                                while ($scope.templates.length > 0) {
                                    $scope.templates.pop();
                                }
                                $scope.templates.push(getNoValueTemplate());
                                for (var i = 0; i < data.length; i++) {
                                    $scope.templates.push(data[i]);
                                }
                            }).catch(function (error) {
                                message(3, $filter('i18next')(getErrorKeyByCode(error)));
                            });
                            $scope.closeThisDialog(false);
                        }).catch(function (error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                            $scope.closeThisDialog(false);
                        })
                    };
                    $scope.cancel = function () {
                        $scope.closeThisDialog(false);
                    };
                }]
            });
        };

        $scope.selectTemplate = function (selectedTemplate) {
            var fullFrom, fullTo;

            if (!selectedTemplate) {
                return;
            }

            $scope.selectedTemplate = selectedTemplate;
            var template = $scope.templates.find(function (tmp) {
                return tmp.ID === selectedTemplate.ID;
            });

            if (template.ID === 0) {
                deliveryDate = null;
                auctionEndDate = null;
                $('.datetimepickerDelivery').data("DateTimePicker").date(null);
                $('.datetimepicker1').data("DateTimePicker").date(null);
                $scope.auction.price = "";
            }

            var weight = template.freight.freight_weight;

            fullFrom = JSON.parse(template.address_from);
            fullTo = JSON.parse(template.address_to);

            $scope.full_adress_from.city = fullFrom.city;
            $scope.full_adress_from.street = fullFrom.street;
            $scope.full_adress_from.rest = fullFrom.rest;
            $("#state-from").val(fullFrom.state);

            $scope.full_adress_to.city = fullTo.city;
            $scope.full_adress_to.street = fullTo.street;
            $scope.full_adress_to.rest = fullTo.rest;
            $("#state-to").val(fullTo.state);

            $scope.auction.freight_description = template.freight.freight_description;
            $scope.auction.freight_type = template.freight.freight_type;
            $scope.auction.freight_size = template.freight.freight_size;
            $("#freight_type").val(template.freight.freight_type);
            $scope.auction.freight_weight = weight ? weight.toString() : "";
            $scope.auction.load_note = template.load_note;
            $scope.auction.unload_note = template.unload_note;

            setTimeout(function () {
                triggerInputsChange();
                removeErrorClasses();
                afterValidate();
                message(1, $filter('i18next')(template.ID ? 'success.auction_template_selected' : 'success.auction_template_unselected'));
            }, 0);
        };

        function getNoValueTemplate() {
            return {
                ID: 0,
                name: $filter('i18next')('texts.auction.no_template'),
                address_from: JSON.stringify({
                    city: "",
                    street: "",
                    rest: "",
                    state: "cs"
                }),
                address_to: JSON.stringify({
                    city: "",
                    street: "",
                    rest: "",
                    state: "cs"
                }),
                freight: {
                    freight_description: "",
                    freight_size: "",
                    freight_type: "",
                    freight_weight: 0
                },
                load_note: "",
                owner: User.ID,
                unload_note: ""
            };
        }

        function triggerInputsChange() {
            var inputs = $(".auction-add-page input, .auction-add-page textarea"),
                selects = $(".auction-add-page form select");

            inputs.each(function (index, input) {
                var $input = $(input);

                if ($input.val()) {
                    $input.trigger("keydown");
                }
            });
            selects.each(function (index, select) {
                var $select = $(select);

                if ($select.val()) {
                    $select.trigger("change");
                }
            });
        }
    }
    ]);
