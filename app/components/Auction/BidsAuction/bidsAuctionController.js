/**
* bidsAuctionController 
*
* @class bidsAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('bidsAuctionController', ['$scope', 'bidsAuction', 'Auction', '$state', '$rootScope', function($scope, bidsAuction, Auction, $state, $rootScope){
    $scope.AuctionList = bidsAuction;
    $scope.route = "auction|bids";
    $scope.windowHasFocus = true;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });

      if (!checkBidsAuctionRunning) {
          refreshingData();
      }

      $(window).focus(function() {
          $scope.windowHasFocus = true;
          if (!checkBidsAuctionRunning) {
              refreshingData();
          }
      }).blur(function() {
          $scope.windowHasFocus = false;
      });

      function refreshingData() {
          checkBidsAuctionRunning = true;
          var route = $state.current.name;
          if (route === "bidsAuction" && $scope.windowHasFocus && $scope.AuctionList.length) {
              Auction.getAuctionCache().then(function (data) {
                  for (var i = 0; i < data.length; i++) {
                      $rootScope.$broadcast('updateAuctionPrice', data[i].ID, data[i].price);
                  }
                  setTimeout(function() {
                      refreshingData();
                  }, 1000);
              }).catch(function (error) {
                  // message(3, $filter('i18next')(getErrorKeyByCode(error)));
              });
          } else {
              checkBidsAuctionRunning = false;
          }
      }
  }

]);


