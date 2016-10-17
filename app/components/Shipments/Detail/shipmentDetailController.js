/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('shipmentDetailController', ['$scope','Shipments', 'Notification', 'shipment', '$state', '$filter', function($scope, Shipments, Notification, shipment, $state, $filter){
     
      if(shipment){
            $scope.shipment = {
                from: shipment.from,
                to: shipment.to,
                price: shipment.price,
                date: shipment.date,
                end_auction: shipment.end_auction,
                min_amount: shipment.min_amount
            }
            $scope.freight = {
                description: shipment.freight.description,
                type: shipment.freight.type,
                size: shipment.freight.size,
                weight: shipment.freight.weight
            }
            $scope.shipmentExpired = !shipment.expired;

            $scope.makeDeal = function(add_amount){    
                console.log(add_amount); 
                console.log(shipment.min_amount); 
                console.log(shipment.price); 
                if(add_amount && (add_amount > (shipment.min_amount + shipment.price))){
                    Shipments.takeShipment(shipment.ID, add_amount).then(function(){
                    $state.go('shipments');
                    }).catch(function(){
                        Notification.error($filter('i18next')('nejde si to vzit'));
                    });
                }
                else{
                    Notification.error($filter('i18next')('Malá castka'));
                }
            };
      }
      else{
          Notification.error($filter('i18next')('This shipment not found'));
      }
      
      
  }
]);