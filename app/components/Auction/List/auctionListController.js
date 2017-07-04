/**
* auctionListController 
*
* @class auctionListController
* @constructor
*/

angular.module('appControllers')
  .controller('auctionListController', ['$scope', 'AuctionList', 'vehicles', 'Auction', 'User', 'UserAbility', '$location', '$stateParams', function($scope, AuctionList, vehicles, Auction, User, UserAbility, $location, $stateParams){
    $scope.setNavigationPath("home|auction_list");
    $scope.route = "auction|list";
    $scope.AuctionList = AuctionList;
    $scope.vehicles = vehicles;
    $scope.filter = $stateParams.sort;
    $scope.order = $stateParams.order ? $stateParams.order : "ASC";
    
    middle_no_padding();
    $(window).resize(function () {
      if(window.innerWidth <= 900){
        middle_no_padding();
      }
    });

    $scope.sort = function() {
      $scope.order = $scope.order === "ASC" ? "DESC" : "ASC";
    } 

    $scope.arrowState = function(param) {
      var class_style = "";
      if($scope.filter && $scope.filter === param) {
        class_style += "redArrow ";
        class_style += $scope.order === "ASC" ? "glyphicon-triangle-top" : "glyphicon-triangle-bottom";
      } 
      else {
        class_style = "glyphicon-triangle-top";
      }
      
      return class_style;
    }
  }
]);


