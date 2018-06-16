/**
* auctionListController 
*
* @class auctionListController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', 'Auction', 'User', 'UserAbility', '$location', '$stateParams', '$filter',
      function($scope, AuctionList, Auction, User, UserAbility, $location, $stateParams, $filter){
    $scope.route = "auction|list";
    $scope.AuctionList = AuctionList;
    $scope.filter = $stateParams.sort;
    $scope.order = $stateParams.order ? $stateParams.order : "ASC";
    $scope.page = $stateParams.page ? $stateParams.page : "1";
    $scope.sorting = getSortingText();

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


