/**
 * Auction Service
 *
 * @class AuctionService
 * @module Service
 * @constructor
 */

angular.module('appServices')
	.factory('Auction', ['$http', '$q', function ($http, $q) {
		'use strict';
		
		var Auction = {};
		/* GET to REST api => Get all auction */ 
		Auction.getAuctionList = function(stateParams) {
			startLoading();

			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction'+ getAuctionFilter(stateParams)
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* GET to REST api => Get auction item */ 
		Auction.getAuctionItem = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/'+id
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* GET to REST api => Get auction print */
        Auction.getAuctionPrint = function(id){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'auction/print/'+id,
                    responseType: 'arraybuffer'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* GET to REST api => Get auction history */
		Auction.getAuctionHistory = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/history/'+id
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* GET to REST api => Get active auction cache */
        Auction.getAuctionCache = function(){
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'auction/cache'
                }).then(function(response) {
                    resolve(response.data);
                }).catch(function(error){
                    reject(error);
                })
            });
        };

		/* POST to REST api => Create auction */
		Auction.create = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					data: param(data),
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/create'
					}).then(function(response) {
						endLoading();
						resolve();
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* POST to REST api => Create auction template */
        Auction.createTemplate = function(data){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    data: param(data),
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'auction/template'
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* DELETE to REST api => Delete auction template */
        Auction.deleteTemplate = function(idTemplate){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'DELETE',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'auction/template/' + idTemplate
                }).then(function() {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* GET to REST api => Get auction templates */
        Auction.getTemplates = function(){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'auction/template'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* POST to REST api => bid auction */
		Auction.bidAuction = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
                    data: param(data),
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/bid'
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

        /* POST to REST api => Add auction to favourite */ 
		Auction.addToFavourite = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/favourite/'+id
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

        /* POST to REST api => Delete auction item from favourite */
		Auction.deleteFromFavourite = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'DELETE',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/favourite/'+id
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

        /* GET to REST api => Get all my win auction */ 
		Auction.getWinAuction = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/win'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

        /* GET to REST api => Get all my favourite auction */ 
		Auction.getFavouriteAuction = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/favourite'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

        /* GET to REST api => Get my bid auction */
		Auction.getBidsAuction = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/bids'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* GET to REST api => Get expired auction */
		Auction.getExpiredAuction = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'auction/expired'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

        /* GET to REST api => Get my created auction */
		Auction.getCreatedAuction = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'auction/created'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		return Auction;

	}]
);

var getAuctionFilter = function (stateParams) {
    var parameters = "?";
    parameters += "page=" + stateParams.page || 1;
    if (stateParams.sort && stateParams.order) {
        parameters += "&sort=" + stateParams.sort || "";
        parameters += "&order=" + stateParams.order || "";
    }
    if (stateParams.minPrice) {
        parameters += "&minPrice=" + stateParams.minPrice;
    }
    if (stateParams.maxPrice) {
        parameters += "&maxPrice=" + stateParams.maxPrice;
    }
    if (stateParams.type) {
        parameters += "&type=" + stateParams.type;
    }
    if (stateParams.expired) {
        parameters += "&expired=" + stateParams.expired;
    }
    if (stateParams.address_from) {
        parameters += "&address_from=" + stateParams.address_from;
    }
    if (stateParams.address_to) {
        parameters += "&address_to=" + stateParams.address_to;
    }

    return parameters;
};


var param = function(obj) {
		var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

		for(name in obj) {
		value = obj[name];

		if(value instanceof Array) {
			for(i=0; i<value.length; ++i) {
			subValue = value[i];
			fullSubName = name + '[' + i + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
			}
		}
		else if(value instanceof Object) {
			for(subName in value) {
			subValue = value[subName];
			fullSubName = name + '[' + subName + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
			}
		}
		else if(value !== undefined && value !== null)
			query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		}

		return query.length ? query.substr(0, query.length - 1) : query;
  };

