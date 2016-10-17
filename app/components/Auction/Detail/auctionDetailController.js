/**
* noteNewController 
*
* @class noteNewController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionDetailController', ['$scope','Auction', 'vehicles', 'Notification', 'auctionItem', 'auctionHistory', '$state', '$filter', 'User', function($scope, Auction, vehicles, Notification, auctionItem, auctionHistory, $state, $filter, User){
     
      $scope.vehicles = vehicles;
      console.log(vehicles);
      $scope.auctionHistory = auctionHistory; 
      if(auctionItem){
            $scope.auctionItem = {
                from: auctionItem.from,
                to: auctionItem.to,
                freight_description: auctionItem.freight_description,
                freight_type: auctionItem.freight_type,
                freight_size: auctionItem.freight_size,
                freight_weight: auctionItem.freight_weight,
                load: auctionItem.load,
                unload: auctionItem.unload,
                price: auctionItem.price,
                currency: auctionItem.currency,
                end_auction: auctionItem.end_auction,
                min_amount: auctionItem.min_amount,
                isFavourite: auctionItem.isFavourite,
                nonExpired: !auctionItem.expired 
            }

               
             setTimeout(CountDown, 0);   
             function CountDown(){
                 $("#CountDown")
                    .countdown(new Date(new Date().getTime() + (auctionItem.secondsToEndAuction * 1000)), function(event) {
                        $(this).text(
                            event.strftime('%D days %H:%M:%S')
                        );
		            })
                    .on('finish.countdown', function(event) {
                        alert("Aukce skončila");
                    });
             }

            $scope.bidAuction = function(add_amount, vehicle){  
                console.log(auctionItem.price - add_amount);
                if(add_amount && ((auctionItem.price - add_amount) >= auctionItem.min_amount)){
                    var data = {
                        id_auction: auctionItem.ID,
                        amount: add_amount,
                        id_vehicle: vehicle
                    }
                    Auction.bidAuction(data).then(function(){
                        $state.go('auction');
                    }).catch(function(){
                        Notification.error($filter('i18next')('nejde si to vzit'));
                    });
                }
                else{
                    Notification.error($filter('i18next')('Malá castka'));
                }
            };

            $scope.addToFavourite = function(){    
                Auction.addToFavourite(auctionItem.ID).then(function(){

                }).catch(function(){
                    Notification.error($filter('i18next')('nejde si aukci pridat do oblíbených'));
                });
            };

            $scope.deleteFromFavourite = function(){    
                Auction.deleteFromFavourite(auctionItem.ID).then(function(){

                }).catch(function(){
                    Notification.error($filter('i18next')('nejde aukci odebrat z oblíbených'));
                });
            };
            
      }
      else{
          Notification.error($filter('i18next')('This shipment not found'));
      }
      
      
  }
]);