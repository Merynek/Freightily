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
				 userInfo: function(){
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
		.state('new_employee', {
			url: "/manage/new_employee",
			controller: 'addEmployeeController',
			templateUrl: "app/components/MyCompany/AddEmployee/addEmployeeView.html",
			data: {
				role: [2,3]
			}
		})
		.state('new_vehicle', {
			url: "/manage/new_vehicle",
			controller: 'addVehicleController',
			templateUrl: "app/components/MyCompany/AddVehicle/addVehicleView.html",
			data: {
				role: [2,3]
			}
		})
		.state('auction', {
			url: "/auction?sort?order",
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1,2,3,4]
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
			url: "/auction/add",
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
		 .state('createdauction', {
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
		.state('shipments', {
			url: "/auction/shipment",
			controller: 'shipmentController',
			templateUrl: "app/components/Shipments/myShipmentsView.html",
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
		.state('manage', {
			url: "/manage",
			controller: 'mySectionController',
			templateUrl: "app/components/Manage/manageView.html",
			data: {
				role: [1,2,3,4]
			}
		})
		 .state('view_shipments', {
			 url: "/manage/view_shipments",
			 controller: 'viewShipmentsController',
			 templateUrl: "app/components/Manage/ViewShipments/viewShipmentsView.html",
			 data: {
				 role: [1,2,3,4]
			 },
			 resolve: {
				 actualShipments: function(Shipments){
					 return {};
					 return Shipments.getActualShipments().then(function(res){
						 return res;
					 }).catch(function(){
						 return null;
					 })
				 },
				 pastShipments: function(Shipments){
					 return {};
					 return Shipments.getActualShipments().then(function(res){
						 return res;
					 }).catch(function(){
						 return null;
					 })
				 }
			 }
		 })
		 .state('shipments_manage', {
			 url: "/manage/shipments_manage",
			 controller: 'shipmentsManageController',
			 templateUrl: "app/components/Manage/ShipmentsManage/shipmentsManageView.html",
			 data: {
				 role: [2,3]
			 },
			 resolve: {
				 WinAuction: function(Auction){
					 return Auction.getMyWinAuction().then(function(res){
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
		 .state('my_company', {
			 url: "/manage/my_company",
			 controller: 'myCompanyController',
			 templateUrl: "app/components/MyCompany/myCompanyView.html",
			 data: {
				 role: [2,3]
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
				 dispatchers: function(UserAbility, User){
					 if(User.isDispatcher()) return {};
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