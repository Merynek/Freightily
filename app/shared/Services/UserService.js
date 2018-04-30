/**
 * User Service
 */
angular.module('appServices')
	.factory('User', ['$http', '$q', function ($http, $q) {
		'use strict';

		var User = {
			isLoggedIn: false,
			username: "",
			ID: "",
			role: "",
			roleName : ""
		};

		//role:  1-sender  2-transporter 3-driver
		User.set = function (prop, value) {
			User[prop] = value;
		};

		User.setRole = function(role){
			switch(role){
				case 1: User.set('roleName', "Sender");
					break;
				case 2: User.set('roleName', "Transporter");
					break;
				case 3: User.set('roleName', "Driver");
					break;
			}
		};
		User.isSender = function(){
			return User.role === 1;
		};
		User.isTransporter = function(){
			return User.role === 2;
		};
		User.isDriver = function(){
			return User.role === 4;
		};

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
					url: CONFIG.server.url+'login'
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
					url: CONFIG.server.url+'logout'
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
		};

		/* POST to REST api => verify token */ 
		User.getUserForToken = function(token){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					url: CONFIG.server.url+'checkToken',
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
		};

		/* POST to REST api => Registration sender */
		User.registrationSender = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					data: param(data),
					url: CONFIG.server.url+'registration/sender'
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();			
				})
			});
		};

		/* POST to REST api => Registration transporter */
        User.registrationTransporter = function(data){
            startLoading();
            return $q(function(resolve, reject) {
                $http({
                    method: 'POST',
                    data: param(data),
                    url: CONFIG.server.url+'registration/transporter'
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject();
                })
            });
        };

		/* POST to REST api => Registration user */ 
		User.AddUser = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'registration/driver'
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();			
				})
			});
		};


		/* POST to REST api => Registration user */ 
		User.getCompany = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'GET',
					data: param(data),
					headers: { 'token': window.localStorage.getItem("TOKEN")},
					url: CONFIG.server.url+'Account/company'
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject();			
				})
			});
		};

		return User;
	}]
);