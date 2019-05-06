/**
 * Admin Service
 *
 * @class AdminService
 * @module Service
 * @constructor
 */

angular.module('appServices')
    .factory('Admin', ['$http', '$q', function ($http, $q) {
            'use strict';

            var Admin = {};

            /* PUT to REST api => ban user */
            Admin.BanUser = function(id_user, ban){
                startLoading();
                return $q(function(resolve, reject) {
                    var parameters = "?";

                    parameters += "id_user=" + id_user;
                    parameters += "&ban=" + ban;

                    $http({
                        method: 'PUT',
                        headers: getTokenFromStorage(),
                        url: CONFIG.server.url+'admin/ban'+parameters
                    }).then(function(response) {
                        endLoading();
                        resolve();
                    }).catch(function(error){
                        endLoading();
                        reject(error);
                    })
                });
            };

            /* PUT to REST api => verify user */
            Admin.VerifyUser = function(id_user, verify){
                startLoading();
                return $q(function(resolve, reject) {
                    var parameters = "?";

                    parameters += "id_user=" + id_user;
                    parameters += "&verify=" + verify;

                    $http({
                        method: 'PUT',
                        headers: getTokenFromStorage(),
                        url: CONFIG.server.url+'admin/verify'+parameters
                    }).then(function(response) {
                        endLoading();
                        resolve();
                    }).catch(function(error){
                        endLoading();
                        reject(error);
                    })
                });
            };

            /* PUT to REST api => delete user */
            Admin.DeleteUser = function(id_user, del){
                startLoading();
                return $q(function(resolve, reject) {
                    var parameters = "?";

                    parameters += "id_user=" + id_user;
                    parameters += "&delete=" + del;

                    $http({
                        method: 'PUT',
                        headers: getTokenFromStorage(),
                        url: CONFIG.server.url+'admin/delete'+parameters
                    }).then(function(response) {
                        endLoading();
                        resolve();
                    }).catch(function(error){
                        endLoading();
                        reject(error);
                    })
                });
            };

        /* POST to REST api => send email*/
        Admin.SendTestEmail = function(){
            startLoading();
            return $q(function(resolve, reject) {
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'admin/testEmail'
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* POST to REST api => send sms*/
        Admin.SendTestSms = function(){
            startLoading();
            return $q(function(resolve, reject) {
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'admin/testSms'
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* POST to REST api => send Invoice*/
        Admin.Invoice = function(id_user){
            startLoading();
            var parameters = "?";
            parameters += "id_user=" + id_user;

            return $q(function(resolve, reject) {
                $http({
                    method: 'PUT',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'admin/sendInvoice'+parameters
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

        /* PUT to REST api => send News Email*/
        Admin.SendNewsEmail = function(){
            startLoading();
            return $q(function(resolve, reject) {
                $http({
                    method: 'POST',
                    headers: getTokenFromStorage(),
                    url: CONFIG.server.url+'admin/sendNewsEmail'
                }).then(function(response) {
                    endLoading();
                    resolve();
                }).catch(function(error){
                    endLoading();
                    reject(error);
                })
            });
        };

            /* GET to REST api => Get Drivers position */
            Admin.GetDriversPosition = function(){
                startLoading();
                return $q(function(resolve, reject) {
                    $http({
                        method: 'GET',
                        headers: getTokenFromStorage(),
                        url: CONFIG.server.url+'admin/drivers_position'
                    }).then(function(response) {
                        endLoading();
                        resolve(response.data);
                    }).catch(function(error){
                        endLoading();
                        reject(error);
                    })
                });
            };

            /* GET to REST api => Get auction cache*/
            Admin.getAuctionCache = function(){
                startLoading();
                return $q(function(resolve, reject){
                    $http({
                        method: 'GET',
                        headers: getTokenFromStorage(),
                        url: CONFIG.server.url+'admin/cache'
                    }).then(function(response) {
                        endLoading();
                        resolve(response.data);
                    }).catch(function(error){
                        endLoading();
                        reject(error);
                    })
                });
            };

            return Admin;

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

