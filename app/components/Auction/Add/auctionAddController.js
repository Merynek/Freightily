/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('addAuctionController', ['$scope','Auction', 'Notification', function($scope, Auction, Notification){

      $scope.showMap = function(){
          if($scope.from && $scope.to){
              showMap($scope.from, $scope.to);
          }
          else{
             Notification.error('Musi byt vyopneni from a to');
          }
      }
     $scope.distance = "";
     $scope.addAuction = function(){
       if($scope.from && $scope.to && $scope.freight_description && $scope.freight_type && $scope.freight_size && 
       $scope.freight_weight && $scope.price && $scope.currency && $scope.email_addressee && $scope.min_amount && $scope.maturity){
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

             freight_description: $scope.freight_description,
             freight_type: $scope.freight_type,
             freight_size: $scope.freight_size,
             freight_weight: $scope.freight_weight,
             load_from: load_from,
             load_to: load_to,
             unload_from: unload_from,
             unload_to: unload_to,
             price: $scope.price,
             currency: $scope.currency,
             email_addressee: $scope.email_addressee,
             end_auction: end_auction,
             min_amount: $scope.min_amount,
             maturity: $scope.maturity,
             hot: ($scope.hot) ? "true" : "false"
           }
           console.log(data);
           Auction.newAuction(data).then(function(){

            }).catch(function(){
              Notification.error('nejde přidat'); 
            })
          }
          else{
            Notification.error('All inputs are required');
          }  
       }
       else{
          Notification.error('All inputs are required');
       }

     };
    
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
  };$scope.to_address = {
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
  }
]);
