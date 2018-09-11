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

		/* GET to REST api => Get all new shipments */
        Shipments.getAllNewShipments = function(){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: { 'token': window.localStorage.getItem("TOKEN")},
                    url: CONFIG.server.url+'shipment/new_shipments'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* GET to REST api => Get finished shipments */
		Shipments.getFinishedShipments = function(page){
            var parameters = "?past=1&page=" + page;

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
					reject(error);
				})
			});
		};

		/* GET to REST api => Get new shipments */
		Shipments.getNewShipments = function(page){
            var parameters = "?page=" + page;

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
					reject(error);
				})
			});
		};

		/* POST to REST api => New shipment from admin */
        Shipments.NewShipmentFromAdmin = function(id_transporter){
            var parameters = "?";

            startLoading();
            parameters += "id_transporter=" + id_transporter;

            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    headers: { 'token': window.localStorage.getItem("TOKEN")},
                    url: CONFIG.server.url+'admin/new_shipment'+parameters
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
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

