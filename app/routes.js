angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider, $i18nextProvider) {


  // translations
	$i18nextProvider.options = {
		lng: 'CZ',
		useCookie: false,
		useLocalStorage: false,
		fallbackLng: 'dev',
		resGetPath: '../locales/CZ/translation.json',
		defaultLoadingValue: ''
	};

$urlRouterProvider.otherwise("/404");

 $stateProvider
		 .state("empty", {
			 url: "/",
			 template: "<ui-view>",
             data: {
                 role: [1,2,3,99]
             },
			 controller: function($state, User) {
			 	if (User.isAdmin()) {
                    $state.go("users")
				} else {
                    $state.go("auction")
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
			 data: {
                 role: [1,2,3]
			 },
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
	 	// ADMIN
		 .state('users', {
			 url: "/admin/users",
			 controller: 'usersController',
			 templateUrl: "app/components/Admin/Users/usersView.html",
			 data: {
				 role: [99]
			 },
             resolve: {
                 users: function(User){
                     return User.GetUsers().then(function(res){
                         return res;
                     }).catch(function(){
                         return null;
                     })
                 }
             }
		 })
		 .state('map', {
			 url: "/admin/map",
			 controller: 'mapController',
			 templateUrl: "app/components/Admin/Map/mapView.html",
			 data: {
				 role: [99]
			 }
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
			 url: "/company?page",
			 controller: 'companyController',
			 templateUrl: "app/components/Company/companyView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
                 driversResponse: function(UserAbility, $stateParams){
                     var page = $stateParams.page || 1;

					 return UserAbility.getDrivers(page).then(function(res){
						 return {
						 	drivers: res.drivers,
						 	count: res.count
						 };
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
	 	// AUCTION
		.state('auction', {
			url: "/auction?page?sort?order",
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1,2]
            },
			resolve: {
				AuctionListResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					var sort = $stateParams.sort || "";
					var order = $stateParams.order || "";
					return Auction.getAuctionList(sort, order, page).then(function(res){
						return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
						};
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
			},
            resolve: {
                templatesResponse: function(Auction){
                    return Auction.getTemplates().then(function(res){
                        return res;
                    }).catch(function(){
                        return null;
                    })
                }
            }
		})
		.state('favouriteAuction', {
			url: "/auction/favourite?page",
			controller: 'favouriteAuctionController',
			templateUrl: "app/components/Auction/FavouriteAuction/favouriteAuctionView.html",
			data: {
				role: [2]
			},
			resolve: {
				favouriteAuctionResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					return Auction.getFavouriteAuction(page).then(function(res){
                        return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
                        };
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('bidsAuction', {
			url: "/auction/bids?page",
			controller: 'bidsAuctionController',
			templateUrl: "app/components/Auction/bidsAuction/bidsAuctionView.html",
			data: {
				role: [2]
			},
			resolve: {
				bidsAuctionResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					return Auction.getBidsAuction(page).then(function(res){
                        return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
                        };
					}).catch(function(){
						return null;
					})
				}
			}
		})
		.state('winAuction', {
			url: "/auction/win?page",
			controller: 'winAuctionController',
			templateUrl: "app/components/Auction/winAuction/winAuctionView.html",
			data: {
				role: [2]
			},
			resolve: {
				winAuctionResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					return Auction.getWinAuction(page).then(function(res){
                        return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
                        };
					}).catch(function(){
						return null;
					})
				}
			}
		})
		 .state('createdAuction', {
			 url: "/auction/created?page",
			 controller: 'createdAuctionController',
			 templateUrl: "app/components/Auction/CreatedAuction/createdAuctionView.html",
			 data: {
				 role: [1]
			 },
			 resolve: {
				 createdAuctionResponse: function(Auction, $stateParams){
                     var page = $stateParams.page || 1;
					 return Auction.getCreatedAuction(page).then(function(res){
                         return {
                             AuctionList: res.AuctionList,
                             Count: res.Count
                         };
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
	 	// SHIPMENTS
		 .state('new_shipments', {
			 url: "/shipments/new?page",
			 controller: 'newShipmentsController',
			 templateUrl: "app/components/Shipments/new/newShipmentsView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
				 newShipmentsResponse: function(Shipments, $stateParams){
                     var page = $stateParams.page || 1;
					 return Shipments.getNewShipments(page).then(function(res){
                         return {
                             shipments: res.ShipmentList,
                             Count: res.Count
                         };
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
		 .state('finished_shipments', {
			 url: "/shipments/finished?page",
			 controller: 'finishedShipmentsController',
			 templateUrl: "app/components/Shipments/finished/finishedShipmentsView.html",
			 data: {
				 role: [2]
			 },
			 resolve: {
                 finishedShipmentsResponse: function(Shipments, $stateParams){
                     var page = $stateParams.page || 1;
                     return Shipments.getFinishedShipments(page).then(function(res){
                         return {
                             shipments: res.ShipmentList,
                             Count: res.Count
                         };
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