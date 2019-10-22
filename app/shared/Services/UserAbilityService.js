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

		/* GET to REST api => Get my drivers List per page */
		UserAbility.getDrivers = function(page){
            var parameters = "?";
            parameters += "page=" + page;

			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
					url: url+'company/drivers'+parameters
					}).then(function(response) {
						endLoading();
						resolve(response.data);
					}).catch(function(error){
						endLoading();
						reject(error);
					})
			});
		};

		/* GET to REST api => Get all photos in shipment*/
		UserAbility.getPhotos = function(idShipment, firstPart){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
                    headers: getTokenFromStorage(),
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

        /* DELETE to REST api => delete user */
        UserAbility.deleteUser = function(id_user){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'DELETE',
                    headers: getTokenFromStorage(),
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

		/* GET to REST api => get currently driver position */
        UserAbility.getDriverPosition = function(id_driver){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: url+'company/position/' + id_driver
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* GET to REST api => get info about finances */
        UserAbility.getFinancesInfo = function(){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: url+'company/finances'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* GET to REST api => get invoices */
        UserAbility.getInvoices = function(){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: url+'company/invoices'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* GET to REST api => Get invoice print */
        UserAbility.getInvoicePrint = function(id){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'company/printInvoice/'+id,
                    responseType: 'blob'
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
                    headers: getTokenFromStorage(),
					url: url+'company/account'
				}).then(function(response) {
					endLoading();
					resolve(response.data);
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

		/* POST to REST api => change password */
		UserAbility.changePassword = function(data){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
                    headers: getTokenFromStorage(),
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

		/* POST to REST api => set account info */
        UserAbility.setInfo = function(data){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    data: param(data),
                    url: url+'company/account'
                }).then(function() {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* GET to REST api => get notification settings */
        UserAbility.getNotification = function() {
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: url+'company/notification'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* POST to REST api => set notification settings*/
        UserAbility.setNotification = function(data){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    data: param(data),
                    url: url+'company/notification'
                }).then(function() {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* GET to REST api => get daily notification settings */
        UserAbility.isSetDailyNotification = function() {
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: url+'company/dailyNotification'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* POST to REST api => set daily notification settings*/
        UserAbility.setDailyNotification = function(data){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    data: param(data),
                    url: url+'company/dailyNotification'
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

		/* POST to REST api => Stop shipment */
        UserAbility.stopShipment = function(data){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    url: url+'shipment/stop',
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

		/* POST to REST api => Assign shipments to driver */
        UserAbility.assignShipments = function(data){
            startLoading();
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    url: url+'shipment/assign',
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

