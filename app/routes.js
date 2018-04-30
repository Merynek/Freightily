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
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1,2,3]
			},
			resolve: {
				AuctionList: function(Auction){
					return Auction.getAuctionList("", "").then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
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
		 .state('my_profile', {
			 url: "/my_profile",
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
		 .state('forgotPassword', {
			 url: "/forgot_password",
			 controller: 'forgotPasswordController',
			 templateUrl: "app/components/Account/ForgotPassword/forgotPasswordView.html"
		 })
	 	// COMPANY
		.state('add_driver', {
			url: "/company/add_driver",
			controller: 'addDriverController',
			templateUrl: "app/components/Company/AddDriver/addDriverView.html",
			data: {
				role: [2]
			}
		})
		 .state('company', {
			 url: "/company",
			 controller: 'companyController',
			 templateUrl: "app/components/Company/companyView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
				 drivers: function(UserAbility){
					 return UserAbility.getDrivers().then(function(res){
						 return res;
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
	 	// AUCTION
		.state('auction', {
			url: "/auction?sort?order",
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1,2]
            },
			resolve: {
				AuctionList: function(Auction, $stateParams){
					var sort = $stateParams.sort || "";
					var order = $stateParams.order || "";
					return Auction.getAuctionList(sort, order).then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('createAuction', {
			url: "/auction/create",
			controller: 'createAuctionController',
			templateUrl: "app/components/Auction/Create/createAuctionView.html",
			data: {
				role: [1]
			}
		})
		.state('favouriteAuction', {
			url: "/auction/favourite",
			controller: 'favouriteAuctionController',
			templateUrl: "app/components/Auction/FavouriteAuction/favouriteAuctionView.html",
			data: {
				role: [2]
			},
			resolve: {
				favouriteAuction: function(Auction){
					return Auction.getFavouriteAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('bidsAuction', {
			url: "/auction/bids",
			controller: 'bidsAuctionController',
			templateUrl: "app/components/Auction/bidsAuction/bidsAuctionView.html",
			data: {
				role: [2]
			},
			resolve: {
				bidsAuction: function(Auction){
					return Auction.getBidsAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('winAuction', {
			url: "/auction/win",
			controller: 'winAuctionController',
			templateUrl: "app/components/Auction/winAuction/winAuctionView.html",
			data: {
				role: [2]
			},
			resolve: {
				winAuction: function(Auction){
					return Auction.getWinAuction().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
			}
		})
		 .state('createdAuction', {
			 url: "/auction/created",
			 controller: 'createdAuctionController',
			 templateUrl: "app/components/Auction/CreatedAuction/createdAuctionView.html",
			 data: {
				 role: [1]
			 },
			 resolve: {
				 createdAuction: function(Auction){
					 return Auction.getCreatedAuction().then(function(res){
						 return res;
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
	 	// SHIPMENTS
		 .state('new_shipments', {
			 url: "/shipments/new",
			 controller: 'newShipmentsController',
			 templateUrl: "app/components/Shipments/new/newShipmentsView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
				 newShipments: function(Shipments){
					 return Shipments.getNewShipments().then(function(res){
						 return res;
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
		 .state('in_progress_shipments', {
			 url: "/shipments/progress",
			 controller: 'inProgressShipmentsController',
			 templateUrl: "app/components/Shipments/inProgress/inProgressShipmentsView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
                 inProgressShipments: function(Shipments){
                     return Shipments.getInProgressShipments().then(function(res){
                         return res;
                     }).catch(function(){
                         return null;
                     })
                 }
			 }
		 })
		 .state('finished_shipments', {
			 url: "/shipments/finished",
			 controller: 'finishedShipmentsController',
			 templateUrl: "app/components/Shipments/finished/finishedShipmentsView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
                 finishedShipments: function(Shipments){
                     return Shipments.getFinishedShipments().then(function(res){
                         return res;
                     }).catch(function(){
                         return null;
                     })
                 }
			 }
		 })
		// ERROR
		.state('404', {
			url: '/404',
			templateUrl: '/404.html', 
			controller: function($scope){}
		});
		

    $locationProvider.html5Mode(true);
});