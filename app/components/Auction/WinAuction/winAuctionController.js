/**
* winAuctionController 
*
* @class winAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('winAuctionController', ['$scope', 'winAuctionResponse', 'User', '$state', '$filter',
      function($scope, winAuctionResponse, User, $state, $filter){
    checkError(winAuctionResponse.Error);
    $scope.AuctionList = winAuctionResponse.AuctionList;
    $scope.AuctionListCount = winAuctionResponse.Count;
    $scope.route = "auction|win";
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });

      function checkError(error) {
          if (error && error.status === 401) {
              User.logout();
              $state.go('login');
              message(3, $filter('i18next')(getErrorKeyByCode(error)));
          }
      }

  }

]);


