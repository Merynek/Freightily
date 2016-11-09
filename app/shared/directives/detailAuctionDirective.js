angular.module('appDirectives')
    .directive("detailAuction", function(){
                return{
                    templateUrl: 'app/shared/directives/detailAuctionDirective.html',
                    restrict: "E",
                    bindToController: true,
                    controllerAs: 'vm',
                    scope: {
                       auctionItem: '='
                    },
                    controller: function($scope){
                        $scope.expired = false;
                        this.item = this.auctionItem.item;
                        this.show = false;
                        this.detail = function(){
                            switch(this.show){
                                case true: this.show = false;
                                    break;
                                case false: this.show = true;
                                    break;
                            }
                        }
                        $scope.$on('timer-stopped', function (event, data){
                            console.log('Timer Stopped - data = ', data);
                            $scope.expired = true;
                        });
                    }
                };
});