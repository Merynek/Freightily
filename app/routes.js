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
		.state('shipments', {
			url: "/shipments",
			controller: 'shipmentsController',
			templateUrl: "app/components/Shipments/List/shipmentsView.html",
			data: {
				role: [1,2,3,4]
			},
			resolve: {
				shipments: function(Shipments){
					return Shipments.getAllShipments().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('shipment', {
			url: "/shipment/:id",
			controller: 'shipmentDetailController',
			templateUrl: "app/components/Shipments/Detail/shipmentDetailView.html",
			data: {
				role: [1,2,3,4]
			},
			resolve: {
				shipment: function(Shipments, $stateParams){
					return Shipments.getShipment($stateParams.id).then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('auction', {
			url: "/auction",
			controller: 'auctionListController',
			templateUrl: "app/components/Auction/List/auctionListView.html",
			data: {
				role: [1,2,3,4],
              	css: ['css/auction.css']
            },
			resolve: {
				AuctionList: function(Auction){
					return Auction.getAuctionList().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('auctionItem', {
			url: "/auction/:id",
			controller: 'auctionDetailController',
			templateUrl: "app/components/Auction/Detail/auctionDetailView.html",
			data: {
				role: [1,2,3,4]
			},
			resolve: {
				auctionItem: function(Auction, $stateParams){
					return Auction.getAuctionItem($stateParams.id).then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				},
				auctionHistory : function(Auction, $stateParams){
					return Auction.getAuctionHistory($stateParams.id).then(function(res){
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
				}
      		}
		})
		.state('addAuction', {
			url: "/add/auction",
			controller: 'addAuctionController',
			templateUrl: "app/components/Auction/Add/auctionAddView.html",
			data: {
				role: [1]
			}
		})
		.state('myAuction', {
			url: "/auction/my",
			controller: 'myAuctionController',
			templateUrl: "app/components/Auction/MyAuction/myAuctionView.html",
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
		.state('winAuction', {
			url: "/auction/win",
			controller: 'sendersWinController',
			templateUrl: "app/components/MySection/sendersWinView.html",
			data: {
				role: [1,2,3]
			},
			resolve: {
				WinAuction: function(Auction){
					return Auction.getMyWinAuction().then(function(res){
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
		.state('mydrivershipments', {
			url: "/my/shipments",
			controller: 'myShipmentsController',
			templateUrl: "app/components/MySection/myShipmentsView.html",
			data: {
				role: [4]
			},
			resolve: {
				myshipments: function(UserAbility){
					return UserAbility.getMyShipments().then(function(res){
						return res;
					}).catch(function(){
						return null;
					})
				}
      		}
		})
		.state('createdauction', {
			url: "/auction/created",
			controller: 'myCreatedAuctionController',
			templateUrl: "app/components/Auction/MyCreatedAuction/myCreatedAuctionView.html",
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


		


		.state('404', {
			url: '/404',
			templateUrl: '/404.html', 
			controller: function($scope){}
		});

    $locationProvider.html5Mode(true);
});