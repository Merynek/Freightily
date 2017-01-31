angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider, $i18nextProvider) {

    
  // translations 
	$i18nextProvider.options = {
		lng: 'EN',
		useCookie: false,
		useLocalStorage: false,
		fallbackLng: 'dev',
		resGetPath: '../locales/EN/translation.json',
		defaultLoadingValue: ''
	};  

	$urlRouterProvider.otherwise("/404");

 $stateProvider
 		.state('home', {
			url: "/",
			controller: 'homeController',
			templateUrl: "app/components/home/HomeView.html",
			data: {
				role: [1,2,3,4]
			}
		})
		.state('login', {
			url: "/login",
			controller: 'loginController',
			templateUrl: "app/components/Account/Login/loginView.html"
		})
		.state('registration', {
			url: "/registration",
			controller: 'registrationController',
			templateUrl: "app/components/Account/Registration/registrationView.html"
		})
		 .state('account', {
			 url: "/account",
			 controller: 'userProfileController',
			 templateUrl: "app/components/Account/Profile/userProfileView.html",
			 resolve: {
				 userInfo: function(UserAbility){
					 return UserAbility.getAccountInfo().then(function(res){
						 return res;
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
		.state('newuser', {
			url: "/registration/user",
			controller: 'addUserController',
			templateUrl: "app/components/Account/Registration/addUserView.html",
			data: {
				role: [2,3]
			}
		})
		.state('newvehicle', {
			url: "/registration/vehicle",
			controller: 'addVehicleController',
			templateUrl: "app/components/Account/Registration/addVehicleView.html",
			data: {
				role: [2,3]
			}
		})
		.state('auction', {
			url: "/auction?sort",
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1,2,3,4]
            },
			resolve: {
				AuctionList: function(Auction, $stateParams){
					var sort = $stateParams.sort || "";
					return Auction.getAuctionList(sort).then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				vehicles: function(UserAbility, User){
					if(User.isSender() || User.isDriver()) return{};
					return UserAbility.getVehicles().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('addauction', {
			url: "/add/auction",
			controller: 'addAuctionController',
			templateUrl: "app/components/Auction/Add/auctionAddView.html",
			data: {
				role: [1]
			}
		})
		.state('favouriteauction', {
			url: "/auction/favourite",
			controller: 'favouriteAuctionController',
			templateUrl: "app/components/Auction/FavouriteAuction/favouriteAuctionView.html",
			data: {
				role: [2,3]
			},
			resolve: {
				favouriteAuction: function(Auction){
					return Auction.getMyFavouriteAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				vehicles: function(UserAbility, User){
					if(User.isSender() || User.isDriver()) return{};
					return UserAbility.getVehicles().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('bidsauction', {
			url: "/auction/bids",
			controller: 'bidsAuctionController',
			templateUrl: "app/components/Auction/bidsAuction/bidsAuctionView.html",
			data: {
				role: [2,3]
			},
			resolve: {
				bidsAuction: function(Auction){
					return Auction.getMyBidsAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				vehicles: function(UserAbility, User){
					if(User.isSender() || User.isDriver()) return{};
					return UserAbility.getVehicles().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('winauction', {
			url: "/auction/win",
			controller: 'winAuctionController',
			templateUrl: "app/components/Auction/winAuction/winAuctionView.html",
			data: {
				role: [2,3]
			},
			resolve: {
				winAuction: function(Auction){
					return Auction.getMyWinAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('shipments', {
			url: "/auction/shipment",
			controller: 'shipmentController',
			templateUrl: "app/components/Auction/Shipments/shipmentView.html",
			data: {
				role: [4]
			},
			resolve: {
				shipments: function(UserAbility){
					return UserAbility.getMyShipments().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})

		.state('myauction', {
			url: "/myAuction",
			controller: 'myAuctionController',
			templateUrl: "app/components/Auction/MyAuction/myAuctionView.html",
			data: {
				role: [1,2,3,4]
			},
			resolve: {
				WinAuction: function(Auction){
					return Auction.getMyWinAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				myFavouriteAuction: function(Auction){
					return Auction.getMyFavouriteAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				myBidsAuction: function(Auction){
					return Auction.getMyBidsAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				drivers: function(UserAbility){
					return UserAbility.getDrivers().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				vehicles: function(UserAbility){
					return UserAbility.getVehicles().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				assigments: function(UserAbility){
					return UserAbility.getAssigments().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('mysection', {
			url: "/my/section",
			controller: 'mySectionController',
			templateUrl: "app/components/MySection/mySectionView.html",
			data: {
				role: [1,2,3,4]
			},
			resolve: {
				drivers: function(UserAbility){
					return UserAbility.getDrivers().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				vehicles: function(UserAbility){
					return UserAbility.getVehicles().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				dispatchers: function(UserAbility){
					return UserAbility.getDispatchers().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})

		.state('404', {
			url: '/404',
			templateUrl: '/404.html', 
			controller: function($scope){}
		});
		

    $locationProvider.html5Mode(true);
});