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
		Auction.getAuctionList = function(sort, order, page){
			var parameters = "?";
            parameters += "page=" + page;
			if(sort && order) {
                parameters += "&sort=" + sort;
                parameters += "&order=" + order;
			}
			startLoading();

			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'auction'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
					})
			});
		};

		/* GET to REST api => Get auction item */ 
		Auction.getAuctionItem = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
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

        /* GET to REST api => Get auction history */
		Auction.getAuctionHistory = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
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

		/* POST to REST api => Create auction */
		Auction.create = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
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

		/* POST to REST api => bid auction */
		Auction.bidAuction = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
                    data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
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
					headers: { 'token': window.localStorage.getItem("TOKEN")},
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
					headers: { 'token': window.localStorage.getItem("TOKEN")},
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
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'auction/win'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
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
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'auction/favourite'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
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
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'auction/bids'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
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
					headers: { 'token': window.localStorage.getItem("TOKEN")},
                    url: CONFIG.server.url+'auction/created'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
					})
			});
		};

		return Auction;

	}]
);


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

