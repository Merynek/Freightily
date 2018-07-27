/**
* auctionListController 
*
* @class auctionListController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', 'Auction', 'User', 'UserAbility', '$location', '$stateParams', '$filter', '$state',
      function($scope, AuctionList, Auction, User, UserAbility, $location, $stateParams, $filter, $state){
    $scope.route = "auction|list";
    $scope.AuctionList = AuctionList;
    $scope.filter = $stateParams.sort;
    $scope.order = $stateParams.order ? $stateParams.order : "ASC";
    $scope.page = $stateParams.page ? $stateParams.page : "1";
    $scope.sorting = getSortingText();
    if (!checkAuctionRunning) {
       refreshingData();
    }

    function refreshingData() {
        checkAuctionRunning = true;
        var route = $state.current.name;
        if (route === "auction") {
            Auction.getAuctionCache().then(function (data) {

                for (var i = 0; i < data.length; i++) {
                    $scope.$broadcast('updateAuctionPrice', data[i].ID, data[i].price);
                }
                setTimeout(function() {
                    refreshingData();
                }, 1000);
            }).catch(function (error) {
                // message(3, $filter('i18next')(getErrorKeyByCode(error)));
            });
        } else {
            checkAuctionRunning = false;
        }
    }

    function getSortingText() {
        var locText = "";

        switch ($scope.filter) {
            case 'from': locText += $filter('i18next')('texts.sorting.from');
                break;
            case 'to': locText += $filter('i18next')('texts.sorting.to');
                break;
            case 'price': locText += $filter('i18next')('texts.sorting.price');
                break;
            case 'end_auction': locText += $filter('i18next')('texts.sorting.end_auction');
                break;
            default: return "";
        }
        locText += " (";
        switch ($scope.order) {
            case 'ASC': locText += $filter('i18next')('texts.sorting.ASC');
                break;
            case 'DESC': locText += $filter('i18next')('texts.sorting.DESC');
                break;
        }

        locText +=") ";

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


