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

            /* GET to REST api => Get auction cache*/
            Admin.getAuctionCache = function(){
                startLoading();
                return $q(function(resolve, reject){
                    $http({
                        method: 'GET',
                        headers: { 'token': window.localStorage.getItem("TOKEN")},
                        url: CONFIG.server.url+'admin/auction_cache'
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

