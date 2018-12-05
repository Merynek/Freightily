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

		//role:  1-sender  2-transporter 3-driver 99-admin
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
                case 99: User.set('roleName', "Admin");
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
			return User.role === 3;
		};
        User.isAdmin = function(){
            return User.role === 99;
        };

		/* POST to REST api => Login */ 
		User.login = function(username, password){
			startLoading();
			var data = {
                userName: username,
                password: password,
                grant_type: "password"
			};
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					data: param(data),
					url: CONFIG.server.url+'token'
				}).then(function(response) {
					var data = response.data;
					if (window.localStorage) {
						if(data && data.access_token){
							window.localStorage.setItem("access_token", data.access_token);
						}
						else{
							throw "Server error";
						}						
					}
					User.set('isLoggedIn', true);
					User.set('username', data.username);
					User.set('role', Number(data.role));
					User.set('ID', Number(data.ID));
					User.setRole(Number(data.role));
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
    	};

		/* Logout */
		User.logout = function() {
			return $q(function(resolve) {
                User.set('isLoggedIn', false);
                window.localStorage.clear();
                resolve();
			});
		};

		/* POST to REST api => verify token */ 
		User.getUserForToken = function(){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'POST',
					url: CONFIG.server.url+'checkToken',
                    headers: getTokenFromStorage()
				}).then(function(response) {
                    var data = response.data;

					User.set('isLoggedIn', true);
					User.set('username', data.username);
					User.set('role', data.role);
					User.set('ID', data.ID);
					User.setRole(data.role);
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
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
					reject(error);
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
                    reject(error);
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
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'registration/driver'
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

		/* POST to REST api => Set user vacation */
        User.SetVacation = function(data){
            startLoading();
            return $q(function(resolve, reject) {
                $http({
                    method: 'POST',
                    data: param(data),
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'company/vacation'
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		/* DELETE to REST api => Delete user vacation */
        User.DeleteVacation = function(ID, date){
            startLoading();
            return $q(function(resolve, reject) {
                var parameters = "?";

                parameters += "id_user=" + ID;
                parameters += "&date=" + date;

                $http({
                    method: 'DELETE',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'company/vacation'+parameters
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* GET to REST api => get company */
		User.getCompany = function(data){
			startLoading();
			return $q(function(resolve, reject) {
				$http({
					method: 'GET',
					data: param(data),
                    headers: getTokenFromStorage(),
					url: CONFIG.server.url+'Account/company'
				}).then(function(response) {
					endLoading();
					resolve();
				}).catch(function(error){
					endLoading();
					reject(error);
				})
			});
		};

        /* GET to REST api => get users */
        User.GetUsers = function(){
            startLoading();
            return $q(function(resolve, reject) {
                $http({
                    method: 'GET',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'admin/users'
                }).then(function(response) {
                    endLoading();
                    resolve(response.data);
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

		return User;
	}]
);
