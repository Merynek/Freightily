/**
* addAuctionController 
*
* @class addAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('addAuctionController', ['$scope','Auction', 'Notification', '$filter', function($scope, Auction, Notification, $filter){
    $scope.setNavigationPath("home|addAuction");
    $scope.auction = {};
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
        showMap($scope.auction.from, $scope.auction.to);
      }
      else{
        Notification.error('Musi byt vyopneni from a to');
      }
    }
    
    $scope.addAuction = function(){
      $scope.clicked = true;
      if(!$scope.addAuctionForm.$valid) {
        return;
      }
      var load_from = $("#load_from").val();
      var load_to = $("#load_to").val();
      var unload_from = $("#unload_from").val();
      var unload_to = $("#unload_to").val();
      var end_auction = $("#end_auction").val();               

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
          load_from: load_from,
          load_to: load_to,
          unload_from: unload_from,
          unload_to: unload_to,
          price: $scope.auction.price,
          currency: $scope.auction.currency,
          email_addressee: $scope.auction.email_addressee,
          end_auction: end_auction,
          min_amount: $scope.auction.min_amount,
          maturity: $scope.auction.maturity,
          hot: ($scope.auction.hot) ? "true" : "false"
        }
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
