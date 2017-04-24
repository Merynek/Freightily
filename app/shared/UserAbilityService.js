/**
 * User Service contains user informatios
 *
 * @class UserService
 * @module Service
 * @constructor
 */

angular.module('appServices')
	.factory('UserAbility', ['$http', '$q', 'User', function ($http, $q, User) {
		'use strict';

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
		var url = "http://localhost:51246/api/data/company/";

		var UserAbility = {};

		/* GET to REST api => Get my drivers */
		UserAbility.getDrivers = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'drivers',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
					})
			});
		};

		/* GET to REST api => Get my vehicles */
		UserAbility.getVehicles = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'vehicles',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

        /* GET to REST api => Get my dispatchers */
		UserAbility.getDispatchers = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'dispatchers',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

        /* GET to REST api => Get assigments in my company */
		UserAbility.getAssigments = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'assignments',
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
		UserAbility.getPhotos = function(idAuction, firstPart){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'files',
					params: {
						id_auction: idAuction,
						first_part: firstPart
					}
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

		/* GET to REST api => Get map of driver path*/
		UserAbility.getMap = function(id_auction){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN") },
					url: url+'map/'+id_auction
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};	

		/* GET to REST api => Get map of driver path*/
		UserAbility.getMapy = function(id_auction){
			startLoading();
			return $q(function(resolve, reject){
					$http({
						method: 'GET',
						headers: { 'token': window.localStorage.getItem("TOKEN") },
						url: url+'mapy'
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();
					})
				});
		};	


         /* GET to REST api => Get my shipments  */ 
		UserAbility.getMyShipments = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: 'http://localhost:51246/api/data/shipment/fixedShipments',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

        /* POST to REST api => assignment driver to auction */
		UserAbility.assigment = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
                    data: param(data),
					url: url+'assignment',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

		/* POST to REST api => assignment driver to auction FIXED */
		UserAbility.fixAssigment = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					data: param(data),
					url: url+'fixAssignment',
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};

        /* POST to REST api => delete user */ 
		UserAbility.deleteUser = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
                    data: param(data),
					url: url+'delete/user',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
					})
			});
		};

        /* POST to REST api => delete vehicle */ 
		UserAbility.deleteVehicle = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
                    data: param(data),
					url: url+'delete/vehicle',
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject();		
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
					url: url+'account',
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
					url: url+'changePassword',
				}).then(function() {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();
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
					url: url+'newPassword',
				}).then(function() {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		};


		/* POST to REST api => Check qr code*/
		UserAbility.checkQrCode = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: 'http://localhost:51246/api/data/shipment/qrcode',
					data: param(data)
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
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
					url: url+'map',
					data: param(data)
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject();
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

