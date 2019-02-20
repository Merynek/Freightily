angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider, $i18nextProvider, $urlServiceProvider) {


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
$urlServiceProvider.config.strictMode(false);

 $stateProvider
		 .state("empty", {
			 url: "/",
			 template: "<ui-view>",
             data: {
                 role: [1,99]
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
		 .state('activate', {
			 url: "/activate/:code",
			 controller: 'activateController',
			 templateUrl: "app/components/Account/Activate/activateView.html",
             resolve: {
                 activateResponse: function(User, $stateParams) {
                     var code = $stateParams.code;
                     if (!Boolean(code)) {
                     	return false;
					 }
                     return User.activateAccount(code).then(function(){
                         return true;
                     }).catch(function() {
                         return false;
					 })
                 }
             }
		 })
		 .state('account', {
             url: "/account/profile",
             controller: 'userProfileController',
             templateUrl: "app/components/Account/Profile/MyAccount/userProfileView.html",
             data: {
                 role: [1]
             },
             resolve: {
                 userInfo: function(UserAbility){
                     return UserAbility.getAccountInfo().then(function(res){
                         return res;
                     })
                 }
             }
		 })
		 .state('finances', {
			 url: "/account/finances",
			 controller: 'financesController',
			 templateUrl: "app/components/Account/Profile/Finances/financesView.html",
			 data: {
				 role: [1]
			 },
			 resolve: {
                 financesInfo: function(UserAbility){
					 return UserAbility.getFinancesInfo().then(function(res){
						 return res;
					 })
				 }
			 }
		 })
		 .state('change_password', {
			 url: "/account/change_password",
			 controller: 'changePasswordController',
			 templateUrl: "app/components/Account/Profile/ChangePassword/changePasswordView.html",
			 data: {
                 role: [1]
			 }
		 })
		 .state('notification', {
			 url: "/account/notification",
			 controller: 'notificationController',
			 templateUrl: "app/components/Account/Profile/Notification/notificationView.html",
			 data: {
				 role: [1]
			 },
			 resolve: {
				 notificationResponse: function(UserAbility){
					 return UserAbility.getNotification().then(function(res){
						 return res;
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
				role: [1]
			}
		})
		 .state('company', {
			 url: "/company?page",
			 controller: 'companyController',
			 templateUrl: "app/components/Company/companyView.html",
			 data: {
				 role: [1]
			 },
			 resolve: {
                 driversResponse: function(UserAbility, $stateParams){
                     var page = $stateParams.page || 1;

					 return UserAbility.getDrivers(page).then(function(res){
						 return {
						 	drivers: res.drivers,
						 	count: res.count,
							allOwnDrivers: res.allOwnDrivers
						 };
                     })
				 }
			 }
		 })
	 	// AUCTION
		.state('auction', {
			url: "/auction?page?sort?order?minPrice?maxPrice?type?expired?address_from?address_to",
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1]
            },
			resolve: {
				AuctionListResponse: function(Auction, $stateParams) {
					return Auction.getAuctionList($stateParams).then(function(res){
						return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
						};
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
                    })
                }
            }
		})
		.state('favouriteAuction', {
			url: "/auction/favourite?page",
			controller: 'favouriteAuctionController',
			templateUrl: "app/components/Auction/FavouriteAuction/favouriteAuctionView.html",
			data: {
				role: [1]
			},
			resolve: {
				favouriteAuctionResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					return Auction.getFavouriteAuction(page).then(function(res){
                        return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
                        };
                    })
				}
			}
		})
		.state('bidsAuction', {
			url: "/auction/bids?page",
			controller: 'bidsAuctionController',
			templateUrl: "app/components/Auction/bidsAuction/bidsAuctionView.html",
			data: {
				role: [1]
			},
			resolve: {
				bidsAuctionResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					return Auction.getBidsAuction(page).then(function(res){
                        return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
                        };
					})
				}
			}
		})
		.state('winAuction', {
			url: "/auction/win?page",
			controller: 'winAuctionController',
			templateUrl: "app/components/Auction/winAuction/winAuctionView.html",
			data: {
				role: [1]
			},
			resolve: {
				winAuctionResponse: function(Auction, $stateParams){
                    var page = $stateParams.page || 1;
					return Auction.getWinAuction(page).then(function(res){
                        return {
                            AuctionList: res.AuctionList,
                            Count: res.Count
                        };
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
                     })
				 }
			 }
		 })
		 .state('detailAuction', {
			 url: "/auction/:idAuction",
			 controller: 'detailAuctionController',
			 templateUrl: "app/components/Auction/Detail/detailAuction.html",
			 data: {
				 role: [1, 99]
			 },
			 resolve: {
				 detailAuctionResponse: function(Auction, $stateParams) {
				 	var idAuction = $stateParams.idAuction;

				 	return Auction.getAuctionItem(idAuction).then(function(response){
				 		return response
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
				 role: [1]
			 },
			 resolve: {
				 newShipmentsResponse: function(Shipments, $stateParams){
                     var page = $stateParams.page || 1;
					 return Shipments.getNewShipments(page).then(function(res){
                         return {
                             shipments: res.ShipmentList,
                             Count: res.Count
                         };
                     })
				 }
			 }
		 })
		 .state('finished_shipments', {
			 url: "/shipments/finished?page",
			 controller: 'finishedShipmentsController',
			 templateUrl: "app/components/Shipments/finished/finishedShipmentsView.html",
			 data: {
				 role: [1]
			 },
			 resolve: {
                 finishedShipmentsResponse: function(Shipments, $stateParams){
                     var page = $stateParams.page || 1;
                     return Shipments.getFinishedShipments(page).then(function(res){
                         return {
                             shipments: res.ShipmentList,
                             Count: res.Count
                         };
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