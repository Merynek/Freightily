/**
* auctionListController 
*
* @class auctionListController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionListResponse', 'Auction', 'User', 'UserAbility', '$location', '$stateParams', '$filter', '$state', '$rootScope',
      function($scope, AuctionListResponse, Auction, User, UserAbility, $location, $stateParams, $filter, $state, $rootScope){
    $scope.route = "auction|list";
    $scope.AuctionList = AuctionListResponse.AuctionList;
    $scope.AuctionListCount = AuctionListResponse.Count;
    $scope.filter = $stateParams.sort;
    $scope.order = $stateParams.order ? $stateParams.order : "ASC";
    $scope.page = $stateParams.page ? $stateParams.page : "1";
    $scope.sorting = getSortingText();
    $scope.withFavourite = true;
    $scope.windowHasFocus = true;
    if (!checkListAuctionRunning) {
       refreshingData();
    }

      $(window).focus(function() {
          $scope.windowHasFocus = true;
          if (!checkListAuctionRunning) {
              refreshingData();
          }
      }).blur(function() {
          $scope.windowHasFocus = false;
      });

    function refreshingData() {
        checkListAuctionRunning = true;
        var route = $state.current.name;
        if (route === "auction" && $scope.windowHasFocus && $scope.AuctionList && $scope.AuctionList.length) {
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
            checkListAuctionRunning = false;
        }
    }

    function getSortingText() {
        var locText = "";

        switch ($scope.filter) {
            case 'from': locText += $filter('i18next')('texts.sorting.from.' + $scope.order);
                break;
            case 'to': locText += $filter('i18next')('texts.sorting.to.' + $scope.order);
                break;
            case 'price': locText += $filter('i18next')('texts.sorting.price.' + $scope.order);
                break;
            case 'end_auction': locText += $filter('i18next')('texts.sorting.end_auction.' + $scope.order);
                break;
            default: return $filter('i18next')('texts.sorting.end_auction.DESC');
        }

        return locText;
    }
    
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });
  }
]);


