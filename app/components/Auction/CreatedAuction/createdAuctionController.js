/**
* createdAuctionController 
*
* @class createdAuctionController
* @constructor
*/

angular.module('appControllers')
  .controller('createdAuctionController', ['$scope', 'createdAuctionResponse', 'User', '$state', '$filter',
      function($scope, createdAuctionResponse, User, $state, $filter){
    checkError(createdAuctionResponse.Error);
    $scope.AuctionList = createdAuctionResponse.AuctionList;
    $scope.AuctionListCount = createdAuctionResponse.Count;
    $scope.route = "auction|created";
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


