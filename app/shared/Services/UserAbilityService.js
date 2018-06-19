/**
 * UserAbility service
 *
 * @class UserAbilityService
 * @module Service
 * @constructor
 */

angular.module('appServices')
	.factory('UserAbility', ['$http', '$q', function ($http, $q) {
		'use strict';
		var url = CONFIG.server.url;
		var UserAbility = {};

		/* GET to REST api => Get my drivers */
		UserAbility.getDrivers = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'company/drivers'
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
					})
			});
		};

		/* GET to REST api => Get all photos in shipment*/
		UserAbility.getPhotos = function(idShipment, firstPart){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'shipment/photo',
					params: {
                        id_shipment: idShipment,
						first_part: firstPart
					}
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

		/* GET to REST api => Get map of driver path*/
		UserAbility.getMap = function(id_shipment){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN") },
					url: url+'shipment/route/'+id_shipment
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

        /* POST to REST api => delete user */ 
		UserAbility.deleteUser = function(id_user){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'DELETE',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'company/user?id_user=' + id_user
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* GET to REST api => get info about user */
		UserAbility.getAccountInfo = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'company/account'
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		/* POST to REST api => change password */
		UserAbility.changePassword = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					data: param(data),
					url: url+'company/changePassword'
				}).then(function() {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

		/* POST to REST api => send new password to email*/
		UserAbility.sendNewPassword = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					data: param(data),
					url: url+'company/newPassword'
				}).then(function() {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};


		/* POST to REST api => Check code*/
		UserAbility.checkCode = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'shipment/code',
					data: param(data)
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

		/* POST to REST api => Post gps data to server*/
		UserAbility.postGPS = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'shipment/route',
					data: param(data)
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

		return UserAbility;

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

