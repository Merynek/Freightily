/**
 * User Service contains user informatios
 *
 * @class UserService
 * @module Service
 * @constructor
 */

angular.module('appServices')
	.factory('Auction', ['$http', '$q', function ($http, $q) {
		'use strict';

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
		var url = "http://freightily.com/api/";

		var Auction = {};

		/* GET to REST api => Get all auction */ 
		Auction.getAuctionList = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction',
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
					url: url+'data/auction/'+id,
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
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
					url: url+'data/auction/history/'+id,
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

		/* POST to REST api => Add auction */ 
		Auction.newAuction = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction/new',
					}).then(function(response) {
						endLoading();
						resolve();
					}).catch(function(error){
						endLoading();
						reject();		
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
					url: url+'data/auction/bid',
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();		
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
					url: url+'data/auction/favourite/'+id,
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();		
				})
			});
		};

        /* POST to REST api => Delete auction item from favourite */
		Auction.deleteFromFavourite = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction/favourite/delete/'+id,
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();		
				})
			});
		};

        /* GET to REST api => Get all my win auction */ 
		Auction.getMyWinAuction = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction/win',
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
		Auction.getMyFavouriteAuction = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction/favourite',
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
		Auction.getMyBidsAuction = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction/mybids',
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
		Auction.getCreatedAuction = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'data/auction/created',
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

