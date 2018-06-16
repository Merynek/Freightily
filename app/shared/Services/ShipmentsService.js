/**
 * Shipments Service
 *
 * @class ShipmentsService
 * @module Service
 * @constructor
 */

angular.module('appServices')
	.factory('Shipments', ['$http', '$q', function ($http, $q) {
		'use strict';

		var Shipments = {};

		/* GET to REST api => Get in progress shipments */
		Shipments.getInProgressShipments = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'shipment/myShipments'+parameters
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		/* GET to REST api => Get finished shipments */
		Shipments.getFinishedShipments = function(page){
            var parameters = "?";
            parameters += "past=1";
            parameters += "&page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'shipment/myShipments'+parameters
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		/* GET to REST api => Get new shipments */
		Shipments.getNewShipments = function(page){
            var parameters = "?";
            parameters += "notStarted=1";
            parameters += "&page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'shipment/myShipments'+parameters
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		return Shipments;

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

