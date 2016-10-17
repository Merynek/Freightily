/**
* Data Provider Service is for query to REST API
*
* @module Service
* @class DataProvider
* @constructor
*/
angular.module('appServices')
	.factory('DataProvider', ['Restangular', 'Notification', '$state', '$filter', '$http', '$location', 'User', '$q', 
	function(Restangular, Notification, $state, $filter, $http, $location, User, $q){
		'use strict';
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
        var url = "http://localhost:51246/api/";

		var Provider = {};



		Provider.test = function(username, password){
			startLoading();
			var data = {
				Username: username,
				Password: password
			};
			return $http({
				method: 'POST',
				data: param(data),
				url: url+'Account/login'
			}).then(function(response) {
				console.log("test success");
				endLoading();
				return true;
			}).catch(function(error){
				console.log("test failed");
				endLoading();
				return false;
			})
    	};



		return Provider;
	}]);

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