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

		/* GET to REST api => Get all shipments */ 
		Shipments.getAllShipments = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'data/shipments'
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
					})
			});
		};

		/* GET to REST api => Get shipment */
		Shipments.getShipment = function(id){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'data/shipment/'+id
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

		/* GET to REST api => get invoice */ 
		Shipments.getInvoice = function(id, byTransporter){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: { 'token': window.localStorage.getItem("TOKEN")},
					responseType: 'arraybuffer',
					url: CONFIG.server.url+'data/shipment/invoice?auctionId=' +id + '&byTransporter=' + byTransporter
				}).then(function(response) {
					var reader = new FileReader();
					var out = new Blob([response.data], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(out);
                    var win = window.open();
                    win.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; overflow: hidden" allowfullscreen></iframe>')

					/*reader.onload = function(e){
						window.open(reader.result, "_blank");
					}
					reader.readAsDataURL(out);*/
					resolve();
					endLoading();
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
    	};

		/* GET to REST api => Get actual shipment */
		Shipments.getActualShipments = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'data/shipment/fixedShipments'
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		/* GET to REST api => Get past shipments */
		Shipments.getPastShipments = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'data/shipment/fixedShipments?past=1'
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		/* GET to REST api => Get Not started shipments */
		Shipments.getNotStartedShipments = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'data/shipment/fixedShipments?notStarted=1'
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

