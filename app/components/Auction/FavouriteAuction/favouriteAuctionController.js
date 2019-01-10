/**
* favouriteAuctionController 
*
* @class favouriteAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('favouriteAuctionController', ['$scope', 'favouriteAuctionResponse', 'Auction', '$state', '$rootScope', 'User', '$filter',
      function($scope, favouriteAuctionResponse, Auction, $state, $rootScope, User, $filter){
    $scope.AuctionList = favouriteAuctionResponse.AuctionList;
    $scope.AuctionListCount = favouriteAuctionResponse.Count;
    $scope.route = "auction|favourite";
    $scope.windowHasFocus = true;
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
      if (!checkFavouriteAuctionRunning) {
          refreshingData();
      }

      $(window).focus(function() {
          $scope.windowHasFocus = true;
          if (!checkFavouriteAuctionRunning) {
              refreshingData();
          }
      }).blur(function() {
          $scope.windowHasFocus = false;
      });

      function refreshingData() {
          checkFavouriteAuctionRunning = true;
          var route = $state.current.name;
          if (route === "favouriteAuction" && $scope.windowHasFocus && $scope.AuctionList && $scope.AuctionList.length) {
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
              checkFavouriteAuctionRunning = false;
          }
      }

  }

]);


