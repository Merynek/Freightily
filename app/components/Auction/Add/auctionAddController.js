/**
* addAuctionController 
*
* @class addAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('addAuctionController', ['$scope','Auction', '$filter', function($scope, Auction, $filter){
    $scope.setNavigationPath("home|addAuction");
    $scope.auction = {};
    $scope.mapIsShown = false;
    $scope.clicked = false;
    $scope.distance = "";
    $scope.options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'FR' }
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

    $scope.showMap = function(){
      if($scope.auction.from && $scope.auction.to){
          if ($scope.mapIsShown) {
              $scope.mapIsShown = false;
              $("#map").hide();
              $("#distance").hide();
          } else {
            $scope.mapIsShown = true;
            showMap($scope.auction.from, $scope.auction.to);
          }
      } else{
          message(3, $filter('i18next')('texts.show_map_fail'));
      }
    };

    var validateDate = function(value){
      return new Date(value) < new Date();
    };
    
    $scope.addAuction = function(){
      $scope.clicked = true;
      if(!$scope.addAuctionForm.$valid) {
        return;
      }

      var load_from = $("#load_from");
      var load_to = $("#load_to");
      var unload_from = $("#unload_from");
      var unload_to = $("#unload_to");
      var end_auction = $("#end_auction");

      if (validateDate(load_from.val())) {
        load_from.addClass("input-error");
        message(3, $filter('i18next')('Datum musí být vetší jak aktuální datum'));
        return;
      }
      load_from.removeClass("input-error");
      if (validateDate(load_to.val())) {
        load_to.addClass("input-error");
        message(3, $filter('i18next')('Datum musí být vetší jak aktuální datum'));
        return;
      }
      load_to.removeClass("input-error");
      if (validateDate(end_auction.val())) {
        end_auction.addClass("input-error");
        message(3, $filter('i18next')('Datum musí být vetší jak aktuální datum'));
        return;
      }
      end_auction.removeClass("input-error");

      var from = new Date(load_from.val());
      var to = new Date(load_to.val());
      var end = new Date(end_auction.val());

      if (from > to) {
        message(3, $filter('i18next')('load_to musí byt stejný nebo vetší jak load_from'));
        return;
      }

      from = new Date(unload_from.val());
      to = new Date(unload_to.val());

      if (from > to) {
        message(3, $filter('i18next')('unload_to musí byt stejný nebo vetší jak unload_from'));
        return;
      }

      from = new Date(load_to.val());
      to = new Date(unload_to.val());

      if (from.setDate(from.getDate() + 7) > to) {
        message(3, $filter('i18next')('Datum pro vyložení musí být minimálně 7 dní od datumu naložení'));
        return;
      }

      from = new Date(load_from.val());

      if (end.setDate(end.getDate() + 2) > from) {
        message(3, $filter('i18next')('Datum ukončení aukce musí být 2dny před datumem naložení nákladu'));
        return;
      }

      if(load_from && load_to && unload_from && unload_to && end_auction){
        var data = {
          from_city: $scope.from_address.components.city,
          from_street:$scope.from_address.components.street,
          from_country: $scope.from_address.components.country,
          from_house_number: $scope.from_address.place.address_components[1].long_name,
          from_street_number: $scope.from_address.place.address_components[0].long_name,

          to_city: $scope.to_address.components.city,
          to_street:$scope.to_address.components.street,
          to_country: $scope.to_address.components.country,
          to_house_number: $scope.to_address.place.address_components[1].long_name,
          to_street_number: $scope.to_address.place.address_components[0].long_name,

          freight_description: $scope.auction.freight_description,
          freight_type: $scope.auction.freight_type,
          freight_size: $scope.auction.freight_size,
          freight_weight: $scope.auction.freight_weight,
          load_from: load_from.val(),
          load_to: load_to.val(),
          unload_from: unload_from.val(),
          unload_to: unload_to.val(),
          price: $scope.auction.price,
          currency: $scope.auction.currency,
          email_addressee: $scope.auction.email_addressee,
          end_auction: end_auction.val(),
          min_amount: $scope.auction.min_amount,
          maturity: $scope.auction.maturity,
          hot: "false"
        };

        Auction.newAuction(data).then(function(){
          message(1, $filter('i18next')('Aukce byla založena'));
        }).catch(function(){
          Notification.error('nejde přidat'); 
        })
      }
      else{
        Notification.error('All inputs are required');
      }
    };
    

  
  }
]);
