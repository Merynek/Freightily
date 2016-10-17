/**
 * User Service contains user informatios
 *
 * @class UserService
 * @module Service
 * @constructor
 */

angular.module('appServices')
	.factory('User', ['$http', '$q', function ($http, $q) {
		'use strict';

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
		var url = "http://localhost:51246/api/";

		var User = {
			isLoggedIn: false,
			username: "",
			ID: "",
			role: "",
			roleName : ""
		};
		//role:  1-sender  2-transporter 3-dispatcher 3-driver
		User.set = function (prop, value) {
			User[prop] = value;
		};

		User.setRole = function(role){
			switch(role){
				case 1: User.set('roleName', "Sender");
					break;
				case 2: User.set('roleName', "Transporter");
					break;
				case 3: User.set('roleName', "Dispatcher");
					break;
				case 4: User.set('roleName', "Driver");
					break;
			}
		}

		User.isSender = function(){
			return User.role == 1;
		}
		User.isTransporter = function(){
			return User.role == 2;
		}
		User.isDispatcher = function(){
			return User.role == 3;
		}
		User.isDriver = function(){
			return User.role == 4;
		}
		/* POST to REST api => Login */ 
		User.login = function(username, password){
			startLoading();
			var data = {
				Username: username,
				Password: password
			};
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					data: param(data),
					url: url+'Account/login'
				}).then(function(response) {
					if (window.localStorage) {
						if(response.data && response.data.User && response.data.Token){
							window.localStorage.setItem("ID", response.data.User.ID);
							window.localStorage.setItem("TOKEN", response.data.Token);
						}
						else{
							throw "Server error";
						}						
					}
					User.set('isLoggedIn', true);
					User.set('username', response.data.User.username);
					User.set('role', response.data.User.role);
					User.set('ID', response.data.User.ID);
					User.setRole(response.data.User.role);
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
    	};

		/* POST to REST api => Logout */ 
		User.logout = function(){
			startLoading();
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
					url: url+'Account/logout'
				}).then(function(response) {
					User.set('isLoggedIn', false);
					window.localStorage.clear();
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		}

		/* POST to REST api => verify token */ 
		User.getUserForToken = function(token){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					url: url+'Account/checkToken',
					headers: { 'token': token }
				}).then(function(response) {
					User.set('isLoggedIn', true);
					User.set('username', response.data.username);
					User.set('role', response.data.role);
					User.set('ID', response.data.ID);
					User.setRole(response.data.role);
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();
				})
			});
		}

		/* POST to REST api => Registration */ 
		User.registration = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					data: param(data),
					url: url+'Account/Registration',
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();			
				})
			});
		}

		/* POST to REST api => Registration user */ 
		User.AddUser = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'Account/Registration/Adduser',
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();			
				})
			});
		}

		/* POST to REST api => Registration vehicle*/ 
		User.AddVehicle = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: url+'Account/Registration/Addvehicle',
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();			
				})
			});
		}
		return User;

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

