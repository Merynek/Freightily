angular.module('appDirectives')
    .directive("detailAuction", function(){
                return{
                    templateUrl: 'app/shared/directives/detailAuctionDirective.html',
                    restrict: "E",
                    bindToController: true,
                    controllerAs: 'vm',
                    scope: {
                       auctionItem: '=',
                       display: '=',
                    },
                    controller: function($scope){
                        this.item = this.auctionItem.item;
                        console.log(this.item);
                    }
                };
});