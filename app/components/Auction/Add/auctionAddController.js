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
             from: $scope.from,
             to: $scope.to,
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

     //////
    /*
$scope.options = {
    types: ['(cities)'],
    componentRestrictions: { country: 'FR' }
  };
  
  $scope.address = {
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
  };*/
  }
]);
